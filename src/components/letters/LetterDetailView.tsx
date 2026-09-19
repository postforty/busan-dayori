'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Letter } from '@/types';
import Badge from '@/components/common/Badge';
import FeedbackWidget from '@/components/feedback/FeedbackWidget';
import { speakJapanese } from '@/utils/tts';
import { getPronunciation } from '@/utils/japanesePronounce';
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
  Loader2,
  X,
  AlertTriangle,
  Languages,
  Volume2
} from 'lucide-react';

interface LetterDetailViewProps {
  letter: Letter;
}

function NaverGlyph({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
    </svg>
  );
}

function KakaoGlyph({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C6.477 3 2 6.477 2 10.765c0 2.82 1.94 5.285 4.887 6.64-.216.793-.78 2.875-.895 3.32-.143.555.203.548.428.399.176-.118 2.8-1.9 3.93-2.67.53.076 1.077.116 1.65.116 5.523 0 10-3.477 10-7.805C22 6.477 17.523 3 12 3z" />
    </svg>
  );
}

function GoogleGlyph({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.35 11.1h-9.17v2.98h5.61c-.55 2.69-2.83 4.22-5.61 4.22-3.41 0-6.19-2.78-6.19-6.19s2.78-6.19 6.19-6.19c1.61 0 3.03.59 4.14 1.57l2.25-2.25C16.92 3.65 14.64 2.7 12.18 2.7 6.99 2.7 2.78 6.91 2.78 12.1s4.21 9.4 9.4 9.4c5.44 0 9.07-3.82 9.07-9.23 0-.61-.06-1.07-.1-1.17z" />
    </svg>
  );
}

