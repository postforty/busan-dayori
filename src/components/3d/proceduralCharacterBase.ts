import * as THREE from 'three';
import type { AnimationName, CharacterRigHandle } from './modelLoader';

export const BASE_SKIN_PALETTE = {
  skin: 0xf6cdb3,
  blush: 0xf29b8e,
  eye: 0x3f291b,
  eyeHighlight: 0xffffff
} as const;

export function createSoftToonGradient(): THREE.DataTexture {
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

export function addMesh<T extends THREE.BufferGeometry>(
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

export interface CharacterMaterialFactory {
  toon: (color: number, map?: THREE.Texture) => THREE.MeshToonMaterial;
  basic: (color: number) => THREE.MeshBasicMaterial;
  skin: THREE.MeshToonMaterial;
  blush: THREE.MeshToonMaterial;
  eye: THREE.MeshToonMaterial;
  eyeHighlight: THREE.MeshBasicMaterial;
  dispose: () => void;
}

export function createCharacterMaterialFactory(): CharacterMaterialFactory {
  const gradientMap = createSoftToonGradient();
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [gradientMap];

  const toon = (color: number, map?: THREE.Texture) => {
    if (map) textures.push(map);
    const mat = new THREE.MeshToonMaterial({ color, gradientMap, ...(map ? { map } : {}) });
    materials.push(mat);
    return mat;
  };

  const basic = (color: number) => {
    const mat = new THREE.MeshBasicMaterial({ color });
    materials.push(mat);
    return mat;
  };

  const skin = toon(BASE_SKIN_PALETTE.skin);
  const blush = toon(BASE_SKIN_PALETTE.blush);
  const eye = toon(BASE_SKIN_PALETTE.eye);
  const eyeHighlight = basic(BASE_SKIN_PALETTE.eyeHighlight);

  return {
    toon,
    basic,
    skin,
    blush,
    eye,
    eyeHighlight,
    dispose: () => {
      textures.forEach((tex) => tex.dispose());
      materials.forEach((mat) => mat.dispose());
    }
  };
}

export interface HeadBaseOptions {
  browMaterial: THREE.Material;
  happyEyes?: boolean;
  freckles?: boolean;
  skinMaterial?: THREE.Material;
  earringsColor?: number;
  factory: CharacterMaterialFactory;
}

/**
 * SD 비율 공통 두상(얼굴, 귀, 눈/웃는 눈, 눈썹, 볼터치, 코, 미소) 생성
 */
export function buildBaseHead(options: HeadBaseOptions): {
  headPivot: THREE.Group;
  skull: THREE.Group;
} {
  const { factory, browMaterial, happyEyes, freckles, skinMaterial, earringsColor } = options;
  const skinMat = skinMaterial ?? factory.skin;

  const headPivot = new THREE.Group();
  headPivot.position.set(0, 0.52, 0);

  const skull = new THREE.Group();
  skull.position.set(0, 0.27, 0);
  headPivot.add(skull);

  // 얼굴 본체 + 귀
  addMesh(skull, new THREE.SphereGeometry(0.285, 24, 20), skinMat, [0, 0, 0], [0, 0, 0], [1.02, 0.96, 0.96]);
  for (const side of [-1, 1] as const) {
    addMesh(skull, new THREE.SphereGeometry(0.062, 14, 12), skinMat, [side * 0.282, -0.02, -0.01], [0, 0, 0], [0.68, 0.98, 0.62]);
    if (earringsColor !== undefined) {
      const earringMat = factory.toon(earringsColor);
      addMesh(skull, new THREE.SphereGeometry(0.018, 10, 8), earringMat, [side * 0.288, -0.072, 0.005], [0, 0, 0], [0.85, 1.3, 0.85]);
    }
  }

  const browGeo = new THREE.CapsuleGeometry(0.01, 0.054, 6, 8);
  const blushGeo = new THREE.SphereGeometry(0.044, 12, 10);

  if (happyEyes) {
    // 온화한 반달 웃음 눈매
    const happyEyeGeo = new THREE.TorusGeometry(0.036, 0.009, 8, 14, Math.PI * 0.85);
    for (const side of [-1, 1] as const) {
      addMesh(skull, happyEyeGeo, factory.eye, [side * 0.098, -0.022, 0.258], [0, 0, Math.PI * 0.075]);
      addMesh(skull, browGeo, browMaterial, [side * 0.098, 0.064, 0.258], [0, 0, Math.PI / 2 + side * 0.08]);
      addMesh(skull, blushGeo, factory.blush, [side * 0.155, -0.068, 0.215], [0, side * 0.35, 0], [1.1, 0.62, 0.4]);
    }
  } else {
    const eyeGeo = new THREE.SphereGeometry(0.036, 14, 12);
    const highlightGeo = new THREE.SphereGeometry(0.013, 10, 8);
    for (const side of [-1, 1] as const) {
      addMesh(skull, eyeGeo, factory.eye, [side * 0.098, -0.015, 0.252], [0, 0, 0], [0.95, 1.18, 0.55]);
      addMesh(skull, highlightGeo, factory.eyeHighlight, [side * 0.098 - 0.01, -0.002, 0.27]);
      addMesh(skull, browGeo, browMaterial, [side * 0.098, 0.068, 0.258], [0, 0, Math.PI / 2]);
      addMesh(skull, blushGeo, factory.blush, [side * 0.155, -0.065, 0.215], [0, side * 0.35, 0], [1.1, 0.62, 0.4]);
      if (freckles) {
        const freckleMat = factory.toon(0xd47a6a);
        const freckleGeo = new THREE.SphereGeometry(0.006, 6, 6);
        addMesh(skull, freckleGeo, freckleMat, [side * 0.135, -0.055, 0.242]);
        addMesh(skull, freckleGeo, freckleMat, [side * 0.165, -0.062, 0.228]);
      }
    }
  }

  // 코 & 부드러운 미소
  addMesh(skull, new THREE.SphereGeometry(0.017, 10, 8), factory.blush, [0, -0.045, 0.278], [0, 0, 0], [1, 0.8, 0.7]);
  addMesh(
    skull,
    new THREE.TorusGeometry(0.04, 0.008, 8, 16, Math.PI * 0.78),
    factory.eye,
    [0, -0.072, 0.264],
    [0.18, 0, Math.PI * 1.11]
  );

  return { headPivot, skull };
}

export interface RigAssemblyParts {
  name: string;
  targetHeight: number;
  factory: CharacterMaterialFactory;
  pantsMaterial: THREE.Material;
  torso: THREE.Group;
  headPivot: THREE.Group;
  leftArmPivot: THREE.Group;
  rightArmPivot: THREE.Group;
  leftLegPivot: THREE.Group;
  rightLegPivot: THREE.Group;
  hipsY?: number;
}

/**
 * 상체/머리/사지 리깅 조립, targetHeight 정규화, Y=0 접지 및 idle/walk/interact 애니메이션 바인딩
 */
export function finalizeCharacterRig(parts: RigAssemblyParts): CharacterRigHandle {
  const {
    name,
    targetHeight,
    factory,
    pantsMaterial,
    torso,
    headPivot,
    leftArmPivot,
    rightArmPivot,
    leftLegPivot,
    rightLegPivot,
    hipsY = 0.47
  } = parts;

  const root = new THREE.Group();
  root.name = name;

  const bodyRig = new THREE.Group();
  root.add(bodyRig);

  // 골반(엉덩이) 연결부 — 다리와 상체 사이가 절대 벌어지지 않도록 이어줌
  addMesh(bodyRig, new THREE.CylinderGeometry(0.22, 0.20, 0.14, 18), pantsMaterial, [0, hipsY + 0.01, 0]);

  const torsoPivot = new THREE.Group();
  torsoPivot.position.set(0, hipsY, 0);
  bodyRig.add(torsoPivot);

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

  const playAction = (action: AnimationName) => {
    if (action === 'interact') {
      currentAction = 'interact';
      interactElapsed = 0;
      return;
    }
    if (currentAction !== action) {
      currentAction = action;
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
    const geometries = new Set<THREE.BufferGeometry>();
    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        geometries.add((child as THREE.Mesh).geometry);
      }
    });
    geometries.forEach((geo) => geo.dispose());
    factory.dispose();
  };

  return {
    model: root,
    mixer,
    playAction,
    update,
    dispose
  };
}

