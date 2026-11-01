---
name: unit-shorts-asset-generator
description: 커리큘럼에 새로운 Unit이 추가되거나 숏츠(Shorts) 상황극 콘텐츠를 제작할 때, 유닛의 상황에 맞는 지브리 수채화풍 배경·캐릭터 이미지 에셋 생성과 화자별 듀얼 보이스(Gemini TTS) 및 DB 캐싱 설정을 표준화된 워크플로우로 자동 수행하는 스킬입니다.
---

# 유닛 숏츠 에셋 생성 스킬 (Unit Shorts Asset Generator)

새로운 커리큘럼 Unit이 추가되거나, 기존 Unit의 숏츠 상황극 영상 에셋(배경 이미지, 캐릭터 일러스트, 음성)을 확장할 때 반드시 이 스킬의 표준 절차와 에셋 매핑 규격에 따라 작업합니다.

---

## 1. 4대 표준 배경 테마 (9:16 세로형 비율)

모든 커리큘럼 유닛은 대화 상황에 따라 다음 4가지 핵심 배경 테마 중 하나에 자동으로 매핑됩니다.

| 테마 키 | 파일 경로 | 적용 대상 유닛 예시 | 시각적 특징 (지브리 수채화풍) |
| :--- | :--- | :--- | :--- |
| **`cafe`** | `public/images/shorts/bg-cafe.jpg` | 카페 주문, 커피, 베이커리 | 펜던트 조명, 베이커리 쇼케이스, 원목 카운터, 노을빛 창문 |
| **`restaurant`** | `public/images/shorts/bg-restaurant.jpg` | 식당 주문, 국밥집, 분할 결제, 음식 맛 감탄 | 뚝배기, 반찬, 나무 식탁, 김이 모락모락 나는 정겨운 로컬 식당 |
| **`street`** | `public/images/shorts/bg-street.jpg` | 길 찾기, 지하철역, 화장실 SOS | 감성 골목길, 표지판, 지하철역 입구, 탁 트인 야외 거리 풍경 |
| **`shop`** | `public/images/shorts/bg-shop.jpg` | 편의점, 기념품점, 가격 묻기, 봉투/카드 결제 | 아기자기한 과자/음료 매대, 바코드 리더기와 깔끔한 계산대 |

### 배경 프롬프트 템플릿
```markdown
A cozy Studio Ghibli inspired warm watercolor painting of [cafe / restaurant / street / shop interior], vertical 9:16 aspect ratio, warm golden hour lighting and gentle shadows, detailed charming anime background art, empty without characters.
```

---

## 2. 4대 표준 상대역 캐릭터 (1:1 정사각형 포트레이트)

상대방 화자(`speaker`)는 텍스트 지문 분석을 통해 다음 4개 역할군 중 하나로 자동 연결됩니다.

| 역할 키 | 파일 경로 | 지문 키워드 매핑 | 권장 Gemini TTS 보이스 | 외모 및 특징 |
| :--- | :--- | :--- | :--- | :--- |
| **`clerk`** | `public/images/shorts/clerk.jpg` | 점원, 직원, 바리스타 | **`Kore`** (여성) | 베레모와 앞치마를 두르고 트레이를 건네는 상냥한 여성 직원 |
| **`auntie`** | `public/images/shorts/auntie.jpg` | 이모님, 사장님, 할머니 | **`Kore`** (여성) | 머리 수건이나 앞치마를 두른 인심 좋고 푸근한 식당 이모님 |
| **`passerby`** | `public/images/shorts/passerby.jpg` | 행인, 안내원 | **`Puck`** (소년/청년) | 길을 친절하게 가리키며 밝게 미소 짓는 현지인 청년 |
| **`friend`** | `public/images/shorts/friend.jpg` | 친구, 동행인 | **`Puck`** (소년/청년) | 편안한 옷차림으로 마주보고 대화하는 또래 친구 |

*※ 학습자 '나'는 모든 유닛에서 공통 에셋인 **`learner.jpg`** (백팩을 멘 지브리풍 소년 여행자, 보이스: `Puck`)를 사용합니다.*

---

## 3. 단계별 실행 워크플로우

### Step 1. 유닛 대화 및 테마 분석
- `themeTitle`과 `dialogue`의 화자 텍스트를 분석하여 **배경 테마(`cafe` / `restaurant` / `street` / `shop`)**와 **상대역 캐릭터(`clerk` / `auntie` / `passerby` / `friend`)**를 도출합니다.

### Step 2. 필요 에셋 확인 및 생성
- 기존 4대 배경 및 4대 캐릭터 에셋으로 커버되는지 확인합니다.
- 만약 완전히 새로운 장소(예: 공항, 호텔 로비)나 특수 인물(예: 택시기사)이 추가된 경우에만 `image-generator` 서브에이전트로 동일한 지브리 수채화풍의 에셋을 생성하여 `public/images/shorts/`에 추가합니다.

### Step 3. 테마 및 화자 파서 연동
- [`src/components/daily/shorts/themeResolver.ts`](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/components/daily/shorts/themeResolver.ts)에 신규 유닛 ID 또는 키워드 매핑을 등록합니다.
- [`src/components/daily/shorts/speakerParser.ts`](file:///c:/Users/dandycode/Documents/GitHub/busan-dayori/src/components/daily/shorts/speakerParser.ts)에 화자 이름 판별 규칙을 보완합니다.

### Step 4. 화자별 보이스 및 DB 자동 캐싱
- 여성 상대역(`clerk`, `auntie`): `voice: 'Kore'`
- 남성 상대역 및 학습자(`passerby`, `friend`, `learner`): `voice: 'Puck'`
- 최초 1회 재생 시 Supabase DB `tts_audio_cache`에 `(text, lang, voice)` 복합 키로 자동 Upsert됩니다.

### Step 5. UI 및 품질 검증
- `npx tsc --noEmit` 타입 검사 통과
- `npm run build` 프로덕션 빌드 통과
- 숏츠 완료 시 프로그레스 바 100% 정상 표시 및 1.0x / 0.5x 배속 기능 검증
