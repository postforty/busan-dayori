'use client';

import React, { useState, useEffect } from 'react';
import { CurriculumLevel } from '@/types';
import { isSoundEnabled } from '@/utils/soundManager';
import { ChevronRight } from 'lucide-react';

interface SecretEnvelopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: CurriculumLevel;
  onOpenTest: () => void;
}

/**
 * 일본 정통 참잘했어요(花丸, Hanamaru) 10엽 꽃잎 외곽선 생성 함수
 */
function generateHanamaruPath(cx: number, cy: number, r: number, petals: number, fullness = 1.16): string {
  const angleStep = (Math.PI * 2) / petals;
  const chord = 2 * r * Math.sin(angleStep / 2);
  const arcR = (chord / 2) * fullness;
  let d = '';

  for (let i = 0; i < petals; i++) {
    const offset = -Math.PI / 2;
    const startAngle = offset + i * angleStep;
    const endAngle = offset + (i + 1) * angleStep;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    if (i === 0) {
      d += `M ${x1.toFixed(2)} ${y1.toFixed(2)} `;
    }
    d += `A ${arcR.toFixed(2)} ${arcR.toFixed(2)} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} `;
  }
  return d + 'Z';
}

const HANAMARU_OUTER_PATH = generateHanamaruPath(100, 100, 78, 10, 1.16);
const HANAMARU_INNER_PATH = generateHanamaruPath(100, 100, 67, 10, 1.16);

/**
 * Web Audio API를 사용한 편지 봉투 개봉 효과음 (종이 사각거림 + 맑은 페이퍼 슬라이드 사운드)
 */
function playEnvelopeOpenSound() {
  if (!isSoundEnabled()) return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // 1. 종이 봉투 뜯는 사각거림 (노이즈 버퍼 + 밴드패스 필터)
    const bufferSize = ctx.sampleRate * 0.18;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(3200, now + 0.15);
    filter.Q.setValueAtTime(3.5, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.25, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

    whiteNoise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    whiteNoise.start(now);

    // 2. 씰이 풀리며 편지가 솟아오르는 맑은 차임 (C5 -> G5)
    const chime1 = ctx.createOscillator();
    const chimeGain1 = ctx.createGain();
    chime1.type = 'sine';
    chime1.frequency.setValueAtTime(523.25, now + 0.1);
    chime1.frequency.exponentialRampToValueAtTime(783.99, now + 0.3);

    chimeGain1.gain.setValueAtTime(0.001, now);
    chimeGain1.gain.setValueAtTime(0.2, now + 0.12);
    chimeGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    chime1.connect(chimeGain1);
    chimeGain1.connect(ctx.destination);
    chime1.start(now + 0.1);
    chime1.stop(now + 0.6);

    // 3. 화사한 고음 하모닉스 (C6)
    const chime2 = ctx.createOscillator();
    const chimeGain2 = ctx.createGain();
    chime2.type = 'sine';
    chime2.frequency.setValueAtTime(1046.5, now + 0.2);

    chimeGain2.gain.setValueAtTime(0.001, now);
    chimeGain2.gain.setValueAtTime(0.15, now + 0.22);
    chimeGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    chime2.connect(chimeGain2);
    chimeGain2.connect(ctx.destination);
    chime2.start(now + 0.2);
    chime2.stop(now + 0.7);
  } catch {
    // 오디오 에러는 무시
  }
}

/**
 * Web Audio API를 사용한 편지 우편함 팝업 효과음 (경쾌한 팝 + 맑은 벨 사운드)
 */
function playEnvelopePopSound() {
  if (!isSoundEnabled()) return;
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // 1. 퐁- 하고 솟아오르는 기분 좋은 버블 팝 사운드 (사인파 빠른 피치업)
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = 'sine';
    popOsc.frequency.setValueAtTime(360, now);
    popOsc.frequency.exponentialRampToValueAtTime(780, now + 0.1);

    popGain.gain.setValueAtTime(0.001, now);
    popGain.gain.setValueAtTime(0.28, now + 0.02);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    popOsc.connect(popGain);
    popGain.connect(ctx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.18);

    // 2. 맑은 하모닉 차임 (E6, 1318.5Hz 가벼운 딩-)
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();
    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(1318.5, now + 0.08);

    bellGain.gain.setValueAtTime(0.001, now);
    bellGain.gain.setValueAtTime(0.14, now + 0.09);
    bellGain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);
    bellOsc.start(now + 0.08);
    bellOsc.stop(now + 0.6);
  } catch {
    // 오디오 에러는 무시
  }
}

