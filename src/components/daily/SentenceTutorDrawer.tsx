'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2, X, RefreshCw, MessageCircleQuestion } from 'lucide-react';

import { WordBreakdown } from '@/types';

export interface SentenceTutorDrawerProps {
  sentence: {
    japanese: string;
    korean: string;
    speaker: string;
    pronunciation?: string;
    breakdown?: WordBreakdown[];
  };
  context?: {
    level?: string;
    themeTitle?: string;
    unitTitle?: string;
  };
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

function formatBreakdownLine(part: WordBreakdown): string {
  // 포맷 예시:
  // 텐나이(店内, てんない) = 가게 안, 매장
  // 오메시아가리(お召し上がり) = '드시다'의 높인말
  // 데스카(ですか) = ~입니까?
  const hasReading = part.reading && part.reading !== part.word;
  const notation = hasReading ? `${part.word}, ${part.reading}` : part.word;
  const label = part.pronunciation ? `${part.pronunciation}(${notation})` : notation;
  return `• **${label}** = ${part.meaning}`;
}

export function buildWelcomeMessage(sentence: SentenceTutorDrawerProps['sentence']): string {
  const parts = sentence.breakdown;
  const hasBreakdown = parts && parts.length > 0;

  if (hasBreakdown) {
    const list = parts.map(formatBreakdownLine).join('\n');
    return `안녕하세요! 부산다요리의 과외 선생님 **다요리 센세**예요 🌸\n「**${sentence.japanese}**」 (${sentence.korean})\n\n🧩 **문장 부품 분해**\n${list}\n\n문장에서 헷갈리는 부분이나 궁금한 점이 있으신가요?\n아래 추천 질문을 누르시거나 편하게 물어보세요!`;
  }

  return `안녕하세요! 부산다요리의 과외 선생님 **다요리 센세**예요 🌸\n「**${sentence.japanese}**」 (${sentence.korean}) 문장에서 헷갈리는 부분이나 궁금한 점이 있으신가요?\n아래 추천 질문을 누르시거나 편하게 물어보세요!`;
}

function renderFormattedMessage(content: string, role: 'assistant' | 'user'): React.ReactNode {
  if (!content) return null;

  // **볼드체** 및 `인라인 코드` 마크다운 패턴 매칭
  const parts = content.split(/(\*\*(?:[\s\S]+?)\*\*|`[^`]+?`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      const boldText = part.slice(2, -2);
      return (
        <strong
          key={index}
          className={`font-bold ${
            role === 'assistant' ? 'text-[#1A202C]' : 'text-white'
          }`}
        >
          {boldText}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const codeText = part.slice(1, -1);
      return (
        <code
          key={index}
          className={`px-1 py-0.5 mx-0.5 rounded text-[11px] font-mono ${
            role === 'assistant'
              ? 'bg-[#F4E8E1] text-[#C45B40] border border-[#ECD1C3]'
              : 'bg-white/20 text-white'
          }`}
        >
          {codeText}
        </code>
      );
    }

    return part;
  });
}

const QUICK_PROMPTS = [
  '💡 단어 부품별로 쪼개서 설명해줘',
  '🗣️ 실제 말할 때 뉘앙스와 팁',
  '🔁 다른 상황 대체 표현 알려줘',
  '❓ 비슷한 다른 단어와 차이점은?'
];

export default function SentenceTutorDrawer({
  sentence,
  context,
  onClose,
}: SentenceTutorDrawerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'assistant',
      content: buildWelcomeMessage(sentence),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // 브라우저 윈도우 스크롤을 건드리지 않고, 오직 대화창 내부만 스크롤
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // 문장이 변경되면 새로운 문장에 맞춰 대화창 초기화
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: buildWelcomeMessage(sentence),
      },
    ]);
    setInputValue('');
  }, [sentence.japanese, sentence.korean, sentence.breakdown]);

  useEffect(() => {
    // 첫 마운트(환영 메시지만 있는 상태)에서는 스크롤 이동 금지
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/sentence-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sentence,
          context,
          question: trimmed,
          history: messages.slice(-4).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();
      const aiContent =
        data.answer || '답변을 불러오는 중 문제가 발생했어요. 다시 질문해 주세요!';

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: aiContent,
        },
      ]);
    } catch (err) {
      console.error('[SentenceTutor Error]:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: '네트워크 연결이 불안정해요 💦 잠시 후 다시 질문해 주세요!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'assistant',
        content: buildWelcomeMessage(sentence),
      },
    ]);
  };

  // 바텀 시트 열림 시 ESC 닫기 및 바디 스크롤 락
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* 딤 배경 클릭 시 닫기 */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* 바텀 시트 컨테이너 */}
      <div className="relative z-10 w-full max-w-lg bg-white rounded-t-3xl shadow-2xl border-t border-[#FCE4D8] flex flex-col max-h-[85vh] animate-in slide-in-from-bottom duration-300 overflow-hidden">
        {/* 상단 드래그 핸들 */}
        <div className="pt-2.5 pb-1 flex justify-center bg-gradient-to-r from-[#FAF0E6] to-[#FFF6F1]">
          <div className="w-10 h-1 bg-gray-300/80 rounded-full" />
        </div>

        {/* 헤더 바 */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-[#FAF0E6] to-[#FFF6F1] border-b border-[#FCE4D8] flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#E07A5F] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-black text-[#2D3748]">다요리 센세 1:1 과외</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] font-bold border border-[#E07A5F]/20">
                  {sentence.speaker}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="p-1.5 rounded-lg text-gray-400 hover:text-[#E07A5F] hover:bg-white/80 transition-colors cursor-pointer"
              title="대화 초기화"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-colors cursor-pointer"
              title="과외 창 닫기"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* 추천 질문 빠른 칩 (Quick Prompt Chips) */}
        <div className="px-3.5 pt-2.5 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-[#FAF9F7]/70 border-b border-[#F4DDD4]/50 shrink-0">
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#E07A5F] shrink-0 mr-0.5">
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            <span>추천:</span>
          </div>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white text-[#718096] hover:text-[#E07A5F] hover:border-[#E07A5F] border border-[#F4DDD4] transition-all active:scale-95 disabled:opacity-50 shadow-2xs whitespace-nowrap cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* 대화 메시지 영역 (스크롤) */}
        <div ref={chatContainerRef} className="p-4 flex-1 overflow-y-auto space-y-3 text-xs bg-[#FAF9F7]/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.role === 'assistant' && (
                <div className="w-6 h-6 rounded-full bg-[#FAF0E6] border border-[#F4DDD4] flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-2xs">
                  🌸
                </div>
              )}
              <div
                className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] min-w-0 leading-relaxed whitespace-pre-wrap break-words break-all [overflow-wrap:anywhere] text-xs shadow-2xs ${
                  msg.role === 'user'
                    ? 'bg-[#E07A5F] text-white rounded-tr-xs font-medium'
                    : 'bg-white text-[#2D3748] border border-[#EDE8E1] rounded-tl-xs'
                }`}
              >
                {renderFormattedMessage(msg.content, msg.role)}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-[#FAF0E6] border border-[#F4DDD4] flex items-center justify-center shrink-0 mt-0.5 text-xs shadow-2xs">
                🌸
              </div>
              <div className="bg-white rounded-2xl rounded-tl-xs px-3.5 py-2.5 border border-[#EDE8E1] shadow-2xs flex items-center gap-2 text-xs text-[#718096]">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#E07A5F]" />
                <span>다요리 센세가 친절한 설명을 적는 중이에요...</span>
              </div>
            </div>
          )}
        </div>

        {/* 하단 입력 폼 */}
        <div className="p-3 bg-white border-t border-[#FCE4D8] flex items-center gap-2 shrink-0">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="선생님께 궁금한 점을 질문해보세요... (예: 왜 이 조사를 쓰나요?)"
            disabled={isLoading}
            className="flex-1 bg-[#FAF9F7] border border-[#EDE8E1] focus:border-[#E07A5F] focus:bg-white rounded-xl px-3.5 py-2.5 text-xs text-[#2D3748] placeholder:text-gray-400 outline-none transition-all"
          />
          <button
            type="button"
            onClick={() => handleSendMessage(inputValue)}
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 rounded-xl bg-[#E07A5F] text-white hover:bg-[#C45B40] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs active:scale-95 shrink-0 cursor-pointer"
            title="질문 전송"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
