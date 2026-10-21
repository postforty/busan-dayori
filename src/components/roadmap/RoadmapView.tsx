'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CurriculumLevel, LessonLevel, DailyLesson } from '@/types';
import {
  Compass,
  Sparkles,
  Zap,
  Flame,
  BookOpen,
  ArrowRight,
  Pencil,
  Baby,
  Mail,
  Volume2,
  CheckCircle,
  Target,
  Languages,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { speakJapanese } from '@/utils/tts';
import { getPronunciation, parseRubySegments } from '@/utils/japanesePronounce';
import AiGeneratorBar from '@/components/daily/AiGeneratorBar';
import DailyLessonCard from '@/components/daily/DailyLessonCard';

interface RoadmapViewProps {
  levels: CurriculumLevel[];
  initialDbLessons?: DailyLesson[];
}

function renderRuby(text: string) {
  const segments = parseRubySegments(text);
  return (
    <>
      {segments.map((seg, i) => {
        if (seg.ruby) {
          return (
            <ruby key={i} className="transition-colors">
              <span className="text-[#2D3748]">{seg.text}</span>
              <rp>(</rp>
              <rt className="text-[10px] leading-none text-[#E07A5F] font-normal">
                {seg.ruby}
              </rt>
              <rp>)</rp>
            </ruby>
          );
        }
        return <span key={i} className="text-[#2D3748]">{seg.text}</span>;
      })}
    </>
  );
}

export default function RoadmapView({ levels, initialDbLessons = [] }: RoadmapViewProps) {
  const [selectedLevel, setSelectedLevel] = useState<LessonLevel>('starter');
  const [showPronounce, setShowPronounce] = useState(true);

  // AI+ 탭 전용 레슨 목록 (DB 공식 레슨 + 로컬 스토리지 레슨 통합)
  const [aiLessons, setAiLessons] = useState<DailyLesson[]>(initialDbLessons);
  const [expandedLessonId, setExpandedLessonId] = useState<string | null>(null);

  // 로컬 스토리지에서 발음 모드 및 로컬 레슨 병합 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem('beginner_pronounce_mode');
      if (saved !== null) {
        setShowPronounce(saved === 'true');
      }

      const savedLessons = localStorage.getItem('saved_lessons');
      if (savedLessons) {
        const localLessons: DailyLesson[] = JSON.parse(savedLessons);
        setAiLessons((prev) => {
          const existingIds = new Set(prev.map((l) => l.id));
          const newLocalItems = localLessons.filter((l) => !existingIds.has(l.id));
          return [...newLocalItems, ...prev];
        });
      }
    } catch {
      // 무시
    }
  }, []);

  const handleTogglePronounce = () => {
    const nextState = !showPronounce;
    setShowPronounce(nextState);
    try {
      localStorage.setItem('beginner_pronounce_mode', String(nextState));
    } catch {
      // 무시
    }
  };

  // AI 레슨 새로 생성 시 실시간 최상단 추가 및 자동 펼침
  const handleLessonGenerated = (newLesson: DailyLesson) => {
    setAiLessons((prev) => [newLesson, ...prev.filter((l) => l.id !== newLesson.id)]);
    setExpandedLessonId(newLesson.id);

    // 로컬 스토리지 동기화
    try {
      const saved = localStorage.getItem('saved_lessons');
      const list: DailyLesson[] = saved ? JSON.parse(saved) : [];
      const updated = [newLesson, ...list.filter((l) => l.id !== newLesson.id)];
      localStorage.setItem('saved_lessons', JSON.stringify(updated));
    } catch {
      // 무시
    }
  };

  // 공식 DB 발행 성공 시 목록 내 레슨 상태 갱신
  const handlePublishSuccess = (publishedLesson: DailyLesson) => {
    setAiLessons((prev) =>
      prev.map((l) =>
        l.id === publishedLesson.id || l.themeTitle === publishedLesson.themeTitle
          ? publishedLesson
          : l
      )
    );
  };

  const getLevelIcon = (level: LessonLevel, inBadge: boolean = false) => {
    const iconClass = inBadge ? 'w-3.5 h-3.5 text-white' : 'w-4 h-4';
    switch (level) {
      case 'starter':
        return <Baby className={inBadge ? iconClass : 'w-4 h-4 text-[#E78B70]'} />;
      case 'beginner':
        return <Sparkles className={inBadge ? iconClass : 'w-4 h-4 text-[#E07A5F]'} />;
      case 'intermediate':
        return <Zap className={inBadge ? iconClass : 'w-4 h-4 text-[#C45B40]'} />;
      case 'advanced':
        return <Flame className={inBadge ? iconClass : 'w-4 h-4 text-[#943A25]'} />;
      case 'ai':
        return <Sparkles className={inBadge ? iconClass : 'w-4 h-4 text-[#E07A5F]'} />;
    }
  };

  const filteredLevels = levels.filter((lvl) => lvl.level === selectedLevel);

  return (
    <div className="px-4 pt-4 pb-24 space-y-6 max-w-xl mx-auto">
      {/* 1. 상단 인트로 헤더 */}
      <section className="bg-gradient-to-br from-[#FFF9F2] to-[#FAF0E6] rounded-3xl p-5 border border-[#F4DDD4] relative overflow-hidden shadow-xs">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[11px] font-bold text-[#E07A5F] mb-2.5 border border-[#F4DDD4]">
            <Compass className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>차곡차곡 채워가는 성장 사다리</span>
          </div>

          <h1 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug mb-2">
            나의 일본어 챌린지 로드맵
            <br />
            <span className="text-[#E07A5F] text-lg">첫 히라가나부터 부산을 소개하는 편지 한 통까지</span>
          </h1>
          <p className="text-xs text-[#718096] leading-relaxed">
            처음 글자를 그리는 <strong>Lv.0 입문</strong>부터, 부산의 골목과 맛을 생생하게 들려주는 <strong>Lv.3 실전</strong>까지! 매일의 작은 챌린지로 나만의 배움 일기를 완성합니다.
          </p>
        </div>
      </section>

      {/* 2. 레벨 전환 탭 (말줄임 없이 부드럽게 스크롤되는 모바일 친화 가로 알약 칩 바) */}
      <div className="relative -mx-4 px-4">
        <div
          role="tablist"
          aria-label="학습 레벨 선택"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1.5 px-0.5"
        >
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl.level;
            const displayLabel = lvl.level === 'ai' ? 'AI+ 챌린지' : lvl.badge;

            return (
              <button
                key={lvl.level}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedLevel(lvl.level)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap active:scale-95 select-none ${
                  isSelected
                    ? 'shadow-xs font-black ring-1 scale-[1.02]'
                    : 'bg-white/90 text-[#718096] border-[#EDE8E1] hover:bg-white hover:text-[#2D3748] hover:border-[#D1D5DB]'
                }`}
                style={{
                  backgroundColor: isSelected ? lvl.bgLight : undefined,
                  color: isSelected ? lvl.color : undefined,
                  borderColor: isSelected ? lvl.borderColor : undefined,
                  boxShadow: isSelected ? `0 1px 3px 0 ${lvl.borderColor}` : undefined
                }}
              >
                <span className="shrink-0">{getLevelIcon(lvl.level)}</span>
                <span>{displayLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 단계별 로드맵 카드 섹션 */}
      {selectedLevel === 'ai' ? (
        <section
          className="rounded-3xl border transition-all overflow-hidden bg-white shadow-xs"
          style={{ borderColor: '#F4DDD4' }}
        >
          {/* AI+ 레벨 헤더 (홈 화면 AI 스타일 웜톤 피치/코랄 테마) */}
          <div
            className="p-4.5 border-b"
            style={{ backgroundColor: '#FAF0E6', borderColor: '#F4DDD4' }}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black text-white shadow-2xs"
                style={{ backgroundColor: '#E07A5F' }}
              >
                {getLevelIcon('ai', true)}
                AI+
              </span>
              <span className="text-[11px] font-bold text-[#E07A5F]">
                {aiLessons.length}개 유닛 누적
              </span>
            </div>

            <h2 className="text-base font-black text-[#2D3748] mb-1">
              AI+ 실전 로컬 챌린지
            </h2>
            <p className="text-xs font-medium text-[#4A5568] leading-relaxed break-keep mb-3">
              일본인 친구에게 들려주고 싶은 나만의 부산 이야기를 AI와 함께 실전 일본어로 기록하고 차곡차곡 채워갑니다.
            </p>

            {/* 상단 AI 생성기 바 임베드 */}
            <div className="mt-2">
              <AiGeneratorBar onLessonGenerated={handleLessonGenerated} />
            </div>
          </div>

          {/* 초보자 발음 가이드 모드 전용 툴바 */}
          <div className="bg-[#FAF0E6]/50 px-4 py-2 border-b border-[#F4DDD4]/70 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-gray-600 text-xs">
              <Languages className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
              <span className="text-[11px] font-medium text-gray-600">
                読み仮名 &amp; 発音ガイド
              </span>
            </div>

            <button
              type="button"
              onClick={handleTogglePronounce}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all border active:scale-95 shrink-0 ${
                showPronounce
                  ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-xs'
                  : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${showPronounce ? 'bg-white' : 'bg-gray-300'}`} />
              <span>{showPronounce ? '表示 ON' : '表示 OFF'}</span>
            </button>
          </div>

          {/* 누적된 AI 유닛 카드 목록 (Endless Roadmap) */}
          <div className="p-3 space-y-3 bg-[#FAF9F7]/40">
            {aiLessons.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#EDE8E1] space-y-2">
                <Sparkles className="w-6 h-6 text-[#E07A5F] mx-auto opacity-70" />
                <p className="text-xs font-bold text-[#2D3748]">
                  아직 생성된 AI 유닛이 없습니다.
                </p>
                <p className="text-[11px] text-[#718096] leading-relaxed">
                  상단의 생성 바에서 관심 있는 부산 상황을 입력하거나 추천 태그를 눌러 첫 번째 유닛을 만들어보세요!
                </p>
              </div>
            ) : (
              aiLessons.map((lesson, idx) => {
                const isExpanded = expandedLessonId === lesson.id;
                const reading = lesson.keyExpression?.reading;
                const japanese = lesson.keyExpression?.japanese || '';
                const shouldShowReading = Boolean(reading && reading !== japanese);
                const pronunciation =
                  lesson.pronunciationKorean ||
                  getPronunciation(japanese, reading);

                return (
                  <div
                    key={lesson.id}
                    className="bg-white rounded-2xl p-3.5 border border-[#EDE8E1] hover:border-[#E07A5F] hover:shadow-xs transition-all flex flex-col gap-2.5 group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E07A5F] bg-[#FAF0E6] px-2 py-0.5 rounded-md border border-[#F4DDD4]">
                          UNIT {idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-[#2D3748] group-hover:text-[#E07A5F] transition-colors mt-1">
                          {lesson.themeTitle || lesson.seriesTitle}
                        </h3>
                      </div>

                      {/* 음성 듣기 버튼 */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          speakJapanese(japanese);
                        }}
                        className="p-1.5 rounded-full bg-stone-50 hover:bg-[#FAF0E6] text-[#718096] hover:text-[#E07A5F] transition-colors shrink-0"
                        title="발음 듣기"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {lesson.nuanceTip && (
                      <p className="text-xs text-[#718096] leading-relaxed line-clamp-2">
                        {lesson.nuanceTip}
                      </p>
                    )}

                    {/* 핵심 표현 미리보기 박스 */}
                    <div className="p-3 rounded-xl border flex flex-col gap-1.5 bg-[#FAF9F7] border-[#EDE8E1]">
                      {shouldShowReading && (
                        <p className="text-[11px] text-gray-500 font-medium">
                          {reading}
                        </p>
                      )}

                      <h4 className="text-base font-black text-[#2D3748] tracking-tight leading-snug">
                        {renderRuby(japanese)}
                      </h4>

                      {showPronounce && pronunciation && (
                        <div>
                          <span className="inline-block rounded-md border font-bold text-xs text-[#E07A5F] bg-[#FAF0E6] px-2 py-0.5 border-[#F4DDD4]">
                            [{pronunciation}]
                          </span>
                        </div>
                      )}

                      <p className="text-xs font-bold text-[#2D3748]">
                        {lesson.keyExpression?.korean}
                      </p>
                    </div>

                    {/* 하단 액션 바: 아코디언 토글 & 전체화면 바로가기 */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedLessonId(isExpanded ? null : lesson.id)
                        }
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white transition-all shadow-2xs hover:opacity-95 active:scale-[0.99] bg-[#E07A5F]"
                      >
                        <span>{isExpanded ? '학습 카드 접기' : '이 유닛 전체 학습하기'}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <Link
                        href={`/?lessonId=${lesson.id}`}
                        className="inline-flex items-center justify-center p-2 rounded-xl text-xs font-bold text-[#E07A5F] bg-[#FAF0E6] hover:bg-[#F4DCD1] transition-all border border-[#F4DDD4]"
                        title="전체화면 카드로 이동"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>

                    {/* 펼쳐진 전체 레슨 카드 (대화, 문법, 어휘, 1-Click DB 발행 포함) */}
                    {isExpanded && (
                      <div className="mt-2 pt-3 border-t border-[#EDE8E1]">
                        <DailyLessonCard
                          key={lesson.id}
                          lesson={lesson}
                          isAiGenerated={true}
                          onPublish={handlePublishSuccess}
                        />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          {filteredLevels.map((lvl) => {
            const isStarter = lvl.level === 'starter';

            return (
              <section
                key={lvl.level}
                className="rounded-3xl border transition-all overflow-hidden bg-white shadow-xs"
                style={{ borderColor: lvl.borderColor }}
              >
                {/* 레벨 헤더 */}
                <div
                  className="p-4.5 border-b"
                  style={{ backgroundColor: lvl.bgLight, borderColor: lvl.borderColor }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black text-white shadow-2xs"
                      style={{ backgroundColor: lvl.color }}
                    >
                      {getLevelIcon(lvl.level, true)}
                      {lvl.badge}
                    </span>
                    <span className="text-[11px] font-medium text-[#718096]">
                      {lvl.units.length}개 유닛
                    </span>
                  </div>

                  <h2 className="text-base font-black text-[#2D3748] mb-1">
                    {lvl.title}
                  </h2>
                  <p className="text-xs font-medium text-[#4A5568] leading-relaxed break-keep">
                    {lvl.subTitle}
                  </p>

                  <div className="mt-2.5 flex items-start gap-1.5 text-[10px] font-semibold text-[#718096] bg-white/70 px-2.5 py-1.5 rounded-lg border border-white/60 w-fit max-w-full">
                    <Target className="w-3.5 h-3.5 text-[#718096] shrink-0 mt-0.5" />
                    <span className="shrink-0 whitespace-nowrap">대상:</span>
                    <span className="break-keep leading-relaxed text-[#4A5568]">{lvl.targetAudience}</span>
                  </div>

                  {/* Lv.0 전용: 히라가나 & 가타카나 바로가기 배너 */}
                  {isStarter && (
                    <div className="mt-3 space-y-2">
                      <div className="p-3 rounded-2xl bg-[#FFF6F1] border border-[#FCE4D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[11px] font-black text-[#C45B40] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
                            히라가나 마스터
                          </span>
                          <p className="text-[11px] text-[#A84A33] break-keep leading-relaxed">
                            50음도 소리 탐색부터 캔버스 손글씨 쓰기, 플래시 암기 카드, 미니 단어 읽기까지
                          </p>
                        </div>
                        <Link
                          href="/hiragana"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#E07A5F] hover:bg-[#C45B40] text-white text-xs font-bold transition-all shrink-0 shadow-2xs"
                        >
                          <span>히라가나 입장</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="p-3 rounded-2xl bg-[#F0F7FF] border border-[#C5D9F2] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                        <div className="space-y-0.5 min-w-0">
                          <span className="text-[11px] font-black text-[#2B3E58] flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-[#3D5A80] shrink-0" />
                            가타카나 마스터
                          </span>
                          <p className="text-[11px] text-[#4A6B82] break-keep leading-relaxed">
                            헷갈리는 글자(シ/ツ, ソ/ン) 집중 비교, 짝맞추기 게임, 여행 실전 외래어 단어장
                          </p>
                        </div>
                        <Link
                          href="/katakana"
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#3D5A80] hover:bg-[#2B3E58] text-white text-xs font-bold transition-all shrink-0 shadow-2xs"
                        >
                          <span>가타카나 입장</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* 초보자 발음 가이드 모드 전용 툴바 */}
                <div className="bg-[#FAF0E6]/40 px-4 py-2 border-b border-[#F4DDD4]/70 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-gray-600 text-xs">
                    <Languages className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
                    <span className="text-[11px] font-medium text-gray-600">
                      読み仮名 &amp; 発音ガイド
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleTogglePronounce}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-all border active:scale-95 shrink-0 ${
                      showPronounce
                        ? 'bg-[#E07A5F] text-white border-[#E07A5F] shadow-xs'
                        : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${showPronounce ? 'bg-white' : 'bg-gray-300'}`} />
                    <span>{showPronounce ? '表示 ON' : '表示 OFF'}</span>
                  </button>
                </div>

                {/* 유닛 리스트 */}
                <div className="p-3 space-y-2.5 bg-[#FAF9F7]/40">
                  {lvl.units.map((unit) => {
                    const targetHref = `/?lessonId=${unit.lessonId}`;
                    const reading = unit.keyPhraseReading || unit.lessonData?.keyExpression.reading;
                    const shouldShowReading = Boolean(reading && reading !== unit.keyPhrase);
                    const pronunciation =
                      unit.pronunciationKorean ||
                      getPronunciation(unit.keyPhrase, unit.keyPhraseReading);

                    return (
                      <div
                        key={unit.id}
                        className="bg-white rounded-2xl p-3.5 border border-[#EDE8E1] hover:border-[#E07A5F] hover:shadow-xs transition-all flex flex-col gap-2.5 group"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#A0AEC0]">
                              Unit {unit.unitNumber}
                            </span>
                            <h3 className="text-sm font-bold text-[#2D3748] group-hover:text-[#E07A5F] transition-colors">
                              {unit.title}
                            </h3>
                          </div>

                          {/* 음성 듣기 버튼 */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              speakJapanese(unit.keyPhrase);
                            }}
                            className="p-1.5 rounded-full bg-stone-50 hover:bg-[#FAF0E6] text-[#718096] hover:text-[#E07A5F] transition-colors shrink-0"
                            title="발음 듣기"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-xs text-[#718096] leading-relaxed">
                          {unit.description}
                        </p>

                        {/* 핵심 표현 미리보기 박스 */}
                        <div
                          className={`p-3 rounded-xl border flex flex-col gap-1.5 ${
                            isStarter
                              ? 'bg-[#FFF6F1]/80 border-[#FCE4D8]'
                              : 'bg-[#FBF9F5] border-[#EDE8E1]'
                          }`}
                        >
                          {/* 히라가나 전체 읽기 (한자가 섞인 경우) */}
                          {shouldShowReading && (
                            <p className="text-[11px] text-gray-500 font-medium">
                              {reading}
                            </p>
                          )}

                          {/* 일본어 표기 (루비 후리가나 지원) */}
                          <h4 className="text-base font-black text-[#2D3748] tracking-tight leading-snug">
                            {renderRuby(unit.keyPhrase)}
                          </h4>

                          {/* 한글 발음 독음 뱃지 */}
                          {showPronounce && pronunciation && (
                            <div>
                              <span
                                className={`inline-block rounded-md border font-bold ${
                                  isStarter
                                    ? 'text-xs font-black text-[#D97706] bg-amber-50 px-2 py-0.5 border-amber-200 shadow-2xs'
                                    : 'text-xs text-[#E07A5F] bg-[#FAF0E6] px-2 py-0.5 border-[#F4DDD4]'
                                }`}
                              >
                                [{pronunciation}]
                              </span>
                            </div>
                          )}

                          {/* 한국어 번역 */}
                          <p className="text-xs font-bold text-[#2D3748]">
                            {unit.keyPhraseKorean}
                          </p>
                        </div>

                        {/* 바로 학습하러 가기 링크 */}
                        <Link
                          href={targetHref}
                          className="inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl text-xs font-bold text-white transition-all shadow-2xs hover:opacity-90 active:scale-[0.99]"
                          style={{ backgroundColor: lvl.color }}
                        >
                          <span>이 유닛 학습하기</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 4. 일본인을 위한 부산 로컬 편지 (배움의 결실) */}
      <section className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF0E6] text-[11px] font-bold text-[#E07A5F]">
            <Mail className="w-3 h-3" />
            <span>배움이 닿는 곳・부산 로컬 편지</span>
          </div>
          <h3 className="text-sm font-bold text-[#2D3748]">
            내가 배운 일본어로 건네는 다정한 부산 이야기
          </h3>
          <p className="text-xs text-[#718096] leading-relaxed">
            매일 챌린지로 익힌 표현들로, 부산을 사랑하는 일본인 여행자들에게 나의 단골 맛집과 숨은 골목 이야기를 편지(お便り)로 선물합니다.
          </p>
        </div>
        <Link
          href="/letters"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#FAF0E6] text-[#E07A5F] hover:bg-[#E07A5F] hover:text-white text-xs font-bold transition-all shrink-0 border border-[#F4DDD4]"
        >
          <span>로컬 편지 둘러보기</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </div>
  );
}
