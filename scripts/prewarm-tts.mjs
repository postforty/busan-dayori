import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const apiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !supabaseKey || !apiKey) {
  console.error('필요한 환경 변수(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY, GEMINI_API_KEY)가 누락되었습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 1. 화자 역할 파싱 (ShortsModal 및 speakerParser와 동일 로직)
function parseSpeakerText(raw) {
  const trimmed = raw.trim();
  const baseName = trimmed.replace(/\(.*?\)/, '').trim();

  let role = 'learner';
  if (baseName.includes('이모님') || baseName.includes('할머니') || baseName.includes('사장님')) {
    role = 'auntie';
  } else if (baseName.includes('행인') || baseName.includes('안내원')) {
    role = 'passerby';
  } else if (baseName.includes('친구')) {
    role = 'friend';
  } else if (baseName.includes('점원') || baseName.includes('직원')) {
    role = 'clerk';
  } else if (baseName.includes('아이')) {
    role = 'child';
  }
  return { role };
}

// 2. 커리큘럼 대화 추출
const content = fs.readFileSync('src/lib/curriculum/curriculumData.ts', 'utf8');
const dialogueRegex = /speaker:\s*['"]([^'"]+)['"][\s\S]*?japanese:\s*['"]([^'"]+)['"]/g;

let match;
const dialogues = [];
while ((match = dialogueRegex.exec(content)) !== null) {
  const speaker = match[1];
  const japanese = match[2];
  const parsed = parseSpeakerText(speaker);
  const isFemale = ['clerk', 'auntie', 'passerby', 'friend'].includes(parsed.role);
  const voice = isFemale ? 'Kore' : 'Puck';
  dialogues.push({ speaker, japanese, voice, lang: 'ja' });
}

// 3. 현재 Supabase 캐시 현황 조회
const { data: cache, error: cacheErr } = await supabase
  .from('tts_audio_cache')
  .select('text, voice, lang');

if (cacheErr) {
  console.error('Supabase 캐시 조회 실패:', cacheErr.message);
  process.exit(1);
}

const cacheMap = new Map();
cache.forEach(c => {
  if (!cacheMap.has(c.text)) cacheMap.set(c.text, new Set());
  cacheMap.get(c.text).add(c.voice);
});

function isCached(text, voice) {
  const voices = cacheMap.get(text);
  if (!voices) return false;
  if (voices.has(voice)) return true;
  if (voice === 'Puck' && voices.has('Charon')) return true; // 남성 Puck은 기존 Charon 캐시 폴백 허용
  return false;
}

const missing = dialogues.filter(d => !isCached(d.japanese, d.voice));

console.log('==================================================');
console.log(`🎙️ 커리큘럼 총 대사: ${dialogues.length}개`);
console.log(`✅ 이미 캐시 완료: ${dialogues.length - missing.length}개`);
console.log(`⚡ 생성 필요(미캐시): ${missing.length}개`);
console.log(`🔑 현재 API Key: ...${apiKey.slice(-6)}`);
console.log('==================================================\n');

if (missing.length === 0) {
  console.log('🎉 모든 커리큘럼 대사가 이미 Supabase DB에 완벽히 캐시되어 있습니다!');
  process.exitCode = 0;
} else {

// 4. Gemini TTS 호출 함수
async function generateGeminiTts(text, voice, lang) {
  const url = 'https://generativelanguage.googleapis.com/v1beta/interactions';
  const defaultStyle = lang === 'ja'
    ? 'clear, gentle and friendly pronunciation for language learners'
    : 'friendly and clear pronunciation';

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-goog-api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gemini-3.8-flash-lite-tts',
      input: [{
        type: 'user_input',
        content: [{
          type: 'text',
          text,
          annotations: [{
            type: 'speech_metadata',
            style: defaultStyle,
          }],
        }],
      }],
      response_format: { type: 'audio' },
      generation_config: {
        speech_config: [
          { voice },
        ],
      },
    }),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    return {
      success: false,
      status: res.status,
      code: errData?.error?.code || res.statusText,
      message: errData?.error?.message || 'Gemini TTS request failed',
    };
  }

  const data = await res.json();
  let audioBase64 = data.output_audio?.data;

  if (!audioBase64 && Array.isArray(data.steps)) {
    for (const step of data.steps) {
      if (Array.isArray(step.content)) {
        for (const item of step.content) {
          if (item.type === 'audio' && typeof item.data === 'string') {
            audioBase64 = item.data;
          }
        }
      }
    }
  }

  if (!audioBase64) {
    return { success: false, status: 502, message: 'Audio payload not found in Gemini response' };
  }

  return { success: true, audioBase64 };
}

// 5. 순차 생성 및 DB 적재 루프
let successCount = 0;
let failCount = 0;

for (let i = 0; i < missing.length; i++) {
  const item = missing[i];
  console.log(`[${i + 1}/${missing.length}] 생성 중: [${item.voice}] "${item.japanese}" (${item.speaker})`);

  const ttsResult = await generateGeminiTts(item.japanese, item.voice, item.lang);

  if (!ttsResult.success) {
    console.error(`❌ Gemini TTS 실패 (Status: ${ttsResult.status}, Code: ${ttsResult.code})`);
    console.error(`   상세: ${ttsResult.message}`);

    if (ttsResult.status === 429) {
      if (ttsResult.message.includes('per minute') || ttsResult.message.includes('RPM')) {
        console.log('   ⏳ [분당 호출 제한(3 RPM) 감지] 21초 대기 후 자동으로 재시도합니다...');
        await new Promise(resolve => setTimeout(resolve, 21000));
        i--; // 동일 항목 재시도
        continue;
      }

      console.log('\n🛑 [안내] 현재 API Key의 일일 쿼터(10회)가 모두 소진되었습니다.');
      console.log(`✨ 지금까지 성공한 개수: ${successCount}개`);
      console.log(`📋 남은 미캐시 대사: ${missing.length - successCount}개`);
      console.log('새로운 API Key를 .env.local에 설정하신 후 다시 이 스크립트를 실행해 주세요.');
      break;
    }

    failCount++;
    continue;
  }

  // Supabase DB에 적재
  const { error: insertErr } = await supabase
    .from('tts_audio_cache')
    .insert({
      text: item.japanese,
      lang: item.lang,
      voice: item.voice,
      audio_base64: ttsResult.audioBase64,
    });

  if (insertErr) {
    console.warn(`⚠️ Supabase 저장 실패: ${insertErr.message}`);
    failCount++;
  } else {
    console.log(`   ✅ DB 캐시 저장 성공! (Base64 크기: ${ttsResult.audioBase64.length}자)`);
    successCount++;
  }

  // API 호출 간격 1.2초 딜레이 (안전한 RPM 유지)
  await new Promise(resolve => setTimeout(resolve, 1200));
}

console.log('\n==================================================');
console.log(`🎉 배치 실행 완료: 성공 ${successCount}개 / 실패 ${failCount}개`);
console.log('==================================================');
}
