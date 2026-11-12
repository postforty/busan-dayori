# Busan Dayori 3D 캐릭터 디자인 가이드 (`3D DESIGN.md`)

`釜山だより (Busan Dayori)` 3D 월드에서 사용하는 **일러스트 감성 절차적(Procedural) 3D 캐릭터**의 설계 원칙, 컬러 시스템, 파츠 조립 규칙, 애니메이션 규격을 정리한 문서입니다.

* 기준 레퍼런스 일러스트: `public/images/shorts/learner.jpg`
* 구현 소스: `src/components/3d/proceduralPlayer.ts`
* 로더 및 컨트롤러: `src/components/3d/modelLoader.ts`, `src/components/3d/CharacterController.ts`

---

## 1. 디자인 콘셉트

1. **원화 감성의 3D 재해석**
   * [learner.jpg](public/images/shorts/learner.jpg)의 **모자 없는 헝클어진 연갈색 머리, 크림색 오픈 후드 집업, 테라코타 이너 + 네이비 스트라이프 목선, 올리브색 여행용 백팩** 실루엣을 Three.js 기본 도형 조합으로 구현합니다.
2. **기존 3D NPC와의 조화**
   * 월드의 NPC(`/models/npc-girl.glb` 등)와 동일한 **카툰 치비 비율** 및 **키 `1.85` (`y = 0` 바닥 정렬)** 규격을 유지해 이질감 없이 어우러집니다.
3. **3인칭 시점 최적화**
   * 플레이 중 가장 많이 노출되는 뒷모습·측면에서 캐릭터 정체성이 바로 드러나도록 **뒷머리 아호게/결, 접힌 후드 칼라, 백팩·어깨끈**의 입체감을 우선합니다.

---

## 2. 셰이딩 & 재질 규칙 (Ghibli / Watercolor Tone)

### 2.1 3단계 톤 그라데이션 (`MeshToonMaterial`)
* `THREE.MeshToonMaterial`에 3단계 밝기 `DataTexture`를 `gradientMap`으로 적용합니다.
* **밝기 배열**: `new Uint8Array([185, 224, 255])` (`NearestFilter`, `NoColorSpace`, `generateMipmaps = false`)
* 가장 어두운 톤을 `185` 이상으로 높게 유지해 3D 그림자가 칙칙한 검은색으로 뭉치지 않고 **따뜻한 수채화 음영**을 띠도록 합니다.

### 2.2 그림자 간섭(Shadow Acne) 방지
* 모든 캐릭터 파츠 메쉬는 **`castShadow = true`, `receiveShadow = false`** 로 설정합니다.
* 곡면 도형 조합에 `receiveShadow = true`를 켜면 1024px 섀도우 맵 해상도 한계로 얼굴·머리에 대각선 줄무늬가 생기므로, 바닥에만 그림자를 드리우고 캐릭터 자체 셀프 섀도우는 끕니다.

### 2.3 주인공 컬러 팔레트 (`PALETTE`)
| 부위 | Hex 코드 | 설명 |
| :--- | :--- | :--- |
| 피부 (`skin`) | `#F6CDB3` | 따뜻한 살구빛 기본 피부 |
| 볼터치/코 (`blush`) | `#F29B8E` | 부드러운 코랄 핑크 |
| 눈/입 (`eye`) | `#3F291B` | 짙은 밤색 (`eyeHighlight`: `#FFFFFF`) |
| 머리 기본 (`hairMain`) | `#B58B63` | 밝은 연갈색 (일러스트 기반) |
| 눈썹/음영 (`hairShade`) | `#9C724C` | 한 톤 어두운 갈색 |
| 후드 집업 (`hoodie`) | `#F3EAD8` | 웜 아이보리/크림색 |
| 후드 시보리·끈 (`hoodieTrim`) | `#E3D6BE` | 연베이지 트림 |
| 이너 티셔츠 (`innerShirt`) | `#B95F3C` | 테라코타/브릭 오렌지 |
| 이너 목선 (`innerCollar`) | `#25344D` | 다크 네이비 (`collarStripe`: `#EEF2F7`) |
| 백팩 본체 (`backpack`) | `#6A7B4C` | 올리브 그린 (`backpackFlap`: `#7D8F5C`) |
| 백팩 버클 (`backpackAccent`) | `#3B4232` | 다크 올리브/차콜 |
| 바지 (`pants`) | `#2B3A55` | 다크 네이비 팬츠 |
| 운동화 (`shoe` / `shoeSole`) | `#CBB89D` / `#F7F3EB` | 베이지 스니커즈 + 화이트 밑창/앞코 |

---

## 3. 골격 계층 구조 및 좌표 규칙

* **정면 기준 방향**: **`+Z`** (`CharacterController.ts`의 `Math.atan2(dir.x, dir.z)` 이동 회전 기준과 일치)
* **정규화**: 전체 조립 후 `Box3`로 높이를 `targetHeight = 1.85`로 스케일링하고, `root.position.y = -scaledBox.min.y`로 발바닥을 `y = 0`에 맞춥니다.

