'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Loading from '@/app/loading';

interface NavigationContentWrapperProps {
  children: React.ReactNode;
}

/**
 * 탭 메뉴 클릭 시 서버 RSC 응답 대기 시간 동안 즉시(0ms) 스켈레톤을 렌더링하여
 * 느린 네트워크(3G 등)에서도 이전 화면이 멈춰있지 않고 즉각적인 시각 피드백을 제공하는 래퍼 컴포넌트
 */
export default function NavigationContentWrapper({ children }: NavigationContentWrapperProps) {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);

  // 대상 페이지로 pathname 전환이 완료되면 스켈레톤 해제 및 새 페이지 노출
  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  useEffect(() => {
    const handleNavStart = () => {
      setIsNavigating(true);
    };

    const handleNavEnd = () => {
      setIsNavigating(false);
    };

    window.addEventListener('app-navigation-start', handleNavStart);
    window.addEventListener('app-navigation-end', handleNavEnd);

    return () => {
      window.removeEventListener('app-navigation-start', handleNavStart);
      window.removeEventListener('app-navigation-end', handleNavEnd);
    };
  }, []);

  return (
    <>
      {isNavigating ? <Loading /> : children}
    </>
  );
}

