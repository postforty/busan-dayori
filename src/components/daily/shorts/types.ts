export type SpeakerRole =
  | 'clerk'
  | 'auntie'
  | 'passerby'
  | 'friend'
  | 'child'
  | 'polite_learner'
  | 'learner';

export type SpeakerEmotion =
  | 'default'
  | 'smile'
  | 'giving'
  | 'bowing'
  | 'joy'
  | 'grateful'
  | 'panicked';

export interface ParsedSpeaker {
  role: SpeakerRole;
  emotion: SpeakerEmotion;
  displayName: string;
  subNote?: string;
}

export type ShortsTheme = 'cafe' | 'restaurant' | 'street' | 'shop';
