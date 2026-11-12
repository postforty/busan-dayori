import * as THREE from 'three';
import type { AnimationName, CharacterRigHandle } from './modelLoader';

const PALETTE = {
  skin: 0xf6cdb3,
  blush: 0xf29b8e,
  eye: 0x3f291b,
  eyeHighlight: 0xffffff,
  hairMain: 0xb58b63,
  hairShade: 0x9c724c,
  hoodie: 0xf3ead8,
  hoodieTrim: 0xe3d6be,
  innerShirt: 0xb95f3c,
  innerCollar: 0x25344d,
  collarStripe: 0xeef2f7,
  backpack: 0x6a7b4c,
  backpackFlap: 0x7d8f5c,
  backpackAccent: 0x3b4232,
  pants: 0x2b3a55,
  shoe: 0xcbb89d,
  shoeSole: 0xf7f3eb
} as const;

interface HairSpikeSpec {
  pos: [number, number, number];
  rot: [number, number, number];
  radius: number;
  height: number;
  shaded?: boolean;
}

// 둥근 헤어 돔 위에 자연스럽게 얹히는 앞머리·옆머리·정수리 가닥
const HAIR_SPIKES: HairSpikeSpec[] = [
  // 앞머리 (이마 위 헤어라인에서 내려오며 눈썹 위에서 멈춤)
  { pos: [-0.13, 0.165, 0.215], rot: [2.42, 0, 0.34], radius: 0.065, height: 0.16 },
  { pos: [-0.04, 0.175, 0.235], rot: [2.48, 0, 0.12], radius: 0.072, height: 0.17 },
  { pos: [0.06, 0.175, 0.235], rot: [2.46, 0, -0.14], radius: 0.07, height: 0.165 },
  { pos: [0.145, 0.16, 0.205], rot: [2.38, 0, -0.36], radius: 0.062, height: 0.155 },
  // 구레나룻 (귀 앞쪽에 매끄럽게 붙어 내려오는 옆머리)
  { pos: [-0.252, 0.025, 0.05], rot: [3.08, 0, 0.18], radius: 0.046, height: 0.17 },
  { pos: [0.252, 0.025, 0.05], rot: [3.08, 0, -0.18], radius: 0.046, height: 0.17 },
  // 정수리 바보털(아호게) & 뒷머리 포인트
  { pos: [0.02, 0.33, -0.05], rot: [-0.6, 0, -0.32], radius: 0.048, height: 0.18 },
  { pos: [-0.09, 0.30, -0.10], rot: [-0.88, 0, 0.42], radius: 0.052, height: 0.16 },
  { pos: [0.10, 0.28, -0.11], rot: [-0.92, 0, -0.45], radius: 0.052, height: 0.16 }
];

