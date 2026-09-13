'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

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
  const [dragOver, setDragOver] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    if (!file) return

    // 이미지 파일 형식 검증
    if (!file.type.startsWith('image/')) {
      setErrorMsg('이미지 파일(JPG, PNG, WEBP, GIF 등)만 업로드할 수 있습니다.')
      return
    }

    // 파일 크기 10MB 제한
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('파일 크기는 최대 10MB까지 가능합니다.')
      return
    }

    setIsUploading(true)
    setErrorMsg(null)

    try {
      const supabase = createClient()
      const ext = file.name.split('.').pop() || 'jpg'
      const sanitizedBaseName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[^a-zA-Z0-9_-]/g, '_')
      const fileName = `${Date.now()}_${sanitizedBaseName}.${ext}`
      const filePath = `posts/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
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
    <div className="space-y-2">
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
        <div className="relative group rounded-xl overflow-hidden border border-paper-sandstone bg-paper-parchment/60 aspect-video max-h-72 w-full">
          <Image
            src={value}
            alt="업로드된 대표 이미지"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          <div className="absolute inset-0 bg-marine-ink/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white/90 hover:bg-white text-marine-ink rounded-lg text-xs font-medium shadow-md transition-transform hover:scale-105"
            >
              사진 변경
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 bg-red-600/90 hover:bg-red-600 text-white rounded-lg shadow-md transition-transform hover:scale-105"
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
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 flex flex-col items-center justify-center min-h-[160px] ${
            dragOver
              ? 'border-marine-blue bg-marine-mist/40'
              : 'border-paper-sandstone/80 hover:border-marine-blue/60 bg-paper-parchment/30 hover:bg-paper-parchment/70'
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-marine-blue">
              <Loader2 className="w-7 h-7 animate-spin" />
              <span className="text-xs font-medium text-marine-ink/70">
                Supabase Storage에 이미지를 안전하게 업로드하는 중...
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-marine-ink/60">
              <div className="w-10 h-10 rounded-full bg-paper-sandstone/30 flex items-center justify-center text-marine-blue mb-1">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-marine-ink">
                클릭하여 사진을 선택하거나 이 곳으로 드래그해 놓으세요
              </p>
              <p className="text-[11px] text-marine-ink/50">
                JPG, PNG, WEBP 지원 (최대 10MB) &bull; Supabase Storage에 자동 저장
              </p>
            </div>
          )}
        </div>
      )}

      {/* 직접 외부 이미지 URL 입력도 지원 */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-[11px] text-marine-ink/60 flex items-center gap-1 shrink-0">
          <ImageIcon className="w-3.5 h-3.5 text-marine-blue" />
          또는 외부 URL:
        </span>
        <input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="flex-1 text-xs px-2.5 py-1.5 bg-paper-sandstone/20 border border-paper-sandstone/50 rounded-lg text-marine-ink focus:outline-none focus:ring-1 focus:ring-marine-blue placeholder:text-marine-ink/40"
        />
      </div>

      {errorMsg && (
        <p className="text-xs text-red-600 font-medium">{errorMsg}</p>
      )}
    </div>
  )
}
