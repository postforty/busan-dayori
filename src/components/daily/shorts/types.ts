export type SpeakerRole = 'clerk' | 'child' | 'polite_learner' | 'learner' | 'friend' | 'elder' | 'passerby';

export type SpeakerEmotion = 'default' | 'smile' | 'giving' | 'bowing' | 'joy' | 'grateful' | 'panicked';

export interface ParsedSpeaker {
  role: SpeakerRole;
  emotion: SpeakerEmotion;
  displayName: string;
  subNote?: string;
}

