'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, ThumbsUp, MessageSquarePlus, Heart, Check } from 'lucide-react';
import FeedbackModal from './FeedbackModal';
import { getFeedbacksByLetterId, incrementLetterLikes } from '@/lib/supabase/client-queries';
import { Feedback } from '@/types';

interface FeedbackWidgetProps {
  letterId: string;
  letterTitle: string;
  initialLikes?: number;
}

export default function FeedbackWidget({
  letterId,
  letterTitle,
  initialLikes = 0
}: FeedbackWidgetProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchFeedbacks() {
      try {
        const data = await getFeedbacksByLetterId(letterId);
        if (!ignore) {
          setFeedbacks(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load feedbacks:', err);
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchFeedbacks();

    return () => {
      ignore = true;
    };
  }, [letterId]);

  const reloadFeedbacks = async () => {
    try {
      const data = await getFeedbacksByLetterId(letterId);
      setFeedbacks(data);
    } catch (err) {
      console.error('Failed to reload feedbacks:', err);
    }
  };

  const handleLike = async () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
      await incrementLetterLikes(letterId);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-[#EDE8E1]">
      <div className="bg-[#FAF0E6]/50 rounded-2xl p-5 border border-[#F4DDD4]">
        <div className="flex items-center gap-2 mb-2 text-[#E07A5F]">
          <Sparkles className="w-4 h-4" />
          <h3 className="text-sm font-bold text-[#2D3748]">
            読者の皆さんへ（日本語フィードバックのお願い）
          </h3>
        </div>
        <p className="text-xs text-[#718096] leading-relaxed mb-4">
          最後まで読んでくださりありがとうございます！管理人は日本語を独学中の釜山っ子です。記事の日本語はどうでしたか？
        </p>

        {/* 액션 버튼 */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleLike}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              hasLiked
                ? 'bg-[#E8F5E9] text-[#2E7D32] border-[#C8E6C9]'
                : 'bg-white text-[#2D3748] border-[#EDE8E1] hover:bg-gray-50'
            }`}
          >
            {hasLiked ? <Check className="w-4 h-4" /> : <ThumbsUp className="w-4 h-4 text-[#E07A5F]" />}
            <span>自然でした！ ({likes})</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#E07A5F] hover:bg-[#D0694E] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>添削・感想を送る</span>
          </button>
        </div>

        {/* 도착한 피드백 목록 */}
        {!isLoading && feedbacks.length > 0 && (
          <div className="mt-5 pt-4 border-t border-[#EDE8E1]/80 space-y-2.5">
            <h4 className="text-[11px] font-bold text-[#718096] flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#E07A5F] fill-current" />
              <span>届いた読者さんからのアドバイス ({feedbacks.length})</span>
            </h4>

            <div className="space-y-2">
              {feedbacks.map((item) => (
                <div key={item.id} className="bg-white p-3 rounded-xl border border-[#EDE8E1] text-xs">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                    <span className="font-semibold text-gray-700">{item.readerName}</span>
                    <span>{item.createdAt}</span>
                  </div>
                  {item.suggestion && (
                    <div className="bg-[#FAF0E6]/50 p-2 rounded-lg text-[#8C5243] text-[11px] mb-1 font-medium flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#E07A5F] shrink-0 mt-0.5" />
                      <span>提案: {item.suggestion}</span>
                    </div>
                  )}
                  {item.comment && (
                    <p className="text-gray-600 text-[11px] leading-relaxed">
                      {item.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 모달 */}
      <FeedbackModal
        letterId={letterId}
        letterTitle={letterTitle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitSuccess={reloadFeedbacks}
      />
    </div>
  );
}
