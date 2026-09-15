'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { resizeImageToWebP } from '@/utils/image'

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

      onChange(publicUrlData.publicUrl)
    } catch (err: unknown) {
      console.error('Storage 업로드 오류:', err)
      const message = err instanceof Error ? err.message : '이미지 업로드에 실패했습니다.'
      setErrorMsg(message)
    } finally {
      setIsUploading(false)
      setUploadStatusText('')
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

  const handleRemove = () => {
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
        <div className="relative group rounded-2xl overflow-hidden border border-[#EDE8E1] bg-[#FAF0E6]/30 aspect-video max-h-72 w-full shadow-xs">
          <Image
            src={value}
            alt="업로드된 대표 이미지"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-2xs">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-1.5 bg-white text-[#2D3748] rounded-xl text-xs font-bold shadow-md hover:bg-gray-50 transition-transform hover:scale-105 active:scale-95"
            >
              사진 변경
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-red-600/90 hover:bg-red-600 text-white rounded-xl shadow-md transition-transform hover:scale-105 active:scale-95"
              title="사진 삭제"
            >
              <X className="w-4 h-4" />
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
          onChange={(e) => onChange(e.target.value)}
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