export default function SecretEnvelopeModal({
  isOpen,
  onClose,
  level,
  onOpenTest
}: SecretEnvelopeModalProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isPopFinished, setIsPopFinished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsOpening(false);
      setIsPopFinished(false);

      // 우편함 솟아오름 효과음 및 햅틱 (편지가 서서히 떠오르는 시점 싱크)
      const soundTimer = setTimeout(() => {
        playEnvelopePopSound();
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([18, 25, 20]);
          } catch {
            // ignore
          }
        }
      }, 180);

      // 1450ms 부드러운 팝업 완료 후 둥실둥실 플로팅 모드로 전환
      const floatTimer = setTimeout(() => {
        setIsPopFinished(true);
      }, 1450);

      return () => {
        clearTimeout(soundTimer);
        clearTimeout(floatTimer);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // dim 배경 클릭 시 닫기 (개봉 중에는 제외)
  const handleDimClick = () => {
    if (!isOpening) {
      onClose();
    }
  };

  // 편지 봉투 클릭 시 개봉 애니메이션 후 테스트 모달 호출
  const handleEnvelopeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // dim 클릭 전파 방지
    if (isOpening) return;
    setIsOpening(true);
    playEnvelopeOpenSound();

    setTimeout(() => {
      onOpenTest();
    }, 780);
  };

  return (
    <div
      onClick={handleDimClick}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-700 cursor-pointer select-none"
    >
      {/* 순수 편지 봉투 인터랙션 컨테이너 */}
      <div
        onClick={handleEnvelopeClick}
        className={`relative w-[320px] h-[215px] cursor-pointer drop-shadow-2xl transition-transform duration-300 ${
          isOpening
            ? 'scale-105'
            : isPopFinished
            ? 'animate-envelope-float hover:scale-[1.03] active:scale-[0.98]'
            : 'animate-envelope-pop'
        }`}
        style={{ perspective: '1100px' }}
      >
        {/* 1. 봉투 내부 바닥 베이스 (완전 불투명 웜 베이지) */}
        <div className="absolute inset-0 bg-[#E8DECA] rounded-2xl border border-[#D5C7AE]" />

        {/* 2. 봉투 안쪽 편지지 (평소에는 완전 투명/비가시성 처리하여 텍스트 비침 100% 차단) */}
        <div
          className={`absolute left-3 right-3 bottom-2 h-[180px] bg-[#FAF8F5] rounded-xl border border-[#EADBCC] p-4 flex flex-col justify-between z-10 transition-all duration-600 ease-out ${
            isOpening
              ? 'opacity-100 visible -translate-y-28 rotate-[-1deg] shadow-2xl scale-100 delay-150'
              : 'opacity-0 invisible pointer-events-none translate-y-6 scale-95 shadow-none'
          }`}
        >
          {/* 편지지 내용 (개봉 시에만 나타남) */}
          <div className="space-y-1 text-left border-b border-[#EADBCC] pb-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-[#A23E2A] uppercase">
                QUEST INVITATION
              </span>
              <span className="text-[10px] text-stone-400 font-serif">釜山だより</span>
            </div>
            <h3 className="text-xs font-black text-[#2B2D42] leading-tight">
              {level.badge} 회화 마스터 실전 테스트
            </h3>
          </div>

          <div className="text-[11px] text-stone-600 leading-relaxed text-left py-1">
            부산 현지 롤플레잉 5문항에 도전하고 <br />
            <span className="text-[#E07A5F] font-bold">‘마스터 수료증’</span>을 획득하세요!
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-[#F0E6DB]">
            <span className="text-[9px] text-stone-400">합격 기준: 4문항 이상</span>
            <span className="text-[10px] font-bold text-[#E07A5F] flex items-center gap-0.5">
              도전 시작 <ChevronRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* 3. 봉투 앞면 포켓 (완전 불투명 100% 솔리드 재질로 내부 완벽 밀폐) */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-2xl">
          {/* 하단 포켓 몸체 (100% 불투명) */}
          <div
            className="absolute inset-0 bg-[#EFE6D2] border-t border-[#D5C7AE]"
            style={{
              clipPath: 'polygon(0% 100%, 50% 48%, 100% 100%)'
            }}
          />
          {/* 좌측 날개 (100% 불투명 솔리드) */}
          <div
            className="absolute inset-0 bg-[#F4ECDB]"
            style={{
              clipPath: 'polygon(0% 0%, 0% 100%, 51% 52%)'
            }}
          />
          {/* 우측 날개 (100% 불투명 솔리드) */}
          <div
            className="absolute inset-0 bg-[#EAE1CB]"
            style={{
              clipPath: 'polygon(100% 0%, 100% 100%, 49% 52%)'
            }}
          />
          {/* 하단 외곽 라인 마감 */}
          <div className="absolute inset-0 border-b-2 border-r border-l border-[#C8BBA0] rounded-2xl" />
        </div>

        {/* 4. 봉투 상단 덮개 (Flap) - 100% 불투명 솔리드 덮개, 3D 젖힘 애니메이션 */}
        <div
          className={`absolute top-0 left-0 right-0 h-[115px] bg-[#E3D8BF] rounded-t-2xl transition-transform duration-500 ease-in-out origin-top z-30 ${
            isOpening ? '-rotate-x-180 opacity-0 pointer-events-none' : 'rotate-x-0 opacity-100'
          }`}
          style={{
            clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
            transformStyle: 'preserve-3d'
          }}
        />

        {/* 5. 중앙 정통 하나마루 꽃잎 스탬프 씰 (たいへん よくできました ★ 釜山だより ★) */}
        <div
          className={`absolute top-[75px] left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ${
            isOpening
              ? 'scale-0 opacity-0 pointer-events-none'
              : 'scale-100 hover:scale-105 drop-shadow-[0_8px_18px_rgba(214,40,40,0.38)]'
          }`}
        >
          <div className="relative w-[84px] h-[84px] select-none">
            <svg
              className="w-full h-full filter"
              viewBox="0 0 200 200"
              aria-label="たいへんよくできました 釜山だより"
            >
              {/* 스탬프 배경 (부드러운 크림화이트 종이 질감) */}
              <path
                d={HANAMARU_OUTER_PATH}
                fill="#FFF9F7"
                fillOpacity="0.98"
              />

              {/* 바깥쪽 꽃잎 테두리선 */}
              <path
                d={HANAMARU_OUTER_PATH}
                fill="none"
                stroke="#D62828"
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 안쪽 보조 꽃잎 테두리선 */}
              <path
                d={HANAMARU_INNER_PATH}
                fill="none"
                stroke="#D62828"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.85"
              />

              {/* 상단 문구: たいへん */}
              <text
                x="100"
                y="74"
                textAnchor="middle"
                fontWeight="900"
                fontSize="16"
                fill="#D62828"
                letterSpacing="2"
              >
                たいへん
              </text>

              {/* 중앙 메인 문구: よくできました */}
              <text
                x="100"
                y="108"
                textAnchor="middle"
                fontWeight="900"
                fontSize="20"
                fill="#D62828"
                letterSpacing="1.2"
              >
                よくできました
              </text>

              {/* 구분 점선 */}
              <path
                d="M 52 119 L 148 119"
                stroke="#D62828"
                strokeWidth="1.2"
                strokeDasharray="2 2"
                strokeOpacity="0.65"
              />

              {/* 하단 브랜드 문구: ★ 釜山だより ★ */}
              <text
                x="100"
                y="134"
                textAnchor="middle"
                fontWeight="700"
                fontSize="10"
                fill="#D62828"
                letterSpacing="1.5"
                opacity="0.9"
              >
                ★ 釜山だより ★
              </text>
            </svg>

            {/* 은은하게 반짝이는 펄스 광채 */}
            <div className="absolute -inset-1 rounded-full bg-[#D62828]/15 animate-ping pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
