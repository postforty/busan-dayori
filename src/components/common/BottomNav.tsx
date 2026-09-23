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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EDE8E1] py-1.5 px-2">
      <div className="max-w-xl mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all ${
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
              <span className="text-xs font-bold mt-1 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
