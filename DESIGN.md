---
name: Busan Dayori Design System
version: 1.0.0
description: "釜山だより (부산 다요리)의 감성 여행 다이어리 및 일본어 학습 챌린지 디자인 시스템"

colors:
  primary: "#E07A5F"          # 브랜드 시그니처 코랄 (Terracotta Coral)
  primary-dark: "#C45B40"     # 코랄 다크 (호버 및 강조)
  primary-light: "#FAF0E6"    # 코랄 틴트 (연한 배경)
  secondary: "#3D5A80"        # 슬레이트 네이비 (일본어/액센트)
  background: "#FBF9F5"       # 웜 아이보리/온백색 종이 질감 (Warm Canvas)
  surface: "#FFFFFF"          # 카드 및 컨테이너 배경
  surface-warm: "#FFF9F2"     # 따뜻한 그라데이션 보조 배경
  on-surface: "#2D3748"       # 차콜 그레이 기본 텍스트 (Deep Charcoal)
  on-surface-muted: "#718096" # 보조 설명 텍스트 (Slate Grey)
  border: "#EDE8E1"           # 부드러운 종이 테두리 (Soft Paper Border)
  border-warm: "#F4DDD4"      # 코랄 웜톤 테두리

  # 단계별 일본어 성장 사다리 웜톤 농도 체계 (Levels Gradient)
  level-starter:
    color: "#E78B70"          # Lv.0 입문: 살구 피치 (Apricot Peach)
    bg: "#FFF6F1"
    border: "#FCE4D8"
  level-beginner:
    color: "#E07A5F"          # Lv.1 초급: 시그니처 코랄 (Terracotta Coral)
    bg: "#FAF0E6"
    border: "#F4DDD4"
  level-intermediate:
    color: "#C45B40"          # Lv.2 중급: 브릭 시에나 (Brick Sienna)
    bg: "#F7EBE5"
    border: "#ECCDC2"
  level-advanced:
    color: "#943A25"          # Lv.3 실전: 딥 버건디 (Deep Burgundy)
    bg: "#F4E7E1"
    border: "#E4BFB4"

typography:
  fontFamily: '-apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Segoe UI", Roboto, sans-serif'
  headings:
    h1:
      fontSize: "20px"
      fontWeight: 900
      lineHeight: "1.3"
      letterSpacing: "-0.02em"
    h2:
      fontSize: "16px"
      fontWeight: 800
      lineHeight: "1.4"
    h3:
      fontSize: "14px"
      fontWeight: 700
      lineHeight: "1.4"
  body:
    base:
      fontSize: "13px"
      fontWeight: 500
      lineHeight: "1.6"
    sm:
      fontSize: "12px"
      fontWeight: 500
      lineHeight: "1.5"
    xs:
      fontSize: "11px"
      fontWeight: 500
      lineHeight: "1.4"
  ruby:
    fontSize: "10px"
    lineHeight: "1"

rounded:
  xl: "12px"     # 버튼, 인풋, 작은 칩
  "2xl": "16px"  # 내부 컴포넌트, 유닛 카드, 다이얼로그
  "3xl": "24px"  # 메인 섹션 카드, 헤더 배너
  full: "9999px" # 알약 뱃지, 프로필, 태그

shadows:
  card: "0 4px 20px -2px rgba(45, 55, 72, 0.05), 0 2px 6px -1px rgba(45, 55, 72, 0.03)"
  card-hover: "0 8px 25px -4px rgba(45, 55, 72, 0.08)"
  inner-subtle: "inset 0 1px 2px rgba(0, 0, 0, 0.04)"

layout:
  maxWidth: "576px" # max-w-xl (모바일 중심 단일 컬럼 뷰)
  bottomNavPadding: "96px" # pb-24 (하단 고정 바 대응 여백)
---

# 釜山だより (Busan Dayori) 디자인 시스템

## 1. 디자인 철학 (Design Philosophy)

**「釜山だより」**는 부산 토박이가 매일매일 일본어를 배우며 써 내려가는 **학습 일기(다이어리)**이자, 정성껏 배운 일본어로 일본인 여행자 친구에게 부산의 따뜻한 골목과 단골 맛집을 소개하는 **로컬 편지(お便り)**입니다.

1. **따뜻한 종이 수첩의 질감 (Analog Warmth & Diary Aesthetic)**
   - 차갑고 인위적인 디지털 화면 대신, 아늑한 카페에서 펼친 다이어리 느낌을 주는 웜 아이보리(`#FBF9F5`)와 테라코타 코랄(`#E07A5F`)을 기조로 합니다.
