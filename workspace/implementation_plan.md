# 고아 이미지 정리 로직 구현 계획

레터 수정/삭제 시 Supabase Storage에 기존 이미지가 고아 파일로 남는 문제를 해결합니다.

## 핵심 설계 원칙

```
DB에 커밋된 이미지 → 서버 액션에서만 삭제 (DB UPDATE 성공 후)
세션 내 임시 업로드 → 클라이언트에서 즉시 삭제 (DB에 기록된 적 없으므로 안전)
```

## Proposed Changes

### 이미지 유틸리티

#### [MODIFY] [image.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/utils/image.ts)

Storage public URL에서 버킷 내 상대 경로를 추출하는 헬퍼 함수를 추가합니다.

```typescript
const STORAGE_BUCKET = 'letter-images'

/**
 * Supabase Storage public URL에서 버킷 내 상대 경로를 추출합니다.
 * 우리 Storage URL이 아니면 null을 반환합니다 (외부 URL 오삭제 방지).
 *
 * 예시 입력: "https://<ref>.supabase.co/storage/v1/object/public/letter-images/posts/123_img.webp"
 * 예시 출력: "posts/123_img.webp"
 */
export function extractStoragePath(url: string): string | null
```

**구현 로직:**
1. `url`이 빈 문자열이면 `null` 반환
2. `NEXT_PUBLIC_SUPABASE_URL` 환경변수로 시작하는지 확인 → 아니면 `null` (외부 URL)
3. URL에서 `/storage/v1/object/public/letter-images/` 이후 부분을 추출
4. 추출 결과가 비어있으면 `null` 반환

---

### 서버 액션

#### [MODIFY] [letter-actions.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/lib/actions/letter-actions.ts)

`updateLetter`와 `deleteLetter`에 Storage 정리 로직을 추가합니다.

##### `updateLetter` 수정 (L85-L128)

기존 `image_url`을 조회한 뒤, 변경되었을 경우 DB 업데이트 성공 후 이전 파일을 삭제합니다.

```
기존 흐름: 바로 UPDATE
수정 흐름: SELECT(기존 URL) → UPDATE → 성공 시 Storage DELETE(fire-and-forget)
```

변경 내용:
1. `imageUrl`이 전달된 경우에만, 기존 레코드의 `image_url`을 `SELECT`로 조회
2. DB `UPDATE` 실행 (기존 로직 유지)
3. UPDATE 성공 후, 기존 URL ≠ 새 URL이고 기존 URL이 우리 Storage URL이면 `supabase.storage.from('letter-images').remove([oldPath])` 실행
4. Storage 삭제 실패 시 `console.warn`으로 로깅만 하고 에러를 throw하지 않음

##### `deleteLetter` 수정 (L133-L162)

레터 삭제 전 `image_url`을 조회하여, DB 삭제 성공 후 Storage 파일도 함께 삭제합니다.

변경 내용:
1. 기존 feedbacks/daily_lessons 정리 전에 `SELECT image_url` 추가
2. 기존 삭제 로직 수행 (feedbacks → daily_lessons → letters)
3. DB 삭제 성공 후, Storage 파일 삭제 (fire-and-forget)

---

### 클라이언트 컴포넌트

#### [MODIFY] [ImageUploader.tsx](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/components/admin/ImageUploader.tsx)

"이번 편집 세션에서 새로 업로드한 파일"만 추적하여, 저장 전 교체/삭제 시 즉시 정리합니다.

변경 내용:

1. `useRef<string | null>(null)`로 `sessionUploadedUrl`을 추적
   - DB에 이미 저장된 원본 URL(`initialValue` / props의 `value` 초기값)은 **절대 추적 대상에 포함하지 않음**

2. `handleUpload` 성공 시:
   - `onChange(newUrl)` 호출 전에, `sessionUploadedUrl.current`에 이전 세션 업로드 URL이 있으면 해당 파일을 Storage에서 삭제
   - 새 URL을 `sessionUploadedUrl.current`에 저장

3. `handleRemove` 호출 시:
   - `sessionUploadedUrl.current`에 값이 있으면 (= 이번 세션에서 업로드한 파일) Storage에서 삭제하고 ref를 `null`로 초기화
   - DB에 이미 저장된 원본 URL은 건드리지 않음 (서버 액션이 처리)

