import { DailyLesson } from '@/types';

export type WorldThemeLevel = 'level1' | 'level2' | 'level3';

export interface WorldThemeConfig {
  id: WorldThemeLevel;
  name: string;
  subTitle: string;
  badge: string;
  ambientColor: number;
  skyColor: number;
  groundColor: number;
  fogColor: number;
}

export interface WorldNpcData {
  id: string;
  name: string;
  role: string;
  level: WorldThemeLevel;
  unitId: string;
  position: [number, number, number];
  color: number;
  accentColor: number;
  greetingText: string;
  lessonData: DailyLesson;
}

