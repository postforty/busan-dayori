'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Letter, Category } from '@/types';
import LetterCard from '@/components/letters/LetterCard';
import CategoryFilter from '@/components/letters/CategoryFilter';
import { Search, Mail, Sparkles, PlusCircle } from 'lucide-react';

interface LettersFeedProps {
  initialLetters: Letter[];
}

export default function LettersFeed({ initialLetters }: LettersFeedProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [soloFilter, setSoloFilter] = useState(false);
  const [nonSpicyFilter, setNonSpicyFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLetters = useMemo(() => {
    return initialLetters.filter((letter) => {
      if (selectedCategory !== 'all' && letter.category !== selectedCategory) {
        return false;
      }
      if (soloFilter && letter.placeInfo?.soloFriendly !== 'welcome') {
        return false;
      }
      if (nonSpicyFilter && (letter.placeInfo?.spicyLevel ?? 0) > 1) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = letter.title.toLowerCase().includes(query);
        const matchSummary = letter.summary.toLowerCase().includes(query);
        const matchRegion = letter.region.toLowerCase().includes(query);
        const matchKorean = letter.placeInfo?.koreanName.toLowerCase().includes(query) ?? false;
        const matchKatakana = letter.placeInfo?.katakanaName.toLowerCase().includes(query) ?? false;
        if (!matchTitle && !matchSummary && !matchRegion && !matchKorean && !matchKatakana) {
          return false;
        }
      }
      return true;
    });
  }, [initialLetters, selectedCategory, soloFilter, nonSpicyFilter, searchQuery]);

  return (
    <div className="px-4 pt-4 space-y-5">
      {/* 1. 헤더 배너 */}
      <section className="bg-gradient-to-br from-[#FAF0E6] to-[#FFF9F2] rounded-3xl p-5 border border-[#F4DDD4]">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-bold text-[#E07A5F] mb-2.5 border border-[#F4DDD4] w-fit">
          <Sparkles className="w-3 h-3 text-[#D97706]" />
          <span>釜山っ子のリアル旅便り</span>
        </div>

        <h1 className="text-lg font-black text-[#2D3748] tracking-tight leading-snug mb-1.5">
          釜山ローカル便り
        </h1>
        <p className="text-xs text-[#718096] leading-relaxed">
          日本語を勉強中の釜山っ子が直接日本語で綴る、釜山のローカル物語です。美味しいお店や路地裏の日常を紹介しながら、日本の読者さんと仲良くなりたいです！
        </p>
      </section>

      {/* 2. 검색 및 필터 바 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Mail className="w-4 h-4 text-[#E07A5F]" />
            <h2 className="text-sm font-bold text-[#2D3748]">
              すべてのお便り ({filteredLetters.length}通)
            </h2>
          </div>

          {(selectedCategory !== 'all' || soloFilter || nonSpicyFilter || searchQuery) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSoloFilter(false);
                setNonSpicyFilter(false);
                setSearchQuery('');
              }}
              className="text-[11px] text-[#E07A5F] hover:underline"
            >
              リセット
            </button>
          )}
        </div>

        {/* 검색창 */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="料理名、エリア（広安里、海雲台など）で検索..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EDE8E1] rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F] card-shadow"
          />
        </div>

        {/* 카테고리 & 실전 필터 */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          soloFilter={soloFilter}
          onToggleSoloFilter={() => setSoloFilter(!soloFilter)}
          nonSpicyFilter={nonSpicyFilter}
          onToggleNonSpicyFilter={() => setNonSpicyFilter(!nonSpicyFilter)}
        />
      </section>

      {/* 3. 편지 카드 리스트 */}
      <div className="space-y-4">
        {filteredLetters.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#EDE8E1] space-y-2">
            <p className="text-sm text-gray-500">조건에 맞는 편지를 찾지 못했습니다.</p>
            <p className="text-xs text-gray-400">검색어 또는 필터 조건을 변경해보세요.</p>
          </div>
        ) : (
          filteredLetters.map((letter) => (
            <LetterCard key={letter.id} letter={letter} />
          ))
        )}
      </div>
    </div>
  );
}
