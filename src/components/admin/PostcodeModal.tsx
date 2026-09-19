'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { extractBusanRegion } from '@/lib/location/busan-regions';

declare global {
  interface Window {
    daum?: {
      Postcode: new (options: {
        oncomplete: (data: DaumPostcodeData) => void;
        onresize?: (size: { width: number; height: number }) => void;
        width?: string;
        height?: string;
      }) => {
        embed: (element: HTMLElement) => void;
        open: () => void;
      };
    };
  }
}

export interface DaumPostcodeData {
  address: string;
  roadAddress: string;
  jibunAddress: string;
  sido: string;
  sigungu: string;
  bname: string;
  bname1: string;
  bname2: string;
  buildingName: string;
  zonecode: string;
  query: string;
}

export interface SelectedAddressResult {
  roadAddress: string;
  buildingName: string;
  sigungu: string;
  bname: string;
  recommendedRegion: string;
}

interface PostcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (result: SelectedAddressResult) => void;
}

export function PostcodeModal({ isOpen, onClose, onSelect }: PostcodeModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    const initPostcode = () => {
      if (!containerRef.current || !window.daum?.Postcode) return;

      containerRef.current.innerHTML = '';

      new window.daum.Postcode({
        oncomplete: (data: DaumPostcodeData) => {
          const roadAddress = data.roadAddress || data.address;
          const buildingName = data.buildingName || '';
          const sigungu = data.sigungu || '';
          const bname = data.bname || (data as unknown as { bname2?: string }).bname2 || '';
          const jibunAddress = data.jibunAddress || (data as unknown as { autoJibunAddress?: string }).autoJibunAddress || '';
          const fullSearchText = `${roadAddress} ${jibunAddress} ${sigungu} ${bname} ${buildingName} ${data.query || ''}`;
          const recommendedRegion = extractBusanRegion(sigungu, bname, fullSearchText);

          onSelect({
            roadAddress,
            buildingName,
            sigungu,
            bname,
            recommendedRegion,
          });
          onClose();
        },
        width: '100%',
        height: '100%',
      }).embed(containerRef.current);

      if (isMounted) {
        setIsLoading(false);
      }
    };

    if (window.daum?.Postcode) {
      initPostcode();
    } else {
      const script = document.createElement('script');
      script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
      script.async = true;
      script.onload = () => {
        if (isMounted) {
          initPostcode();
        }
      };
      document.head.appendChild(script);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, onSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#EDE8E1] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EDE8E1] bg-[#FAF0E6]/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2D3748]">부산 주소 / 장소 검색</h3>
              <p className="text-[11px] text-[#718096]">도로명 주소나 건물명을 검색해 보세요.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            title="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 모달 본문 (우편번호 임베드 영역) */}
        <div className="relative w-full h-[460px] bg-gray-50 flex flex-col">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-white/80 z-10">
              <Loader2 className="w-6 h-6 text-[#E07A5F] animate-spin" />
              <span className="text-xs text-[#718096]">우편번호 검색을 불러오는 중...</span>
            </div>
          )}
          <div ref={containerRef} className="w-full h-full flex-1" />
        </div>

        {/* 모달 푸터 가이드 */}
        <div className="px-5 py-2.5 bg-[#FAF0E6]/20 border-t border-[#EDE8E1] text-center">
          <p className="text-[11px] text-[#718096]">
            주소를 선택하면 <span className="font-bold text-[#E07A5F]">지역 구역명</span>과 <span className="font-bold text-[#E07A5F]">지도 링크</span>가 자동 입력됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