2. **단절 없는 성장 사다리 (Warm Gradient Ladder)**
   - 자극적인 신호등 원색(빨강, 파랑, 초록)을 배제하고, 하나의 코랄 뿌리에서 피어나는 **4단계 웜톤 농도 체계**(`살구 피치` ➔ `코랄` ➔ `브릭 시에나` ➔ `딥 버건디`)로 학습자의 자연스러운 성장을 시각화합니다.
3. **주체적이고 다정한 톤앤매너 (Proactive Diary Tone)**
   - 상업적 권유형(`~해보세요`) 대신, 학습자 자신의 진솔한 도전과 기록을 담은 주체적 다짐형(`~합니다`) 문구를 원칙으로 삼습니다.
4. **한일 바이링구얼 조화 (Harmonious Dual-Language Typography)**
   - 일본어 한자·히라가나와 한국어 번역문, 발음 루비(Ruby)가 겹침 없이 유려하게 흐르도록 행간과 자간을 넉넉하게 설계합니다.

---

## 2. 컬러 팔레트 (Color Palette)

### 2.1 브랜드 코어 컬러
- **Primary Coral (`#E07A5F`)**: 시그니처 테라코타 코랄. 주요 CTA, 활성 탭, 핵심 인터랙션.
- **Primary Dark (`#C45B40`)**: 코랄 호버 상태 및 진한 텍스트 강조.
- **Primary Tint (`#FAF0E6`)**: 부드러운 코랄 배경 틴트, 카드 상단 헤더, 활성 칩 배경.
- **Secondary Slate (`#3D5A80`)**: 차분한 네이비. 일본어 보조 강조 및 문화 콘텐츠 포인트.
- **Warm Canvas (`#FBF9F5`)**: 전체 페이지 배경. 눈의 피로를 덜어주는 온백색 종이 톤.
- **Pure White (`#FFFFFF`)**: 카드 및 레이어 표면.
- **Charcoal Text (`#2D3748`)**: 주 텍스트. 순수 블랙(`#000000`)의 날카로움을 덜어낸 부드러운 차콜.
- **Paper Border (`#EDE8E1`)**: 1px 기본 테두리. 종이 수첩의 부드러운 절단면 질감.

### 2.2 4단계 학습 레벨 팔레트 (Leveling System)
레벨은 메타포 아이콘과 함께 통일된 웜톤 농도 스케일을 엄격하게 적용합니다:

| 레벨 | 명칭 | 아이콘 | 메인 컬러 | 연한 배경 | 테두리 | 의도 및 대상 |
| :--- | :--- | :---: | :---: | :---: | :---: | :--- |
| **Lv.0** | **입문** | 👶 `Baby` | `#E78B70` | `#FFF6F1` | `#FCE4D8` | 갓 태어난 첫걸음 (히라가나 소리·쓰기) |
| **Lv.1** | **초급** | ✨ `Sparkles` | `#E07A5F` | `#FAF0E6` | `#F4DDD4` | 반짝이는 기초 (정중한 주문·여행 기본) |
| **Lv.2** | **중급** | ⚡ `Zap` | `#C45B40` | `#F7EBE5` | `#ECCDC2` | 자신감 넘치는 소통 (완곡한 배려 표현) |
| **Lv.3** | **실전** | 🔥 `Flame` | `#943A25` | `#F4E7E1` | `#E4BFB4` | 깊고 뜨거운 원어민 감각 (미각 묘사·에티켓) |

---

## 3. 타이포그래피 (Typography)

### 3.1 폰트 스택
```css
font-family: -apple-system, BlinkMacSystemFont, "Hiragino Kaku Gothic ProN", "Noto Sans JP", "Segoe UI", Roboto, sans-serif;
```
- 한국어와 일본어 고딕 서체가 시스템 네이티브로 매끄럽게 렌더링되도록 최적화.

### 3.2 발음 루비 (Ruby / Furigana) 규칙
- 한자 위에 히라가나 발음을 띄울 때 글자 겹침을 방지하기 위해 `ruby`, `rt` 태그에 적절한 행간(`leading-none`, `text-[10px]`)을 부여합니다.
- TTS 재생 시 음절 단위로 텍스트와 루비의 색상이 `#E07A5F`로 동기화 하이라이트됩니다.

---

## 4. 컴포넌트 패턴 (Component Patterns)

