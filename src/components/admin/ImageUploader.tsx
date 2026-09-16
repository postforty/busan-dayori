'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { resizeImageToWebP, extractStoragePath } from '@/utils/image'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  bucketName?: string
}

export default function ImageUploader({
  value,
  onChange,
  bucketName = 'letter-images',
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatusText, setUploadStatusText] = useState<string>('')
  const [dragOver, setDragOver] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 이번 편집 세션에서 새로 업로드한 파일의 URL 추적 (저장 전 다시 교체 시 세션 임시 파일 정리용)
  const sessionUploadedUrl = useRef<string | null>(null)

  // 세션 내 임시 업로드 파일만 정리하는 헬퍼 (DB에 저장된 기존 이미지의 삭제는 서버 액션이 담당)
  const cleanupSessionFile = async (urlToClean: string | null) => {
    if (!urlToClean || !sessionUploadedUrl.current) return
    // 세션에서 업로드한 파일이 아니면 건드리지 않음
    if (urlToClean !== sessionUploadedUrl.current) return

    const path = extractStoragePath(urlToClean, bucketName)
    if (!path) return

    try {
      const supabase = createClient()
      await supabase.storage.from(bucketName).remove([path])
    } catch (err) {
      console.warn('[ImageUploader] 세션 임시 파일 정리 실패:', err)
    }
  }

  const handleUpload = async (file: File) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setErrorMsg('이미지 파일(JPG, PNG, WEBP, GIF 등)만 업로드할 수 있습니다.')
      return
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg('원본 파일 크기는 최대 15MB까지 가능합니다.')
      return
    }

    // 이번 세션에서 이전에 업로드한 임시 파일이 있으면 교체 전에 정리
    const prevSessionUrl = sessionUploadedUrl.current

    setIsUploading(true)
    setErrorMsg(null)
    setUploadStatusText('사진을 모바일 화면에 맞게 최적화(WebP)하는 중...')

    try {
      // 1. 브라우저에서 이미지 리사이징 (최대 1200px) 및 WebP 포맷 변환
      let uploadFile: File = file
      try {
        uploadFile = await resizeImageToWebP(file, {
          maxWidth: 1200,
          maxHeight: 1200,
          quality: 0.82,
        })
      } catch (resizeErr) {
        console.warn('이미지 WebP 리사이징 실패, 원본으로 업로드 시도:', resizeErr)
      }

      setUploadStatusText('최적화된 사진을 편지함에 안전하게 저장하고 있습니다...')

      // 2. 파일명 생성 및 Supabase Storage 업로드
      const supabase = createClient()
      const ext = uploadFile.name.split('.').pop() || 'webp'
      const sanitizedBaseName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
      const fileName = `${Date.now()}_${sanitizedBaseName}.${ext}`
      const filePath = `posts/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, uploadFile, {
          cacheControl: '31536000',
          contentType: uploadFile.type || 'image/webp',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath)

      const newUrl = publicUrlData.publicUrl

      // 3. 이번 세션에서 이전에 업로드한 임시 파일만 정리 (DB 기존 이미지 삭제는 폼 저장 시 서버 액션에서 처리)
      if (prevSessionUrl && prevSessionUrl !== newUrl) {
        await cleanupSessionFile(prevSessionUrl)
      }

      sessionUploadedUrl.current = newUrl
      onChange(newUrl)
    } catch (err: unknown) {
      console.error('Storage 업로드 오류:', err)
      const message = err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.'
      setErrorMsg(message)
    } finally {
      setIsUploading(false)
      setUploadStatusText('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleRemove = async () => {
    // 세션 내 임시 업로드 파일이면 즉시 Storage에서 삭제
    if (sessionUploadedUrl.current) {
      await cleanupSessionFile(sessionUploadedUrl.current)
      sessionUploadedUrl.current = null
    }
    // DB 기존 이미지의 삭제는 폼 저장 시 서버 액션이 처리하므로 여기서는 상태만 비움
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2.5">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleUpload(e.target.files[0])
          }
        }}
      />

      {value ? (
        <div className="space-y-2">
          <div className="relative group rounded-2xl overflow-hidden border border-[#EDE8E1] bg-[#FAF0E6]/30 aspect-video max-h-72 w-full shadow-xs">
            <Image
              src={value}
              alt="업로드된 대표 이미지"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 600px"
            />
            {/* 데스크톱 호버 액션 오버레이 (PC 마우스 지원) */}
            <div className="absolute inset-0 bg-black/40 opacity-0 sm:group-hover:opacity-100 transition-opacity hidden sm:flex items-center justify-center gap-3 backdrop-blur-2xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3.5 py-1.5 bg-white text-[#2D3748] rounded-xl text-xs font-bold shadow-md hover:bg-gray-50 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                사진 변경
              </button>
              <button
                type="button"
                onClick={handleRemove}
                disabled={isUploading}
                className="p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
                title="사진 삭제"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 모바일 전용 액션 버튼 바 (터치 기기에서 상시 노출되어 직관적 교체/삭제 가능) */}
          <div className="flex sm:hidden items-center justify-between gap-2 px-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-[#EDE8E1] rounded-xl text-xs font-bold text-[#2D3748] active:bg-gray-50 shadow-2xs disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>사진 변경</span>
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="inline-flex items-center justify-center gap-1 py-2 px-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold active:bg-red-100 shadow-2xs disabled:opacity-50"
            >
              <X className="w-3.5 h-3.5" />
              <span>삭제</span>
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center min-h-[160px] ${
            dragOver
              ? 'border-[#E07A5F] bg-[#FAF0E6]'
              : 'border-[#EDE8E1] hover:border-[#E07A5F]/60 bg-[#FAF0E6]/30 hover:bg-[#FAF0E6]/60'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-[#E07A5F] py-2">
              <Loader2 className="w-7 h-7 animate-spin" />
              <span className="text-xs font-medium text-[#2D3748] animate-pulse">
                {uploadStatusText || '사진을 편지함에 안전하게 저장하고 있습니다...'}
              </span>
              <span className="text-[11px] text-[#718096]">
                용량을 줄여 모바일에서도 빠르게 열리도록 준비 중입니다.
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full bg-[#FAF0E6] border border-[#F4DDD4] flex items-center justify-center text-[#E07A5F] mb-0.5">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-[#2D3748]">
                클릭하여 사진을 선택하거나 이 곳으로 드래그해 놓으세요
              </p>
              <p className="text-[11px] text-[#718096] flex items-center justify-center gap-1.5 flex-wrap">
                <span>JPG, PNG, WEBP 지원 (최대 15MB)</span>
                <span className="text-[#EDE8E1]">&bull;</span>
                <span className="text-[#E07A5F] font-medium">모바일 최적화 WebP로 자동 압축 변환</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* 외부 이미지 URL 입력 지원 (가로 100% 전폭 레이아웃) */}
      <div className="pt-2 space-y-1.5">
        <label className="flex items-center gap-1.5 text-[11px] font-bold text-[#718096]">
          <ImageIcon className="w-3.5 h-3.5 text-[#E07A5F]" />
          <span>또는 외부 이미지 URL 직접 입력:</span>
        </label>
        <input
          type="url"
          value={value}
          onChange={(e) => {
            if (sessionUploadedUrl.current) {
              const tempPath = extractStoragePath(sessionUploadedUrl.current, bucketName)
              if (tempPath) {
                const supabase = createClient()
                supabase.storage
                  .from(bucketName)
                  .remove([tempPath])
                  .catch((err) => console.warn('세션 임시 이미지 삭제 실패:', err))
              }
              sessionUploadedUrl.current = null
            }
            onChange(e.target.value)
          }}
          placeholder="https://images.unsplash.com/..."
          className="w-full text-xs px-3.5 py-2.5 bg-white border border-[#EDE8E1] rounded-xl text-[#2D3748] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/20 focus:border-[#E07A5F] transition-all"
        />
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
      )}
    </div>
  )
}
