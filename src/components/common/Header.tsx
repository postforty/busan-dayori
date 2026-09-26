'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Sparkles, Heart, X, PlusCircle, LogIn, LogOut, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { signInWithGoogle, signOut } from '@/lib/supabase/auth';

interface AuthUser {
  id: string;
  email?: string;
  name?: string | null;
}

export default function Header() {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const fetchAuthStatus = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setIsAdmin(data.isAdmin);
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch {
      setUser(null);
      setIsAdmin(false);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  useEffect(() => {
    // 1. URL 오류 파라미터 검사
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const authError = params.get('auth_error');
      if (authError === 'unauthorized') {
        alert('등록된 관리자 계정만 로그인할 수 있습니다.');
        const url = new URL(window.location.href);
        url.searchParams.delete('auth_error');
        window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
      } else if (authError === 'admin_required') {
        alert('관리자 권한이 필요한 페이지입니다.');
        const url = new URL(window.location.href);
        url.searchParams.delete('auth_error');
        window.history.replaceState({}, '', url.pathname + (url.search ? url.search : ''));
      }
    }

    // 2. 초기 서버 인증 상태 로드
    fetchAuthStatus();

    // 3. Supabase 인증 변경 리스너
    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchAuthStatus();
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
            {/* 1. 소개 버튼 */}
            <button
              onClick={() => setShowAboutModal(true)}
              className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-full bg-[#E2E8F0]/70 hover:bg-[#E2E8F0] text-[#4A5568] transition-all font-medium active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span className="hidden sm:inline">このサイトについて</span>
              <span className="sm:hidden">案内</span>
            </button>

            {/* 2. 관리자 전용 새 편지 쓰기 버튼 */}
            {isAdmin && (
              <Link
                href="/letters/new"
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#E07A5F] hover:bg-[#C8654B] text-white transition-all font-bold shadow-sm hover:shadow active:scale-95 shrink-0"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">새 편지 쓰기</span>
                <span className="sm:hidden">글쓰기</span>
              </Link>
            )}

            {/* 3. 인증 상태 영역 (아이콘만 작게 표시) */}
            {isLoadingAuth ? (
              <div className="p-1.5 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            ) : user ? (
              <button
                onClick={handleLogout}
                className="relative p-2 rounded-full text-[#718096] hover:text-red-600 hover:bg-red-50 transition-all active:scale-95"
                title={`로그아웃 (${user.name || user.email})`}
                aria-label="로그아웃"
              >
                <LogOut className="w-4 h-4" />
                {isAdmin && (
                  <span
                    className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#E07A5F] ring-2 ring-[#FBF9F5]"
                    title="관리자 계정 로그인 됨"
                  />
                )}
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="p-2 rounded-full text-[#718096]/60 hover:text-[#E07A5F] hover:bg-[#FAF0E6] transition-all active:scale-95"
                title="관리자 로그인"
                aria-label="관리자 로그인"
              >
                <LogIn className="w-4 h-4" />
              </button>
            )}
          </div>
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
                こんにちは！私は釜山に住んでいる韓国人です。日本と日本語が大好きで、JLPTや会話を日々勉強しています。
              </p>
              <p>
                このサイトは、<strong>「自分の日本語の練習」</strong>のために、大好きな釜山の街や本当におすすめしたい行きつけのお店を日本語で綴るために作りました。
              </p>
              <p>
                もし記事の中に<strong>「ここ、少し不自然だな」</strong>という表現があれば、ぜひ各記事の添削ボタンから気軽に教えていただけると本当に嬉しいです！
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
              <span>管理人：シンヒ (釜山在住)</span>
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