### 4.1 카드 (Cards)
- **모서리**: 부드러운 곡률 `rounded-3xl` (24px).
- **테두리**: `1px solid #EDE8E1` (레벨별 카드는 레벨 고유 `borderColor` 적용).
- **그림자**: 수첩 같은 질감의 미세 소프트 섀도우 (`card-shadow`).
- **상단 헤더**: 연한 그라데이션(`bg-gradient-to-r from-[#FAF0E6] to-[#FFF9F2]`)과 하단 1px 경계선.

### 4.2 탭 & 네비게이션 (Tabs & Navigators)
- **모바일 균등 분할**: 로드맵 레벨 탭 등은 가로 스크롤을 지양하고 모바일 폭에 맞추어 `grid-cols-4`로 균등 배치.
- **선택 피드백**: 활성 탭은 레벨 고유 `bgLight`, `borderColor`, 폰트 굵기(`font-black`), 미세 확대(`scale-[1.02]`) 적용.
- **로드맵 진도 컨트롤**: `< 이전 유닛` · `[레벨 뱃지 · Unit 번호 (순번/전체)]` · `다음 유닛 >` 형태의 순차적 책장 넘김 인터랙션 제공.

### 4.3 뱃지 (Badges)
- **알약 형태**: `rounded-full`, 상하 패딩 `py-0.5` ~ `py-1`, 좌우 패딩 `px-2.5`.
- **레벨 뱃지**: 각 레벨의 메인 컬러 배경에 순백색 굵은 텍스트(`font-black text-white`).

### 4.4 버튼 & CTA
- **주 액션(Primary CTA)**: `#E07A5F` 배경, 흰색 텍스트, 클릭 시 미세 스케일 축소(`active:scale-95`).
- **배너 메인 링크**: 텍스트 잘림 없는 풀 너비 단일 카드 CTA (`flex items-center justify-between p-3 rounded-2xl`).

---

## 5. 레이아웃 & 뷰포트 규격 (Layout & Viewport)

- **모바일 퍼스트 단일 컬럼**:
  - `max-w-xl mx-auto` (최대 폭 576px) 컨테이너 내에서 중앙 정렬.
  - 모바일에서는 꽉 찬 너비(`w-full`), 데스크톱에서는 태블릿/모바일 카드 프레임 형태로 렌더링.
- **하단 네비게이션 여백**:
  - 하단 네비게이션 바가 항상 화면 하단에 고정되므로 메인 컨텐츠 영역에는 반드시 `pb-24` 이상의 바텀 패딩을 확보합니다.
- **스크롤바**:
  - 횡스크롤이 필요한 칩 리스트는 `.no-scrollbar` 클래스를 적용하여 UI의 간결함을 유지합니다.

---

## 6. Do's and Don'ts (디자인 원칙 및 금기사항)

### ✅ Do's (권장 사항)
1. **일기 & 챌린지 톤 유지**: 문구는 주체적인 다짐형(`~합니다`, `~도전해요`)을 사용하세요.
2. **4단계 웜톤 농도 시스템 준수**: 레벨 관련 컴포넌트는 반드시 정의된 `Lv.0 ~ Lv.3` 전용 컬러 토큰을 사용하세요.
3. **충분한 터치 타깃**: 모바일 환경을 고려하여 모든 인터랙티브 버튼은 최소 36px 이상의 터치 영역을 확보하세요.
4. **한/일 문장 병기**: 핵심 표현에는 항상 일본어 표기, 발음 루비, 한글 발음, 한국어 해석의 4개 층위를 단정하게 정돈해 제공하세요.

### ❌ Don'ts (금기 사항)
1. **신호등 원색 혼용 금지**: 노란색, 형광 초록, 파란색 등 채도가 높은 비통일 원색을 레벨 색상으로 섞어 쓰지 마세요.
2. **중첩 외곽선(Double Border) 금지**: `border`와 `ring`을 불필요하게 겹쳐 카드가 두꺼워 보이는 버그를 만들지 마세요.
3. **정적 Day 번호 나열 금지**: 홈 화면에 무의미한 `Day 1, 2, 3` 탭을 나열하지 말고 로드맵 유닛과 1:1로 일치시키세요.
4. **텍스트 잘림(Ellipsis Overuse) 방지**: 모바일 뷰포트 폭을 고려하지 않고 무리하게 버튼을 가로로 3개 이상 우겨넣어 텍스트가 잘리는 배치를 하지 마세요.
