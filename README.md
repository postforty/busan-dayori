# 🌊 釜山だより (Busan Dayori / 부산 다요리)

> **日本語を勉強中の釜山っ子が届ける、ローカルな旅のお便り**  
> 부산 토박이가 띄우는 리얼 부산 여행 편지 & 한·일 언어 교류 플랫폼

![Next.js 16](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)
![React 19](https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react)
![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20Auth-3ECF8E?style=flat-square&logo=supabase)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.5_Flash_Lite-8E75B2?style=flat-square&logo=google)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)

---

## 📌 서비스 소개 (Overview)

**釜山だより (부산 다요리)**는 부산에서 나고 자란 한국인이 **일본어를 공부하고 실전 작문 실력을 키우기 위해 직접 일본어로 글을 쓰는 학습 일기**이자, 부산 현지인의 찐 맛집·골목길·문화 정보를 일본인 여행자에게 따뜻하게 전하는 **감성형 로컬 아카이빙 & 언어 교류 플랫폼**입니다.

- **운영자 가치**: 좋아하는 부산의 이야기를 일본어로 직접 작문하고, 원어민 독자의 자연스러운 뉘앙스 교정(첨삭)을 통해 일본어 실력을 향상합니다.
- **독자(일본인 여행자) 가치**: 관광지 위주의 뻔한 정보가 아닌, 현지인이 보증하는 숨은 명소와 실전 편의 정보(1인 식사 가능 여부, 맵기 강도, 카드 결제 여부 등)를 얻습니다.
- **상호 교류**: 비로그인 독자도 부담 없이 따뜻한 피드백을 남길 수 있는 소통형 인터랙션을 제공합니다.

---

## ✨ 주요 기능 (Key Features)

### 1. 💌 부산 편지 (お便り・Letter)
- **로컬 아티클**: 부산 토박이가 직접 일본어로 쓴 생생한 현지 맛집, 카페, 산책 코스 이야기.
- **일본어 학습 노트 (勉強ノート)**: 글마다 작가가 공부한 핵심 일본어 표현과 뉘앙스 메모 수록.
- **실전 스팟 인포박스 (Spot Info)**:
  - 한국어 상호명 & 일본어 카타카나 발음 동시 표기
  - 택시 기사님께 바로 보여주는 한국어 주소 원클릭 복사
  - **おひとり様 (혼밥/혼자 여행)** 친화도 지표
  - **辛さ (맵기 강도)** 지표
  - 신용카드 결제 가능 여부
  - 네이버 지도 & 구글 지도 바로가기 링크

### 2. ✍️ 독자 첨삭 & 반응 위젯 (添削・フィードバック)
- **부담 없는 익명 교류**: 일본인 독자가 로그인 없이도 어색한 표현이나 오탈자에 대해 자연스러운 뉘앙스를 제안.
- **원자적 좋아요 (Likes)**: PostgreSQL RPC 기반으로 안전하게 실시간 독자 공감을 집계.

### 3. 👆 여행 도우미 & 로컬 콘텐츠
- **指差し会話 (원터치 손가락 회화)**: 일본인 여행자가 식당, 카페, 계산대에서 스마트폰 화면만 보여주면 소통이 통하는 한국어 카드.
- **釜山方言ノート (부산 사투리 사전)**: 부산 현지 골목과 시장에서 자주 들리는 정겨운 사투리 표현과 의미 풀이.
- **ローカル質問箱 (로컬 Q&A)**: 부산 여행에 대해 궁금한 점을 질문하고 운영자가 답변하는 공간.

### 4. 🤖 Gemini AI 기반 학습 및 콘텐츠 지원
- Google Gemini API (`gemini-3.5-flash-lite`) 및 LangChain/LangGraph를 활용하여 편지 내용 기반의 데일리 일본어 학습 콘텐츠 생성 보조.

---

## 🔒 보안 및 인증 아키텍처 (Security & Auth)

1인 운영 블로그의 특성을 반영하여 엄격한 보안 모델을 적용했습니다:

- **서버 전용 환경변수 격리**: `ADMIN_EMAILS`를 서버 환경에만 보관하여 브라우저 번들 유출을 원천 차단.
- **OAuth 콜백 가드**: 비인가 계정이 Google 로그인을 시도할 경우 즉시 세션을 파기(`signOut`)하고 차단 안내.
- **Next.js 16 프록시 가드**: `proxy.ts` 미들웨어를 통해 `/letters/new`, `/letters/*/edit` 등 관리자 페이지 무단 접근을 1차 차단.
- **Supabase RLS (Row Level Security)**:
  - `letters` 테이블의 등록·수정·삭제는 오직 인증된 관리자 이메일만 가능하도록 DB 레벨에서 보호.
  - 익명 좋아요는 `SECURITY DEFINER` 및 `search_path = public`이 적용된 전용 RPC 함수(`increment_letter_likes`)를 통해 격리 실행.

