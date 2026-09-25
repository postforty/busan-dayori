'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ArrowLeft, Send, Sparkles, MapPin, BookOpen, FileText, Navigation, CheckCircle2 } from 'lucide-react'
import ImageUploader from './ImageUploader'
import { createLetter, updateLetter, LetterFormData } from '@/lib/actions/letter-actions'
import type { Letter, LetterParagraph, Category, SoloFriendly, SpicyLevel } from '@/types'
import { PostcodeModal, SelectedAddressResult } from './PostcodeModal'
import {
  generateNaverMapUrl,
  generateKakaoMapUrl,
  generateGoogleMapUrl,
  getBusanRegionFromCoords,
  extractBusanRegion,
} from '@/lib/location/busan-regions'

interface LetterEditorFormProps {
  initialData?: Letter
  isEdit?: boolean
}

export default function LetterEditorForm({
  initialData,
  isEdit = false,
}: LetterEditorFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // 기본 상태 초기화
  const [id, setId] = useState(initialData?.id || '')
  const [title, setTitle] = useState(initialData?.title || '')
  const [date, setDate] = useState(
    initialData?.date || new Date().toISOString().slice(0, 10).replace(/-/g, '.')
  )
  const [category, setCategory] = useState<Category>(
    initialData?.category || 'gourmet'
  )
  const [region, setRegion] = useState(initialData?.region || '')
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '')
  const [summary, setSummary] = useState(initialData?.summary || '')
  const [contentParagraphs, setContentParagraphs] = useState<LetterParagraph[]>(() => {
    if (initialData?.content && initialData.content.length > 0) {
      return initialData.content.map((p) =>
        typeof p === 'string'
          ? { text: p, imageUrl: undefined }
          : { text: p.text || '', imageUrl: p.imageUrl, pronunciation: p.pronunciation }
      )
    }
    return [{ text: '', imageUrl: undefined }]
  })

  // 학습 포인트
  const [studyExpression, setStudyExpression] = useState(
    initialData?.studyPoint?.expression || ''
  )
  const [studyMeaning, setStudyMeaning] = useState(
    initialData?.studyPoint?.meaning || ''
  )
  const [studyMemo, setStudyMemo] = useState(
    initialData?.studyPoint?.memo || ''
  )

  // 장소 정보
  const [koreanName, setKoreanName] = useState(
    initialData?.placeInfo?.koreanName || ''
  )
  const [katakanaName, setKatakanaName] = useState(
    initialData?.placeInfo?.katakanaName || ''
  )
  const [address, setAddress] = useState(
    initialData?.placeInfo?.address || ''
  )
  const [subway, setSubway] = useState(
    initialData?.placeInfo?.subway || ''
  )
  const [hours, setHours] = useState(
    initialData?.placeInfo?.hours || ''
  )
  const [closedDay, setClosedDay] = useState(
    initialData?.placeInfo?.closedDay || ''
  )
  const [soloFriendly, setSoloFriendly] = useState<SoloFriendly>(
    initialData?.placeInfo?.soloFriendly || 'possible'
  )
  const [spicyLevel, setSpicyLevel] = useState<SpicyLevel>(
    initialData?.placeInfo?.spicyLevel ?? 1
  )
  const [cardOk, setCardOk] = useState(
    initialData?.placeInfo?.cardOk ?? true
  )
  const [naverMapUrl, setNaverMapUrl] = useState(
    initialData?.placeInfo?.naverMapUrl || ''
  )
  const [kakaoMapUrl, setKakaoMapUrl] = useState(
    initialData?.placeInfo?.kakaoMapUrl || ''
  )
  const [googleMapUrl, setGoogleMapUrl] = useState(
    initialData?.placeInfo?.googleMapUrl || ''
  )

  // 위치 및 우편번호 모달 상태
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const [locationStatus, setLocationStatus] = useState<string | null>(null)

  // 단락 추가/제거/내용변경
  const handleAddParagraph = () => {
    setContentParagraphs([...contentParagraphs, { text: '', imageUrl: undefined }])
  }

  const handleParagraphTextChange = (index: number, text: string) => {
    const updated = [...contentParagraphs]
    updated[index] = { ...updated[index], text, pronunciation: undefined }
    setContentParagraphs(updated)
  }

  const handleParagraphImageChange = (index: number, url: string) => {
    const updated = [...contentParagraphs]
    updated[index] = { ...updated[index], imageUrl: url.trim() || undefined }
    setContentParagraphs(updated)
  }

  const handleRemoveParagraph = (index: number) => {
    if (contentParagraphs.length === 1) {
      setContentParagraphs([{ text: '', imageUrl: undefined }])
      return
    }
    setContentParagraphs(contentParagraphs.filter((_, i) => i !== index))
  }

  // 주소 검색 결과 반영
  const handleAddressSelect = (result: SelectedAddressResult) => {
    const targetRegion =
      result.recommendedRegion ||
      (result.bname ? result.bname.replace(/[0-9]+가$/, '') : '') ||
      result.sigungu ||
      '부산'

    setRegion(targetRegion)
    setAddress(result.roadAddress)

    const targetName = koreanName.trim() || result.buildingName
    if (!koreanName.trim() && result.buildingName) {
      setKoreanName(result.buildingName)
    }

    const naver = generateNaverMapUrl(result.roadAddress, targetName)
    const kakao = generateKakaoMapUrl(result.roadAddress, targetName)
    const google = generateGoogleMapUrl(result.roadAddress, targetName)

    setNaverMapUrl(naver)
    setKakaoMapUrl(kakao)
    setGoogleMapUrl(google)

    setLocationStatus(`지역(${targetRegion}) 및 지도 링크가 자동 연동되었습니다.`)
    setTimeout(() => setLocationStatus(null), 3500)
  }

  // 단말기 현재 위치(GPS) 처리
  const handleGetCurrentLocation = () => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      alert('현재 브라우저 환경에서 단말기 위치 정보(GPS)를 지원하지 않습니다.')
      return
    }

    setIsLocating(true)
    setLocationStatus('단말기 현재 위치를 확인하는 중...')

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false)
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude

        // 1. 단말기 위경도로부터 부산 지역 자동 판별하여 빨간 박스(region)에 즉시 채움
        const autoRegion = getBusanRegionFromCoords(lat, lng)
        if (autoRegion) {
          setRegion(autoRegion)
        }

        // 2. 좌표 기반 3대 지도 링크 즉시 반영
        const targetName = koreanName.trim()
        const naver = generateNaverMapUrl(address, targetName, lat, lng)
        const kakao = generateKakaoMapUrl(address, targetName, lat, lng)
        const google = generateGoogleMapUrl(address, targetName, lat, lng)

        setNaverMapUrl(naver)
        setKakaoMapUrl(kakao)
        setGoogleMapUrl(google)

        setLocationStatus(`현재 위치(${autoRegion}) 및 지도 링크가 자동 반영되었습니다.`)
        setTimeout(() => {
          setLocationStatus(null)
        }, 3500)

        // 4. 비동기 역지오코딩 시도 (주소 필드가 비어있다면 대략적인 행정구역/도로명 보정)
        try {
          fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
          )
            .then((res) => res.json())
            .then((geoData) => {
              if (geoData?.address) {
                const a = geoData.address
                const sigungu = a.city_district || a.borough || a.county || ''
                const bname = a.suburb || a.neighbourhood || a.quarter || a.village || ''
                const road = a.road || ''
                const refined = extractBusanRegion(sigungu, bname, `${road} ${bname} ${sigungu}`)
                if (refined && refined !== '부산') {
                  setRegion(refined)
                }
                setAddress((prev) => {
                  if (!prev.trim()) {
                    const fullAddr = [a.province || a.city, sigungu, road, bname]
                      .filter(Boolean)
                      .join(' ')
                    return fullAddr || prev
                  }
                  return prev
                })
              }
            })
            .catch(() => {
              // 네트워크 실패나 제한 시에도 이미 getBusanRegionFromCoords로 즉시 채워져 있으므로 무시
            })
        } catch {
          // ignore
        }
      },
      (err) => {
        setIsLocating(false)
        setLocationStatus(null)
        let msg = '위치 정보를 가져올 수 없습니다.'
        if (err.code === 1) {
          msg = '위치 정보 권한이 거부되었습니다. 브라우저 설정에서 위치 접근을 허용해주세요.'
        } else if (err.code === 2) {
          msg = '현재 위치를 확인할 수 없습니다. 네트워크 상태를 확인해주세요.'
        } else if (err.code === 3) {
          msg = '위치 확인 시간이 초과되었습니다.'
        }
        alert(msg)
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    )
  }

  // 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMsg(null)

    if (!title.trim()) {
      setErrorMsg('편지 제목을 입력해주세요.')
      return
    }
    if (!summary.trim()) {
      setErrorMsg('한 줄 요약을 입력해주세요.')
      return
    }
    if (!imageUrl.trim()) {
      setErrorMsg('대표 사진을 업로드하거나 URL을 입력해주세요.')
      return
    }
    const validParagraphs = contentParagraphs.filter(
      (p) => p.text.trim().length > 0 || Boolean(p.imageUrl)
    )
    if (validParagraphs.length === 0) {
      setErrorMsg('본문 내용을 최소 한 단락 이상 작성해주세요.')
      return
    }
    if (!studyExpression.trim() || !studyMeaning.trim()) {
      setErrorMsg('오늘의 학습 포인트(핵심 표현 및 의미)를 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const payload: LetterFormData = {
        id: isEdit ? initialData!.id : id.trim() || undefined,
        title: title.trim(),
        date: date.trim(),
        category,
        region: region.trim(),
        imageUrl: imageUrl.trim(),
        summary: summary.trim(),
        content: validParagraphs,
        studyPoint: {
          expression: studyExpression.trim(),
          meaning: studyMeaning.trim(),
          memo: studyMemo.trim(),
        },
        placeInfo:
          koreanName.trim() || address.trim() || naverMapUrl.trim() || kakaoMapUrl.trim() || googleMapUrl.trim()
            ? {
                koreanName: koreanName.trim(),
                katakanaName: katakanaName.trim(),
                address: address.trim(),
                subway: subway.trim(),
                hours: hours.trim(),
                closedDay: closedDay.trim(),
                soloFriendly,
                spicyLevel,
                cardOk,
                naverMapUrl: naverMapUrl.trim(),
                kakaoMapUrl: kakaoMapUrl.trim(),
                googleMapUrl: googleMapUrl.trim(),
              }
            : undefined,
      }

      if (isEdit && initialData) {
        await updateLetter(initialData.id, payload, initialData.imageUrl)
        router.push(`/letters/${initialData.id}`)
      } else {
        const res = await createLetter(payload)
        router.push(`/letters/${res.id}`)
      }
      router.refresh()
    } catch (err: unknown) {
      console.error('편지 저장 에러:', err)
      setErrorMsg(err instanceof Error ? err.message : '편지 저장에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-16">
      {/* 상단 네비게이션 & 발행 버튼 바 */}
      <div className="flex items-center justify-between py-2 border-b border-[#EDE8E1]">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDE8E1] text-xs font-semibold text-[#718096] hover:text-[#2D3748] hover:bg-gray-50 transition-all shadow-2xs active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>돌아가기</span>
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E07A5F] hover:bg-[#C8654B] text-white text-xs font-bold shadow-md shadow-[#E07A5F]/25 active:scale-95 transition-all disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>
            {isSubmitting
              ? '저장 중...'
              : isEdit
              ? '수정 완료'
              : '편지 발행하기'}
          </span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-4 bg-[#FAF0E6] border border-[#F4DDD4] rounded-2xl text-xs text-[#8C5243] font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E07A5F] shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 카드 1: 기본 정보 */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE8E1] card-shadow space-y-4">
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#EDE8E1]/60">
          <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F]">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#2D3748]">1. 편지 기본 정보</h2>
            <p className="text-[11px] text-[#718096]">제목과 발행일, 카테고리를 지정합니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              편지 제목 <span className="text-[#E07A5F]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 광안리 밤바다와 민락더마켓 이야기"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              발행일 (YYYY.MM.DD) <span className="text-[#E07A5F]">*</span>
            </label>
            <input
              type="text"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="2026.04.15"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            >
              <option value="gourmet">미식 (Gourmet・グルメ)</option>
              <option value="cafe">카페 (Cafe・カフェ)</option>
              <option value="walk">산책 (Walk・散歩)</option>
              <option value="daily">일상 (Daily・日常)</option>
            </select>
          </div>

          {!isEdit && (
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
                식별자 ID (미입력 시 자동 생성)
              </label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="예: letter-gwangalli-night"
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
              />
            </div>
          )}

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              한 줄 요약 <span className="text-[#E07A5F]">*</span>
            </label>
            <input
              type="text"
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="예: 바닷바람을 맞으며 맛보는 부산 현지인들의 야경 스팟"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>
        </div>

        {/* 대표 사진 */}
        <div className="pt-2 border-t border-[#EDE8E1]/60">
          <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
            대표 사진 <span className="text-[#E07A5F]">*</span>
          </label>
          <ImageUploader value={imageUrl} onChange={setImageUrl} />
        </div>
      </div>

      {/* 카드 2: 일본어 본문 편지 */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE8E1] card-shadow space-y-4">
        {/* 섹션 헤더 */}
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#EDE8E1]/60">
          <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F] shrink-0">
            <BookOpen className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#2D3748]">2. 일본어 편지 본문</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#E07A5F] border border-[#F4DDD4]">
                총 {contentParagraphs.length}개 단락
              </span>
            </div>
            <p className="text-[11px] text-[#718096] mt-0.5">
              단락을 나누어 따뜻한 편지글로 작성해보세요.
            </p>
          </div>
        </div>

        {/* 단락 리스트 */}
        <div className="space-y-3.5">
          {contentParagraphs.map((paragraph, index) => (
            <div
              key={index}
              className="bg-[#FAF0E6]/25 border border-[#EDE8E1] focus-within:border-[#E07A5F] focus-within:ring-2 focus-within:ring-[#E07A5F]/20 rounded-2xl p-3.5 transition-all"
            >
              {/* 단락 헤더 (번호 뱃지 & 삭제 버튼) */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EDE8E1]/40">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-[#EDE8E1] text-[#E07A5F]">
                  단락 {index + 1}
                </span>

                {contentParagraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveParagraph(index)}
                    className="flex items-center gap-1 text-[11px] text-[#718096] hover:text-red-600 hover:bg-red-50 px-2 py-0.5 rounded-md transition-colors active:scale-95"
                    title="이 단락 삭제"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>삭제</span>
                  </button>
                )}
              </div>

              {/* 단락 텍스트에어리어 (전폭 활용) */}
              <textarea
                rows={3}
                value={paragraph.text}
                onChange={(e) => handleParagraphTextChange(index, e.target.value)}
                placeholder="일본어 문장을 자유롭게 적어보세요..."
                className="w-full text-xs p-1 bg-transparent text-[#2D3748] leading-relaxed placeholder:text-gray-400 focus:outline-none resize-y"
              />

              {/* 단락별 사진 첨부 (선택 사항) */}
              <div className="pt-2 border-t border-[#EDE8E1]/50">
                <ImageUploader
                  value={paragraph.imageUrl || ''}
                  onChange={(url) => handleParagraphImageChange(index, url)}
                  variant="compact"
                />
              </div>
            </div>
          ))}

          {/* 넓고 편안한 단락 추가 버튼 */}
          <button
            type="button"
            onClick={handleAddParagraph}
            className="w-full py-2.5 rounded-2xl border border-dashed border-[#E07A5F]/40 hover:border-[#E07A5F] bg-[#FAF0E6]/30 hover:bg-[#FAF0E6]/70 text-xs font-bold text-[#E07A5F] flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>새 단락 추가하기</span>
          </button>
        </div>
      </div>

      {/* 카드 3: 오늘의 학습 포인트 */}
      {/* 카드 3: 오늘의 학습 포인트 */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE8E1] card-shadow space-y-4">
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#EDE8E1]/60">
          <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F] shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-[#2D3748]">3. 오늘의 학습 포인트</h2>
            <p className="text-[11px] text-[#718096] mt-0.5">편지 속 핵심 표현과 뉘앙스를 정리합니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              핵심 표현 (일본어) <span className="text-[#E07A5F]">*</span>
            </label>
            <input
              type="text"
              required
              value={studyExpression}
              onChange={(e) => setStudyExpression(e.target.value)}
              placeholder="예: 潮風を感じながら"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              한국어 뜻 &amp; 해석 <span className="text-[#E07A5F]">*</span>
            </label>
            <input
              type="text"
              required
              value={studyMeaning}
              onChange={(e) => setStudyMeaning(e.target.value)}
              placeholder="예: 바닷바람을 느끼면서"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              뉘앙스 및 실전 메모
            </label>
            <textarea
              rows={2}
              value={studyMemo}
              onChange={(e) => setStudyMemo(e.target.value)}
              placeholder="예: 부산 바닷가를 산책할 때 자주 쓰이는 낭만적인 표현입니다."
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>
        </div>
      </div>

      {/* 카드 4: 소개하고 싶은 장소 & 팁 */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE8E1] card-shadow space-y-4">
        {/* 섹션 헤더 */}
        <div className="flex items-center gap-2.5 pb-2.5 border-b border-[#EDE8E1]/60">
          <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F] shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-bold text-[#2D3748]">4. 장소 &amp; 방문 팁</h2>
            <p className="text-[11px] text-[#718096] mt-0.5">가게나 명소의 현지 방문 팁과 지역 정보를 지정합니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              한국어 상호명
            </label>
            <input
              type="text"
              value={koreanName}
              onChange={(e) => setKoreanName(e.target.value)}
              placeholder="예: 밀락더마켓"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              카타카나 표기
            </label>
            <input
              type="text"
              value={katakanaName}
              onChange={(e) => setKatakanaName(e.target.value)}
              placeholder="예: ミルラク・ザ・マーケット"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5 whitespace-nowrap">
              도로명 주소 <span className="text-[11px] font-normal text-[#718096]">(택시 보여주기용)</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="예: 부산 수영구 민락수변로 17번길 56"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => setIsPostcodeOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#FAF0E6] text-[#E07A5F] hover:bg-[#E07A5F]/15 rounded-xl border border-[#F4DDD4] transition-all active:scale-95 whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
                title="주소나 건물명으로 도로명 주소 찾기"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E07A5F]" />
                <span>주소 찾기</span>
              </button>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-gray-50 text-gray-700 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all active:scale-95 whitespace-nowrap shrink-0 disabled:opacity-50 shadow-2xs cursor-pointer"
                title="현재 기기 위치(GPS) 이용"
              >
                <Navigation className={`w-3.5 h-3.5 text-blue-500 ${isLocating ? 'animate-spin' : ''}`} />
                <span>{isLocating ? '위치 확인 중...' : '현재 위치(GPS)'}</span>
              </button>
              {locationStatus && (
                <div className="flex items-center gap-1 text-[11px] text-[#E07A5F] font-medium animate-fade-in pl-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{locationStatus}</span>
                </div>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5 whitespace-nowrap">
              지역 <span className="text-[11px] font-normal text-[#718096]">(부산 상세 구역 · 주소/GPS 선택 시 자동 입력)</span>
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="예: 광안리, 해운대, 전포동, 남포동"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
                가까운 지하철 / 대중교통
              </label>
              <input
                type="text"
                value={subway}
                onChange={(e) => setSubway(e.target.value)}
                placeholder="예: 2호선 광안역 3번 출구 도보 15분"
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
                영업시간 &amp; 휴무일
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="예: 10:00 - 24:00"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                />
                <input
                  type="text"
                  value={closedDay}
                  onChange={(e) => setClosedDay(e.target.value)}
                  placeholder="예: 연중무휴"
                  className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
                혼밥 난이도
              </label>
              <select
                value={soloFriendly}
                onChange={(e) => setSoloFriendly(e.target.value as SoloFriendly)}
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
              >
                <option value="welcome">혼자서도 매우 환영 (welcome)</option>
                <option value="possible">혼밥 가능 (possible)</option>
                <option value="difficult">혼밥 난이도 높음/다인 권장 (difficult)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
                매운맛 단계
              </label>
              <select
                value={spicyLevel}
                onChange={(e) => setSpicyLevel(Number(e.target.value) as SpicyLevel)}
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
              >
                <option value={0}>0단계 (전혀 안 매움)</option>
                <option value={1}>1단계 (살짝 매움 / 김치 수준)</option>
                <option value={2}>2단계 (신라면 수준)</option>
                <option value={3}>3단계 (매움 주의)</option>
              </select>
            </div>

            <div className="sm:col-span-2 flex items-center gap-2 pt-1">
              <label className="flex items-center gap-2 text-xs font-semibold text-[#2D3748] cursor-pointer">
                <input
                  type="checkbox"
                  checked={cardOk}
                  onChange={(e) => setCardOk(e.target.checked)}
                  className="rounded border-[#EDE8E1] text-[#E07A5F] focus:ring-[#E07A5F] w-4 h-4 accent-[#E07A5F]"
                />
                <span>신용카드 / 해외카드(트래블로그 등) 결제 가능</span>
              </label>
            </div>

            <div className="sm:col-span-2 pt-2 border-t border-[#EDE8E1]/60">
              <label className="block text-xs font-bold text-[#2D3748] mb-2">
                지도 서비스 바로가기 링크 <span className="text-[11px] font-normal text-[#718096]">(주소 검색 시 자동 생성)</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="block text-xs font-bold text-[#2D3748] mb-1.5">
                    네이버 지도 URL
                  </span>
                  <input
                    type="url"
                    value={naverMapUrl}
                    onChange={(e) => setNaverMapUrl(e.target.value)}
                    placeholder="https://map.naver.com/..."
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-bold text-[#2D3748] mb-1.5">
                    카카오맵 URL
                  </span>
                  <input
                    type="url"
                    value={kakaoMapUrl}
                    onChange={(e) => setKakaoMapUrl(e.target.value)}
                    placeholder="https://map.kakao.com/..."
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                  />
                </div>

                <div>
                  <span className="block text-xs font-bold text-[#2D3748] mb-1.5">
                    구글 지도 URL
                  </span>
                  <input
                    type="url"
                    value={googleMapUrl}
                    onChange={(e) => setGoogleMapUrl(e.target.value)}
                    placeholder="https://maps.google.com/..."
                    className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* 하단 최종 액션 버튼 바 */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EDE8E1]">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 bg-white hover:bg-gray-50 border border-[#EDE8E1] text-[#718096] rounded-2xl text-xs font-bold transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#E07A5F] hover:bg-[#C8654B] text-white rounded-2xl text-xs font-bold transition-all shadow-md shadow-[#E07A5F]/25 hover:shadow-lg active:scale-95 disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
          <span>
            {isSubmitting
              ? '저장 중...'
              : isEdit
              ? '수정 완료하기'
              : '새 편지 발행하기'}
          </span>
        </button>
      </div>

      <PostcodeModal
        isOpen={isPostcodeOpen}
        onClose={() => setIsPostcodeOpen(false)}
        onSelect={handleAddressSelect}
      />
    </form>
  )
}
