# 커리큘럼 Unit · 쇼츠 구성 · 3D 월드 매핑 현황

- **기준 파일**
  - 커리큘럼 데이터: `src/lib/curriculum/curriculumData.ts`
  - 3D 월드 데이터/타입/씬/HUD: `src/components/3d/worldData.ts`, `src/components/3d/types.ts`, `src/components/3d/WorldSceneManager.ts`, `src/components/3d/WorldHudOverlay.tsx`
  - 쇼츠 테마/화자/캐릭터/배경: `src/components/daily/shorts/themeResolver.ts`, `src/components/daily/shorts/speakerParser.ts`, `src/components/daily/shorts/ShortsCharacter.tsx`, `src/components/daily/shorts/ShortsBackground.tsx`
  - 쇼츠 캐릭터 이미지 경로: `public/images/shorts/` (`learner.jpg`, `clerk.jpg`, `friend.jpg`, `passerby.jpg`, `auntie.jpg`)

---

## 요약

- 커리큘럼 고정 Unit은 총 **12개**(`Lv.0` 5개, `Lv.1` 3개, `Lv.2` 2개, `Lv.3` 2개)입니다.
- **`Lv.0`~`Lv.3`의 12개 Unit 전체가 3D 월드 NPC와 1:1 매핑**되어 있습니다(`WorldThemeLevel`: `'level0' | 'level1' | 'level2' | 'level3'`, 기본 진입 `level0`).
- 3D 월드 HUD 드롭다운 표기는 커리큘럼과 동일하게 레벨 제목 없이 `Lv.0 입문`, `Lv.1 초급`, `Lv.2 중급`, `Lv.3 실전`으로 통일되어 있습니다.

### 쇼츠 화자 Role → 캐릭터 이미지 매핑 규칙 (`ShortsCharacter.tsx`)
- `learner` / `child` / `polite_learner` → `learner.jpg` (나 / 학습자)
- `clerk` → `clerk.jpg` (점원 / 직원)
- `friend` → `friend.jpg` (친구)
- `passerby` → `passerby.jpg` (행인 / 안내원)
- `auntie` → `auntie.jpg` (이모님 / 할머니 / 사장님)

---

## 1. `Lv.0 입문` (`level: 'starter'`) — 3D 월드 `level0` 적용 (5개 Unit 전체)

- **커리큘럼 제목:** 히라가나 & 첫걸음 입문
- **대상:** 일본어를 처음 시작하는 입문자 (글자와 소리부터 제대로 배우고 싶은 학습자)

| Unit | Unit ID (Lesson ID) | 제목 / 핵심 표현 | 쇼츠 배경 | 쇼츠 화자 구성 (3턴) | 쇼츠 등장 캐릭터 이미지 (`public/images/shorts/`) | 3D 월드 NPC 매핑 (`avatarImage` · 장소) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Unit 1 | `starter-1` (`lesson-starter-1`) | 안녕! 고마워! (인사와 부름)<br>`ありがとう！` | `cafe`<br>(`bg-cafe.jpg`) | `점원/친구` → `나 (아이)` → `나 (어른에게 정중히)` | `friend.jpg` (점원/친구)<br>`learner.jpg` (나 - 아이/정중히) | `카페 친구 하루` (`npc-starter-1` / `friend.jpg` · 카페 내부) |
| Unit 2 | `starter-2` (`lesson-starter-2`) | 맘마 냠냠! (이거 주세요 & 맛있어!)<br>`これ ください！` | `restaurant`<br>(`bg-restaurant.jpg`) | `나 (아이)` → `식당 이모님` → `나 (먹고 나서)` | `learner.jpg` (나 - 아이/먹고 나서)<br>`auntie.jpg` (식당 이모님) | `식당 이모님 미카` (`npc-starter-2` / `auntie.jpg` · 식당 내부) |
| Unit 3 | `starter-3` (`lesson-starter-3`) | 화장실이 어디예요? (생존 SOS)<br>`トイレは どこですか？` | `street`<br>(`bg-street.jpg`) | `나 (급한 표정)` → `친절한 행인` → `나 (안도하며)` | `learner.jpg` (나 - 급한 표정/안도)<br>`passerby.jpg` (친절한 행인) | `친절한 행인 유타` (`npc-starter-3` / `passerby.jpg` · 중앙 거리) |
| Unit 4 | `starter-4` (`lesson-starter-4`) | 응! 좋아! 괜찮아! (의사표현)<br>`だいじょうぶです！` | `shop`<br>(`bg-shop.jpg`) | `점원 (물건을 담으며)` → `나 (손을 살짝 저으며)` → `점원 (공손히)` | `clerk.jpg` (점원)<br>`learner.jpg` (나) | `편의점 점원 리나` (`npc-starter-4` / `clerk.jpg` · 편의점 내부) |
| Unit 5 | `starter-5` (`lesson-starter-5`) | 이게 뭐야? 얼마예요? (쇼핑과 호기심)<br>`これ、いくらですか？` | `shop`<br>(`bg-shop.jpg`) | `나` → `점원` → `나` | `learner.jpg` (나)<br>`clerk.jpg` (점원) | `기념품 점원 켄지` (`npc-starter-5` / `clerk.jpg` · 기념품 상점 내부) |

---

