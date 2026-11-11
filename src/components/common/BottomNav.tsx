'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Mail, BookOpen, Bookmark, Sparkles, Compass } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [pendingHref, setPendingHref] = useState<string | null>(null);

  // 경로 이동이 완료되면 대기 중(Pending) 상태 초기화
  useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const navItems = [
    {
      label: 'まいにち',
      href: '/',
      icon: BookOpen,
      active: pathname === '/'
    },
    {
      label: 'AIレッスン',
      href: '/roadmap',
      icon: Sparkles,
      active: pathname.startsWith('/roadmap')
    },
    {
      label: '単語帳',
      href: '/voca',
      icon: Bookmark,
      active: pathname.startsWith('/voca')
    },
    {
      label: 'お便り',
      href: '/letters',
      icon: Mail,
      active: pathname.startsWith('/letters')
    },
    {
      label: '3Dワールド',
      href: '/world',
      icon: Compass,
      active: pathname.startsWith('/world')
    }
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isCurrentlyActive: boolean
  ) => {
    // 이미 현재 머물고 있는 탭이고 대기 중인 상태가 아니라면 중복 이동 방지
    if (isCurrentlyActive && !pendingHref) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    setPendingHref(href);

    // 0ms 즉시 본문 영역을 스켈레톤으로 전환하도록 글로벌 이벤트 발송
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('app-navigation-start', { detail: { href } }));
    }

    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EDE8E1] py-1 px-1 pb-[calc(0.25rem+env(safe-area-inset-bottom,0px))]">
      {/* 탭 전환 중 상단에 흐르는 브랜드 코랄 인디케이터 바 */}
      {isPending && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FAF0E6] overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-[#FAF0E6] via-[#E07A5F] to-[#FAF0E6] animate-pulse" />
        </div>
      )}

      <div className="max-w-xl mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isItemPending = isPending && pendingHref === item.href;
          // 클릭 즉시 낙관적(Optimistic)으로 활성화 피드백 제공
          const isActive = pendingHref ? pendingHref === item.href : item.active;

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              onClick={(e) => handleNavClick(e, item.href, item.active)}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 active:scale-95 ${
                isActive
                  ? 'text-[#E07A5F] font-bold'
                  : 'text-[#718096] hover:text-[#2D3748]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`relative p-1 rounded-full transition-all duration-200 ${
                  isActive ? 'scale-110 bg-[#FAF0E6]' : ''
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] leading-tight font-medium mt-0.5 tracking-tight whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
