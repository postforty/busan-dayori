'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Letter, DailyLesson, Category } from '@/types';
import LetterCard from '@/components/letters/LetterCard';
import CategoryFilter from '@/components/letters/CategoryFilter';
import DailyLessonCard from '@/components/daily/DailyLessonCard';
import AiGeneratorBar from '@/components/daily/AiGeneratorBar';
import {
  Search,
  MessageSquareText,
  BookOpen,
  Sparkles,
  Mail,
  FolderArchive
} from 'lucide-react';

interface HomeFeedProps {
  initialLetters: Letter[];
  initialLessons: DailyLesson[];
}

export default function HomeFeed({ initialLetters, initialLessons }: HomeFeedProps) {
  // 데일리 학습 상태
  const [currentLesson, setCurrentLesson] = useState<DailyLesson>(
    initialLessons[0] || {
      id: 'default',
      dayNumber: 1,
      seriesTitle: '기본 레슨',
      themeTitle: '일본어 기본 표현',
      keyExpression: { japanese: '', reading: '', korean: '' },
      dialogue: [],
      grammar: { title: '', structure: '', explanation: '' },
      vocabulary: [],
      nuanceTip: ''
    }
  );
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [savedLessons, setSavedLessons] = useState<DailyLesson[]>([]);

  // 로컬 스토리지에서 보관된 레슨 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem('saved_lessons');
      if (saved) {
        const parsed = JSON.parse(saved);
        setTimeout(() => setSavedLessons(parsed), 0);
      }
    } catch {
      // 무시
    }
  }, []);

  // 로컬 편지 필터링 상태
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [soloFilter, setSoloFilter] = useState(false);
  const [nonSpicyFilter, setNonSpicyFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // AI 생성 결과 수신
  const handleLessonGenerated = (lesson: DailyLesson, isAi: boolean) => {
    setCurrentLesson(lesson);
    setIsAiGenerated(isAi);
  };

  // 로컬 편지 필터링 로직
  const filteredLetters = useMemo(() => {
    return initialLetters.filter((letter) => {
      if (selectedCategory !== 'all' && letter.category !== selectedCategory) {
        return false;
      }
      if (soloFilter && letter.placeInfo?.soloFriendly !== 'welcome') {
        return false;
      }
      if (nonSpicyFilter && (letter.placeInfo?.spicyLevel ?? 0) > 1) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = letter.title.toLowerCase().includes(query);
        const matchSummary = letter.summary.toLowerCase().includes(query);
        const matchRegion = letter.region.toLowerCase().includes(query);
        const matchKorean = letter.placeInfo?.koreanName.toLowerCase().includes(query) ?? false;
        const matchKatakana = letter.placeInfo?.katakanaName.toLowerCase().includes(query) ?? false;
        if (!matchTitle && !matchSummary && !matchRegion && !matchKorean && !matchKatakana) {
          return false;
        }
      }
      return true;
    });
  }, [initialLetters, selectedCategory, soloFilter, nonSpicyFilter, searchQuery]);

  return (
    <div className="px-4 pt-4 space-y-6">
      {/* 1. 웰컴 인트로 배너 */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4] relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#E07A5F] mb-2.5 border border-[#F4DDD4]">
            <Sparkles className="w-3 h-3 text-[#D97706]" />
            <span>부산 토박이의 데일리 일본어 학습 & 로컬 편지</span>
          </div>

          <h1 className="text-lg font-black text-[#2D3748] tracking-tight leading-snug mb-1.5">
            釜山在住の私が届ける、<br />
            まいにちの日本語ノート
          </h1>
          <p className="text-xs text-[#718096] leading-relaxed">
            매일 실전 일본어 표현을 익히고, 부산의 숨은 로컬 이야기 속에서 자연스러운 일본어 문장을 확인해보세요.
          </p>
        </div>
      </section>

      {/* 2. AI 맞춤 일본어 생성기 바 */}
      <AiGeneratorBar onLessonGenerated={handleLessonGenerated} />

      {/* 3. 데일리 일본어 학습 카드 섹션 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-[#E07A5F]" />
            <h2 className="text-sm font-bold text-[#2D3748]">
              오늘의 일본어 레슨
            </h2>
          </div>

          {/* 기본 프리셋 레슨 및 보관함 레슨 선택 칩 */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
            {initialLessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(lesson);
                  setIsAiGenerated(false);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                  currentLesson.id === lesson.id && !isAiGenerated
                    ? 'bg-[#2D3748] text-white'
                    : 'bg-white text-gray-400 border border-[#EDE8E1] hover:bg-gray-50'
                }`}
              >
                Day {lesson.dayNumber}
              </button>
            ))}

            {savedLessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setCurrentLesson(lesson);
                  setIsAiGenerated(true);
                }}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                  currentLesson.id === lesson.id
                    ? 'bg-[#E07A5F] text-white'
                    : 'bg-[#FAF0E6] text-[#E07A5F] border border-[#F4DDD4] hover:bg-[#F4DDD4]'
                }`}
                title={lesson.themeTitle}
              >
                <FolderArchive className="w-2.5 h-2.5" />
                <span>보관 {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>

        <DailyLessonCard lesson={currentLesson} isAiGenerated={isAiGenerated} />
      </section>

      {/* 4. 부산 로컬 편지 (부차적 아카이브 섹션) */}
      <section className="pt-4 border-t border-[#EDE8E1] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-[#E07A5F]" />
            <div>
              <h2 className="text-sm font-bold text-[#2D3748]">
                실전 적용 로컬 편지 ({filteredLetters.length}건)
              </h2>
              <p className="text-[10px] text-gray-400">
                배운 표현이 녹아있는 부산 현지인의 솔직 담백한 이야기
              </p>
            </div>
          </div>

          {(selectedCategory !== 'all' || soloFilter || nonSpicyFilter || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSoloFilter(false);
                setNonSpicyFilter(false);
                setSearchQuery('');
              }}
              className="text-[11px] text-[#E07A5F] hover:underline"
            >
              초기화
            </button>
          )}
        </div>

        {/* 검색창 */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="음식명, 지역(광안리, 해운대 등)으로 편지 검색..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EDE8E1] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F] card-shadow"
          />
        </div>

        {/* 카테고리 및 필터 */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          soloFilter={soloFilter}
          onToggleSoloFilter={() => setSoloFilter(!soloFilter)}
          nonSpicyFilter={nonSpicyFilter}
          onToggleNonSpicyFilter={() => setNonSpicyFilter(!nonSpicyFilter)}
        />

        {/* 편지 목록 */}
        {filteredLetters.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#EDE8E1] space-y-2">
            <p className="text-sm text-gray-500">조건에 맞는 편지를 찾지 못했습니다.</p>
            <p className="text-xs text-gray-400">검색어 또는 필터 조건을 변경해보세요.</p>
          </div>
        ) : (
          filteredLetters.map((letter) => (
            <LetterCard key={letter.id} letter={letter} />
          ))
        )}
      </section>

      {/* 5. 여행 도우미 바로가기 */}
      <section className="pt-4 border-t border-[#EDE8E1] space-y-2.5">
        <h3 className="text-xs font-bold text-[#718096] uppercase tracking-wider">
          학습 & 여행 도우미
        </h3>

        <div className="grid grid-cols-2 gap-2.5">
          <Link
            href="/phrases"
            className="p-3.5 bg-white rounded-2xl border border-[#EDE8E1] card-shadow card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F] mb-2">
                <MessageSquareText className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#2D3748] mb-0.5">
                손가락 회화 카드
              </h4>
              <p className="text-[10px] text-[#718096]">
                식당/카페에서 화면만 보여주면 되는 한국어-일본어
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#E07A5F] mt-2 block">
              사용해보기 →
            </span>
          </Link>

          <Link
            href="/dialects"
            className="p-3.5 bg-white rounded-2xl border border-[#EDE8E1] card-shadow card-hover flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#2E7D32] mb-2">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-[#2D3748] mb-0.5">
                부산 사투리 노트
              </h4>
              <p className="text-[10px] text-[#718096]">
                「단디 해라」「밥 뭇나」 현지 표현의 일본어 풀이
              </p>
            </div>
            <span className="text-[10px] font-bold text-[#2E7D32] mt-2 block">
              살펴보기 →
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