export function buildStandardLeg(
  side: -1 | 1,
  pantsMat: THREE.Material,
  shoeMat: THREE.Material,
  soleMat: THREE.Material,
  hasToeCap = true
): THREE.Group {
  const pivot = new THREE.Group();
  pivot.position.set(side * 0.115, 0.50, 0);

  // 다리 상단이 골반 내부에서 시작해 빈틈 없이 연결되도록 배치
  addMesh(pivot, new THREE.CapsuleGeometry(0.085, 0.26, 8, 14), pantsMat, [0, -0.18, 0]);
  addMesh(pivot, new THREE.BoxGeometry(0.145, 0.095, 0.22), shoeMat, [0, -0.41, 0.035]);
  addMesh(pivot, new THREE.BoxGeometry(0.152, 0.036, 0.23), soleMat, [0, -0.46, 0.035]);
  if (hasToeCap) {
    addMesh(pivot, new THREE.SphereGeometry(0.072, 12, 10), soleMat, [0, -0.42, 0.12], [0, 0, 0], [1, 0.65, 0.85]);
  }

  return pivot;
}

export interface StandardArmOptions {
  side: -1 | 1;
  sleeveMat: THREE.Material;
  cuffMat?: THREE.Material;
  skinMat: THREE.Material;
  wristWatchMat?: THREE.Material;
  braceletMat?: THREE.Material;
  ringMat?: THREE.Material;
  rolledSleeve?: boolean;
}