function createSoftToonGradient(): THREE.DataTexture {
  // 수채화/지브리 감성을 살리는 부드러운 3단계 톤 램프
  const tones = new Uint8Array([185, 224, 255]);
  const tex = new THREE.DataTexture(tones, tones.length, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.colorSpace = THREE.NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function addMesh<T extends THREE.BufferGeometry>(
  parent: THREE.Object3D,
  geometry: T,
  material: THREE.Material,
  pos: [number, number, number] = [0, 0, 0],
  rot: [number, number, number] = [0, 0, 0],
  scale: [number, number, number] = [1, 1, 1]
): THREE.Mesh {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...pos);
  mesh.rotation.set(...rot);
  mesh.scale.set(...scale);
  // 캐릭터 자체 셀프 섀도우 줄무늬를 막고 바닥 그림자만 드리움
  mesh.castShadow = true;
  mesh.receiveShadow = false;
  parent.add(mesh);
  return mesh;
}

function createMaterials(gradientMap: THREE.DataTexture) {
  const toon = (color: number) =>
    new THREE.MeshToonMaterial({ color, gradientMap });

  return {
    skin: toon(PALETTE.skin),
    blush: toon(PALETTE.blush),
    eye: toon(PALETTE.eye),
    eyeHighlight: new THREE.MeshBasicMaterial({ color: PALETTE.eyeHighlight }),
    hairMain: toon(PALETTE.hairMain),
    hairShade: toon(PALETTE.hairShade),
    hoodie: toon(PALETTE.hoodie),
    hoodieTrim: toon(PALETTE.hoodieTrim),
    innerShirt: toon(PALETTE.innerShirt),
    innerCollar: toon(PALETTE.innerCollar),
    collarStripe: toon(PALETTE.collarStripe),
    backpack: toon(PALETTE.backpack),
    backpackFlap: toon(PALETTE.backpackFlap),
    backpackAccent: toon(PALETTE.backpackAccent),
    pants: toon(PALETTE.pants),
    shoe: toon(PALETTE.shoe),
    shoeSole: toon(PALETTE.shoeSole)
  };
}

type MaterialSet = ReturnType<typeof createMaterials>;

function buildHead(mats: MaterialSet): THREE.Group {
  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.52, 0);

  const skull = new THREE.Group();
  skull.position.set(0, 0.27, 0);
  headPivot.add(skull);

  // 얼굴 본체 + 귀
  addMesh(skull, new THREE.SphereGeometry(0.285, 24, 20), mats.skin, [0, 0, 0], [0, 0, 0], [1.02, 0.96, 0.96]);
  for (const side of [-1, 1] as const) {
    addMesh(skull, new THREE.SphereGeometry(0.062, 14, 12), mats.skin, [side * 0.282, -0.02, -0.01], [0, 0, 0], [0.68, 0.98, 0.62]);
  }

  // 눈, 눈동자 하이라이트, 온화한 눈썹, 볼터치
  const eyeGeo = new THREE.SphereGeometry(0.036, 14, 12);
  const highlightGeo = new THREE.SphereGeometry(0.013, 10, 8);
  const browGeo = new THREE.CapsuleGeometry(0.01, 0.054, 6, 8);
  const blushGeo = new THREE.SphereGeometry(0.044, 12, 10);

  for (const side of [-1, 1] as const) {
    addMesh(skull, eyeGeo, mats.eye, [side * 0.098, -0.015, 0.252], [0, 0, 0], [0.95, 1.18, 0.55]);
    addMesh(skull, highlightGeo, mats.eyeHighlight, [side * 0.098 - 0.01, -0.002, 0.27]);
    addMesh(skull, browGeo, mats.hairShade, [side * 0.098, 0.068, 0.258], [0, 0, Math.PI / 2]);
    addMesh(skull, blushGeo, mats.blush, [side * 0.155, -0.065, 0.215], [0, side * 0.35, 0], [1.1, 0.62, 0.4]);
  }

  // 코 & 부드러운 미소
  addMesh(skull, new THREE.SphereGeometry(0.017, 10, 8), mats.blush, [0, -0.045, 0.278], [0, 0, 0], [1, 0.8, 0.7]);
  addMesh(
    skull,
    new THREE.TorusGeometry(0.04, 0.008, 8, 16, Math.PI * 0.78),
    mats.eye,
    [0, -0.072, 0.264],
    [0.18, 0, Math.PI * 1.11]
  );

  // 뒤로 젖힌 단일 톤 헤어 캡: 뒷머리가 튀어나오거나 색이 갈라지지 않고 매끄럽게 이어짐
  addMesh(
    skull,
    new THREE.SphereGeometry(0.296, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.62),
    mats.hairMain,
    [0, 0.025, -0.01],
    [-0.58, 0, 0],
    [1.03, 0.98, 1.02]
  );
  addMesh(skull, new THREE.SphereGeometry(0.26, 20, 16), mats.hairMain, [0, 0.075, -0.045], [0, 0, 0], [1.0, 0.9, 0.92]);

  for (const spike of HAIR_SPIKES) {
    addMesh(
      skull,
      new THREE.ConeGeometry(spike.radius, spike.height, 12),
      spike.shaded ? mats.hairShade : mats.hairMain,
      spike.pos,
      spike.rot
    );
  }

  return headPivot;
}

