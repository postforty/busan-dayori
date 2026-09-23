'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, MessageSquareText, BookOpen, HelpCircle, Bookmark, Compass } from 'lucide-react';
import HangulIcon from '@/components/common/HangulIcon';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: 'まいにち',
      href: '/',
      icon: BookOpen,
      active: pathname === '/'
    },
    {
      label: 'ロードマップ',
      href: '/roadmap',
      icon: Compass,
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
      label: '韓国語',
      href: '/korean',
      icon: HangulIcon,
      active: pathname.startsWith('/korean')
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EDE8E1] py-1 px-1 pb-[calc(0.25rem+env(safe-area-inset-bottom,0px))]">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-[#E07A5F] font-bold'
                  : 'text-[#718096] hover:text-[#2D3748]'
              }`}
            >
              <div
                className={`p-1 rounded-full transition-transform ${
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