export function buildStandardArm(options: StandardArmOptions): THREE.Group {
  const { side, sleeveMat, cuffMat, skinMat, wristWatchMat, braceletMat, ringMat, rolledSleeve } = options;
  const pivot = new THREE.Group();
  pivot.position.set(side * 0.255, 0.44, 0);

  if (rolledSleeve) {
    // 팔꿈치까지 롤업한 셔츠 소매 + 맨팔뚝 + 손
    addMesh(pivot, new THREE.CapsuleGeometry(0.064, 0.10, 8, 12), sleeveMat, [side * 0.015, -0.10, 0], [0, 0, side * 0.12]);
    addMesh(pivot, new THREE.CylinderGeometry(0.066, 0.064, 0.038, 12), cuffMat ?? sleeveMat, [side * 0.025, -0.17, 0], [0, 0, side * 0.12]);
    addMesh(pivot, new THREE.CapsuleGeometry(0.048, 0.09, 8, 12), skinMat, [side * 0.035, -0.225, 0], [0, 0, side * 0.12]);
  } else {
    addMesh(pivot, new THREE.CapsuleGeometry(0.064, 0.18, 8, 12), sleeveMat, [side * 0.02, -0.14, 0], [0, 0, side * 0.12]);
    if (cuffMat) {
      addMesh(pivot, new THREE.CylinderGeometry(0.058, 0.055, 0.045, 12), cuffMat, [side * 0.035, -0.25, 0], [0, 0, side * 0.12]);
    }
  }

  // 손목시계 / 팔찌 (화면 기준 오른손 = 캐릭터 왼손 side === 1)
  if (wristWatchMat && side === 1) {
    addMesh(pivot, new THREE.CylinderGeometry(0.054, 0.054, 0.024, 12), wristWatchMat, [side * 0.04, -0.268, 0], [0, 0, side * 0.12]);
    addMesh(pivot, new THREE.CylinderGeometry(0.022, 0.022, 0.012, 10), wristWatchMat, [side * 0.045, -0.268, 0.052], [Math.PI / 2, 0, 0]);
  }
  if (braceletMat && side === -1) {
    addMesh(pivot, new THREE.TorusGeometry(0.052, 0.008, 6, 14), braceletMat, [side * 0.038, -0.268, 0], [Math.PI / 2, 0, side * 0.12]);
  }

  // 손
  addMesh(pivot, new THREE.SphereGeometry(0.055, 14, 12), skinMat, [side * 0.045, -0.31, 0.01]);
  if (ringMat && side === -1) {
    addMesh(pivot, new THREE.TorusGeometry(0.022, 0.005, 6, 12), ringMat, [side * 0.045, -0.335, 0.042], [Math.PI / 2, 0, 0]);
  }

  return pivot;
}
