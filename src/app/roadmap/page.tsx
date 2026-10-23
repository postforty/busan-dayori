import React from 'react';
import RoadmapView from '@/components/roadmap/RoadmapView';
import { getDailyLessons } from '@/lib/supabase/queries';

export const metadata = {
  title: 'AI 맞춤 일본어 챌린지 | 釜山だより',
  description: '궁금한 부산 상황을 일본어로 질문하고 최근 생성된 1개 레슨으로 집중 학습합니다. 마음에 드는 표현은 북마크하여 언제든 복습하세요.'
};

export default async function RoadmapPage() {
  const dbLessons = await getDailyLessons();

  return <RoadmapView initialDbLessons={dbLessons} />;
}

