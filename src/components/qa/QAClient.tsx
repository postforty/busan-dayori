'use client';

import React, { useState } from 'react';
import { Question } from '@/types';
import {
  MessageSquarePlus,
  Send,
  Calendar,
  User,
  Heart,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { insertQuestion, fetchClientQuestions } from '@/lib/supabase/client-queries';

interface QAClientProps {
  initialQuestions: Question[];
}

export default function QAClient({ initialQuestions }: QAClientProps) {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [targetMonth, setTargetMonth] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    try {
      const created = await insertQuestion({
        authorName: name.trim() || '匿名の旅人',
        targetMonth: targetMonth.trim() || '時期未定',
        question: questionText.trim()
      });

      if (created) {
        setIsSubmitted(true);
        // DB 최신 목록 재조회
        const updated = await fetchClientQuestions();
        setQuestions(updated);

        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
          setName('');
          setTargetMonth('');
          setQuestionText('');
        }, 1500);
      } else {
        alert('質問の送信に失敗しました。もう一度お試しください。');
      }
    } catch (err) {
      console.error('Failed to submit question:', err);
      alert('質問の送信中にエラーが発生しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* 인트로 */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF5EB] rounded-3xl p-5 border border-[#F4DDD4]">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#E07A5F]">
            <Sparkles className="w-4 h-4" />
            <span>ローカル質問箱</span>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 bg-[#E07A5F] hover:bg-[#D0694E] text-white rounded-full text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <MessageSquarePlus className="w-3.5 h-3.5" />
            <span>質問する</span>
          </button>
        </div>

        <h1 className="text-lg font-black text-[#2D3748] tracking-tight mb-1.5">
          旅の質問ポスト
        </h1>
        <p className="text-xs text-[#718096] leading-relaxed">
          「雨の日に一人で行ける場所は？」「この料理、辛いですか？」など、釜山旅行のちょっとした疑問をなんでも聞いてください！管理人が日本語の勉強を兼ねてお返事します。
        </p>
      </section>

      {/* 질문 & 답변 목록 */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#EDE8E1] space-y-2">
            <p className="text-sm text-gray-500">まだ届いた質問はありません。</p>
            <p className="text-xs text-gray-400">最初の質問をポストに入れてみてください！</p>
          </div>
        ) : (
          questions.map((q) => (
            <div
              key={q.id}
              className="bg-white rounded-2xl p-5 border border-[#EDE8E1] card-shadow space-y-3"
            >
              {/* 질문자 정보 */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 border-b border-gray-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-700 flex items-center gap-1">
                    <User className="w-3 h-3 text-[#E07A5F]" />
                    {q.authorName}
                  </span>
                  {q.targetMonth && (
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-[10px] text-gray-500 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" />
                      旅行時期: {q.targetMonth}
                    </span>
                  )}
                </div>
                <span>{q.createdAt}</span>
              </div>

              {/* 질문 내용 */}
              <div className="text-xs font-semibold text-[#2D3748] leading-relaxed bg-[#FBF9F5] p-3 rounded-xl border border-[#EDE8E1]">
                <span className="text-[#E07A5F] font-bold mr-1.5">Q.</span>
                {q.question}
              </div>

              {/* 관리자의 답변 */}
              {q.answer ? (
                <div className="bg-[#FAF0E6]/50 p-3.5 rounded-xl border border-[#F4DDD4] space-y-1.5">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#E07A5F]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>管理人の返信 (釜山より)</span>
                  </div>
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    {q.answer}
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-gray-400 italic">
                  返信を準備中です...
                </p>
              )}
            </div>
          ))
        )}
      </div>

      {/* 질문 작성 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#EDE8E1] relative">
            <button
              onClick={() => setIsModalOpen(false)}
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
                  質問をお預かりしました！
                </h3>
                <p className="text-xs text-[#718096]">
                  管理人が確認してお返事をお届けします
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-base font-bold text-[#2D3748] mb-1">
                  釜山ローカルに質問する
                </h3>
                <p className="text-xs text-[#718096] mb-4">
                  観光・グルメ・移動など、お気軽にどうぞ！
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      お名前・ニックネーム
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="例：東京のミホ / 匿名"
                      className="w-full px-3 py-2 border border-[#EDE8E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      旅行の時期（任意）
                    </label>
                    <input
                      type="text"
                      value={targetMonth}
                      onChange={(e) => setTargetMonth(e.target.value)}
                      placeholder="例：10月連休 / 11月週末"
                      className="w-full px-3 py-2 border border-[#EDE8E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      ご質問内容 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={questionText}
                      onChange={(e) => setQuestionText(e.target.value)}
                      placeholder="例：西面駅の近くで、一人でも入りやすいデジクッパのおすすめ店はありますか？"
                      rows={3}
                      className="w-full px-3 py-2 border border-[#EDE8E1] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 px-4 bg-[#E07A5F] hover:bg-[#D0694E] disabled:opacity-50 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#E07A5F]/20 active:scale-98 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? '送信中...' : '質問をポストに入れる'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