---

## 🛠 기술 스택 (Tech Stack)

| 구분 | 기술 | 설명 |
|:---|:---|:---|
| **Framework** | **Next.js 16.3.4 (App Router)** | Turbopack, React Server Components (RSC), Proxy Middleware |
| **Frontend** | **React 19.2.8 / TypeScript 5** | 최신 React 기능 및 정적 타입 안정성 보장 |
| **Styling** | **Tailwind CSS v4** | 유틸리티 퍼스트 기반 감성적·반응형 UI 구현 |
| **Database & Auth** | **Supabase (PostgreSQL)** | SSR 세션 인증, RLS 보안 정책, PL/pgSQL RPC 함수 |
| **AI Integration** | **Google Gemini API** | LangChain (`@langchain/google-genai`, `@langchain/langgraph`) |
| **Icons & UI** | **Lucide React** | 경량화된 모던 아이콘 세트 |

---

## 📁 디렉토리 구조 (Directory Structure)

```text
busan-dayori/
├── src/
│   ├── app/                      # Next.js App Router 페이지 및 API 라우트
│   │   ├── api/                  # 서버 API 엔드포인트
│   │   │   ├── auth/me/          # 현재 세션 및 관리자 여부 조회 API
│   │   │   ├── generate-lesson/  # Gemini AI 일일 레슨 생성
│   │   │   └── letters/[id]/     # 편지 삭제 API
│   │   ├── auth/callback/        # Google OAuth 인증 콜백 및 비인가 가드
│   │   ├── dialects/             # 부산 사투리 사전 페이지
│   │   ├── letters/              # 편지 상세, 작성(/new), 수정(/[id]/edit)
│   │   ├── phrases/              # 손가락 회화 페이지
│   │   ├── qa/                   # 로컬 질문방 페이지
│   │   ├── layout.tsx            # 공통 레이아웃 (헤더, 네비게이션)
│   │   └── page.tsx              # 홈 (메인 피드)
│   ├── components/               # 재사용 UI 컴포넌트
│   │   ├── admin/                # 관리자 전용 에디터 및 폼 컴포넌트
│   │   ├── common/               # 공통 헤더, 배지 등
│   │   ├── feedback/             # 독자 첨삭 및 좋아요 위젯
│   │   └── letters/              # 편지 카드 및 상세 뷰 컴포넌트
│   ├── lib/                      # 핵심 비즈니스 로직 및 클라이언트
│   │   ├── actions/              # Next.js Server Actions (편지 CRUD)
│   │   └── supabase/             # Supabase 클라이언트, 서버 인증, 프록시 설정
│   ├── proxy.ts                  # Next.js 16 프록시 미들웨어 엔트리포인트
│   └── types/                    # 도메인 모델 및 Supabase DB TypeScript 타입 정의
├── public/                       # 정적 에셋 (이미지, 파비콘)
├── requirements.md               # 서비스 요구사항 명세서 (SRS)
├── concept.md                    # 초기 기획 및 페인포인트 분석 문서
└── package.json
```

---

## 🚀 시작하기 (Getting Started)

### 1. 사전 준비 (Prerequisites)
- **Node.js**: v20 이상 권장
- **npm** 또는 **pnpm**
- **Supabase 계정 및 프로젝트**
- **Google Gemini API Key**

### 2. 저장소 복제 및 의존성 설치
```bash
git clone https://github.com/dandycode/busan-dayori.git
cd busan-dayori
npm install
```

### 3. 환경 변수 설정
프로젝트 루트 디렉토리에 `.env.local` 파일을 생성하고 아래 환경 변수들을 입력합니다:

```env
# Google Gemini API Key
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase 설정 (Modern Publishable Key)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_your_key_here

# 관리자 이메일 목록 (서버 전용 환경변수, 쉼표로 다수 등록 가능)
ADMIN_EMAILS=your_admin_email@gmail.com
```

### 4. 로컬 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:3000`으로 접속하여 서비스를 확인할 수 있습니다.

### 5. 프로덕션 빌드 및 실행
```bash
npm run build
npm run start
```

---

## 📄 관련 문서 (Documentation)

- [requirements.md](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/requirements.md) : 서비스 요구사항 정의서 (SRS)
- [concept.md](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/concept.md) : 서비스 기획 배경 및 페인포인트 분석 자료
