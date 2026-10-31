import { ParsedSpeaker, SpeakerRole, SpeakerEmotion } from './types';

export function parseSpeakerText(raw: string): ParsedSpeaker {
  const trimmed = raw.trim();
  const noteMatch = trimmed.match(/\((.*?)\)/);
  const subNote = noteMatch ? noteMatch[1].trim() : undefined;
  const baseName = trimmed.replace(/\(.*?\)/, '').trim();

  let role: SpeakerRole = 'learner';
  let emotion: SpeakerEmotion = 'default';

  // Lv.0 Unit 1 및 일반 대화 화자 판별
  if (baseName.includes('점원') || baseName.includes('직원')) {
    role = 'clerk';
    emotion = 'giving';
  } else if (subNote?.includes('아이') || baseName.includes('아이')) {
    role = 'child';
    emotion = 'joy';
  } else if (subNote?.includes('정중히') || subNote?.includes('공손')) {
    role = 'polite_learner';
    emotion = 'bowing';
  } else if (baseName.includes('친구')) {
    role = 'friend';
    emotion = 'smile';
  } else if (baseName.includes('이모님') || baseName.includes('할머니')) {
    role = 'elder';
    emotion = 'smile';
  } else if (baseName.includes('행인')) {
    role = 'passerby';
    emotion = 'smile';
  } else {
    role = 'learner';
    emotion = 'smile';
  }

  // 지문 기반 감정 세분화
  if (subNote) {
    if (subNote.includes('안도') || subNote.includes('감탄') || subNote.includes('미소')) {
      emotion = 'smile';
    } else if (subNote.includes('급한') || subNote.includes('당황')) {
      emotion = 'panicked';
    } else if (subNote.includes('고마') || subNote.includes('감사')) {
      emotion = 'grateful';
    }
  }

  return {
    role,
    emotion,
    displayName: baseName || raw,
    subNote,
  };
}

