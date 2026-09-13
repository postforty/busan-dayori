'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Sparkles, Heart, X, PlusCircle, LogIn, LogOut, User as UserIcon, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { signInWithGoogle, signOut, isAdmin as checkIsAdmin } from '@/lib/supabase/auth';
import type { User } from '@supabase/supabase-js';

export default function Header() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // 초기 유저 상태 로드
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setIsAdmin(checkIsAdmin(user?.email));
      setIsLoadingAuth(false);
    });

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setIsAdmin(checkIsAdmin(currentUser?.email));
      setIsLoadingAuth(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch {
      alert('Google 로그인 요청에 실패했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.reload();
    } catch {
      alert('로그아웃에 실패했습니다.');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EDE8E1] px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#E07A5F]/10 flex items-center justify-center text-[#E07A5F] group-hover:bg-[#E07A5F] group-hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-[#2D3748] block leading-none">
                釜山だより
              </span>
              <span className="text-[10px] text-[#718096] block mt-0.5 tracking-wider font-medium">
                Busan Dayori
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {/* 관리자 전용 새 편지 쓰기 버튼 */}
            {isAdmin && (
              <Link
                href="/letters/new"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-marine-blue hover:bg-marine-navy text-white transition-all font-semibold shadow-xs active:scale-95"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">새 편지 쓰기</span>
                <span className="sm:hidden">글쓰기</span>
              </Link>
            )}

            {/* 인증 상태 영역 */}
            {isLoadingAuth ? (
              <div className="p-1.5 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : user ? (
              <div className="flex items-center gap-1.5">
                <div
                  className="flex items-center gap-1 text-[11px] px-2 py-1 rounded-full bg-marine-mist/60 text-marine-ink font-medium max-w-[130px] truncate"
                  title={user.email}
                >
                  <UserIcon className="w-3 h-3 text-marine-blue shrink-0" />
                  <span className="truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</span>
                  {isAdmin && (
                    <span className="text-[9px] bg-marine-blue text-white px-1 rounded font-bold">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
                  title="로그아웃"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-white border border-paper-sandstone/70 hover:bg-gray-50 text-marine-ink transition-all font-medium active:scale-95 shadow-2xs"
                title="Google 로그인"
              >
                <LogIn className="w-3.5 h-3.5 text-marine-blue" />
                <span>로그인</span>
              </button>
            )}

            {/* 소개 버튼 */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-[#E2E8F0]/70 hover:bg-[#E2E8F0] text-[#4A5568] transition-all font-medium active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="hidden sm:inline">このサイトについて</span>
              <span className="sm:hidden">案内</span>
            </button>
          </div>
        </div>

        {/* 오늘의 한마디 미니 배너 */}
        <div className="mt-2.5 px-3 py-1.5 bg-[#FAF0E6]/80 rounded-lg flex items-center justify-between text-[11px] text-[#8C5243] border border-[#F4DDD4]">
          <div className="flex items-center gap-1.5 truncate">
            <span className="font-semibold px-1.5 py-0.5 bg-[#E07A5F] text-white rounded text-[9px] uppercase tracking-wide shrink-0">
              今日の表現
            </span>
            <span className="truncate">「行きつけ (単骨・단골)」を勉強しました！</span>
          </div>
          <span className="text-[10px] opacity-75 shrink-0 ml-2">2026.09</span>
        </div>
      </header>

      {/* 사이트 소개 모달 (취지 안내) */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl border border-[#EDE8E1] relative">
            <button
              onClick={() => setShowAboutModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F] mb-3">
              <Heart className="w-6 h-6 fill-current" />
            </div>

            <h3 className="text-lg font-bold text-[#2D3748] mb-1">
              はじめまして！
            </h3>
            <p className="text-xs text-[#E07A5F] font-semibold mb-3">
              日本語を勉強中の釜山っ子のブログです
            </p>

            <div className="text-xs text-[#4A5568] space-y-2.5 leading-relaxed bg-[#FBF9F5] p-3.5 rounded-xl border border-[#EDE8E1]">
              <p>
                こんにちは！私は釜山に生まれ育った韓国人です。日本と日本語が大好きで、JLPTや会話を日々勉強しています。
              </p>
              <p>
                このサイトは、<strong>「自分の日本語の練習」</strong>のために、大好きな釜山の街や本当におすすめしたい行きつけのお店を日本語で綴るために作りました。
              </p>
              <p>
                もし記事の中に<strong>「ここ、少し不自然だな」</strong>という表現があれば、ぜひ各記事の添削ボタンから気軽に教えていただけると本当に嬉しいです！
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>管理人：ドンヒョン (釜山在住)</span>
              <button
                onClick={() => setShowAboutModal(false)}
                className="px-3 py-1.5 bg-[#2D3748] text-white rounded-lg font-medium hover:bg-black transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
