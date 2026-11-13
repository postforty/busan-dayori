import * as THREE from 'three';
import type { CharacterRigHandle } from './modelLoader';
import type { WorldNpcRole } from './types';
import {
  addMesh,
  buildBaseHead,
  buildStandardArm,
  buildStandardLeg,
  CharacterMaterialFactory,
  createCharacterMaterialFactory,
  finalizeCharacterRig
} from './proceduralCharacterBase';

function createPatternTexture(
  size: number,
  draw: (ctx: CanvasRenderingContext2D, size: number) => void
): THREE.CanvasTexture | undefined {
  if (typeof document === 'undefined') return undefined;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return undefined;
  draw(ctx, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.needsUpdate = true;
  return tex;
}

function createPlaidApronTexture(): THREE.CanvasTexture | undefined {
  const tex = createPatternTexture(128, (ctx, size) => {
    ctx.fillStyle = '#f6f3ec';
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = '#7ea3c4';
    ctx.lineWidth = 5;
    const step = 32;
    for (let i = 0; i <= size; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }
  });
  tex?.repeat.set(2, 2);
  return tex;
}

function createFloralBandanaTexture(): THREE.CanvasTexture | undefined {
  const tex = createPatternTexture(128, (ctx, size) => {
    ctx.fillStyle = '#263e63';
    ctx.fillRect(0, 0, size, size);
    const spots = [
      { x: 22, y: 24, c: '#d96b5b' },
      { x: 64, y: 18, c: '#f2ead8' },
      { x: 102, y: 36, c: '#e5b869' },
      { x: 38, y: 74, c: '#f2ead8' },
      { x: 86, y: 78, c: '#d96b5b' },
      { x: 20, y: 110, c: '#e5b869' },
      { x: 104, y: 112, c: '#f2ead8' }
    ];
    spots.forEach(({ x, y, c }) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  });
  tex?.repeat.set(2, 2);
  return tex;
}

function createFloralShirtTexture(): THREE.CanvasTexture | undefined {
  const tex = createPatternTexture(128, (ctx, size) => {
    ctx.fillStyle = '#a7c8e3';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#f3f7fb';
    const points = [
      [20, 20],
      [62, 34],
      [104, 18],
      [38, 72],
      [88, 68],
      [18, 108],
      [68, 112],
      [112, 102]
    ];
    points.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 4.5, 0, Math.PI * 2);
      ctx.fill();
    });
  });
  tex?.repeat.set(2, 2);
  return tex;
}

function createStripeTexture(): THREE.CanvasTexture | undefined {
  const tex = createPatternTexture(64, (ctx, size) => {
    ctx.fillStyle = '#eef0f3';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#47525e';
    for (let y = 0; y < size; y += 16) {
      ctx.fillRect(0, y, size, 7);
    }
  });
  tex?.repeat.set(1, 2);
  return tex;
}

function addWispyBangs(skull: THREE.Group, hairMat: THREE.Material) {
  const bangs = [
    { pos: [-0.11, 0.16, 0.22] as [number, number, number], rot: [2.42, 0, 0.25] as [number, number, number], r: 0.055, h: 0.15 },
    { pos: [-0.02, 0.17, 0.24] as [number, number, number], rot: [2.48, 0, 0.06] as [number, number, number], r: 0.06, h: 0.16 },
    { pos: [0.07, 0.165, 0.23] as [number, number, number], rot: [2.45, 0, -0.15] as [number, number, number], r: 0.056, h: 0.15 },
    { pos: [0.145, 0.15, 0.20] as [number, number, number], rot: [2.36, 0, -0.32] as [number, number, number], r: 0.05, h: 0.14 }
  ];
  bangs.forEach((b) => {
    addMesh(skull, new THREE.ConeGeometry(b.r, b.h, 10), hairMat, b.pos, b.rot);
  });
}

