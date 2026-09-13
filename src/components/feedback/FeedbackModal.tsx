'use client';

import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2, ThumbsUp, Edit3 } from 'lucide-react';
import { insertFeedback } from '@/lib/supabase/client-queries';

interface FeedbackModalProps {
  letterId: string;
  letterTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export default function FeedbackModal({
  letterId,
  letterTitle,
  isOpen,
  onClose,
  onSubmitSuccess
}: FeedbackModalProps) {
  const [naturalness, setNaturalness] = useState<'natural' | 'awkward'>('natural');
  const [readerName, setReaderName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await insertFeedback({
        letterId,
        readerName: readerName.trim() || '匿名の読者さん',
        naturalness,
        suggestion: suggestion.trim() || undefined,
        comment: comment.trim() || undefined
      });

      if (result) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onSubmitSuccess();
          onClose();
        }, 1500);
      } else {
        alert('피드백 저장 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    } catch (err) {
      console.error('Submit feedback error:', err);
      alert('피드백 저장 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#EDE8E1] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-[#E8F5E9] text-[#2E7D32] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-[#2D3748]">
              温かいアドバイス、ありがとうございます！
            </h3>
            <p className="text-xs text-[#718096]">
              管理人の日本語の勉強に大切に役立てます！
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-[#E07A5F] mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                日本語フィードバック
              </span>
            </div>

            <h3 className="text-base font-bold text-[#2D3748] mb-1">
              このお便りの日本語はどうでしたか？
            </h3>
            <p className="text-[11px] text-[#718096] mb-4">
              対象記事：「{letterTitle}」
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {/* 자연스러움 선택 */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setNaturalness('natural')}
                  className={`py-2 px-3 rounded-xl border text-center font-medium transition-all flex items-center justify-center gap-1.5 ${
                    naturalness === 'natural'
                      ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>とても自然！</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNaturalness('awkward')}
                  className={`py-2 px-3 rounded-xl border text-center font-medium transition-all flex items-center justify-center gap-1.5 ${
                    naturalness === 'awkward'
                      ? 'bg-[#FAF0E6] text-[#E07A5F] border-[#E07A5F]'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>少し不自然な点あり</span>
                </button>
              </div>

              {/* 제안 입력 */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  より自然な日本語の表現（任意）
                </label>
                <textarea
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  placeholder="例：「〜と思います」より「〜な気がします」の方が日常的ですよ！"
                  rows={2}
                  className="w-full px-3 py-2 border border-[#EDE8E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                />
              </div>

              {/* 코멘트 / 응원 */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  応援メッセージや感想（任意）
                </label>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="例：テジクッパ美味しそう！日本語上手ですね。"
                  className="w-full px-3 py-2 border border-[#EDE8E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                />
              </div>

              {/* 닉네임 */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  お名前・ニックネーム（任意）
                </label>
                <input
                  type="text"
                  value={readerName}
                  onChange={(e) => setReaderName(e.target.value)}
                  placeholder="例：福岡のさくら / 匿名"
                  className="w-full px-3 py-2 border border-[#EDE8E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 bg-[#E07A5F] hover:bg-[#D0694E] disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#E07A5F]/20 transition-all active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? '送信中...' : 'アドバイスを送る'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
