# Kokoro-82M 온프레미스 서버 & Vercel / Supabase 연동 TTS 구현 계획서

본 문서는 **부산 다요리(釜山だより)** 서비스의 일본어 및 한국어 음성 품질을 비약적으로 끌어올리기 위해, 오픈 가중치 경량 모델인 **Kokoro-82M**을 자체 온프레미스 서버에서 구동하고 이를 **Vercel(Next.js)** 및 **Supabase Storage**와 연동하는 하이브리드 아키텍처 구현 계획서입니다.

---

## 1. 아키텍처 개요 및 데이터 흐름

```mermaid
flowchart TD
    subgraph Client [사용자 브라우저]
        UI[웹 UI: 편지/단어장/레슨]
        FallbackEngine[브라우저 Web Speech API: getBestVoice]
    end

    subgraph VercelApp [Vercel Next.js Serverless]
        RouteHandler[/api/tts - Next.js Route Handler/]
        HashGen[MD5 / SHA-256 텍스트 해시 생성]
    end

    subgraph CloudflareNet [Cloudflare Edge Network]
        CFTunnel[Cloudflare Tunnel: https://tts.mydomain.com<br>무료 SSL / 방화벽 / DDoS 방어]
    end

    subgraph Storage [Supabase Cloud]
        SupaStorage[(Supabase Storage: tts-audio 버킷<br>글로벌 CDN 영구 캐시)]
    end

    subgraph OnPremise [자체 온프레미스 서버 (홈서버/PC)]
        TunnelDaemon[cloudflared daemon]
        KokoroAPI[Docker: Kokoro-FastAPI Engine<br>Port 8880]
    end

    %% 데이터 흐름
    UI -->|1. 음성 요청 POST /api/tts| RouteHandler
    RouteHandler --> HashGen
    HashGen -->|2. 캐시 존재 여부 검사| SupaStorage
    
    %% 캐시 히트
    SupaStorage -- 3a. 캐시 히트: 이미 생성된 MP3 URL 반환 --> RouteHandler
    RouteHandler -- 3b. Public Audio URL 즉시 반환 (지연시간 < 50ms) --> UI
    
    %% 최초 생성 (캐시 미스)
    SupaStorage -. 4a. 캐시 없음 (Miss) .-> RouteHandler
    RouteHandler -->|4b. 3초 타임아웃으로 합성 요청| CFTunnel
    CFTunnel --> TunnelDaemon --> KokoroAPI
    KokoroAPI -->|4c. 생성된 MP3 바이너리 응답| TunnelDaemon --> CFTunnel --> RouteHandler
    RouteHandler -->|5a. Supabase Storage에 비동기 업로드| SupaStorage
    RouteHandler -->|5b. 오디오 스트림 또는 URL 응답| UI

    %% 장애 폴백
    RouteHandler -. 온프레미스 서버 오프라인/타임아웃(3초 초과) .-> FallbackEngine
    FallbackEngine --> UI
```

---

## 2. 계층별 핵심 역할 및 기대 효과

| 구성 요소 | 기술 스택 | 담당 역할 | 이점 및 특징 |
| :--- | :--- | :--- | :--- |
| **온프레미스 서버** | Ubuntu/Windows Docker, `kokoro-fastapi` | Kokoro-82M 신경망 음성 합성 추론 | • GPU 없이 일반 CPU로도 1초 내외 빠른 생성<br>• 상용 API 종량제 비용 **0원** 무제한 생성 |
| **네트워크 보안** | Cloudflare Tunnel (`cloudflared`) | 사설망 서버를 외부 Vercel과 안전하게 연결 | • 공유기 포트포워딩/공인IP 불필요<br>• 무료 HTTPS 도메인 및 강력한 보안 제공 |
| **스토리지/캐시** | Supabase Storage (`tts-audio`) | 생성된 MP3 음원 영구 저장 및 CDN 서빙 | • 동일 문장 재요청 시 온프레미스 부하 0<br>• Vercel 대역폭 소모 없는 고속 글로벌 스트리밍 |
| **API 게이트웨이** | Next.js Serverless Route (`/api/tts`) | 캐시 확인, 온프레미스 호출, 타임아웃 제어 | • Vercel 10초 타임아웃 문제 완전 방어<br>• 내부 API Secret 토큰 검증 |
| **클라이언트** | React, HTML5 Audio, Web Speech API | 오디오 재생, 실시간 음절 하이라이트 동기화 | • 온프레미스 장애 시 기존 브라우저 TTS로 **Graceful Fallback** |

---

## 3. 단계별 상세 구현 명세 (Implementation Phases)

### Phase 1. 온프레미스 서버 환경 구성

#### 1) Docker Compose 파일 작성 (`docker-compose.yml`)
온프레미스 머신(Ubuntu 또는 Windows WSL2 Docker Desktop)에서 실행합니다.