function addApronBase(
  torso: THREE.Group,
  apronMat: THREE.Material,
  tieMat: THREE.Material,
  hasWaistRibbon = true
) {
  // 상단 턱받이 + 목걸이 끈
  addMesh(torso, new THREE.BoxGeometry(0.24, 0.22, 0.04), apronMat, [0, 0.34, 0.205]);
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.032, 0.14, 0.035), apronMat, [side * 0.09, 0.455, 0.16], [0.42, 0, 0]);
  }
  // 허리~치마 부분 앞치마 래핑
  addMesh(
    torso,
    new THREE.CylinderGeometry(0.225, 0.255, 0.36, 22, 1, false, -Math.PI * 0.46, Math.PI * 0.92),
    apronMat,
    [0, 0.08, 0.012]
  );
  // 허리 끈 & 리본 매듭
  addMesh(torso, new THREE.CylinderGeometry(0.226, 0.226, 0.032, 22), tieMat, [0, 0.22, 0.005]);
  if (hasWaistRibbon) {
    addMesh(torso, new THREE.SphereGeometry(0.026, 10, 8), tieMat, [0, 0.215, 0.232]);
    for (const side of [-1, 1] as const) {
      addMesh(torso, new THREE.BoxGeometry(0.05, 0.028, 0.025), tieMat, [side * 0.038, 0.218, 0.23], [0, 0, side * 0.25]);
      addMesh(torso, new THREE.BoxGeometry(0.025, 0.11, 0.018), tieMat, [side * 0.024, 0.16, 0.235], [-0.08, 0, side * -0.18]);
    }
  }
}

/**
 * [그림3] 카페 점원 (clerk): 베이지 베레모 + 로우 포니테일 + 아이보리 롤업 셔츠 + 갈색 앞치마
 */
function buildClerkNpc(factory: CharacterMaterialFactory, targetHeight: number): CharacterRigHandle {
  const hairMat = factory.toon(0x2e2523);
  const beretMat = factory.toon(0xd8c29d);
  const beretPinMat = factory.toon(0x8e6b43);
  const shirtMat = factory.toon(0xf5efe2);
  const apronMat = factory.toon(0x573f31);
  const apronPocketMat = factory.toon(0x4b3528);
  const pantsMat = factory.toon(0x2f435d);
  const shoeMat = factory.toon(0x94795d);
  const soleMat = factory.toon(0xf6f3ec);
  const watchMat = factory.toon(0x3b2c23);

  const { headPivot, skull } = buildBaseHead({
    factory,
    browMaterial: hairMat,
    earringsColor: 0xe3b854
  });

  // 헤어 캡 + 시스루 앞머리 + 옆머리 + 로우 포니테일
  addMesh(skull, new THREE.SphereGeometry(0.296, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat, [0, 0.02, -0.01], [-0.55, 0, 0]);
  addWispyBangs(skull, hairMat);
  for (const side of [-1, 1] as const) {
    addMesh(skull, new THREE.ConeGeometry(0.042, 0.22, 10), hairMat, [side * 0.255, -0.04, 0.06], [3.08, 0, side * 0.14]);
  }
  addMesh(skull, new THREE.SphereGeometry(0.085, 14, 12), hairMat, [0, -0.17, -0.26], [0, 0, 0], [0.85, 1.35, 0.85]);

  // 베이지 니트 베레모 + 측면 핀 2개
  addMesh(skull, new THREE.SphereGeometry(0.325, 22, 16), beretMat, [0, 0.21, -0.02], [-0.12, 0, 0.06], [1.08, 0.44, 1.05]);
  addMesh(skull, new THREE.CylinderGeometry(0.015, 0.015, 0.04, 8), beretMat, [0.02, 0.36, -0.03]);
  addMesh(skull, new THREE.SphereGeometry(0.022, 10, 8), beretPinMat, [-0.18, 0.24, 0.24]);
  addMesh(skull, new THREE.SphereGeometry(0.018, 10, 8), factory.toon(0xe0b458), [-0.22, 0.21, 0.22]);

  // 상의 + 갈색 앞치마 + 앞주머니
  const torso = new THREE.Group();
  addMesh(torso, new THREE.CylinderGeometry(0.20, 0.22, 0.48, 20), shirtMat, [0, 0.26, 0]);
  addMesh(torso, new THREE.CylinderGeometry(0.072, 0.082, 0.12, 14), factory.skin, [0, 0.51, 0]);
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.095, 0.045, 0.08), shirtMat, [side * 0.075, 0.475, 0.11], [0.22, side * 0.35, side * -0.25]);
  }
  addApronBase(torso, apronMat, apronPocketMat, true);
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.11, 0.12, 0.025), apronPocketMat, [side * 0.105, 0.04, 0.242], [0, side * -0.24, 0]);
  }

  return finalizeCharacterRig({
    name: 'procedural-npc-clerk',
    targetHeight,
    factory,
    pantsMaterial: pantsMat,
    torso,
    headPivot,
    leftArmPivot: buildStandardArm({ side: -1, sleeveMat: shirtMat, skinMat: factory.skin, rolledSleeve: true }),
    rightArmPivot: buildStandardArm({ side: 1, sleeveMat: shirtMat, skinMat: factory.skin, rolledSleeve: true, wristWatchMat: watchMat }),
    leftLegPivot: buildStandardLeg(-1, pantsMat, shoeMat, soleMat),
    rightLegPivot: buildStandardLeg(1, pantsMat, shoeMat, soleMat)
  });
}

