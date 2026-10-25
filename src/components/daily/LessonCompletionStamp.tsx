'use client';

import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';

interface LessonCompletionStampProps {
  isOpen: boolean;
  onClose: () => void;
  lessonTitle?: string;
}

// Web Audio API를 사용한 스탬프 쾅(Thud) + 성공 차임(Chime) 사운드
function playStampSound() {
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

    // 1. 도장 쾅! 내려찍는 묵직한 타격음 (Thud)
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = 'triangle';
    thudOsc.frequency.setValueAtTime(140, now);
    thudOsc.frequency.exponentialRampToValueAtTime(32, now + 0.12);

    thudGain.gain.setValueAtTime(0.45, now);
    thudGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start(now);
    thudOsc.stop(now + 0.16);

    // 2. 맑고 경쾌한 성취 벨소리 (맑은 2화음 Chime)
    const chime1 = ctx.createOscillator();
    const chimeGain1 = ctx.createGain();
    chime1.type = 'sine';
    chime1.frequency.setValueAtTime(523.25, now + 0.08); // C5
    chime1.frequency.setValueAtTime(659.25, now + 0.14); // E5

    chimeGain1.gain.setValueAtTime(0.001, now);
    chimeGain1.gain.setValueAtTime(0.2, now + 0.08);
    chimeGain1.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    chime1.connect(chimeGain1);
    chimeGain1.connect(ctx.destination);
    chime1.start(now + 0.08);
    chime1.stop(now + 0.7);

    const chime2 = ctx.createOscillator();
    const chimeGain2 = ctx.createGain();
    chime2.type = 'sine';
    chime2.frequency.setValueAtTime(1046.5, now + 0.14); // C6

    chimeGain2.gain.setValueAtTime(0.001, now);
    chimeGain2.gain.setValueAtTime(0.18, now + 0.14);
    chimeGain2.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

    chime2.connect(chimeGain2);
    chimeGain2.connect(ctx.destination);
    chime2.start(now + 0.14);
    chime2.stop(now + 0.8);
  } catch {
    // 자동재생 정책 또는 AudioContext 미지원 브라우저는 무시
  }
}

/**
 * 💮 일본 전통 참 잘했어요(花丸, Hanamaru) 꽃잎 테두리 패스 생성 함수
 * 둥글둥글한 꽃잎(Scalloped Petals)으로 정통 💮 실루엣을 생성합니다.
 */
function generateHanamaruPath(cx: number, cy: number, r: number, petals: number, fullness = 1.15): string {
  const angleStep = (Math.PI * 2) / petals;
  const chord = 2 * r * Math.sin(angleStep / 2);
  const arcR = (chord / 2) * fullness;
  let d = '';

  for (let i = 0; i < petals; i++) {
    // 12시 방향(-90도)부터 시작하여 대칭적인 꽃 모양 정렬
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
    // 바깥쪽으로 볼록한 꽃잎 원호 (A rx ry x-axis-rotation large-arc-flag sweep-flag x y)
    d += `A ${arcR.toFixed(2)} ${arcR.toFixed(2)} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} `;
  }
  return d + 'Z';
}

// 10잎 💮 하나마루 외곽선 및 내측 보조선 (viewBox 0 0 200 200 기준)
const HANAMARU_OUTER_PATH = generateHanamaruPath(100, 100, 78, 10, 1.16);
const HANAMARU_INNER_PATH = generateHanamaruPath(100, 100, 67, 10, 1.16);

