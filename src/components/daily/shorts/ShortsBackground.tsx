import React from 'react';
import Image from 'next/image';

interface ShortsBackgroundProps {
  isPlaying: boolean;
}

export default function ShortsBackground({ isPlaying }: ShortsBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* 켄 번스(Ken Burns) 느린 줌인 효과 레이어 */}
      <div
        className={`absolute inset-0 transition-transform duration-[14000ms] ease-out ${
          isPlaying ? 'scale-110 translate-y-2' : 'scale-100'
        }`}
      >
        <Image
          src="/images/shorts/bg-cafe.jpg"
          alt="Shorts Background"
          fill
          sizes="(max-width: 768px) 100vw, 420px"
          className="object-cover object-center"
          priority
        />
      </div>

      {/* 숏츠 텍스트 및 캐릭터 가독성을 위한 비네트 / 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/25 to-black/90" />
    </div>
  );
}