/**
 * [그림4] 정숙 이모님 (auntie): 네이비 꽃무늬 두건 + 웃는 눈 + 베이지 가디건 + 체크 앞치마 & 명찰
 */
function buildAuntieNpc(factory: CharacterMaterialFactory, targetHeight: number): CharacterRigHandle {
  const hairMat = factory.toon(0x70757a);
  const bandanaMat = factory.toon(0xffffff, createFloralBandanaTexture());
  const bandanaSolidMat = factory.toon(0x263e63);
  const cardiganMat = factory.toon(0xc49c6e);
  const cardiganTrimMat = factory.toon(0xb0895c);
  const shirtMat = factory.toon(0xf6f2e8);
  const apronMat = factory.toon(0xffffff, createPlaidApronTexture());
  const apronTieMat = factory.toon(0xdbe4ed);
  const nametagMat = factory.toon(0xfaf8f5);
  const nametagTextMat = factory.toon(0x2d3748);
  const pantsMat = factory.toon(0x2c3648);
  const shoeMat = factory.toon(0x887b68);
  const soleMat = factory.toon(0x5f5547);
  const watchMat = factory.toon(0x4b382a);

  const { headPivot, skull } = buildBaseHead({
    factory,
    browMaterial: hairMat,
    happyEyes: true,
    earringsColor: 0xe6d4a4
  });

  // 백발 섞인 올림머리 + 네이비 꽃무늬 두건 + 뒤 매듭 꼬리
  addMesh(skull, new THREE.SphereGeometry(0.294, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.56), hairMat, [0, 0.025, 0], [-0.45, 0, 0]);
  addMesh(skull, new THREE.SphereGeometry(0.305, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.58), bandanaMat, [0, 0.035, -0.015], [-0.52, 0, 0], [1.03, 1.0, 1.04]);
  for (const side of [-1, 1] as const) {
    addMesh(skull, new THREE.ConeGeometry(0.045, 0.14, 10), bandanaSolidMat, [side * 0.21, -0.18, -0.18], [0.35, 0, side * -0.45]);
  }

  // 상의: 흰 셔츠 + 베이지 가디건 + 체크 앞치마 + 명찰
  const torso = new THREE.Group();
  addMesh(torso, new THREE.CylinderGeometry(0.19, 0.21, 0.48, 20), shirtMat, [0, 0.26, 0.005]);
  addMesh(torso, new THREE.CylinderGeometry(0.072, 0.082, 0.12, 14), factory.skin, [0, 0.51, 0]);
  addMesh(
    torso,
    new THREE.CylinderGeometry(0.216, 0.242, 0.48, 22, 1, false, Math.PI * 0.22, Math.PI * 1.56),
    cardiganMat,
    [0, 0.255, -0.005]
  );
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.095, 0.46, 0.10), cardiganMat, [side * 0.15, 0.255, 0.145], [0, side * -0.22, 0]);
  }

  addApronBase(torso, apronMat, apronTieMat, true);
  // 왼쪽 가슴 명찰
  addMesh(torso, new THREE.BoxGeometry(0.11, 0.055, 0.015), nametagMat, [0.065, 0.37, 0.226]);
  addMesh(torso, new THREE.BoxGeometry(0.08, 0.012, 0.008), nametagTextMat, [0.065, 0.378, 0.233]);
  addMesh(torso, new THREE.BoxGeometry(0.07, 0.009, 0.008), nametagTextMat, [0.065, 0.36, 0.233]);

  return finalizeCharacterRig({
    name: 'procedural-npc-auntie',
    targetHeight,
    factory,
    pantsMaterial: pantsMat,
    torso,
    headPivot,
    leftArmPivot: buildStandardArm({ side: -1, sleeveMat: cardiganMat, cuffMat: cardiganTrimMat, skinMat: factory.skin }),
    rightArmPivot: buildStandardArm({ side: 1, sleeveMat: cardiganMat, cuffMat: cardiganTrimMat, skinMat: factory.skin, wristWatchMat: watchMat }),
    leftLegPivot: buildStandardLeg(-1, pantsMat, shoeMat, soleMat, false),
    rightLegPivot: buildStandardLeg(1, pantsMat, shoeMat, soleMat, false)
  });
}

