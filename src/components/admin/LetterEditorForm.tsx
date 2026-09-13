'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ArrowLeft, Send, Sparkles, MapPin, BookOpen, FileText } from 'lucide-react'
import ImageUploader from './ImageUploader'
import { createLetter, updateLetter, LetterFormData } from '@/lib/actions/letter-actions'
import type { Letter, Category, SoloFriendly, SpicyLevel } from '@/types'

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
  const [region, setRegion] = useState(initialData?.region || '광안리')
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl || '')
  const [summary, setSummary] = useState(initialData?.summary || '')
  const [contentParagraphs, setContentParagraphs] = useState<string[]>(
    initialData?.content && initialData.content.length > 0
      ? initialData.content
      : ['']
  )

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
  const [hasPlaceInfo, setHasPlaceInfo] = useState(
    !!initialData?.placeInfo
  )
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
  const [googleMapUrl, setGoogleMapUrl] = useState(
    initialData?.placeInfo?.googleMapUrl || ''
  )

  // 단락 추가/제거
  const handleAddParagraph = () => {
    setContentParagraphs([...contentParagraphs, ''])
  }

  const handleParagraphChange = (index: number, text: string) => {
    const updated = [...contentParagraphs]
    updated[index] = text
    setContentParagraphs(updated)
  }

  const handleRemoveParagraph = (index: number) => {
    if (contentParagraphs.length === 1) {
      setContentParagraphs([''])
      return
    }
    setContentParagraphs(contentParagraphs.filter((_, i) => i !== index))
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
    const validParagraphs = contentParagraphs.filter((p) => p.trim().length > 0)
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
        placeInfo: hasPlaceInfo
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
              googleMapUrl: googleMapUrl.trim(),
            }
          : undefined,
      }

      if (isEdit && initialData) {
        await updateLetter(initialData.id, payload)
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
            <p className="text-[11px] text-[#718096]">제목과 카테고리, 지역을 지정합니다.</p>
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
              발행일 (YYYY.MM.DD)
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="2026.09.13"
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

          <div>
            <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
              지역 (부산 상세 구역)
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="예: 광안리, 해운대, 전포동, 남포동"
              className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
            />
          </div>

          {!isEdit && (
            <div>
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
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                placeholder="일본어 문장을 자유롭게 적어보세요..."
                className="w-full text-xs p-1 bg-transparent text-[#2D3748] leading-relaxed placeholder:text-gray-400 focus:outline-none resize-y"
              />
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

      {/* 카드 4: 소개하고 싶은 장소 & 팁 (선택) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EDE8E1] card-shadow space-y-4">
        {/* 섹션 헤더 & 모던 토글 스위치 */}
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-[#EDE8E1]/60">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="w-8 h-8 rounded-xl bg-[#FAF0E6] flex items-center justify-center text-[#E07A5F] shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="text-sm font-bold text-[#2D3748] whitespace-nowrap">4. 장소 &amp; 방문 팁</h2>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#FAF0E6] text-[#E07A5F] border border-[#F4DDD4]">
                  선택
                </span>
              </div>
              <p className="text-[11px] text-[#718096] mt-0.5 truncate">가게나 명소의 현지 방문 팁</p>
            </div>
          </div>

          {/* 깔끔한 슬라이드 토글 스위치 (줄바꿈 방지) */}
          <label className="shrink-0 flex items-center gap-2 cursor-pointer select-none py-1">
            <span className="text-xs font-bold text-[#2D3748] whitespace-nowrap">
              {hasPlaceInfo ? '입력 중' : '추가'}
            </span>
            <div className="relative inline-flex items-center">
              <input
                type="checkbox"
                checked={hasPlaceInfo}
                onChange={(e) => setHasPlaceInfo(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-10 h-5 rounded-full transition-colors duration-200 ease-in-out ${
                  hasPlaceInfo ? 'bg-[#E07A5F]' : 'bg-[#EDE8E1]'
                }`}
              />
              <div
                className={`absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-xs transform transition-transform duration-200 ease-in-out ${
                  hasPlaceInfo ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </div>
          </label>
        </div>

        {!hasPlaceInfo && (
          <div
            onClick={() => setHasPlaceInfo(true)}
            className="py-3 px-4 rounded-2xl bg-[#FAF0E6]/20 border border-dashed border-[#EDE8E1] hover:border-[#E07A5F]/60 text-center cursor-pointer transition-colors"
          >
            <p className="text-xs text-[#718096]">
              추천하고 싶은 부산 맛집이나 카페가 있다면 <span className="font-bold text-[#E07A5F] underline underline-offset-2">정보 추가</span>를 켜보세요.
            </p>
          </div>
        )}

        {hasPlaceInfo && (
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
              <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
                도로명 주소 (택시 보여주기용)
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="예: 부산 수영구 민락수변로 17번길 56"
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

            <div>
              <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
                네이버 지도 URL
              </label>
              <input
                type="url"
                value={naverMapUrl}
                onChange={(e) => setNaverMapUrl(e.target.value)}
                placeholder="https://naver.me/..."
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3748] mb-1.5">
                구글 지도 URL
              </label>
              <input
                type="url"
                value={googleMapUrl}
                onChange={(e) => setGoogleMapUrl(e.target.value)}
                placeholder="https://maps.google.com/..."
                className="w-full text-xs px-3.5 py-2.5 bg-[#FAF0E6]/20 border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F]"
              />
            </div>
          </div>
        )}
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
    </form>
  )
}
