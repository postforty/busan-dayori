'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Letter } from '@/types';
import Badge from '@/components/common/Badge';
import FeedbackWidget from '@/components/feedback/FeedbackWidget';
import {
  ArrowLeft,
  Share2,
  MapPin,
  Clock,
  Navigation,
  ExternalLink,
  Copy,
  Check,
  BookMarked,
  Edit,
  Trash2,
  Loader2
} from 'lucide-react';
import { getClientUser } from '@/lib/supabase/auth';
import { deleteLetter } from '@/lib/actions/letter-actions';

interface LetterDetailViewProps {
  letter: Letter;
}

export default function LetterDetailView({ letter }: LetterDetailViewProps) {
  const [copied, setCopied] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getClientUser().then((res) => {
      setIsAdmin(res.isAdmin);
    });
  }, []);

  const handleDelete = async () => {
    if (confirm('이 편지를 정말 삭제하시겠습니까? 삭제된 글과 피드백은 복구할 수 없습니다.')) {
      setIsDeleting(true);
      try {
        await deleteLetter(letter.id);
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : '편지 삭제에 실패했습니다.');
        setIsDeleting(false);
      }
    }
  };

  const handleCopyAddress = () => {
    if (letter.placeInfo?.address) {
      navigator.clipboard.writeText(letter.placeInfo.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: letter.title,
          text: letter.summary,
          url: window.location.href
        })
        .catch(() => {});
    } else if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('URLをコピーしました！');
    }
  };

  return (
    <div className="pb-8">
      {/* 상단 액션 바 */}
      <div className="sticky top-14 z-30 bg-[#FBF9F5]/90 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-[#EDE8E1]">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A5568] hover:text-[#E07A5F] py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>お便り一覧へ</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* 관리자 전용 수정/삭제 버튼 */}
          {isAdmin && (
            <div className="flex items-center gap-1.5 mr-1 pr-2 border-r border-paper-sandstone/60">
              <Link
                href={`/letters/${letter.id}/edit`}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-marine-blue hover:text-white hover:bg-marine-blue rounded-lg border border-marine-blue/40 transition-colors"
                title="편지 내용 수정"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>수정</span>
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-600 hover:text-white hover:bg-red-600 rounded-lg border border-red-200 transition-colors disabled:opacity-50"
                title="편지 삭제"
              >
                {isDeleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
                <span>삭제</span>
              </button>
            </div>
          )}

          <button
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            title="共有する"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 대표 이미지 */}
      <div className="relative h-64 w-full">
        <img
          src={letter.imageUrl}
          alt={letter.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 text-xs mb-1.5">
            <span className="bg-[#E07A5F] px-2 py-0.5 rounded-md font-bold text-[10px]">
              {letter.region}
            </span>
            <span className="text-[11px] opacity-90">{letter.date}</span>
          </div>
          <h1 className="text-lg font-black leading-snug drop-shadow-md">
            {letter.title}
          </h1>
        </div>
      </div>

      <div className="px-4 pt-5 space-y-6">
        {/* 관리자의 일본어 학습 메모 박스 */}
        <section className="bg-[#FAF0E6]/70 rounded-2xl p-4 border border-[#F4DDD4]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E07A5F] mb-1.5">
            <BookMarked className="w-4 h-4" />
            <span>この記事で勉強した日本語ノート</span>
          </div>
          <div className="text-xs space-y-1">
            <div className="font-bold text-[#2D3748]">
              『{letter.studyPoint.expression}』
              <span className="text-[11px] font-normal text-[#718096] ml-2">
                (韓国語：{letter.studyPoint.meaning})
              </span>
            </div>
            <p className="text-[11px] text-[#4A5568] leading-relaxed">
              {letter.studyPoint.memo}
            </p>
          </div>
        </section>

        {/* 본문 단락 */}
        <article className="space-y-4 text-sm text-[#2D3748] leading-relaxed font-normal bg-white p-5 rounded-2xl border border-[#EDE8E1] card-shadow">
          {letter.content.map((paragraph, idx) => (
            <p key={idx} className="leading-loose">
              {paragraph}
            </p>
          ))}
        </article>

        {/* 장소 실전 인포박스 (맛집/장소인 경우) */}
        {letter.placeInfo && (
          <section className="bg-white rounded-2xl p-5 border border-[#EDE8E1] card-shadow space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <span className="text-[10px] text-[#E07A5F] font-bold tracking-wider uppercase block">
                Spot Information
              </span>
              <p className="text-[11px] text-gray-500 font-light mt-0.5">
                {letter.placeInfo.katakanaName}
              </p>
              <h3 className="text-base font-bold text-[#2D3748]">
                {letter.placeInfo.koreanName}
              </h3>

              {/* 실전 배지 */}
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                <Badge type="solo" soloValue={letter.placeInfo.soloFriendly} />
                <Badge type="spicy" spicyValue={letter.placeInfo.spicyLevel} />
                <Badge type="card" cardValue={letter.placeInfo.cardOk} />
              </div>
            </div>

            {/* 상세 항목 */}
            <div className="space-y-3 text-xs text-[#4A5568]">
              {/* 주소 & 복사 버튼 */}
              <div className="flex items-start justify-between gap-2 bg-[#FBF9F5] p-3 rounded-xl border border-[#EDE8E1]">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E07A5F] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-gray-400 block">住所 (タクシーで見せる用)</span>
                    <p className="font-semibold text-[#2D3748]">{letter.placeInfo.address}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="px-2 py-1 bg-white border border-[#EDE8E1] rounded-lg text-[10px] font-medium text-gray-600 hover:bg-gray-50 flex items-center gap-1 shrink-0 active:scale-95"
                >
                  {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'コピー完了' : 'コピー'}</span>
                </button>
              </div>

              {/* 교통 / 지하철 */}
              <div className="flex items-start gap-2 px-1">
                <Navigation className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-400 block">最寄り駅・アクセス</span>
                  <p>{letter.placeInfo.subway}</p>
                </div>
              </div>

              {/* 영업시간 */}
              <div className="flex items-start gap-2 px-1">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-400 block">営業時間・定休日</span>
                  <p>{letter.placeInfo.hours}</p>
                  <p className="text-gray-400 text-[11px]">定休日：{letter.placeInfo.closedDay}</p>
                </div>
              </div>
            </div>

            {/* 지도 링크 버튼 */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
              <a
                href={letter.placeInfo.naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-[#03C75A]/10 hover:bg-[#03C75A]/20 text-[#03C75A] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Naver Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={letter.placeInfo.googleMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[#4285F4] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Google Map</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        )}

        {/* 독자 첨삭 피드백 위젯 */}
        <FeedbackWidget
          letterId={letter.id}
          letterTitle={letter.title}
          initialLikes={letter.likes}
        />
      </div>
    </div>
  );
}
