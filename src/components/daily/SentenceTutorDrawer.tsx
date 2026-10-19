'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Loader2, X, RefreshCw, MessageCircleQuestion } from 'lucide-react';

export interface SentenceTutorDrawerProps {
  sentence: {
    japanese: string;
    korean: string;
    speaker: string;
    pronunciation?: string;
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
      content: `안녕하세요! 부산다요리의 과외 선생님 **다요리 센세**예요 🌸\n「**${sentence.japanese}**」 (${sentence.korean}) 문장에서 헷갈리는 부분이나 궁금한 점이 있으신가요?\n아래 추천 질문을 누르시거나 편하게 물어보세요!`,
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
        id: 'welcome',
        role: 'assistant',
        content: `안녕하세요! **다요리 센세**예요 🌸\n「**${sentence.japanese}**」 문장에 대해 무엇이든 다시 물어보세요!`,
      },
    ]);
  };

  return (
    <div className="mt-2.5 rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FFF6F1] border border-[#FCE4D8] overflow-hidden shadow-xs transition-all">
      {/* 헤더 바 */}
      <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#FAF0E6] to-[#FFF6F1] border-b border-[#FCE4D8] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#E07A5F] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-black text-[#2D3748]">다요리 센세 1:1 과외</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E07A5F]/10 text-[#E07A5F] font-bold border border-[#E07A5F]/20">
                {sentence.speaker}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleReset}
            className="p-1 rounded-lg text-gray-400 hover:text-[#E07A5F] hover:bg-white/80 transition-colors"
            title="대화 초기화"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/80 transition-colors"
            title="과외 창 닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 추천 질문 빠른 칩 (Quick Prompt Chips) */}
      <div className="px-3 pt-2.5 pb-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1 text-[10px] font-bold text-[#E07A5F] shrink-0 mr-0.5">
          <MessageCircleQuestion className="w-3 h-3" />
          <span>추천:</span>
        </div>
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            disabled={isLoading}
            className="shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white text-[#718096] hover:text-[#E07A5F] hover:border-[#E07A5F] border border-[#F4DDD4] transition-all active:scale-95 disabled:opacity-50 shadow-2xs whitespace-nowrap"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* 대화 메시지 영역 */}
      <div ref={chatContainerRef} className="p-3.5 max-h-64 overflow-y-auto space-y-2.5 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-5 h-5 rounded-full bg-[#FAF0E6] border border-[#F4DDD4] flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                🌸
              </div>
            )}
            <div
              className={`rounded-2xl px-3 py-2 max-w-[85%] leading-relaxed whitespace-pre-wrap break-keep text-xs shadow-2xs ${
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
            <div className="w-5 h-5 rounded-full bg-[#FAF0E6] border border-[#F4DDD4] flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
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
      <div className="p-2.5 bg-white border-t border-[#FCE4D8] flex items-center gap-1.5">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="선생님께 궁금한 점을 질문해보세요... (예: 왜 이 조사를 쓰나요?)"
          disabled={isLoading}
          className="flex-1 bg-[#FAF9F7] border border-[#EDE8E1] focus:border-[#E07A5F] focus:bg-white rounded-xl px-3 py-2 text-xs text-[#2D3748] placeholder:text-gray-400 outline-none transition-all"
        />
        <button
          type="button"
          onClick={() => handleSendMessage(inputValue)}
          disabled={isLoading || !inputValue.trim()}
          className="p-2 rounded-xl bg-[#E07A5F] text-white hover:bg-[#C45B40] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs active:scale-95 shrink-0"
          title="질문 전송"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
