'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CurriculumLevel, LessonLevel } from '@/types';
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
  Target
} from 'lucide-react';
import { speakJapanese } from '@/utils/tts';

interface RoadmapViewProps {
  levels: CurriculumLevel[];
}

export default function RoadmapView({ levels }: RoadmapViewProps) {
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<LessonLevel | 'all'>('all');

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
    }
  };

  const filteredLevels = selectedLevelFilter === 'all'
    ? levels
    : levels.filter((lvl) => lvl.level === selectedLevelFilter);

  return (
    <div className="px-4 pt-4 pb-24 space-y-6 max-w-xl mx-auto">
      {/* 1. 상단 인트로 헤더 */}
      <section className="bg-gradient-to-br from-[#FFF9F2] to-[#FAF0E6] rounded-3xl p-5 border border-[#F4DDD4] relative overflow-hidden shadow-xs">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[11px] font-bold text-[#E07A5F] mb-2.5 border border-[#F4DDD4]">
            <Compass className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span>단계별 일본어 성장 사다리</span>
          </div>

          <h1 className="text-xl font-black text-[#2D3748] tracking-tight leading-snug mb-2">
            日本語 学習ロードマップ
            <br />
            <span className="text-[#E07A5F] text-lg">나에게 꼭 맞는 레벨부터 시작해요</span>
          </h1>
          <p className="text-xs text-[#718096] leading-relaxed">
            일본어를 전혀 몰라도 괜찮아요! <strong>Lv.0 히라가나 입문</strong>부터 원어민 뉘앙스의 <strong>Lv.3 실전</strong>까지 차근차근 단계별로 준비되어 있습니다.
          </p>
        </div>
      </section>

      {/* 2. 레벨 빠른 필터 탭 */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedLevelFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            selectedLevelFilter === 'all'
              ? 'bg-[#2D3748] text-white shadow-xs'
              : 'bg-white text-[#718096] border border-[#EDE8E1] hover:bg-stone-50'
          }`}
        >
          전체 보기
        </button>
        {levels.map((lvl) => {
          const isSelected = selectedLevelFilter === lvl.level;
          return (
            <button
              key={lvl.level}
              onClick={() => setSelectedLevelFilter(lvl.level)}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 border ${
                isSelected
                  ? 'bg-white shadow-xs font-black'
                  : 'bg-white/60 text-[#718096] border-[#EDE8E1] hover:bg-white'
              }`}
              style={{
                color: isSelected ? lvl.color : undefined,
                borderColor: isSelected ? lvl.color : '#EDE8E1'
              }}
            >
              <span>{getLevelIcon(lvl.level)}</span>
              <span>{lvl.badge}</span>
            </button>
          );
        })}
      </div>

      {/* 3. 단계별 로드맵 카드 섹션 */}
      <div className="space-y-6">
        {filteredLevels.map((lvl) => {
          const isStarter = lvl.level === 'starter';

          return (
            <section
              key={lvl.level}
              className={`rounded-3xl border transition-all overflow-hidden bg-white shadow-xs ${
                isStarter ? 'ring-2 ring-[#E78B70]/30' : ''
              }`}
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
                <p className="text-xs font-medium text-[#4A5568] leading-relaxed">
                  {lvl.subTitle}
                </p>

                <div className="mt-2.5 inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#718096] bg-white/70 px-2.5 py-1 rounded-lg border border-white/60">
                  <Target className="w-3 h-3 text-[#718096] shrink-0" />
                  <span>대상:</span>
                  <span>{lvl.targetAudience}</span>
                </div>

                {/* Lv.0 전용: 히라가나 인터랙티브 스튜디오 바로가기 배너 */}
                {isStarter && (
                  <div className="mt-3 p-3 rounded-2xl bg-[#FFF6F1] border border-[#FCE4D8] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-black text-[#C45B40] flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
                        히라가나 마스터 스튜디오 오픈!
                      </span>
                      <p className="text-[11px] text-[#A84A33]">
                        50음도 소리 탐색부터 캔버스 손글씨 쓰기, 미니 단어 읽기까지
                      </p>
                    </div>
                    <Link
                      href="/hiragana"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#E07A5F] hover:bg-[#C45B40] text-white text-xs font-bold transition-all shrink-0 shadow-2xs"
                    >
                      <span>스튜디오 입장</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>

              {/* 유닛 리스트 */}
              <div className="p-3 space-y-2.5 bg-[#FAF9F7]/40">
                {lvl.units.map((unit) => {
                  const targetHref = `/?lessonId=${unit.lessonId}`;

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
                        className={`p-2.5 rounded-xl border flex flex-col gap-1 ${
                          isStarter
                            ? 'bg-[#FFF6F1]/80 border-[#FCE4D8]'
                            : 'bg-[#FAF0E6]/50 border-[#F4DDD4]'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-sm font-black text-[#2D3748] tracking-wide">
                            {unit.keyPhrase}
                          </span>
                          {unit.pronunciationKorean && (
                            <span className="text-xs font-black text-[#C45B40]">
                              [{unit.pronunciationKorean}]
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-[#4A5568]">
                          {unit.keyPhraseKorean}
                        </span>
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

      {/* 4. 일본인을 위한 부산 로컬 편지 (독립 문화 콘텐츠 안내) */}
      <section className="bg-white rounded-3xl p-5 border border-[#EDE8E1] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FAF0E6] text-[11px] font-bold text-[#E07A5F]">
            <Mail className="w-3 h-3" />
            <span>부산 토박이의 로컬 편지</span>
          </div>
          <h3 className="text-sm font-bold text-[#2D3748]">
            일본인 친구에게 들려주는 부산의 숨은 이야기
          </h3>
          <p className="text-xs text-[#718096] leading-relaxed">
            공부와 별개로, 부산 토박이가 일본인 독자를 위해 직접 쓴 로컬 맛집과 감성 에세이를 편하게 만나보세요.
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