/**
 * [그림5] 친구 (friend): 웨이브 단발 + 올리브 후드티 + 고양이 뱃지 + 목에 건 카메라 + 갈색 백팩
 */
function buildFriendNpc(factory: CharacterMaterialFactory, targetHeight: number): CharacterRigHandle {
  const hairMat = factory.toon(0x8e6446);
  const hairShadeMat = factory.toon(0x754f34);
  const hoodieMat = factory.toon(0x848d59);
  const hoodieTrimMat = factory.toon(0x727b4b);
  const innerStripeMat = factory.toon(0xffffff, createStripeTexture());
  const backpackMat = factory.toon(0x84583c);
  const backpackStrapMat = factory.toon(0x9a6b49);
  const cameraSilverMat = factory.toon(0xd2d6dc);
  const cameraBlackMat = factory.toon(0x282c32);
  const badgeMat = factory.toon(0xf0e4c8);
  const pantsMat = factory.toon(0x2c3a4f);
  const shoeMat = factory.toon(0x8e6b4f);
  const soleMat = factory.toon(0xf7f3eb);

  const { headPivot, skull } = buildBaseHead({
    factory,
    browMaterial: hairShadeMat,
    freckles: true
  });

  // 웨이브 단발머리 (헤어 캡 + 앞머리 + 좌우 풍성한 웨이브 볼륨 + 뒷단발)
  addMesh(skull, new THREE.SphereGeometry(0.296, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat, [0, 0.02, -0.01], [-0.55, 0, 0]);
  addWispyBangs(skull, hairMat);
  addMesh(skull, new THREE.CylinderGeometry(0.27, 0.30, 0.24, 18, 1, false, Math.PI * 0.65, Math.PI * 0.7), hairMat, [0, -0.10, -0.04]);
  for (const side of [-1, 1] as const) {
    addMesh(skull, new THREE.SphereGeometry(0.115, 14, 12), hairMat, [side * 0.275, -0.02, -0.02], [0, 0, 0], [0.85, 1.25, 0.9]);
    addMesh(skull, new THREE.SphereGeometry(0.105, 14, 12), hairShadeMat, [side * 0.27, -0.15, -0.04], [0, 0, 0], [0.95, 1.15, 0.95]);
  }

  // 상의: 올리브 그린 풀오버 후드티 + 줄무늬 이너 + 후드 + 뱃지 + 카메라 + 백팩
  const torso = new THREE.Group();
  addMesh(torso, new THREE.CylinderGeometry(0.215, 0.24, 0.48, 22), hoodieMat, [0, 0.255, 0]);
  addMesh(torso, new THREE.CylinderGeometry(0.238, 0.242, 0.05, 22), hoodieTrimMat, [0, 0.035, 0]);
  addMesh(torso, new THREE.CylinderGeometry(0.138, 0.16, 0.10, 18), innerStripeMat, [0, 0.46, 0.015]);
  addMesh(torso, new THREE.CylinderGeometry(0.072, 0.082, 0.12, 14), factory.skin, [0, 0.51, 0]);

  // 캥거루 앞주머니 & 후드 끈
  addMesh(torso, new THREE.BoxGeometry(0.25, 0.15, 0.05), hoodieTrimMat, [0, 0.14, 0.222]);
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.CylinderGeometry(0.009, 0.009, 0.14, 8), hoodieTrimMat, [side * 0.06, 0.36, 0.215]);
  }

  // 목 뒤 후드 칼라
  const hoodCollar = new THREE.Group();
  hoodCollar.position.set(0, 0.46, -0.02);
  hoodCollar.rotation.order = 'YXZ';
  hoodCollar.rotation.set(-0.14, Math.PI * 1.175, 0);
  torso.add(hoodCollar);
  addMesh(hoodCollar, new THREE.TorusGeometry(0.185, 0.068, 12, 22, Math.PI * 1.35), hoodieMat, [0, 0, 0], [Math.PI / 2, 0, 0]);

  // 왼쪽 가슴 고양이/나무 뱃지
  addMesh(torso, new THREE.CylinderGeometry(0.038, 0.038, 0.015, 14), badgeMat, [0.12, 0.36, 0.21], [Math.PI / 2, 0, 0]);
  addMesh(torso, new THREE.SphereGeometry(0.016, 8, 8), hoodieMat, [0.125, 0.365, 0.218]);

  // 목에 건 빈티지 카메라 & 스트랩
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.022, 0.23, 0.018), backpackStrapMat, [side * 0.085, 0.35, 0.222], [0.05, 0, side * 0.12]);
  }
  addMesh(torso, new THREE.BoxGeometry(0.15, 0.095, 0.055), cameraBlackMat, [0, 0.24, 0.245]);
  addMesh(torso, new THREE.BoxGeometry(0.152, 0.032, 0.058), cameraSilverMat, [0, 0.278, 0.245]);
  addMesh(torso, new THREE.CylinderGeometry(0.034, 0.036, 0.045, 14), cameraSilverMat, [0, 0.235, 0.28], [Math.PI / 2, 0, 0]);
  addMesh(torso, new THREE.CylinderGeometry(0.024, 0.024, 0.048, 12), cameraBlackMat, [0, 0.235, 0.284], [Math.PI / 2, 0, 0]);

  // 갈색 백팩 & 가죽 어깨끈
  addMesh(torso, new THREE.BoxGeometry(0.30, 0.35, 0.15), backpackMat, [0, 0.27, -0.24]);
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.052, 0.048, 0.36), backpackStrapMat, [side * 0.155, 0.485, 0.02], [0.06, 0, 0]);
    addMesh(torso, new THREE.BoxGeometry(0.048, 0.28, 0.034), backpackStrapMat, [side * 0.155, 0.34, 0.215], [-0.04, 0, 0]);
  }

  return finalizeCharacterRig({
    name: 'procedural-npc-friend',
    targetHeight,
    factory,
    pantsMaterial: pantsMat,
    torso,
    headPivot,
    leftArmPivot: buildStandardArm({ side: -1, sleeveMat: hoodieMat, cuffMat: hoodieTrimMat, skinMat: factory.skin }),
    rightArmPivot: buildStandardArm({ side: 1, sleeveMat: hoodieMat, cuffMat: hoodieTrimMat, skinMat: factory.skin }),
    leftLegPivot: buildStandardLeg(-1, pantsMat, shoeMat, soleMat),
    rightLegPivot: buildStandardLeg(1, pantsMat, shoeMat, soleMat)
  });
}