```yaml
version: '3.8'

services:
  # 1. Kokoro-82M FastAPI 컨테이너 (OpenAI 규격 호환)
  kokoro-tts:
    image: ghcr.io/remsky/kokoro-fastapi-cpu:latest
    container_name: kokoro-tts-engine
    restart: always
    environment:
      - PORT=8880
      - KOKORO_DEFAULT_VOICE=jf_alpha
    ports:
      - "8880:8880"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8880/health"]
      interval: 30s
      timeout: 5s
      retries: 3

  # 2. Cloudflare Tunnel 데몬 (인바운드 포트 개방 없이 HTTPS 연결)
  cloudflare-tunnel:
    image: cloudflare/cloudflared:latest
    container_name: cloudflare-tts-tunnel
    restart: always
    command: tunnel run --token ${CLOUDFLARE_TUNNEL_TOKEN}
    depends_on:
      - kokoro-tts
```

#### 2) Cloudflare Tunnel 세팅 가이드
1. Cloudflare 대시보드 > `Zero Trust` > `Networks` > `Tunnels` 메뉴 진입
2. 새 터널 생성 (이름: `busan-dayori-tts`)
3. 발급된 `TUNNEL_TOKEN`을 온프레미스 `.env`에 저장
4. Public Hostname 설정:
   - Subdomain: `tts` (예: `tts.yourdomain.com`)
   - Service Type: `HTTP`
   - URL: `kokoro-tts:8880` (Docker 내부 서비스명)

#### 3) 온프레미스 무중단 운영 설정
- **BIOS 설정**: `Restore on AC/Power Loss` → `Power On` (정전 후 자동 켜짐)
- **Docker 자동 시작**: Windows 시작 프로그램 또는 Linux `systemd` 등록

---

### Phase 2. Supabase Storage 영구 캐시 구성

1. **Storage Bucket 생성**:
   - 버킷명: `tts-audio`
   - Public 설정: `Public` (누구나 읽기 가능, 업로드는 서비스 롤 권한 필요)
2. **파일 경로 네이밍 규칙**:
   - `audio/{lang}/{voice}_{md5(text)}.mp3`
   - 예: `audio/ja/jf_alpha_5d41402abc4b2a76b9719d911017c592.mp3`
3. **이점**:
   - Supabase CDN을 통해 캐시 히트 시 50ms 미만으로 브라우저에 음원 전달.
   - 온프레미스 서버가 꺼져 있어도 기존 생성된 오디오는 100% 정상 작동.

---

### Phase 3. Vercel Next.js API 라우트 (`src/app/api/tts/route.ts`)

Vercel의 10초 타임아웃 제약을 극복하기 위해 **Fast-fail (3초 타임아웃)**을 적용하고 캐시를 최우선 조회합니다.

```typescript
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

// Supabase 관리자 클라이언트 (업로드용)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BUCKET_NAME = 'tts-audio';

export async function POST(req: NextRequest) {
  try {
    const { text, lang = 'ja', voice = 'jf_alpha', speed = 1.0 } = await req.json();

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // 1. 고유 해시 파일명 생성
    const textHash = crypto.createHash('md5').update(`${lang}_${voice}_${speed}_${text}`).digest('hex');
    const filePath = `${lang}/${voice}_${textHash}.mp3`;

    // 2. Supabase Storage 캐시 확인 (Public URL)
    const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    
    // HEAD 요청으로 이미 파일이 존재하는지 가볍게 확인
    const checkRes = await fetch(publicUrlData.publicUrl, { method: 'HEAD' });
    if (checkRes.ok) {
      return NextResponse.json({ audioUrl: publicUrlData.publicUrl, cached: true });
    }

    // 3. 온프레미스 Kokoro-82M 서버 호출 (3초 타임아웃 적용)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const ttsServerUrl = process.env.ONPREMISE_TTS_URL; // 예: https://tts.yourdomain.com
    if (!ttsServerUrl) {
      return NextResponse.json({ error: 'TTS Server URL not configured', fallback: true }, { status: 503 });
    }

    const ttsResponse = await fetch(`${ttsServerUrl}/v1/audio/speech`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.TTS_INTERNAL_SECRET || ''}`
      },
      body: JSON.stringify({
        model: 'kokoro',
        input: text,
        voice: voice,
        speed: speed,
        response_format: 'mp3'
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!ttsResponse.ok) {
      throw new Error(`TTS server responded with ${ttsResponse.status}`);
    }

    const audioArrayBuffer = await ttsResponse.arrayBuffer();
    const audioBuffer = Buffer.from(audioArrayBuffer);

    // 4. Supabase Storage에 비동기 업로드 (영구 캐시)
    await supabase.storage.from(BUCKET_NAME).upload(filePath, audioBuffer, {
      contentType: 'audio/mpeg',
      upsert: true
    });

    return NextResponse.json({
      audioUrl: publicUrlData.publicUrl,
      cached: false
    });

  } catch (err: any) {
    console.warn('[TTS API Warning] On-premise server unavailable, triggering fallback:', err.message);
    // 실패 시 클라이언트가 Web Speech API로 폴백할 수 있도록 명시적 플래그 반환
    return NextResponse.json({ error: 'TTS generation unavailable', fallback: true }, { status: 503 });
  }
}
```

---

### Phase 4. 프론트엔드 연동 및 이중 안전망 ([src/utils/tts.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/utils/tts.ts))

AI 고품질 음원을 우선 재생하고, 네트워크나 온프레미스 장애 시 브라우저 Web Speech로 100% 매끄럽게 연결합니다.

```typescript
// src/utils/tts.ts에 추가할 고품질 하이브리드 재생 함수
let currentAudioElement: HTMLAudioElement | null = null;

