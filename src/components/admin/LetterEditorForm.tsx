'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Trash2, ArrowLeft, Save, MapPin, BookOpen, FileText, Sparkles } from 'lucide-react'
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

  // 장소 정보 (선택사항)
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

  // 단락 추가/제거 핸들러
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

  // 제출 핸들러
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
      setErrorMsg('대표 이미지를 업로드하거나 입력해주세요.')
      return
    }
    const validParagraphs = contentParagraphs.filter((p) => p.trim().length > 0)
    if (validParagraphs.length === 0) {
      setErrorMsg('본문 내용을 최소 한 단락 이상 작성해주세요.')
      return
    }
    if (!studyExpression.trim() || !studyMeaning.trim()) {
      setErrorMsg('오늘의 학습 포인트(표현 및 의미)를 입력해주세요.')
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
    <form onSubmit={handleSubmit} className="space-y-8 pb-16">
      {/* 상단 액션 바 */}
      <div className="flex items-center justify-between pb-4 border-b border-paper-sandstone/50">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-medium text-marine-ink/70 hover:text-marine-blue transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          돌아가기
        </button>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-5 py-2.5 bg-marine-blue text-white rounded-xl text-xs font-semibold hover:bg-marine-navy transition-all shadow-md hover:shadow-lg disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {isSubmitting
              ? '저장 중...'
              : isEdit
              ? '수정 완료하기'
              : '새 편지 발행하기'}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
          {errorMsg}
        </div>
      )}

      {/* 섹션 1: 기본 정보 */}
      <div className="bg-white/80 backdrop-blur-sm border border-paper-sandstone/50 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-marine-navy font-bold text-sm">
          <FileText className="w-4 h-4 text-marine-blue" />
          <span>기본 정보</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
              편지 제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 광안리 밤바다와 민락더마켓 이야기"
              className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
              발행일 (YYYY.MM.DD)
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="2026.09.13"
              className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
            >
              <option value="gourmet">미식 (Gourmet)</option>
              <option value="cafe">카페 (Cafe)</option>
              <option value="walk">산책 &amp; 골목 (Walk)</option>
              <option value="daily">로컬 일상 (Daily)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
              지역 (부산 상세 구역)
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="예: 광안리, 해운대, 전포동, 남포동"
              className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
            />
          </div>
        </div>

        {!isEdit && (
          <div>
            <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
              고유 식별자 ID (선택사항, 미입력 시 자동 생성)
            </label>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="예: letter-gwangalli-night (영문, 숫자, 하이픈 권장)"
              className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
            />
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
            한 줄 요약 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="예: 바닷바람을 맞으며 맛보는 부산 현지인들의 야경 스팟"
            className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
          />
        </div>

        {/* Supabase Storage 이미지 업로더 */}
        <div>
          <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
            대표 썸네일 사진 <span className="text-red-500">*</span>
          </label>
          <ImageUploader value={imageUrl} onChange={setImageUrl} />
        </div>
      </div>

      {/* 섹션 2: 일본어 본문 내용 */}
      <div className="bg-white/80 backdrop-blur-sm border border-paper-sandstone/50 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-marine-navy font-bold text-sm">
            <BookOpen className="w-4 h-4 text-marine-blue" />
            <span>일본어 본문 편지 (단락별 작성)</span>
          </div>
          <button
            type="button"
            onClick={handleAddParagraph}
            className="flex items-center gap-1 text-xs font-semibold text-marine-blue hover:text-marine-navy transition-colors bg-marine-mist/40 px-2.5 py-1 rounded-lg"
          >
            <Plus className="w-3.5 h-3.5" />
            단락 추가
          </button>
        </div>

        <p className="text-[11px] text-marine-ink/60">
          단락을 구분하여 일본어로 부산의 풍경과 일상을 편지글처럼 편안하게 적어보세요.
        </p>

        <div className="space-y-3">
          {contentParagraphs.map((paragraph, index) => (
            <div key={index} className="relative group flex gap-2 items-start">
              <span className="text-[11px] font-mono font-bold text-marine-ink/40 pt-2 w-5 text-right">
                {index + 1}
              </span>
              <textarea
                rows={3}
                value={paragraph}
                onChange={(e) => handleParagraphChange(index, e.target.value)}
                placeholder={`단락 ${index + 1} 일본어 문장을 입력하세요...`}
                className="flex-1 text-xs p-3 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink leading-relaxed focus:outline-none focus:ring-1 focus:ring-marine-blue"
              />
              <button
                type="button"
                onClick={() => handleRemoveParagraph(index)}
                title="단락 삭제"
                className="p-2 text-marine-ink/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors mt-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 섹션 3: 오늘의 학습 포인트 (Study Point) */}
      <div className="bg-white/80 backdrop-blur-sm border border-paper-sandstone/50 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-marine-navy font-bold text-sm">
          <Sparkles className="w-4 h-4 text-marine-blue" />
          <span>오늘의 학습 포인트 (Study Point)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
              핵심 표현 (일본어) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={studyExpression}
              onChange={(e) => setStudyExpression(e.target.value)}
              placeholder="예: 潮風を感じながら"
              className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
              의미 &amp; 해석 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={studyMeaning}
              onChange={(e) => setStudyMeaning(e.target.value)}
              placeholder="예: 바닷바람을 느끼면서"
              className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
            해설 및 뉘앙스 메모
          </label>
          <textarea
            rows={2}
            value={studyMemo}
            onChange={(e) => setStudyMemo(e.target.value)}
            placeholder="예: 부산 바닷가를 산책할 때 자주 쓰이는 낭만적인 표현입니다."
            className="w-full text-xs p-3 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
          />
        </div>
      </div>

      {/* 섹션 4: 장소 정보 (선택 사항) */}
      <div className="bg-white/80 backdrop-blur-sm border border-paper-sandstone/50 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-marine-navy font-bold text-sm">
            <MapPin className="w-4 h-4 text-marine-blue" />
            <span>장소 &amp; 방문 팁 정보 (선택사항)</span>
          </div>
          <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
            <input
              type="checkbox"
              checked={hasPlaceInfo}
              onChange={(e) => setHasPlaceInfo(e.target.checked)}
              className="rounded border-paper-sandstone text-marine-blue focus:ring-marine-blue w-4 h-4"
            />
            <span>장소 정보 추가하기</span>
          </label>
        </div>

        {hasPlaceInfo && (
          <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-paper-sandstone/40">
            <div>
              <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
                한국어 상호명
              </label>
              <input
                type="text"
                value={koreanName}
                onChange={(e) => setKoreanName(e.target.value)}
                placeholder="예: 밀락더마켓"
                className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
                일본어/카타카나 표기
              </label>
              <input
                type="text"
                value={katakanaName}
                onChange={(e) => setKatakanaName(e.target.value)}
                placeholder="예: ミルラク・ザ・マーケット"
                className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
                도로명 주소
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="예: 부산 수영구 민락수변로 17번길 56"
                className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
                가까운 지하철 / 대중교통
              </label>
              <input
                type="text"
                value={subway}
                onChange={(e) => setSubway(e.target.value)}
                placeholder="예: 2호선 광안역 3번 출구 도보 15분"
                className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
                영업시간 및 휴무일
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="예: 10:00 - 24:00"
                  className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
                />
                <input
                  type="text"
                  value={closedDay}
                  onChange={(e) => setClosedDay(e.target.value)}
                  placeholder="예: 연중무휴"
                  className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
                혼밥 난이도
              </label>
              <select
                value={soloFriendly}
                onChange={(e) => setSoloFriendly(e.target.value as SoloFriendly)}
                className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
              >
                <option value="welcome">혼자서도 매우 환영 (welcome)</option>
                <option value="possible">혼밥 가능 (possible)</option>
                <option value="difficult">혼밥 난이도 높음/다인 권장 (difficult)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
                매운맛 난이도
              </label>
              <select
                value={spicyLevel}
                onChange={(e) => setSpicyLevel(Number(e.target.value) as SpicyLevel)}
                className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
              >
                <option value={0}>0단계 (전혀 안 매움)</option>
                <option value={1}>1단계 (살짝 매움 / 김치 수준)</option>
                <option value={2}>2단계 (신라면 수준)</option>
                <option value={3}>3단계 (불닭 수준 / 매움 주의)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-marine-ink">
                <input
                  type="checkbox"
                  checked={cardOk}
                  onChange={(e) => setCardOk(e.target.checked)}
                  className="rounded border-paper-sandstone text-marine-blue focus:ring-marine-blue w-4 h-4"
                />
                <span>신용카드 / 해외카드 결제 가능</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-semibold text-marine-ink/80 mb-1">
                맵 링크 (네이버 / 구글)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="url"
                  value={naverMapUrl}
                  onChange={(e) => setNaverMapUrl(e.target.value)}
                  placeholder="네이버 지도 URL"
                  className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
                />
                <input
                  type="url"
                  value={googleMapUrl}
                  onChange={(e) => setGoogleMapUrl(e.target.value)}
                  placeholder="구글 지도 URL"
                  className="w-full text-xs px-3 py-2 bg-paper-parchment/30 border border-paper-sandstone/70 rounded-xl text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 하단 완료 버튼 */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-2.5 bg-paper-sandstone/30 hover:bg-paper-sandstone/50 text-marine-ink rounded-xl text-xs font-medium transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-marine-blue text-white rounded-xl text-xs font-semibold hover:bg-marine-navy transition-all shadow-md hover:shadow-lg disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {isSubmitting
            ? '저장 중...'
            : isEdit
            ? '수정 완료하기'
            : '새 편지 발행하기'}
        </button>
      </div>
    </form>
  )
}