4. Storage 삭제 로직:
   - `extractStoragePath`를 import하여 경로를 추출한 뒤 `supabase.storage.from('letter-images').remove([path])` 호출
   - 삭제 실패 시 `console.warn`으로 로깅만 하고 UX 중단 없음

> [!IMPORTANT]
> **"이번 세션에서 업로드한 파일"과 "DB에 이미 저장된 파일"의 구분이 핵심입니다.**
> - `sessionUploadedUrl`에는 `handleUpload`로 새로 올린 URL만 기록
> - 폼이 마운트될 때 `initialData?.imageUrl`은 세션 추적 대상에서 제외
> - 이 구분 덕분에 "수정 취소 시 엑박" 문제가 원천적으로 방지됩니다

---

---

### 고아 파일 일괄 정리 스크립트

#### [NEW] [clean-orphan-images.mjs](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/scripts/clean-orphan-images.mjs)

이미 누적된 고아 파일(예: DB에는 새 WebP가 등록되어 있으나 Storage에 방치된 기존 2.7MB JPG 등)을 일괄 감지하고 정리하는 Node.js CLI 스크립트입니다.

**동작 흐름:**
1. DB `letters` 테이블에서 현재 사용 중인 모든 `image_url` 조회
2. `letter-images` 버킷의 `posts/` 폴더 내 모든 파일 목록 조회 (`storage.from('letter-images').list('posts')`)
3. DB의 `image_url`과 매칭되지 않는 고아 파일(Orphan file) 목록 및 용량 계산
4. **안전장치 (Dry-run 기본):**
   - 기본 실행 시: 삭제 대상 파일 목록과 절약 가능한 용량만 출력하고 실제 삭제하지 않음
   - `--execute` 플래그 추가 시에만 실제 `storage.remove()` 수행
5. 관리자 로그인(`auth.signInWithPassword`) 또는 `SUPABASE_SERVICE_ROLE_KEY`를 통해 Storage DELETE 권한 획득 처리

`package.json`에 편의 실행 스크립트 추가:
- `"clean-orphans": "node --env-file=.env.local scripts/clean-orphan-images.mjs"`
- `"clean-orphans:execute": "node --env-file=.env.local scripts/clean-orphan-images.mjs --execute"`

---

## 변경 파일 요약

| 파일 | 변경 유형 | 변경 내용 |
|------|-----------|-----------|
| [image.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/utils/image.ts) | 함수 추가 | `extractStoragePath()` 유틸리티 |
| [letter-actions.ts](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/lib/actions/letter-actions.ts) | 로직 추가 | `updateLetter`, `deleteLetter`에 Storage 정리 |
| [ImageUploader.tsx](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/components/admin/ImageUploader.tsx) | 로직 추가 | 세션 내 임시 파일 추적 및 정리 |
| [clean-orphan-images.mjs](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/scripts/clean-orphan-images.mjs) | [NEW] 스크립트 | 기존 누적 고아 이미지 감지 및 일괄 삭제 CLI |
| [package.json](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/package.json) | 스크립트 추가 | `clean-orphans` 실행 명령어 등록 |

---

## Verification Plan

### 자동화/스크립트 검증
- `npm run clean-orphans` 실행: Dry-run 모드로 고아 파일(`1789465365246_6115.jpg` 등)이 올바르게 감지되는지 확인
- `npm run clean-orphans:execute` 실행: 실제 Storage에서 고아 파일이 삭제되고 정상 파일은 유지되는지 검증

### 수동 검증

1. **수정 시 이미지 교체**: 기존 레터 수정 → 이미지 삭제 후 새 이미지 업로드 → 저장 → Storage에서 기존 파일 삭제 확인
2. **수정 취소**: 기존 레터 수정 → 이미지 삭제 → 저장하지 않고 뒤로가기 → 기존 이미지가 정상 표시되는지 확인
3. **세션 내 다중 교체**: 수정 화면에서 이미지 A 업로드 → 이미지 B로 교체 → 저장 → A가 Storage에서 삭제되었는지 확인
4. **레터 삭제**: 레터 삭제 → 해당 레터의 이미지가 Storage에서 삭제되었는지 확인
5. **외부 URL**: 이미지를 외부 URL(Unsplash 등)로 설정한 레터 수정 → Storage 삭제 호출이 발생하지 않는지 확인

