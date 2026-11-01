import { ParsedSpeaker, SpeakerRole, SpeakerEmotion } from './types';

export function parseSpeakerText(raw: string): ParsedSpeaker {
  const trimmed = raw.trim();
  const noteMatch = trimmed.match(/\((.*?)\)/);
  const subNote = noteMatch ? noteMatch[1].trim() : undefined;
  const baseName = trimmed.replace(/\(.*?\)/, '').trim();

  let role: SpeakerRole = 'learner';
  let emotion: SpeakerEmotion = 'default';

  // 1. 상대역 및 화자 역할 판별
  if (baseName.includes('이모님') || baseName.includes('할머니') || baseName.includes('사장님')) {
    role = 'auntie';
    emotion = 'giving';
  } else if (baseName.includes('행인') || baseName.includes('안내원')) {
    role = 'passerby';
    emotion = 'smile';
  } else if (baseName.includes('친구')) {
    role = 'friend';
    emotion = 'smile';
  } else if (baseName.includes('점원') || baseName.includes('직원')) {
    role = 'clerk';
    emotion = 'giving';
  } else if (subNote?.includes('아이') || baseName.includes('아이')) {
    role = 'child';
    emotion = 'joy';
  } else if (subNote?.includes('정중히') || subNote?.includes('공손')) {
    role = 'polite_learner';
    emotion = 'bowing';
  } else {
    role = 'learner';
    emotion = 'smile';
  }

  // 2. 지문 기반 감정 세분화
  if (subNote) {
    if (subNote.includes('안도') || subNote.includes('감탄') || subNote.includes('미소') || subNote.includes('먹고')) {
      emotion = 'smile';
    } else if (subNote.includes('급한') || subNote.includes('당황')) {
      emotion = 'panicked';
    } else if (subNote.includes('고마') || subNote.includes('감사')) {
      emotion = 'grateful';
    } else if (subNote.includes('양해') || subNote.includes('메모')) {
      emotion = 'giving';
    }
  }

  return {
    role,
    emotion,
    displayName: baseName || raw,
    subNote,
  };
}
