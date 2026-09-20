import React from 'react';
import RoadmapView from '@/components/roadmap/RoadmapView';
import { getCurriculumLevels } from '@/lib/curriculum/curriculumData';

export const metadata = {
  title: '일본어 챌린지 로드맵 | 釜山だより',
  description: 'Lv.0 히라가나 입문부터 부산을 소개하는 편지 한 통까지, 매일의 챌린지로 나만의 배움 일기를 완성하는 일본어 로드맵입니다.'
};

export default function RoadmapPage() {
  const levels = getCurriculumLevels();

  return <RoadmapView levels={levels} />;
}
