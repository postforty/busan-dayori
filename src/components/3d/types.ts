import { DailyLesson } from '@/types';

export type WorldThemeLevel = 'level0' | 'level1' | 'level2' | 'level3';

export type WorldInteriorId =
  | 'starter-cafe'
  | 'starter-restaurant'
  | 'starter-konbini'
  | 'starter-souvenir';

export type WorldNpcRole = 'clerk' | 'auntie' | 'friend' | 'passerby';

export interface WorldPortal {
  id: string;
  kind: 'enter' | 'exit';
  label: string;
  interiorId?: WorldInteriorId;
  position: [number, number, number];
  radius: number;
  returnPosition?: [number, number, number];
}

export interface WorldThemeConfig {
  id: WorldThemeLevel;
  badge: string;
  ambientColor: number;
  skyColor: number;
  groundColor: number;
  fogColor: number;
}

export interface WorldNpcAppearance {
  hideGlasses?: boolean;
  hideBackpack?: boolean;
  hairColor?: string;
  outfitColor?: string;
  capColor?: string;
  pantsColor?: string;
}

export interface WorldNpcData {
  id: string;
  name: string;
  role: string;
  level: WorldThemeLevel;
  interiorId?: WorldInteriorId;
  unitId: string;
  position: [number, number, number];
  color: number;
  accentColor: number;
  greetingText: string;
  avatarImage: string;
  modelUrl: string;
  characterRole?: WorldNpcRole;
  appearance?: WorldNpcAppearance;
  lessonData: DailyLesson;
}

