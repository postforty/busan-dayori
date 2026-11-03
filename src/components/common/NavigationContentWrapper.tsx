'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '@/app/loading';

interface NavigationContentWrapperProps {
  children: React.ReactNode;
}

/**
 * 탭 메뉴 클릭 시 캐시 등으로 즉시(200ms 이내) 전환될 때는 스켈레톤을 띄우지 않아
 * 깜빡임(Flicker) 현상을 방지하고, 네트워크 지연이 200ms 이상 지속될 때만
 * 스켈레톤을 노출하는 최적화 래퍼 컴포넌트
 */
export default function NavigationContentWrapper({ children }: NavigationContentWrapperProps) {
  const pathname = usePathname();
  const [showSkeleton, setShowSkeleton] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 경로(pathname) 변경 완료 시 타이머 취소 및 스켈레톤 즉시 해제
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setShowSkeleton(false);
  }, [pathname]);

  useEffect(() => {
    const handleNavStart = () => {
      // 이전 타이머 정리
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // 200ms 이상 지연되는 경우에만 스켈레톤 노출 (고속 전환 시 플리커 방지)
      timerRef.current = setTimeout(() => {
        setShowSkeleton(true);
      }, 200);
    };

    const handleNavEnd = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setShowSkeleton(false);
    };

    window.addEventListener('app-navigation-start', handleNavStart);
    window.addEventListener('app-navigation-end', handleNavEnd);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      window.removeEventListener('app-navigation-start', handleNavStart);
      window.removeEventListener('app-navigation-end', handleNavEnd);
    };
  }, []);

  return (
    <>
      {showSkeleton ? <Loading /> : children}
    </>
  );
}
