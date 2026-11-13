import * as THREE from 'three';
import type { CharacterRigHandle } from './modelLoader';
import {
  addMesh,
  buildBaseHead,
  buildStandardArm,
  buildStandardLeg,
  CharacterMaterialFactory,
  createCharacterMaterialFactory,
  finalizeCharacterRig
} from './proceduralCharacterBase';

const PALETTE = {
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
  { pos: [-0.13, 0.165, 0.215], rot: [2.42, 0, 0.34], radius: 0.065, height: 0.16 },
  { pos: [-0.04, 0.175, 0.235], rot: [2.48, 0, 0.12], radius: 0.072, height: 0.17 },
  { pos: [0.06, 0.175, 0.235], rot: [2.46, 0, -0.14], radius: 0.07, height: 0.165 },
  { pos: [0.145, 0.16, 0.205], rot: [2.38, 0, -0.36], radius: 0.062, height: 0.155 },
  { pos: [-0.252, 0.025, 0.05], rot: [3.08, 0, 0.18], radius: 0.046, height: 0.17 },
  { pos: [0.252, 0.025, 0.05], rot: [3.08, 0, -0.18], radius: 0.046, height: 0.17 },
  { pos: [0.02, 0.33, -0.05], rot: [-0.6, 0, -0.32], radius: 0.048, height: 0.18 },
  { pos: [-0.09, 0.30, -0.10], rot: [-0.88, 0, 0.42], radius: 0.052, height: 0.16 },
  { pos: [0.10, 0.28, -0.11], rot: [-0.92, 0, -0.45], radius: 0.052, height: 0.16 }
];

function createPlayerMaterials(factory: CharacterMaterialFactory) {
  return {
    skin: factory.skin,
    hairMain: factory.toon(PALETTE.hairMain),
    hairShade: factory.toon(PALETTE.hairShade),
    hoodie: factory.toon(PALETTE.hoodie),
    hoodieTrim: factory.toon(PALETTE.hoodieTrim),
    innerShirt: factory.toon(PALETTE.innerShirt),
    innerCollar: factory.toon(PALETTE.innerCollar),
    collarStripe: factory.toon(PALETTE.collarStripe),
    backpack: factory.toon(PALETTE.backpack),
    backpackFlap: factory.toon(PALETTE.backpackFlap),
    backpackAccent: factory.toon(PALETTE.backpackAccent),
    pants: factory.toon(PALETTE.pants),
    shoe: factory.toon(PALETTE.shoe),
    shoeSole: factory.toon(PALETTE.shoeSole)
  };
}

type PlayerMaterialSet = ReturnType<typeof createPlayerMaterials>;

function buildLearnerHead(factory: CharacterMaterialFactory, mats: PlayerMaterialSet): THREE.Group {
  const { headPivot, skull } = buildBaseHead({
    factory,
    browMaterial: mats.hairShade
  });

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

function buildLearnerTorso(mats: PlayerMaterialSet): THREE.Group {
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
  addMesh(
    torso,
    new THREE.CylinderGeometry(0.242, 0.248, 0.055, 22, 1, false, Math.PI * 0.22, Math.PI * 1.56),
    mats.hoodieTrim,
    [0, 0.035, -0.005]
  );

  for (const side of [-1, 1] as const) {
    addMesh(torso, new THREE.BoxGeometry(0.11, 0.47, 0.12), mats.hoodie, [side * 0.14, 0.255, 0.165], [0, side * -0.18, 0]);
    addMesh(torso, new THREE.CylinderGeometry(0.009, 0.009, 0.16, 8), mats.hoodieTrim, [side * 0.085, 0.36, 0.22], [0.05, 0, side * 0.05]);
    addMesh(torso, new THREE.SphereGeometry(0.015, 10, 8), mats.hoodieTrim, [side * 0.08, 0.28, 0.227]);
  }

  // 목 뒤로 접힌 후드
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
    addMesh(torso, new THREE.BoxGeometry(0.055, 0.05, 0.38), mats.backpack, [side * 0.155, 0.485, 0.02], [0.06, 0, 0]);
    addMesh(torso, new THREE.BoxGeometry(0.052, 0.32, 0.038), mats.backpack, [side * 0.155, 0.32, 0.22], [-0.04, 0, 0]);
    addMesh(torso, new THREE.BoxGeometry(0.06, 0.035, 0.046), mats.backpackAccent, [side * 0.155, 0.24, 0.225]);
  }

  return torso;
}

/**
 * 일러스트(learner.jpg)의 감성과 색감을 반영한 3D 주인공 캐릭터 생성
 */
export function createProceduralLearner(targetHeight = 1.85): CharacterRigHandle {
  const factory = createCharacterMaterialFactory();
  const mats = createPlayerMaterials(factory);

  return finalizeCharacterRig({
    name: 'procedural-learner',
    targetHeight,
    factory,
    pantsMaterial: mats.pants,
    torso: buildLearnerTorso(mats),
    headPivot: buildLearnerHead(factory, mats),
    leftArmPivot: buildStandardArm({ side: -1, sleeveMat: mats.hoodie, cuffMat: mats.hoodieTrim, skinMat: mats.skin }),
    rightArmPivot: buildStandardArm({ side: 1, sleeveMat: mats.hoodie, cuffMat: mats.hoodieTrim, skinMat: mats.skin }),
    leftLegPivot: buildStandardLeg(-1, mats.pants, mats.shoe, mats.shoeSole),
    rightLegPivot: buildStandardLeg(1, mats.pants, mats.shoe, mats.shoeSole)
  });
}
