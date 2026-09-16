#!/usr/bin/env node

/**
 * [Busan Dayori] Supabase Storage 고아 이미지 일괄 감지 및 정리 스크립트
 *
 * 사용법:
 *   1. 미리보기 (Dry-run, 기본 모드):
 *      node --env-file=.env.local scripts/clean-orphan-images.mjs
 *      또는 npm run clean-orphans
 *
 *   2. 실제 삭제 실행 (Execute 모드):
 *      node --env-file=.env.local scripts/clean-orphan-images.mjs --execute
 *      또는 npm run clean-orphans:execute
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
const BUCKET_NAME = 'letter-images'
const FOLDER_NAME = 'posts'

if (!SUPABASE_URL) {
  console.error('❌ 에러: NEXT_PUBLIC_SUPABASE_URL 환경변수가 설정되어 있지 않습니다.')
  process.exit(1)
}

const isExecute = process.argv.includes('--execute')

// URL에서 버킷 내 상대 경로(posts/파일명)를 추출하는 헬퍼 함수
function extractStoragePath(url, bucketName = BUCKET_NAME) {
  if (!url || typeof url !== 'string') return null
  const marker = `/storage/v1/object/public/${bucketName}/`
  const markerIndex = url.indexOf(marker)
  if (markerIndex === -1) return null

  const pathWithQuery = url.slice(markerIndex + marker.length)
  return pathWithQuery.split('?')[0].split('#')[0].trim() || null
}

function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`
}

async function main() {
  console.log('====================================================')
  console.log('📦 부산 다요리 - Supabase Storage 고아 이미지 정리 도구')
  console.log(`모드: ${isExecute ? '🚨 [EXECUTE] 실제 삭제 모드' : '🔍 [DRY-RUN] 미리보기 모드'}`)
  console.log('====================================================\n')

  // 클라이언트 초기화: 서비스 롤 키가 있으면 권한 제약 없이 실행 가능, 없으면 Publishable Key 사용
  const apiKey = SERVICE_ROLE_KEY || PUBLISHABLE_KEY
  if (!apiKey) {
    console.error('❌ 에러: Supabase API Key (Publishable Key 또는 Service Role Key)가 없습니다.')
    process.exit(1)
  }

  const supabase = createClient(SUPABASE_URL, apiKey, {
    auth: { persistSession: false },
  })

  // 만약 Execute 모드인데 Service Role Key가 없고 Publishable Key만 있는 경우 인증 필요 여부 확인
  if (isExecute && !SERVICE_ROLE_KEY) {
    let adminEmail =
      process.env.ADMIN_EMAIL ||
      (process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(',')[0].trim() : null)
    let adminPassword = process.env.ADMIN_PASSWORD

    // 비밀번호가 없고 터미널 입력이 가능한 경우 대화형으로 비밀번호 입력 받기
    if (!adminPassword && process.stdin.isTTY) {
      const readline = await import('readline/promises')
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      })
      if (!adminEmail) {
        adminEmail = (await rl.question('관리자 이메일: ')).trim()
      }
      adminPassword = (await rl.question(`[${adminEmail}] 관리자 비밀번호: `)).trim()
      rl.close()
    }

    if (adminEmail && adminPassword) {
      console.log(`🔑 관리자 계정(${adminEmail})으로 로그인 시도 중...`)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword,
      })
      if (signInError) {
        console.error(`❌ 관리자 로그인 실패: ${signInError.message}`)
        console.error('Storage DELETE 정책에 따라 관리자 인증이 필수적입니다.')
        process.exit(1)
      } else {
        console.log('✅ 관리자 인증 완료\n')
      }
    } else {
      console.warn('⚠️ 알림: Service Role Key 및 관리자 로그인 정보(ADMIN_PASSWORD)가 제공되지 않았습니다.')
      console.warn('   Supabase Storage 정책에 따라 삭제 권한이 없어 삭제가 무시될 수 있습니다.\n')
    }
  }

  // 1. DB letters 테이블에서 현재 사용 중인 모든 image_url 조회
  console.log('1️⃣ 데이터베이스(letters)에서 현재 참조 중인 이미지 목록 조회 중...')
  const { data: letters, error: lettersError } = await supabase
    .from('letters')
    .select('id, title, image_url')

  if (lettersError) {
    console.error('❌ DB 편지 목록 조회 실패:', lettersError.message)
    process.exit(1)
  }

  console.log(`   총 ${letters.length}개의 레터 레코드 확인 완료.`)

  const activePathsSet = new Set()
  for (const letter of letters) {
    const path = extractStoragePath(letter.image_url, BUCKET_NAME)
    if (path) {
      activePathsSet.add(path)
    }
  }

  console.log(`   DB에서 Storage '${BUCKET_NAME}'을(를) 참조하는 활성 이미지: ${activePathsSet.size}개\n`)

  // 2. Storage 버킷의 posts/ 폴더 내 모든 파일 목록 조회
  console.log(`2️⃣ Storage 버킷('${BUCKET_NAME}/${FOLDER_NAME}') 내 파일 목록 조회 중...`)
  const { data: storageFiles, error: storageError } = await supabase.storage
    .from(BUCKET_NAME)
    .list(FOLDER_NAME, {
      limit: 1000,
      sortBy: { column: 'created_at', order: 'desc' },
    })

  if (storageError) {
    console.error('❌ Storage 파일 목록 조회 실패:', storageError.message)
    process.exit(1)
  }

  // 폴더 placeholder(.emptyFolderPlaceholder 등) 제외
  const actualFiles = (storageFiles || []).filter(
    (file) => file.name && !file.name.startsWith('.')
  )

  console.log(`   Storage '${FOLDER_NAME}/' 폴더 내 총 파일 수: ${actualFiles.length}개\n`)

  // 3. 고아 파일 식별
  const orphanFiles = []
  let totalOrphanBytes = 0

  for (const file of actualFiles) {
    const fullPath = `${FOLDER_NAME}/${file.name}`
    if (!activePathsSet.has(fullPath)) {
      const size = file.metadata?.size || 0
      totalOrphanBytes += size
      orphanFiles.push({
        path: fullPath,
        name: file.name,
        size,
        createdAt: file.created_at,
      })
    }
  }

  // 4. 분석 결과 보고
  console.log('====================================================')
  console.log('📊 분석 결과 보고')
  console.log('====================================================')
  console.log(`- 전체 스토리지 파일: ${actualFiles.length}개`)
  console.log(`- 현재 사용 중인 파일: ${actualFiles.length - orphanFiles.length}개`)
  console.log(`- 정리 대상 고아 파일: ${orphanFiles.length}개`)
  console.log(`- 절약 가능한 용량: ${formatBytes(totalOrphanBytes)}`)
  console.log('----------------------------------------------------')

  if (orphanFiles.length === 0) {
    console.log('✨ 정리할 고아 이미지가 없습니다! 스토리지가 깨끗합니다.')
    return
  }

  console.log('목록:')
  orphanFiles.forEach((f, idx) => {
    console.log(`  [${idx + 1}] ${f.path} (${formatBytes(f.size)}) - 생성: ${f.createdAt || 'N/A'}`)
  })
  console.log('----------------------------------------------------\n')

  // 5. 실행 여부에 따른 처리
  if (!isExecute) {
    console.log('💡 안내: 현재는 [DRY-RUN] 모드이므로 실제 파일이 삭제되지 않았습니다.')
    console.log('실제 파일 삭제를 진행하려면 아래 명령어를 실행하세요:')
    console.log('👉 npm run clean-orphans:execute\n')
    return
  }

  console.log(`🗑️ 고아 파일 ${orphanFiles.length}개 삭제 진행 중...`)
  const pathsToDelete = orphanFiles.map((f) => f.path)

  const { data: removeResult, error: removeError } = await supabase.storage
    .from(BUCKET_NAME)
    .remove(pathsToDelete)

  if (removeError) {
    console.error('❌ Storage 파일 삭제 실패:', removeError.message)
    console.error('권한 문제일 경우 SUPABASE_SERVICE_ROLE_KEY 환경변수를 설정해주세요.')
    process.exit(1)
  }

  if (!removeResult || removeResult.length === 0) {
    console.error('❌ Storage 파일 삭제 실패: 삭제 권한이 없어 파일이 삭제되지 않았습니다 (0개 삭제됨).')
    console.error('👉 Storage의 DELETE 정책은 로그인된 관리자 또는 서비스 롤 키가 필요합니다.')
    console.error('   1) 관리자 비밀번호를 입력하여 실행 (ADMIN_PASSWORD=... npm run clean-orphans:execute)')
    console.error('   2) 또는 .env.local 에 SUPABASE_SERVICE_ROLE_KEY=... 추가')
    process.exit(1)
  }

  console.log(`✅ 삭제 완료! 총 ${removeResult.length}개의 고아 파일이 정리되었습니다.`)
  console.log(`🎉 절약된 스토리지 용량: ${formatBytes(totalOrphanBytes)}\n`)
}

main().catch((err) => {
  console.error('치명적 에러 발생:', err)
  process.exit(1)
})