/**
 * [그림6] 행인 (passerby): 어두운 갈색 긴 생머리 + 크림 가디건 + 하늘색 플로럴 셔츠 + 청바지
 */
function buildPasserbyNpc(factory: CharacterMaterialFactory, targetHeight: number): CharacterRigHandle {
  const hairMat = factory.toon(0x4b3b32);
  const cardiganMat = factory.toon(0xf4e8d1);
  const cardiganTrimMat = factory.toon(0xe6d6b8);
  const buttonMat = factory.toon(0x9a7b56);
  const shirtMat = factory.toon(0xffffff, createFloralShirtTexture());
  const shirtCollarMat = factory.toon(0xa7c8e3);
  const jewelryMat = factory.toon(0xd4d8de);
  const pantsMat = factory.toon(0x45678c);
  const shoeMat = factory.toon(0xd0c3aa);
  const soleMat = factory.toon(0xf8f5ee);

  const { headPivot, skull } = buildBaseHead({
    factory,
    browMaterial: hairMat
  });

  // 어깨까지 내려오는 긴 생머리 + 시스루 앞머리
  addMesh(skull, new THREE.SphereGeometry(0.296, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.62), hairMat, [0, 0.02, -0.01], [-0.55, 0, 0]);
  addWispyBangs(skull, hairMat);
  // 뒷머리 & 옆머리 레이어 (뒤로 살짝 오프셋하여 팔/몸통과 간섭 방지)
  addMesh(
    skull,
    new THREE.CylinderGeometry(0.285, 0.305, 0.44, 20, 1, false, Math.PI * 0.58, Math.PI * 0.84),
    hairMat,
    [0, -0.18, -0.045]
  );
  for (const side of [-1, 1] as const) {
    addMesh(skull, new THREE.CapsuleGeometry(0.055, 0.30, 8, 12), hairMat, [side * 0.255, -0.12, 0.04], [0, 0, side * 0.08]);
  }

  // 상의: 하늘색 플로럴 셔츠 + 크림색 오픈 가디건 + 단추 + 목걸이
  const torso = new THREE.Group();
  addMesh(torso, new THREE.CylinderGeometry(0.185, 0.205, 0.48, 20), shirtMat, [0, 0.26, 0.005]);
  addMesh(torso, new THREE.CylinderGeometry(0.072, 0.082, 0.12, 14), factory.skin, [0, 0.51, 0]);
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.085, 0.04, 0.075), shirtCollarMat, [side * 0.068, 0.475, 0.11], [0.22, side * 0.35, side * -0.22]);
  }
  // 목걸이
  addMesh(torso, new THREE.TorusGeometry(0.085, 0.007, 6, 18), jewelryMat, [0, 0.455, 0.035], [Math.PI * 0.58, 0, 0]);
  addMesh(torso, new THREE.SphereGeometry(0.014, 8, 8), jewelryMat, [0, 0.425, 0.115]);

  // 크림색 오픈 니트 가디건
  addMesh(
    torso,
    new THREE.CylinderGeometry(0.216, 0.24, 0.48, 22, 1, false, Math.PI * 0.22, Math.PI * 1.56),
    cardiganMat,
    [0, 0.255, -0.005]
  );
  addMesh(
    torso,
    new THREE.CylinderGeometry(0.24, 0.244, 0.05, 22, 1, false, Math.PI * 0.22, Math.PI * 1.56),
    cardiganTrimMat,
    [0, 0.035, -0.005]
  );
  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.105, 0.46, 0.11), cardiganMat, [side * 0.145, 0.255, 0.155], [0, side * -0.18, 0]);
  }
  // 가디건 단추 4개
  [0.10, 0.19, 0.28, 0.37].forEach((y) => {
    addMesh(torso, new THREE.CylinderGeometry(0.014, 0.014, 0.012, 10), buttonMat, [0.11, y, 0.212], [Math.PI / 2, 0, 0]);
  });

  return finalizeCharacterRig({
    name: 'procedural-npc-passerby',
    targetHeight,
    factory,
    pantsMaterial: pantsMat,
    torso,
    headPivot,
    leftArmPivot: buildStandardArm({
      side: -1,
      sleeveMat: cardiganMat,
      cuffMat: cardiganTrimMat,
      skinMat: factory.skin,
      braceletMat: jewelryMat,
      ringMat: jewelryMat
    }),
    rightArmPivot: buildStandardArm({
      side: 1,
      sleeveMat: cardiganMat,
      cuffMat: cardiganTrimMat,
      skinMat: factory.skin
    }),
    leftLegPivot: buildStandardLeg(-1, pantsMat, shoeMat, soleMat),
    rightLegPivot: buildStandardLeg(1, pantsMat, shoeMat, soleMat)
  });
}

/**
 * 쇼츠/일러스트 원형([그림3~6]) 기반 4종 SD 3D NPC 생성
 */
export function createProceduralNpc(role: WorldNpcRole, targetHeight = 1.85): CharacterRigHandle {
  const factory = createCharacterMaterialFactory();

  switch (role) {
    case 'clerk':
      return buildClerkNpc(factory, targetHeight);
    case 'auntie':
      return buildAuntieNpc(factory, targetHeight);
    case 'friend':
      return buildFriendNpc(factory, targetHeight);
    case 'passerby':
      return buildPasserbyNpc(factory, targetHeight);
  }
}

