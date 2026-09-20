import React from 'react';
import RoadmapView from '@/components/roadmap/RoadmapView';
import { getCurriculumLevels } from '@/lib/curriculum/curriculumData';

export const metadata = {
  title: '학습 로드맵 & 커리큘럼 | 釜山だより',
  description: 'Lv.0 히라가나 입문부터 원어민 뉘앙스의 Lv.3 실전 일본어까지 이어지는 맞춤형 학습 로드맵입니다.'
};

export default function RoadmapPage() {
  const levels = getCurriculumLevels();

  return <RoadmapView levels={levels} />;
}