```text
root (targetHeight = 1.85, min.y = 0)
└─ bodyRig
   ├─ pelvisMesh (y = hipsY + 0.01, 다리·상체 틈새 방지용 연결부)
   ├─ leftLegPivot / rightLegPivot (x = ±0.115, y = 0.50)
   └─ torsoPivot (y = hipsY = 0.47, 인사/걷기 상체 기울기 중심)
      ├─ torso (이너 티셔츠, 오픈 후드, 접힌 후드 칼라, 백팩, 앞면 어깨끈)
      ├─ headPivot (y = 0.52)
      │  └─ skull (y = 0.27: 얼굴, 귀, 눈/하이라이트, 눈썹, 볼, 미소, 헤어 캡, HAIR_SPIKES)
      └─ leftArmPivot / rightArmPivot (x = ±0.255, y = 0.44)
```

---

## 4. 파츠 조립 핵심 노하우 (시행착오 체크리스트)

새 캐릭터나 NPC를 같은 방식으로 제작할 때 아래 5가지를 반드시 지킵니다.

1. **다리–상체 틈새 방지**
   * `torsoPivot`과 다리 피벗을 단순히 같은 높이에 두면 상체 밑단과 다리 캡슐 사이에 빈틈이 생깁니다.
   * **`hipsY` 위치에 골반 실린더(`pants` 색상)** 를 두고 다리 캡슐 상단이 골반 내부에서 시작하도록 겹쳐 배치합니다.
2. **오픈 재킷(`CylinderGeometry`) 방향**
   * Three.js `CylinderGeometry`는 **`theta = 0`이 `+Z`(정면)** 입니다.
   * `thetaStart = Math.PI * 0.22`, `thetaLength = Math.PI * 1.56`으로 **Y축 회전 없이** 배치해야 정면이 열려 이너 티셔츠가 드러납니다.
3. **접힌 후드 칼라(`TorusGeometry`) 회전**
   * `TorusGeometry`는 XY 평면에 그려지므로, 부모 그룹의 회전 순서를 `rotation.order = 'YXZ'`로 두고 `set(-0.14, Math.PI * 1.175, 0)`을 적용해야 등(`-Z`)과 양옆을 감싸며 정면이 열립니다.
4. **이마·눈썹 노출과 매끄러운 뒤통수**
   * 헤어 구가 얼굴 구보다 `+Z`로 크면 눈·눈썹 위까지 머리카락이 덮어 버립니다.
   * **상단 반구(`thetaLength = Math.PI * 0.62`)를 뒤로 젖혀(`rot.x = -0.58`)** 이마·눈썹 위까지 살색이 시원하게 보이게 하고, 뒤통수에는 별도 색상의 구를 덧대지 않아 360도 매끄러운 단일 톤 실루엣을 유지합니다.
   * 앞머리·구레나룻·아호게는 `ConeGeometry`(`HAIR_SPIKES`)로 표현하며, 구레나룻은 머리 옆선 안쪽(`x = ±0.252`)에 붙여 귀 위쪽이 뿔처럼 튀어나오지 않게 합니다.
5. **레이어 Z-깊이 정렬**
   * 앞면 오픈 후드 패널(`z = 0.165`)은 이너 티셔츠(`radius ~0.205`)보다 앞으로, 앞면 백팩 끈(`z = 0.22`)과 후드 끈(`z = 0.22`)은 후드 패널보다 앞으로 배치해 메쉬가 파묻히거나 Z-fighting이 나지 않게 합니다.

---

## 5. 애니메이션 & 리소스 관리 규격 (`CharacterRigHandle`)

`createProceduralLearner()`는 `modelLoader.ts`의 `CharacterRigHandle` 인터페이스를 그대로 반환하므로 `CharacterController`에서 GLB 캐릭터와 동일하게 제어됩니다.

* **`idle`**: `animTime * 2.2` 주기의 잔잔한 상체 호흡(`bodyRig.position.y`), 고개 끄덕임·좌우 시선 이동, 팔의 미세한 흔들림.
* **`walk`**: `animTime * 9.5` 주기의 팔다리 교차 스윙(`±0.58 rad` / `∓0.45 rad`), 상체 전경(`0.08 rad`), 가벼운 바운스.
* **`interact` (`Space` 키 인사)**: `1.1s` 동안 `Math.sin(progress * Math.PI)` 곡선으로 상체(`0.52 rad`)와 머리(`0.25 rad`)를 숙였다가 복귀. 이동 입력(`walk`)이 들어오면 즉시 중단하고 걷기로 전환됩니다.
* **`dispose()`**: `gradientMap`, 중복 제거된 `Set<THREE.BufferGeometry>`, 모든 `Material`을 명시적으로 해제합니다.

---

## 6. 확장 가이드 (새 캐릭터 추가 / 외부 GLB 병행)

* **동일 스타일의 NPC 추가**: `proceduralPlayer.ts`의 `PALETTE`와 `HAIR_SPIKES`를 옵션 인자로 분리하면 머리 스타일·의상 색만 바꾼 다양한 3D NPC를 즉시 찍어낼 수 있습니다.
* **외부 AI / Mixamo `.glb` 캐릭터와 병행 사용**: `modelLoader.ts`의 `loadAnimatedCharacter()`는 `.glb` 내부에 애니메이션 클립(`gltf.animations`)이 있으면 자동으로 `idle`/`walk`/`interact`에 매핑(`resolveEmbeddedAnimations`)하며, `options.toonShading: true`로 동일한 셀 셰이딩 톤을 맞출 수 있습니다.

