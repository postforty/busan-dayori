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
  const [selectedLevel, setSelectedLevel] = useState<LessonLevel>('starter');

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

      {/* 2. 레벨 전환 탭 (4개 탭 모바일 균등 배치) */}
      <div className="grid grid-cols-4 gap-1.5 py-1">
        {levels.map((lvl) => {
          const isSelected = selectedLevel === lvl.level;
          return (
            <button
              key={lvl.level}
              type="button"
              onClick={() => setSelectedLevel(lvl.level)}
              className={`flex items-center justify-center gap-1 py-2 px-1 rounded-2xl text-xs font-bold transition-all border ${
                isSelected
                  ? 'shadow-xs font-black scale-[1.02]'
                  : 'bg-white/80 text-[#718096] border-[#EDE8E1] hover:bg-white hover:text-[#2D3748]'
              }`}
              style={{
                backgroundColor: isSelected ? lvl.bgLight : undefined,
                color: isSelected ? lvl.color : undefined,
                borderColor: isSelected ? lvl.borderColor : '#EDE8E1'
              }}
            >
              <span>{getLevelIcon(lvl.level)}</span>
              <span className="truncate">{lvl.badge}</span>
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
                        50음도 소리 탐색부터 캔버스 손글씨 쓰기, 플래시 암기 카드, 미니 단어 읽기까지
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
