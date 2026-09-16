/**
 * 이미지 리사이징 및 WebP 포맷 변환 유틸리티
 */

export interface ResizeOptions {
  /** 최대 허용 가로 너비 (기본값: 1200px) */
  maxWidth?: number
  /** 최대 허용 세로 높이 (기본값: 1200px) */
  maxHeight?: number
  /** WebP 압축 품질 0.0 ~ 1.0 (기본값: 0.82) */
  quality?: number
}

/**
 * 브라우저의 Canvas API를 사용하여 이미지를 모바일 고해상도(Retina 2x~3x)에 적합한 크기로 리사이즈하고
 * 최신 웹 압축 포맷인 WebP 파일로 변환합니다.
 *
 * @param file 사용자가 업로드한 원본 File 객체
 * @param options 리사이징 및 압축 옵션
 * @returns WebP 포맷으로 변환 및 압축된 새 File 객체
 */
export async function resizeImageToWebP(
  file: File,
  options: ResizeOptions = {}
): Promise<File> {
  const { maxWidth = 1200, maxHeight = 1200, quality = 0.82 } = options

  // 이미지가 아닌 경우 원본 반환
  if (!file.type.startsWith('image/')) {
    return file
  }

  // 1. 이미지 로드 (createImageBitmap 또는 Image 객체 사용)
  let width: number
  let height: number
  let source: ImageBitmap | HTMLImageElement

  try {
    if (typeof createImageBitmap === 'function') {
      // createImageBitmap은 모바일 카메라의 EXIF 회전(orientation) 정보를 기본적으로 올바르게 처리합니다.
      const bitmap = await createImageBitmap(file)
      width = bitmap.width
      height = bitmap.height
      source = bitmap
    } else {
      const img = await loadHtmlImage(file)
      width = img.width
      height = img.height
      source = img
    }
  } catch {
    // 비트맵 생성 실패 시 HTMLImageElement로 폴백 시도
    const img = await loadHtmlImage(file)
    width = img.width
    height = img.height
    source = img
  }

  // 2. 종횡비를 유지하면서 새로운 크기 계산 (업스케일 방지)
  let targetWidth = width
  let targetHeight = height

  if (targetWidth > maxWidth || targetHeight > maxHeight) {
    const widthRatio = maxWidth / targetWidth
    const heightRatio = maxHeight / targetHeight
    const scale = Math.min(widthRatio, heightRatio)

    targetWidth = Math.round(targetWidth * scale)
    targetHeight = Math.round(targetHeight * scale)
  }

  // 3. Canvas 생성 및 렌더링
  const canvas = document.createElement('canvas')
  canvas.width = targetWidth
  canvas.height = targetHeight
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('Canvas 2D 컨텍스트를 생성할 수 없습니다.')
  }

  // 선명한 이미지 축소를 위한 고품질 보간 설정
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'

  ctx.drawImage(source, 0, 0, targetWidth, targetHeight)

  // ImageBitmap 리소스 해제
  if ('close' in source && typeof source.close === 'function') {
    source.close()
  }

  // 4. Canvas -> WebP Blob 변환
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((b) => resolve(b), 'image/webp', quality)
  })

  if (!blob) {
    throw new Error('WebP 변환에 실패했습니다.')
  }

  // 5. 원본 파일명을 유지하며 확장자를 .webp로 변경한 File 객체 생성
  const originalBaseName = file.name.replace(/\.[^/.]+$/, '')
  const newFileName = `${originalBaseName}.webp`

  return new File([blob], newFileName, {
    type: 'image/webp',
    lastModified: Date.now(),
  })
}

/**
 * File 객체로부터 HTMLImageElement를 비동기적으로 생성하는 헬퍼 함수
 */
function loadHtmlImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const objectUrl = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      resolve(img)
    }

    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl)
      reject(err)
    }

    img.src = objectUrl
  })
}


/**
 * Supabase Storage public URL에서 버킷 내 상대 경로를 추출합니다.
 * 지정된 버킷의 URL이 아니거나 외부 이미지인 경우 null을 반환합니다.
 *
 * @param url 이미지 전체 URL (예: https://.../storage/v1/object/public/letter-images/posts/123.webp)
 * @param bucketName 버킷 이름 (기본값: 'letter-images')
 * @returns 버킷 내 파일 상대 경로 (예: 'posts/123.webp') 또는 null
 */
export function extractStoragePath(
  url: string | null | undefined,
  bucketName: string = 'letter-images'
): string | null {
  if (!url || typeof url !== 'string') return null

  const marker = `/storage/v1/object/public/${bucketName}/`
  const markerIndex = url.indexOf(marker)

  if (markerIndex === -1) {
    return null
  }

  // 쿼리 스트링이나 해시가 있을 경우 제거
  const pathWithQuery = url.slice(markerIndex + marker.length)
  const cleanPath = pathWithQuery.split('?')[0].split('#')[0].trim()

  return cleanPath || null
}
