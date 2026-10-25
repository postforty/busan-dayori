'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface UseHorizontalScrollOptions {
  /** 드래그 임계값 (px). 이 거리 이상 마우스를 움직여야 드래그로 판정 */
  dragThreshold?: number;
  /** 화살표 버튼 1회 클릭 시 스크롤 거리 (px) */
  step?: number;
}

export function useHorizontalScroll<T extends HTMLElement = HTMLDivElement>(
  options: UseHorizontalScrollOptions = {}
) {
  const { dragThreshold = 5, step = 180 } = options;
  const scrollRef = useRef<T | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const isDraggingRef = useRef(false);
  const hasMovedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const scrollStartXRef = useRef(0);

  // 스크롤 가능 여부 확인 (좌/우 화살표 활성화 상태 계산)
  const checkScrollability = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    // 여유 오차 2px
    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
  }, []);

  // 휠 이벤트 및 스크롤 이벤트 바인딩
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollability();

    const onScroll = () => {
      checkScrollability();
    };

    const onResize = () => {
      checkScrollability();
    };

    // 마우스 세로 휠(deltaY)을 가로 스크롤로 변환
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;

      // 양 끝에 도달했을 때는 페이지 기본 세로 스크롤 허용 (스크롤 트랩 방지)
      const isAtStart = el.scrollLeft <= 2 && e.deltaY < 0;
      const isAtEnd = el.scrollLeft >= maxScroll - 2 && e.deltaY > 0;
      if (isAtStart || isAtEnd) {
        return;
      }

      e.preventDefault();
      el.scrollLeft += e.deltaY;
      checkScrollability();
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    el.addEventListener('wheel', onWheel, { passive: false });

    // 크기 변경 및 자식 노드 변경 시 스크롤 가능 여부 자동 갱신
    let ro: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;

    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => checkScrollability());
      ro.observe(el);
    }

    if (typeof MutationObserver !== 'undefined') {
      mo = new MutationObserver(() => checkScrollability());
      mo.observe(el, { childList: true, subtree: true });
    }

    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      el.removeEventListener('wheel', onWheel);
      ro?.disconnect();
      mo?.disconnect();
    };
  }, [checkScrollability]);

  // 마우스 드래그 핸들러
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<T>) => {
      // 좌클릭만 허용
      if (e.button !== 0) return;
      const el = scrollRef.current;
      if (!el) return;

      isDraggingRef.current = true;
      hasMovedRef.current = false;
      dragStartXRef.current = e.pageX;
      scrollStartXRef.current = el.scrollLeft;

      // 드래그 중 지연 방지를 위해 즉시 auto로 전환
      el.style.scrollBehavior = 'auto';

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDraggingRef.current) return;
        const deltaX = moveEvent.pageX - dragStartXRef.current;
        if (Math.abs(deltaX) >= dragThreshold) {
          hasMovedRef.current = true;
        }
        el.scrollLeft = scrollStartXRef.current - deltaX;
        checkScrollability();
      };

      const handleMouseUp = () => {
        isDraggingRef.current = false;
        el.style.scrollBehavior = '';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);

        // 드래그 직후 발생하는 click 이벤트를 가드하기 위해 짧은 지연 후 리셋
        setTimeout(() => {
          hasMovedRef.current = false;
        }, 60);
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    },
    [dragThreshold, checkScrollability]
  );

  // 드래그 후 클릭 방지 핸들러 (컨테이너 onClickCapture용)
  const handleClickCapture = useCallback((e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, []);

  // 좌/우 화살표 버튼 클릭 시 부드럽게 스크롤
  const scrollPrev = useCallback(() => {
    scrollRef.current?.scrollBy({ left: -step, behavior: 'smooth' });
  }, [step]);

  const scrollNext = useCallback(() => {
    scrollRef.current?.scrollBy({ left: step, behavior: 'smooth' });
  }, [step]);

  return {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    handleMouseDown,
    handleClickCapture,
    scrollPrev,
    scrollNext,
    checkScrollability
  };
}