export default function LetterDetailView({ letter }: LetterDetailViewProps) {
  const [copied, setCopied] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [showPronounce, setShowPronounce] = useState(true);
  const [playingIdx, setPlayingIdx] = useState<number | null>(null);
  const [activeBoundary, setActiveBoundary] = useState<{ idx: number; charIndex: number; charLength: number } | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : { isAdmin: false }))
      .then((data) => {
        setIsAdmin(!!data.isAdmin);
      })
      .catch(() => {
        setIsAdmin(false);
      });
  }, []);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(`/api/letters/${encodeURIComponent(letter.id)}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '편지 삭제에 실패했습니다.');
      }

      // API 라우트는 현재 페이지의 RSC를 재검증하지 않으므로 404 없이 즉시 홈으로 이동합니다
      window.location.replace('/?deleted=true');
    } catch (err: unknown) {
      console.error('편지 삭제 오류:', err);
      setDeleteError(err instanceof Error ? err.message : '편지 삭제에 실패했습니다.');
      setIsDeleting(false);
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
          href="/letters"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A5568] hover:text-[#E07A5F] py-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>편지 목록으로 (お便り一覧)</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* 관리자 전용 수정/삭제 버튼 */}
          {isAdmin && (
            <div className="flex items-center gap-1.5 mr-1 pr-2 border-r border-[#EDE8E1]">
              <Link
                href={`/letters/${letter.id}/edit`}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-[#E07A5F] bg-[#FAF0E6] hover:bg-[#F4DDD4] rounded-full border border-[#F4DDD4] transition-colors"
                title="편지 내용 수정"
              >
                <Edit className="w-3 h-3" />
                <span>수정</span>
              </Link>
              <button
                type="button"
                onClick={() => setShowDeleteModal(true)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-red-600 bg-red-50/70 hover:bg-red-100/70 rounded-full border border-red-200 transition-colors"
                title="편지 삭제"
              >
                <Trash2 className="w-3 h-3" />
                <span>삭제</span>
              </button>
            </div>
          )}

          <button
            onClick={handleShare}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            title="공유하기"
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
            <span>この記事の学習ノート (日本語メモ)</span>
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
        <article className="space-y-4 bg-white p-5 rounded-2xl border border-[#EDE8E1] card-shadow">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <span className="text-xs font-bold text-[#2D3748]">お便りの本文</span>
            <button
              onClick={() => setShowPronounce(!showPronounce)}
              className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all border ${
                showPronounce
                  ? 'bg-amber-50 text-[#D97706] border-amber-200'
                  : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{showPronounce ? '読み仮名 ON' : '読み仮名 OFF'}</span>
            </button>
          </div>

          <div className="space-y-4 pt-1">
            {letter.content.map((paragraph, idx) => {
              const isPlaying = playingIdx === idx;
              return (
                <div key={idx} className="space-y-1.5 p-3 rounded-xl hover:bg-[#FBF9F5] transition-colors border border-transparent hover:border-[#EDE8E1]">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm leading-relaxed font-medium transition-colors ${isPlaying ? 'text-[#1A202C]' : 'text-[#2D3748]'}`}>
                      {isPlaying && activeBoundary && activeBoundary.idx === idx ? (
                        paragraph.split('').map((ch, cIdx) => (
                          <span
                            key={cIdx}
                            className={`transition-colors duration-100 ${
                              cIdx === activeBoundary.charIndex ? 'text-[#E07A5F]' : ''
                            }`}
                          >
                            {ch}
                          </span>
                        ))
                      ) : (
                        paragraph
                      )}
                    </p>
                    <button
                      onClick={() => {
                        if (isPlaying) {
                          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                            window.speechSynthesis.cancel();
                          }
                          setPlayingIdx(null);
                          setActiveBoundary(null);
                          return;
                        }
                        setPlayingIdx(idx);
                        setActiveBoundary({ idx, charIndex: 0, charLength: 1 });
                        speakJapanese(
                          paragraph,
                          0.9,
                          () => setPlayingIdx(idx),
                          () => {
                            setPlayingIdx(null);
                            setActiveBoundary(null);
                          },
                          (charIndex) => {
                            setActiveBoundary({ idx, charIndex, charLength: 1 });
                          }
                        );
                      }}
                      className={`p-1.5 rounded-lg border shrink-0 transition-colors ${
                        isPlaying
                          ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                          : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'
                      }`}
                      title="段落の発音を聞く"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {showPronounce && (
                    <p className="text-xs font-semibold text-[#E07A5F] leading-normal">
                      [{getPronunciation(paragraph)}]
                    </p>
                  )}
                </div>
              );
            })}
          </div>
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

            {/* 지도 링크 버튼 (Naver, Kakao, Google) */}
            {(() => {
              const kakaoUrl =
                letter.placeInfo.kakaoMapUrl ||
                (letter.placeInfo.address
                  ? `https://map.kakao.com/link/search/${encodeURIComponent(
                      letter.placeInfo.koreanName
                        ? `${letter.placeInfo.koreanName} ${letter.placeInfo.address}`
                        : letter.placeInfo.address
                    )}`
                  : undefined);

              const googleUrl = (() => {
                if (letter.placeInfo.googleMapUrl) {
                  try {
                    const url = new URL(letter.placeInfo.googleMapUrl);
                    const query = url.searchParams.get('query') || url.searchParams.get('q');
                    // '상호명, 주소' 형태로 묶여 핀이 튀는 쿼리인 경우 주소 단독 쿼리로 자동 보정
                    if (
                      query &&
                      query.includes(',') &&
                      !/^-?[0-9.]+,\s*-?[0-9.]+$/.test(query.trim()) &&
                      letter.placeInfo.address
                    ) {
                      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(letter.placeInfo.address)}`;
                    }
                  } catch {
                    // URL 파싱 실패 시 원본 유지
                  }
                  return letter.placeInfo.googleMapUrl;
                }
                return letter.placeInfo.address
                  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(letter.placeInfo.address)}`
                  : undefined;
              })();

              return (
                <div className={`grid ${kakaoUrl ? 'grid-cols-3' : 'grid-cols-2'} gap-2 pt-2 border-t border-gray-100`}>
                  <a
                    href={letter.placeInfo.naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-[#03C75A]/10 hover:bg-[#03C75A]/20 text-[#03C75A] rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs group"
                    title="네이버 지도 (Naver Map)"
                    aria-label="네이버 지도"
                  >
                    <NaverGlyph className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>

                  {kakaoUrl && (
                    <a
                      href={kakaoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-[#FEE500]/30 hover:bg-[#FEE500]/50 text-[#3C1E1E] rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs group"
                      title="카카오맵 (Kakao Map)"
                      aria-label="카카오맵"
                    >
                      <KakaoGlyph className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  )}

                  {googleUrl && (
                    <a
                      href={googleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 bg-[#4285F4]/10 hover:bg-[#4285F4]/20 text-[#4285F4] rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-2xs group"
                      title="구글 지도 (Google Map)"
                      aria-label="구글 지도"
                    >
                      <GoogleGlyph className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  )}
                </div>
              );
            })()}
          </section>
        )}

        {/* 독자 첨삭 피드백 위젯 */}
        <FeedbackWidget
          letterId={letter.id}
          letterTitle={letter.title}
          initialLikes={letter.likes}
        />
      </div>

      {/* 감성적인 삭제 확인 모달 */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#EDE8E1] relative animate-in zoom-in-95 duration-200">
            {!isDeleting && (
              <button
                onClick={() => setShowDeleteModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                title="닫기"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-base font-bold text-[#2D3748]">
                  이 편지를 삭제하시겠습니까?
                </h3>
                <p className="text-xs text-[#718096] leading-relaxed">
                  「<span className="font-semibold text-[#2D3748]">{letter.title}</span>」 편지와 독자 첨삭 피드백이 영구적으로 삭제되며 복구할 수 없습니다.
                </p>
              </div>

                {deleteError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium text-center">
                    {deleteError}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() => setShowDeleteModal(false)}
                    className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-colors disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={handleConfirmDelete}
                    className="py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20 active:scale-95 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>삭제 중...</span>
                      </>
                    ) : (
                      <span>삭제하기</span>
                    )}
                  </button>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}