export async function playNaturalSpeech({
  text,
  lang = 'ja',
  rate = 1.0,
  onStart,
  onEnd,
  onBoundary
}: {
  text: string;
  lang?: 'ja' | 'ko';
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
}) {
  // 이전 재생 중단
  stopAnySpeech();

  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, lang, speed: rate })
    });

    const data = await res.json();

    if (!res.ok || data.fallback || !data.audioUrl) {
      throw new Error('Fallback required');
    }

    // AI MP3 오디오 재생
    const audio = new Audio(data.audioUrl);
    currentAudioElement = audio;

    // 글자 단위 하이라이트 동기화 (오디오 타임코드와 모라 박자 결합)
    const timings = computeCharTimings(text, rate);

    audio.ontimeupdate = () => {
      if (!onBoundary || !audio.duration) return;
      const elapsedMs = audio.currentTime * 1000;
      const current = timings.find((t) => elapsedMs >= t.startMs && elapsedMs < t.endMs);
      if (current) {
        onBoundary(current.index);
      }
    };

    audio.onplay = () => { if (onStart) onStart(); };
    audio.onended = () => { if (onEnd) onEnd(); };
    audio.onerror = () => {
      // 오디오 스트리밍 실패 시 브라우저 TTS로 즉시 대체
      fallbackToBrowserTTS(text, lang, rate, onStart, onEnd, onBoundary);
    };

    await audio.play();

  } catch (error) {
    // 서버 오프라인 또는 에러 시 즉시 브라우저 Web Speech API로 폴백
    fallbackToBrowserTTS(text, lang, rate, onStart, onEnd, onBoundary);
  }
}
```

---

### Phase 5. 고정 데이터 사전 일괄 생성 스크립트 (Pre-generation Script)

서비스의 정적 데이터(히라가나 50음도, 여행 회화, 퀴즈 단어)는 온프레미스 서버를 띄웠을 때 **로컬 스크립트로 미리 한 번만 생성하여 Supabase에 올려두면 런타임 호출이 아예 필요 없습니다.**

- **실행 대상**:
  - [src/data/hiraganaData.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/data/hiraganaData.ts) (히라가나 46자 + 필수 단어)
  - [src/data/phrasesData.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/data/phrasesData.ts) (여행 필수 회화)
  - [src/data/dialectsData.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/data/dialectsData.ts) (부산 사투리)
- **효과**: 배포 직후 첫 사용자도 지연 시간 0ms로 즉시 고음질 음원을 들을 수 있습니다.

---

## 4. 환경 변수 설정 체크리스트

### 1) 온프레미스 머신 (`.env`)
```bash
CLOUDFLARE_TUNNEL_TOKEN="eyJhIjoi..." # Cloudflare Zero Trust 토큰
TTS_INTERNAL_SECRET="super-secret-key-1234"
```

### 2) Vercel 프로젝트 환경 변수 (Settings > Environment Variables)
```bash
ONPREMISE_TTS_URL="https://tts.yourdomain.com"
TTS_INTERNAL_SECRET="super-secret-key-1234"
NEXT_PUBLIC_SUPABASE_URL="https://xxxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGci..." # Storage 업로드용 비밀키
```

---

## 5. 최종 구현 로드맵 일정표

| 단계 | 작업 내용 | 소요 예상 | 비고 |
| :---: | :--- | :---: | :--- |
| **1** | 온프레미스 PC에 Docker 및 `kokoro-fastapi` 컨테이너 실행 | 30분 | CPU 모드로 즉시 기동 확인 |
| **2** | Cloudflare Tunnel 연결하여 HTTPS 도메인 매핑 | 20분 | `https://tts.domain.com/health` 확인 |
| **3** | Supabase Storage `tts-audio` 버킷 생성 및 정책 설정 | 10분 | Public 읽기 허용 |
| **4** | Next.js `/api/tts` 라우트 생성 (캐시 확인 및 타임아웃 처리) | 40분 | Vercel 환경 변수 동기화 |
| **5** | 프론트엔드 [tts.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/utils/tts.ts) 하이브리드 재생 & Web Speech 폴백 연동 | 30분 | 실패 시 무중단 음성 보장 |
| **6** | 히라가나/회화 고정 데이터 사전 생성 스크립트 실행 | 30분 | 정적 에셋 영구 캐싱 |

---

> 본 계획서는 `workspace/kokoro-tts-implementation-plan.md`에 영구 보관되며, 실제 구현 착수 시 각 Phase 순서대로 즉시 코드를 작성하고 테스트할 수 있도록 준비되어 있습니다.