function buildTorsoAndBackpack(mats: MaterialSet): THREE.Group {
  const torso = new THREE.Group();

  // 안쪽 테라코타 티셔츠 + 네이비 스트라이프 목선
  addMesh(torso, new THREE.CylinderGeometry(0.185, 0.205, 0.48, 20), mats.innerShirt, [0, 0.26, 0.005]);
  addMesh(torso, new THREE.CylinderGeometry(0.142, 0.168, 0.11, 18), mats.innerCollar, [0, 0.46, 0.005]);
  addMesh(torso, new THREE.TorusGeometry(0.132, 0.015, 8, 20), mats.collarStripe, [0, 0.47, 0.015], [Math.PI / 2, 0, 0]);
  addMesh(torso, new THREE.CylinderGeometry(0.072, 0.082, 0.12, 14), mats.skin, [0, 0.51, 0]);

  // 크림색 오픈 후드 집업 (thetaStart/Length로 정면 +Z만 열고 등·옆을 감쌈)
  addMesh(
    torso,
    new THREE.CylinderGeometry(0.218, 0.245, 0.48, 22, 1, false, Math.PI * 0.22, Math.PI * 1.56),
    mats.hoodie,
    [0, 0.255, -0.005]
  );
  // 밑단 시보리 (동일하게 앞부분을 열어 이너가 보이도록 처리)
  addMesh(
    torso,
    new THREE.CylinderGeometry(0.242, 0.248, 0.055, 22, 1, false, Math.PI * 0.22, Math.PI * 1.56),
    mats.hoodieTrim,
    [0, 0.035, -0.005]
  );

  for (const side of [-1, 1] as const) {
    // 앞 지퍼 좌우 재킷 여밈 (가운데 테라코타 이너가 자연스럽게 드러남)
    addMesh(torso, new THREE.BoxGeometry(0.11, 0.47, 0.12), mats.hoodie, [side * 0.14, 0.255, 0.165], [0, side * -0.18, 0]);
    // 후드 끈
    addMesh(torso, new THREE.CylinderGeometry(0.009, 0.009, 0.16, 8), mats.hoodieTrim, [side * 0.085, 0.36, 0.22], [0.05, 0, side * 0.05]);
    addMesh(torso, new THREE.SphereGeometry(0.015, 10, 8), mats.hoodieTrim, [side * 0.08, 0.28, 0.227]);
  }

  // 목 뒤로 접힌 후드 (뒤쪽 -Z와 양옆을 감싸고 정면 +Z는 열림)
  const hoodCollar = new THREE.Group();
  hoodCollar.position.set(0, 0.46, -0.02);
  hoodCollar.rotation.order = 'YXZ';
  hoodCollar.rotation.set(-0.14, Math.PI * 1.175, 0);
  torso.add(hoodCollar);
  addMesh(
    hoodCollar,
    new THREE.TorusGeometry(0.185, 0.068, 12, 22, Math.PI * 1.35),
    mats.hoodie,
    [0, 0, 0],
    [Math.PI / 2, 0, 0]
  );

  // 올리브색 여행용 백팩 + 상단 롤 덮개 + 앞면 포켓 + 어깨끈
  const pack = new THREE.Group();
  pack.position.set(0, 0.27, -0.245);
  torso.add(pack);

  addMesh(pack, new THREE.BoxGeometry(0.32, 0.38, 0.16), mats.backpack, [0, 0, 0]);
  addMesh(pack, new THREE.CylinderGeometry(0.085, 0.085, 0.34, 14), mats.backpackFlap, [0, 0.18, 0], [0, 0, Math.PI / 2]);
  addMesh(pack, new THREE.BoxGeometry(0.24, 0.16, 0.06), mats.backpackFlap, [0, -0.07, -0.09]);

  for (const side of [-1, 1] as const) {
    addMesh(pack, new THREE.BoxGeometry(0.035, 0.22, 0.025), mats.backpackAccent, [side * 0.09, 0.04, -0.09]);
    // 어깨 위로 넘어와 가슴으로 내려오는 올리브색 백팩 끈
    addMesh(torso, new THREE.BoxGeometry(0.055, 0.05, 0.38), mats.backpack, [side * 0.155, 0.485, 0.02], [0.06, 0, 0]);
    addMesh(torso, new THREE.BoxGeometry(0.052, 0.32, 0.038), mats.backpack, [side * 0.155, 0.32, 0.22], [-0.04, 0, 0]);
    addMesh(torso, new THREE.BoxGeometry(0.06, 0.035, 0.046), mats.backpackAccent, [side * 0.155, 0.24, 0.225]);
  }

  return torso;
}

function buildArm(side: -1 | 1, mats: MaterialSet): THREE.Group {
  const pivot = new THREE.Group();
  pivot.position.set(side * 0.255, 0.44, 0);

  addMesh(pivot, new THREE.CapsuleGeometry(0.064, 0.18, 8, 12), mats.hoodie, [side * 0.02, -0.14, 0], [0, 0, side * 0.12]);
  addMesh(pivot, new THREE.CylinderGeometry(0.058, 0.055, 0.045, 12), mats.hoodieTrim, [side * 0.035, -0.25, 0], [0, 0, side * 0.12]);
  addMesh(pivot, new THREE.SphereGeometry(0.055, 14, 12), mats.skin, [side * 0.045, -0.31, 0.01]);

  return pivot;
}

function buildLeg(side: -1 | 1, mats: MaterialSet): THREE.Group {
  const pivot = new THREE.Group();
  pivot.position.set(side * 0.115, 0.50, 0);

  // 다리 상단이 골반 내부에서 시작해 빈틈 없이 연결되도록 배치
  addMesh(pivot, new THREE.CapsuleGeometry(0.085, 0.26, 8, 14), mats.pants, [0, -0.18, 0]);
  addMesh(pivot, new THREE.BoxGeometry(0.145, 0.095, 0.22), mats.shoe, [0, -0.41, 0.035]);
  addMesh(pivot, new THREE.BoxGeometry(0.152, 0.036, 0.23), mats.shoeSole, [0, -0.46, 0.035]);
  addMesh(pivot, new THREE.SphereGeometry(0.072, 12, 10), mats.shoeSole, [0, -0.42, 0.12], [0, 0, 0], [1, 0.65, 0.85]);

  return pivot;
}