export function LessonCompletionStamp({
  isOpen,
  onClose,
  lessonTitle,
}: LessonCompletionStampProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setIsClosing(false);

    // 스탬프가 찍히는 시점(약 220ms 후)에 사운드 및 햅틱 발동
    const soundTimer = setTimeout(() => {
      playStampSound();
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([30, 40, 70]);
        } catch {
          // ignore
        }
      }
    }, 220);

    // ESC 키 입력 시 닫기
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(soundTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[3px] transition-opacity duration-200 cursor-pointer ${
        isClosing ? 'opacity-0' : 'animate-backdrop-in'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="학습 완료 축하"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex flex-col items-center justify-center max-w-xs w-full cursor-default ${
          isClosing ? 'scale-95 opacity-0 transition-all duration-200' : ''
        }`}
      >
        {/* 1. 스탬프 영역 */}
        <div className="relative flex items-center justify-center w-56 h-56 select-none">
          {/* 스탬프 쾅 충격파 링 (꽃잎 모양의 외곽선 충격파) */}
          <svg
            className="absolute inset-0 w-full h-full animate-stamp-shockwave pointer-events-none"
            viewBox="0 0 200 200"
            aria-hidden="true"
          >
            <path
              d={HANAMARU_OUTER_PATH}
              fill="none"
              stroke="#D62828"
              strokeWidth="4"
              opacity="0.75"
            />
          </svg>


          {/* 정통 💮 하나마루(たいへんよくできました) 스탬프 본체 */}
          <div className="animate-stamp-slam drop-shadow-[0_10px_25px_rgba(214,40,40,0.42)]">
            <svg
              className="w-52 h-52 filter"
              viewBox="0 0 200 200"
              aria-label="たいへんよくできました"
            >
              {/* 스탬프 내부 채움 (부드러운 종이 인주 질감) */}
              <path
                d={HANAMARU_OUTER_PATH}
                fill="#FFF7F5"
                fillOpacity="0.94"
              />

              {/* 💮 바깥쪽 꽃잎 테두리선 */}
              <path
                d={HANAMARU_OUTER_PATH}
                fill="none"
                stroke="#D62828"
                strokeWidth="4.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* 💮 안쪽 보조 꽃잎 테두리선 */}
              <path
                d={HANAMARU_INNER_PATH}
                fill="none"
                stroke="#D62828"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.85"
              />

              {/* 텍스트 영역 (일본 정통 교과서/흘림 서체) */}
              {/* 상단: たいへん */}
              <text
                x="100"
                y="74"
                textAnchor="middle"
                className="font-jp-gothic"
                fontWeight="900"
                fontSize="15"
                fill="#D62828"
                letterSpacing="2.5"
              >
                たいへん
              </text>

              {/* 중앙: よくできました (큰 강조 글씨) */}
              <text
                x="100"
                y="108"
                textAnchor="middle"
                className="font-jp-gothic"
                fontWeight="900"
                fontSize="20"
                fill="#D62828"
                letterSpacing="1.2"
              >
                よくできました
              </text>

              {/* 구분선 & 벚꽃 미니 장식 */}
              <path
                d="M 52 119 L 148 119"
                stroke="#D62828"
                strokeWidth="1"
                strokeDasharray="2 2"
                strokeOpacity="0.6"
              />

              {/* 하단 브랜드 문구: ★ 釜山だより ★ */}
              <text
                x="100"
                y="134"
                textAnchor="middle"
                className="font-jp-gothic"
                fontWeight="700"
                fontSize="10"
                fill="#D62828"
                letterSpacing="1.8"
                opacity="0.9"
              >
                ★ 釜山だより ★
              </text>
            </svg>
          </div>
        </div>

        {/* 2. 하단 축하 카드 (도장 찍힌 후 부드럽게 등장) */}
        <div className="animate-reward-card-up mt-5 w-full bg-white rounded-2xl p-4 shadow-xl border border-[#F4DDD4] text-center space-y-2">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFF2EA] text-[#E07A5F] text-[11px] font-black">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>오늘의 학습 완료!</span>
          </div>

          <p className="text-xs text-[#4A5568] font-medium leading-relaxed">
            {lessonTitle ? (
              <span className="font-bold text-[#2D3748] block truncate mb-0.5">
                {lessonTitle}
              </span>
            ) : null}
            매일 한 걸음씩 쌓여가는 일본어 실력,
            <br />
            오늘도 멋지게 해내셨어요! 👏
          </p>

          <button
            type="button"
            onClick={handleClose}
            className="w-full mt-2 py-2.5 px-4 bg-[#E07A5F] hover:bg-[#D46549] active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-[#E07A5F]/20 cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
