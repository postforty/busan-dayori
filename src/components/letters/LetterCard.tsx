import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Letter } from '@/types';
import Badge from '@/components/common/Badge';
import { MapPin, Heart, BookMarked, ArrowRight } from 'lucide-react';

interface LetterCardProps {
  letter: Letter;
}

export default function LetterCard({ letter }: LetterCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-[#EDE8E1] overflow-hidden card-shadow card-hover flex flex-col">
      {/* 썸네일 & 지역 배지 */}
      <Link href={`/letters/${letter.id}`} className="relative h-48 w-full block overflow-hidden group">
        <img
          src={letter.imageUrl}
          alt={letter.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        
        {/* 상단 날짜 및 지역 */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="inline-flex items-center gap-1 bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full font-medium shadow-2xs">
            <MapPin className="w-3 h-3 text-[#E07A5F]" />
            {letter.region}
          </span>
          <span className="inline-flex items-center bg-black/45 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white/95 tracking-wide shadow-2xs">
            {letter.date}
          </span>
        </div>

        {/* 하단 한글/카타카나 명칭 */}
        {letter.placeInfo && (
          <div className="absolute bottom-3 left-3 right-3 text-white">
            <p className="text-[10px] text-gray-200 tracking-wider font-light">
              {letter.placeInfo.katakanaName}
            </p>
            <p className="text-xs font-semibold drop-shadow">
              {letter.placeInfo.koreanName}
            </p>
          </div>
        )}
      </Link>

      {/* 본문 요약 */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/letters/${letter.id}`}>
            <h2 className="text-base font-bold text-[#2D3748] leading-snug hover:text-[#E07A5F] transition-colors mb-2">
              {letter.title}
            </h2>
          </Link>
          <p className="text-xs text-[#718096] leading-relaxed line-clamp-2 mb-3">
            {letter.summary}
          </p>

          {/* 실전 여행 체크 배지 */}
          {letter.placeInfo && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge type="solo" soloValue={letter.placeInfo.soloFriendly} />
              <Badge type="spicy" spicyValue={letter.placeInfo.spicyLevel} />
              <Badge type="card" cardValue={letter.placeInfo.cardOk} />
            </div>
          )}
        </div>

        {/* 학습 메모 박스 */}
        <div className="mt-2 pt-2.5 border-t border-[#F1ECE4] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-[#8C5243] bg-[#FAF0E6]/60 px-2 py-1 rounded-md border border-[#F4DDD4]/50 max-w-[75%] truncate">
            <BookMarked className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
            <span className="truncate">学習：{letter.studyPoint.expression}</span>
          </div>

          <Link
            href={`/letters/${letter.id}`}
            className="inline-flex items-center gap-0.5 text-xs font-semibold text-[#E07A5F] hover:underline"
          >
            <span>読む</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