/**
 * 일러스트(learner.jpg)의 감성과 색감을 반영한 3D 주인공 캐릭터 생성
 */
export function createProceduralLearner(targetHeight = 1.85): CharacterRigHandle {
  const gradientMap = createSoftToonGradient();
  const mats = createMaterials(gradientMap);

  const root = new THREE.Group();
  root.name = 'procedural-learner';

  const bodyRig = new THREE.Group();
  root.add(bodyRig);

  const hipsY = 0.47;

  // 골반(엉덩이) 연결부 — 다리와 상체 사이가 절대 벌어지지 않도록 이어줌
  addMesh(bodyRig, new THREE.CylinderGeometry(0.22, 0.20, 0.14, 18), mats.pants, [0, hipsY + 0.01, 0]);

  const torsoPivot = new THREE.Group();
  torsoPivot.position.set(0, hipsY, 0);
  bodyRig.add(torsoPivot);

  const torso = buildTorsoAndBackpack(mats);
  const headPivot = buildHead(mats);
  const leftArmPivot = buildArm(-1, mats);
  const rightArmPivot = buildArm(1, mats);
  const leftLegPivot = buildLeg(-1, mats);
  const rightLegPivot = buildLeg(1, mats);

  torsoPivot.add(torso, headPivot, leftArmPivot, rightArmPivot);
  bodyRig.add(leftLegPivot, rightLegPivot);

  // 목표 키(targetHeight)로 정규화 및 발바닥 Y=0 정렬
  const rawBox = new THREE.Box3().setFromObject(root);
  const rawSize = new THREE.Vector3();
  rawBox.getSize(rawSize);
  if (rawSize.y > 0) {
    root.scale.setScalar(targetHeight / rawSize.y);
  }
  const scaledBox = new THREE.Box3().setFromObject(root);
  root.position.y = -scaledBox.min.y;

  const mixer = new THREE.AnimationMixer(root);
  let currentAction: AnimationName = 'idle';
  let animTime = 0;
  let interactElapsed = 0;
  const interactDuration = 1.1;

  const playAction = (name: AnimationName) => {
    if (name === 'interact') {
      currentAction = 'interact';
      interactElapsed = 0;
      return;
    }
    if (currentAction !== name) {
      currentAction = name;
    }
  };

  const update = (delta: number) => {
    animTime += delta;

    if (currentAction === 'interact') {
      interactElapsed += delta;
      const progress = Math.min(1, interactElapsed / interactDuration);
      const bowCurve = Math.sin(progress * Math.PI);

      torsoPivot.rotation.x = bowCurve * 0.52;
      headPivot.rotation.x = bowCurve * 0.25;
      leftArmPivot.rotation.x = bowCurve * 0.2;
      rightArmPivot.rotation.x = bowCurve * 0.2;
      leftLegPivot.rotation.x = 0;
      rightLegPivot.rotation.x = 0;
      bodyRig.position.y = 0;

      if (progress >= 1) {
        currentAction = 'idle';
      }
      return;
    }

    if (currentAction === 'walk') {
      const stride = Math.sin(animTime * 9.5);
      const bounce = Math.abs(Math.sin(animTime * 9.5)) * 0.04;

      bodyRig.position.y = bounce;
      torsoPivot.rotation.x = 0.08;
      torsoPivot.rotation.z = stride * 0.03;
      headPivot.rotation.x = -0.05;

      leftLegPivot.rotation.x = stride * 0.58;
      rightLegPivot.rotation.x = -stride * 0.58;
      leftArmPivot.rotation.x = -stride * 0.45;
      rightArmPivot.rotation.x = stride * 0.45;
      return;
    }

    // idle: 잔잔한 호흡 및 고개 움직임
    const breath = Math.sin(animTime * 2.2);
    bodyRig.position.y = breath * 0.012;
    torsoPivot.rotation.x = 0;
    torsoPivot.rotation.z = 0;
    headPivot.rotation.x = breath * 0.025;
    headPivot.rotation.y = Math.sin(animTime * 0.9) * 0.06;

    leftLegPivot.rotation.x *= 0.82;
    rightLegPivot.rotation.x *= 0.82;
    leftArmPivot.rotation.x = breath * 0.04;
    rightArmPivot.rotation.x = -breath * 0.04;
  };

  const dispose = () => {
    mixer.stopAllAction();
    gradientMap.dispose();
    const geometries = new Set<THREE.BufferGeometry>();
    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        geometries.add((child as THREE.Mesh).geometry);
      }
    });
    geometries.forEach((geo) => geo.dispose());
    Object.values(mats).forEach((mat) => mat.dispose());
  };

  return {
    model: root,
    mixer,
    playAction,
    update,
    dispose
  };
}