## 2. `Lv.1 초급` (`level: 'beginner'`) — 3D 월드 `level1` 적용 (3개 Unit 전체)

- **커리큘럼 제목:** 초등학생/초급 회화 (JLPT N5~N4)
- **3D 룸 테마:** `도쿄 골목길 & 편의점` (`Lv.1 초급`)

| Unit | Unit ID (Lesson ID) | 제목 / 핵심 표현 | 쇼츠 배경 | 쇼츠 화자 구성 (3턴) | 쇼츠 등장 캐릭터 이미지 (`public/images/shorts/`) | 3D 월드 NPC 매핑 (`avatarImage`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Unit 1 | `beginner-1` (`lesson-beginner-1`) | 정중하게 주문하기 (~をお願いします)<br>`これを お願いします` | `cafe`<br>(`bg-cafe.jpg`) | `손님 (나)` → `점원` → `손님 (나)` | `learner.jpg` (손님 - 나)<br>`clerk.jpg` (점원) | `다나카 점원` (`npc-konbini` / `clerk.jpg`) |
| Unit 2 | `beginner-2` (`lesson-beginner-2`) | 결제 수단 묻기 (카드 사용 가능한가요?)<br>`カードは 使えますか？` | `shop`<br>(`bg-shop.jpg`) | `손님 (나)` → `점원` → `손님 (나)` | `learner.jpg` (손님 - 나)<br>`clerk.jpg` (점원) | `사토 안내원` (`npc-station` / `passerby.jpg`) |
| Unit 3 | `beginner-3` (`lesson-beginner-3`) | 지하철역과 길 찾기 (~는 어디인가요?)<br>`駅は どちらですか？` | `street`<br>(`bg-street.jpg`) | `나` → `행인` → `나` | `learner.jpg` (나)<br>`passerby.jpg` (행인) | `마을 친구 미유` (`npc-vending` / `friend.jpg`) |

---

## 3. `Lv.2 중급` (`level: 'intermediate'`) — 3D 월드 `level2` 적용 (2개 Unit 전체)

- **커리큘럼 제목:** 자연스러운 일상 소통 (JLPT N3)
- **3D 룸 테마:** `교토 카페 & 골목길` (`Lv.2 중급`)

| Unit | Unit ID (Lesson ID) | 제목 / 핵심 표현 | 쇼츠 배경 | 쇼츠 화자 구성 (3턴) | 쇼츠 등장 캐릭터 이미지 (`public/images/shorts/`) | 3D 월드 NPC 매핑 (`avatarImage`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Unit 1 | `intermediate-1` (`lesson-day-1`) | 식당에서 자연스럽게 주문하기 (~でお願いできますか)<br>`〜でお願いできますか` | `restaurant`<br>(`bg-restaurant.jpg`) | `손님 (나)` → `점원 (메모하며)` → `손님 (나)` | `learner.jpg` (손님 - 나)<br>`clerk.jpg` (점원) | `유키 바리스타` (`npc-cafe` / `clerk.jpg`) |
| Unit 2 | `intermediate-2` (`lesson-day-3`) | 식사 계산과 분할 결제 요청하기 (따로 계산)<br>`お会計、別々でお願いできますか` | `restaurant`<br>(`bg-restaurant.jpg`) | `손님 (나)` → `점원 (양해를 구하며)` → `손님 (나)` | `learner.jpg` (손님 - 나)<br>`clerk.jpg` (점원) | `정숙 이모님` (`npc-ramen` / `auntie.jpg`) |

---

## 4. `Lv.3 실전` (`level: 'advanced'`) — 3D 월드 `level3` 적용 (2개 Unit 전체)

- **커리큘럼 제목:** 원어민 뉘앙스 & 미각 묘사 (JLPT N2)
- **3D 룸 테마:** `이자카야 & 축제 거리` (`Lv.3 실전`)

| Unit | Unit ID (Lesson ID) | 제목 / 핵심 표현 | 쇼츠 배경 | 쇼츠 화자 구성 (3턴) | 쇼츠 등장 캐릭터 이미지 (`public/images/shorts/`) | 3D 월드 NPC 매핑 (`avatarImage`) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Unit 1 | `advanced-1` (`lesson-day-2`) | 맛과 식감의 미묘한 차이 묘사하기 (コク・さっぱり)<br>`さっぱりしていてコクがある` | `restaurant`<br>(`bg-restaurant.jpg`) | `친구` → `나 (감탄하며)` → `친구` | `friend.jpg` (친구)<br>`learner.jpg` (나) | `맛집 친구 미호` (`npc-izakaya` / `passerby.jpg`) |
| Unit 2 | `advanced-2` (`lesson-advanced-2`) | 혼잡 시 일괄 결제 및 가게 에티켓 대처하기<br>`混雑時はまとめてのお支払いをお願いしております` | `restaurant`<br>(`bg-restaurant.jpg`) | `점원 (양해를 구하며)` → `손님 (나)` → `점원 (미소 지으며)` | `clerk.jpg` (점원)<br>`learner.jpg` (손님 - 나) | `축제 상인 아오이` (`npc-matsuri` / `friend.jpg`) |

---

## 5. `AI+` (`level: 'ai'`)

- **커리큘럼 제목:** AI+ 실전 로컬 챌린지
- **Unit 구성:** `units: []` (고정 Unit 없음)
