import * as THREE from 'three';
import { WorldThemeLevel, WorldNpcData } from './types';
import { WORLD_THEMES, getLevelNpcs } from './worldData';
import { loadAnimatedCharacter, CharacterRigHandle } from './modelLoader';
import { createProceduralNpc } from './proceduralNpcs';

export class WorldSceneManager {
  public scene: THREE.Scene;
  public groundPlane: THREE.Mesh;
  public interactableNpcs: { mesh: THREE.Group; data: WorldNpcData }[] = [];
  public colliders: THREE.Box3[] = [];
  private npcRigs: CharacterRigHandle[] = [];
  private npcRigMap = new Map<string, CharacterRigHandle>();
  private loadGeneration = 0;
  private themeGroup: THREE.Group;
  private currentLevel: WorldThemeLevel = 'level0';
  private dirLight: THREE.DirectionalLight;
  private hemiLight: THREE.HemisphereLight;

  constructor() {
    this.scene = new THREE.Scene();

    // 1. 공통 환경광 & 태양광 설정
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    this.hemiLight.position.set(0, 20, 0);
    this.scene.add(this.hemiLight);

    this.dirLight = new THREE.DirectionalLight(0xfffaed, 1.5);
    this.dirLight.position.set(10, 20, 10);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 1024;
    this.dirLight.shadow.mapSize.height = 1024;
    this.dirLight.shadow.camera.near = 0.5;
    this.dirLight.shadow.camera.far = 50;
    this.dirLight.shadow.camera.left = -15;
    this.dirLight.shadow.camera.right = 15;
    this.dirLight.shadow.camera.top = 15;
    this.dirLight.shadow.camera.bottom = -15;
    this.scene.add(this.dirLight);

    // 2. 바닥 플레인 (클릭 레이캐스팅 기준점)
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xdcd8cf,
      roughness: 0.8,
      metalness: 0.1
    });
    this.groundPlane = new THREE.Mesh(groundGeo, groundMat);
    this.groundPlane.rotation.x = -Math.PI / 2;
    this.groundPlane.receiveShadow = true;
    this.groundPlane.name = 'ground';
    this.scene.add(this.groundPlane);

    // 3. 테마별 오브젝트를 담을 그룹
    this.themeGroup = new THREE.Group();
    this.scene.add(this.themeGroup);

    // 초기 테마 로드
    this.loadTheme('level0');
  }

  public loadTheme(level: WorldThemeLevel) {
    this.currentLevel = level;
    const config = WORLD_THEMES[level];

    // 배경색 및 안개(Fog) 업데이트
    this.scene.background = new THREE.Color(config.skyColor);
    this.scene.fog = new THREE.Fog(config.fogColor, 15, 45);

    // 바닥 색상 업데이트
    (this.groundPlane.material as THREE.MeshStandardMaterial).color.setHex(config.groundColor);

    // 기존 테마 오브젝트 정리
    this.clearThemeGroup();

    // 테마별 공간 오브젝트 빌드
    if (level === 'level0') {
      this.buildLevel0Starter();
    } else if (level === 'level1') {
      this.buildLevel1Town();
    } else if (level === 'level2') {
      this.buildLevel2Cafe();
    } else {
      this.buildLevel3Izakaya();
    }

    // NPC 배치
    this.spawnNpcs(level);
  }

  private clearThemeGroup() {
    this.loadGeneration++;
    this.npcRigs.forEach((rig) => rig.dispose());
    this.npcRigs = [];
    this.npcRigMap.clear();

    while (this.themeGroup.children.length > 0) {
      const child = this.themeGroup.children[0];
      this.themeGroup.remove(child);
      this.disposeObject(child);
    }
    this.interactableNpcs = [];
    this.colliders = [];
  }

  /**
   * 3D 오브젝트의 바운딩 박스를 계산하여 이동 충돌 영역(AABB)으로 등록
   */
  private registerCollider(obj: THREE.Object3D, padding = 0.45) {
    obj.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(obj);
    box.min.x -= padding;
    box.max.x += padding;
    box.min.z -= padding;
    box.max.z += padding;
    box.min.y = -1;
    box.max.y = 5;
    this.colliders.push(box);
  }

  /**
   * Lv.0 입문: 진입 가능한 카페·식당·편의점·기념품 가게 & 거리 씬
   */
  private buildLevel0Starter() {
    // 1. 중앙 거리 & 횡단보도
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 30),
      new THREE.MeshStandardMaterial({ color: 0x526071, roughness: 0.9 })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, -1);
    road.receiveShadow = true;
    this.themeGroup.add(road);

    for (let i = -10; i <= 8; i += 3) {
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(5, 0.9),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
      );
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(0, 0.02, i);
      this.themeGroup.add(stripe);
    }

    // 가로등 & 벚꽃 나무
    this.createStreetLamp(-4.2, 2.5);
    this.createStreetLamp(4.2, 2.5);
    this.createStreetLamp(-4.2, -7.0);
    this.createStreetLamp(4.2, -7.0);
    this.createSakuraTree(-4.6, 5.5);
    this.createSakuraTree(4.6, 5.5);

    // 2. 북쪽 공중화장실 부스 (유타 안내 맥락: "あっちですよ！")
    const restroom = this.createBuilding(3.6, 2.8, 3.0, 0xf8fafc, 0x3182ce, '🚻 トイレ');
    restroom.position.set(0, 1.4, -14.2);
    this.themeGroup.add(restroom);
    this.registerCollider(restroom, 0.25);
    const restroomSign = this.createSignBoard('🚻 トイレ (화장실)', '#2b6cb0');
    if (restroomSign) {
      restroomSign.position.set(0, 2.45, -12.66);
      this.themeGroup.add(restroomSign);
    }

    // 3. 카페 건물 (좌측 앞 — 카페 친구 하루)
    this.createWalkInBuilding({
      x: -9.0,
      z: -2.0,
      width: 7.5,
      height: 3.4,
      depth: 6.5,
      wallColor: 0xf6ead9,
      roofColor: 0x9c523b,
      floorColor: 0xc99e74,
      signText: '☕ CAFE (카페)',
      signBg: '#7b341e'
    });
    this.createInteriorCounter(-9.0, -4.1, 4.2, 0x6b3e26, 0xeadbc8);
    this.createInteriorTable(-11.3, -1.6, 0x8b5a2b);

    // 4. 식당 건물 (우측 앞 — 식당 이모님 미카)
    this.createWalkInBuilding({
      x: 9.0,
      z: -2.0,
      width: 7.5,
      height: 3.4,
      depth: 6.5,
      wallColor: 0xf7e7ce,
      roofColor: 0xc53030,
      floorColor: 0xd8be98,
      signText: '🍜 食堂 (식당)',
      signBg: '#c53030',
      norenColor: 0x2b4c7e
    });
    this.createInteriorCounter(9.0, -4.1, 4.2, 0x7c4a2d, 0xf3e5ab);
    this.createInteriorTable(11.3, -1.6, 0x9c6644);

    // 5. 편의점 건물 (좌측 뒤 — 편의점 점원 리나)
    this.createWalkInBuilding({
      x: -9.0,
      z: -12.0,
      width: 7.5,
      height: 3.4,
      depth: 6.5,
      wallColor: 0xffffff,
      roofColor: 0x3182ce,
      floorColor: 0xe2e8f0,
      signText: '🏪 コンビニ (편의점)',
      signBg: '#2b6cb0'
    });
    this.createInteriorCounter(-9.0, -14.1, 4.0, 0x2b6cb0, 0xf8fafc);
    this.createInteriorShelf(-11.6, -11.8, 0x4299e1);

    // 6. 기념품·잡화 상점 (우측 뒤 — 기념품 점원 켄지)
    this.createWalkInBuilding({
      x: 9.0,
      z: -12.0,
      width: 7.5,
      height: 3.4,
      depth: 6.5,
      wallColor: 0xfff5eb,
      roofColor: 0xdd6b20,
      floorColor: 0xe8d5b7,
      signText: '🎁 おみやげ (상점)',
      signBg: '#c05621'
    });
    this.createInteriorCounter(9.0, -14.1, 4.0, 0xc05621, 0xfef3c7);
    this.createInteriorShelf(11.6, -11.8, 0xed8936);
  }

  /**
   * 캔버스 기반 간판 텍스처 메쉬 생성
   */
  private createSignBoard(text: string, bgHex: string, textColor = '#ffffff'): THREE.Mesh | null {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 112;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 6;
    ctx.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 42px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    return new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 0.75),
      new THREE.MeshBasicMaterial({ map: texture })
    );
  }

  /**
   * 출입구(+Z 남향)가 열려 있어 플레이어가 직접 걸어 들어갈 수 있는 건물 생성
   */
  private createWalkInBuilding(opts: {
    x: number;
    z: number;
    width: number;
    height: number;
    depth: number;
    wallColor: number;
    roofColor: number;
    floorColor: number;
    signText: string;
    signBg: string;
    norenColor?: number;
  }) {
    const { x, z, width, height, depth, wallColor, roofColor, floorColor, signText, signBg, norenColor } = opts;
    const t = 0.25;
    const doorW = 3.2;
    const sideFrontW = (width - doorW) / 2;

    const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.75 });

    // 실내 바닥
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(width - t, depth - t),
      new THREE.MeshStandardMaterial({ color: floorColor, roughness: 0.85 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(x, 0.01, z);
    floor.receiveShadow = true;
    this.themeGroup.add(floor);

    const addWall = (w: number, h: number, d: number, px: number, py: number, pz: number, register = true) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
      mesh.position.set(px, py, pz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.themeGroup.add(mesh);
      if (register) {
        this.registerCollider(mesh, 0.22);
      }
    };

    // 뒷벽, 좌측벽, 우측벽
    addWall(width, height, t, x, height / 2, z - depth / 2 + t / 2);
    addWall(t, height, depth, x - width / 2 + t / 2, height / 2, z);
    addWall(t, height, depth, x + width / 2 - t / 2, height / 2, z);

    // 전면 좌/우 벽체 (출입구 양옆) + 상단 인방
    const frontZ = z + depth / 2 - t / 2;
    addWall(sideFrontW, height, t, x - doorW / 2 - sideFrontW / 2, height / 2, frontZ);
    addWall(sideFrontW, height, t, x + doorW / 2 + sideFrontW / 2, height / 2, frontZ);
    addWall(doorW, 0.85, t, x, height - 0.425, frontZ, false);

    // 전면 통유리 창 (좌/우 벽체 외측)
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0xa5d8ff,
      roughness: 0.2,
      metalness: 0.2,
      transparent: true,
      opacity: 0.55
    });
    for (const side of [-1, 1] as const) {
      const windowPane = new THREE.Mesh(new THREE.PlaneGeometry(sideFrontW * 0.72, height * 0.55), glassMat);
      windowPane.position.set(x + side * (doorW / 2 + sideFrontW / 2), height * 0.48, frontZ + t / 2 + 0.02);
      this.themeGroup.add(windowPane);
    }

    // 식당 등 입구 노렌(포렴) 장식
    if (norenColor !== undefined) {
      const noren = new THREE.Mesh(
        new THREE.BoxGeometry(doorW * 0.9, 0.55, 0.06),
        new THREE.MeshStandardMaterial({ color: norenColor, roughness: 0.85 })
      );
      noren.position.set(x, height - 1.1, frontZ + 0.05);
      this.themeGroup.add(noren);
    }

    // 3인칭 시야 확보용 반투명 스카이라이트 지붕 + 외곽 처마
    const roofRim = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.5, 0.28, depth + 0.5),
      new THREE.MeshStandardMaterial({
        color: roofColor,
        roughness: 0.55,
        transparent: true,
        opacity: 0.22,
        depthWrite: false
      })
    );
    roofRim.position.set(x, height + 0.14, z);
    this.themeGroup.add(roofRim);

    const frontBeam = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.5, 0.3, 0.45),
      new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.5 })
    );
    frontBeam.position.set(x, height + 0.15, z + depth / 2 + 0.1);
    frontBeam.castShadow = true;
    this.themeGroup.add(frontBeam);

    // 전면 간판
    const signBoard = this.createSignBoard(signText, signBg);
    if (signBoard) {
      signBoard.position.set(x, height - 0.35, frontZ + t / 2 + 0.06);
      this.themeGroup.add(signBoard);
    }
  }

  /**
   * 실내 계산대 / 주문 카운터
   */
  private createInteriorCounter(x: number, z: number, width: number, bodyColor: number, topColor: number) {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(width, 0.95, 0.75),
      new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.7 })
    );
    body.position.set(x, 0.475, z);
    body.castShadow = true;
    body.receiveShadow = true;
    this.themeGroup.add(body);
    this.registerCollider(body, 0.15);

    const top = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.12, 0.08, 0.85),
      new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.5 })
    );
    top.position.set(x, 0.99, z);
    this.themeGroup.add(top);
  }

  /**
   * 실내 소형 테이블 & 의자 세트
   */
  private createInteriorTable(x: number, z: number, woodColor: number) {
    const mat = new THREE.MeshStandardMaterial({ color: woodColor, roughness: 0.65 });
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.07, 16), mat);
    top.position.set(x, 0.75, z);
    top.castShadow = true;
    this.themeGroup.add(top);
    this.registerCollider(top, 0.15);

    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.75, 8),
      new THREE.MeshStandardMaterial({ color: 0x2d3748 })
    );
    leg.position.set(x, 0.375, z);
    this.themeGroup.add(leg);

    for (const offset of [-0.75, 0.75] as const) {
      const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.44, 12), mat);
      stool.position.set(x, 0.22, z + offset);
      this.themeGroup.add(stool);
    }
  }

  /**
   * 실내 진열대 (편의점 / 기념품 상점)
   */
  private createInteriorShelf(x: number, z: number, accentColor: number) {
    const rack = new THREE.Mesh(
      new THREE.BoxGeometry(0.8, 1.55, 3.0),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.6 })
    );
    rack.position.set(x, 0.775, z);
    rack.castShadow = true;
    this.themeGroup.add(rack);
    this.registerCollider(rack, 0.15);

    for (const y of [0.55, 1.0, 1.4] as const) {
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(0.84, 0.08, 3.02),
        new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.4 })
      );
      strip.position.set(x, y, z);
      this.themeGroup.add(strip);
    }
  }

  /**
   * Lv.1 도쿄 골목길 & 편의점 씬
   */
  private buildLevel1Town() {
    // 도로 아스팔트 & 횡단보도
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 30),
      new THREE.MeshStandardMaterial({ color: 0x4a5568, roughness: 0.9 })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, 0);
    road.receiveShadow = true;
    this.themeGroup.add(road);

    // 횡단보도 줄무늬
    for (let i = -10; i <= 10; i += 3) {
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(5.5, 1),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
      );
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(0, 0.02, i);
      this.themeGroup.add(stripe);
    }

    // 편의점 건물 (좌측 인도 안쪽, 내벽 x = -7)
    const konbini = this.createBuilding(8, 5, 8, 0xffffff, 0x3182ce, '🏪 LAWSON / 7-ELEVEN');
    konbini.position.set(-11, 2.5, -6);
    this.themeGroup.add(konbini);
    this.registerCollider(konbini);

    // 전철역 입구 건물 (우측 인도 안쪽, 내벽 x = +7)
    const station = this.createBuilding(8, 6, 8, 0xedf2f7, 0x38a169, '🚉 駅 STATION');
    station.position.set(11, 3, -6);
    this.themeGroup.add(station);
    this.registerCollider(station);

    // 빨간 자판기 (우측 건물 앞 인도)
    const vendingMachine = this.createVendingMachine(0xe53e3e);
    vendingMachine.position.set(6.2, 0, -2.2);
    this.themeGroup.add(vendingMachine);
    this.registerCollider(vendingMachine);

    // 파란 자판기 (좌측 건물 앞 인도)
    const vendingMachine2 = this.createVendingMachine(0x3182ce);
    vendingMachine2.position.set(-6.2, 0, -2.2);
    this.themeGroup.add(vendingMachine2);
    this.registerCollider(vendingMachine2);

    // 가로등 배치
    this.createStreetLamp(-4.8, 1);
    this.createStreetLamp(4.8, 1);
    this.createStreetLamp(-4.8, -10);
    this.createStreetLamp(4.8, -10);
  }

  /**
   * Lv.2 교토 카페 & 식당 골목 씬
   */
  private buildLevel2Cafe() {
    // 벽돌길 보도블록
    const brickRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 30),
      new THREE.MeshStandardMaterial({ color: 0x8c786a, roughness: 0.9 })
    );
    brickRoad.rotation.x = -Math.PI / 2;
    brickRoad.position.set(0, 0.01, 0);
    brickRoad.receiveShadow = true;
    this.themeGroup.add(brickRoad);

    // 카페 건물 (목조 느낌, 내벽 x = -7)
    const cafe = this.createBuilding(8, 5, 8, 0xebd7c1, 0x7b341e, '☕ CAFE KYOTO');
    cafe.position.set(-11, 2.5, -5.5);
    this.themeGroup.add(cafe);
    this.registerCollider(cafe);

    // 라멘집 건물 (내벽 x = +7)
    const ramenShop = this.createBuilding(8, 5, 8, 0xedd5b3, 0xc53030, '🍜 ラーメン 一福');
    ramenShop.position.set(11, 2.5, -5.5);
    this.themeGroup.add(ramenShop);
    this.registerCollider(ramenShop);

    // 야외 카페 테이블 & 의자
    this.createCafeTable(-5.2, 0);
    this.createCafeTable(-5.2, 4);

    // 벚꽃 나무 (작은 데코)
    this.createSakuraTree(6.2, 0.5);
    this.createSakuraTree(-6.2, 7.5);
  }

  /**
   * Lv.3 이자카야 & 축제(마츠리) 밤거리 씬
   */
  private buildLevel3Izakaya() {
    // 짙은 돌길
    const stonePath = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 30),
      new THREE.MeshStandardMaterial({ color: 0x2d3748, roughness: 0.8 })
    );
    stonePath.rotation.x = -Math.PI / 2;
    stonePath.position.set(0, 0.01, 0);
    this.themeGroup.add(stonePath);

    // 이자카야 건물 (어두운 목조, 내벽 x = -7)
    const izakaya = this.createBuilding(8, 5, 8, 0x3d312a, 0xdd6b20, '🏮 居酒屋 錦');
    izakaya.position.set(-11, 2.5, -6);
    this.themeGroup.add(izakaya);
    this.registerCollider(izakaya);

    // 포장마차 (야타이)
    const yatai = this.createYatai(6.2, -5);
    this.themeGroup.add(yatai);
    this.registerCollider(yatai);

    // 붉은 초롱(등불) 열
    for (let z = -12; z <= 12; z += 4) {
      this.createLantern(-4.2, 3.2, z);
      this.createLantern(4.2, 3.2, z);
    }
  }

  /**
   * 공통 빌딩 생성 헬퍼
   */
  private createBuilding(
    w: number,
    h: number,
    d: number,
    wallColor: number,
    roofColor: number,
    signText: string
  ): THREE.Group {
    const group = new THREE.Group();

    // 벽체
    const wall = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.7 })
    );
    wall.castShadow = true;
    wall.receiveShadow = true;
    group.add(wall);

    // 지붕
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.6, 0.6, d + 0.6),
      new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.5 })
    );
    roof.position.y = h / 2 + 0.3;
    roof.castShadow = true;
    group.add(roof);

    // 전면 문/창문 (유리 느낌)
    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(w * 0.7, h * 0.5),
      new THREE.MeshStandardMaterial({
        color: 0x90cdf4,
        roughness: 0.2,
        metalness: 0.3,
        transparent: true,
        opacity: 0.75
      })
    );
    glass.position.set(0, -0.2, d / 2 + 0.02);
    group.add(glass);

    return group;
  }

  /**
   * 자판기 생성 헬퍼
   */
  private createVendingMachine(bodyColor: number): THREE.Group {
    const group = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.2, 2.2, 0.8),
      new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.4 })
    );
    body.position.y = 1.1;
    body.castShadow = true;
    group.add(body);

    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 1.1),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    screen.position.set(0, 1.35, 0.41);
    group.add(screen);

    return group;
  }

  /**
   * 가로등 생성
   */
  private createStreetLamp(x: number, z: number) {
    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 3.8, 8),
      new THREE.MeshStandardMaterial({ color: 0x2d3748 })
    );
    pole.position.set(x, 1.9, z);
    pole.castShadow = true;
    this.themeGroup.add(pole);
    this.registerCollider(pole, 0.35);

    const lightHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xfff6c5 })
    );
    lightHead.position.set(x, 3.8, z);
    this.themeGroup.add(lightHead);

    const pointLight = new THREE.PointLight(0xfff6c5, 0.8, 8);
    pointLight.position.set(x, 3.7, z);
    this.themeGroup.add(pointLight);
  }

  /**
   * 카페 테이블 & 의자
   */
  private createCafeTable(x: number, z: number) {
    const tableTop = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 0.08, 16),
      new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.6 })
    );
    tableTop.position.set(x, 0.8, z);
    tableTop.castShadow = true;
    this.themeGroup.add(tableTop);
    this.registerCollider(tableTop, 0.45);

    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.8, 8),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 })
    );
    leg.position.set(x, 0.4, z);
    this.themeGroup.add(leg);

    // 파라솔
    const umbrella = new THREE.Mesh(
      new THREE.ConeGeometry(1.6, 0.7, 16),
      new THREE.MeshStandardMaterial({ color: 0xe07a5f, roughness: 0.5 })
    );
    umbrella.position.set(x, 2.4, z);
    this.themeGroup.add(umbrella);

    const umbrellaPole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 2.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 })
    );
    umbrellaPole.position.set(x, 1.2, z);
    this.themeGroup.add(umbrellaPole);
  }

  /**
   * 벚꽃 나무
   */
  private createSakuraTree(x: number, z: number) {
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.3, 2, 8),
      new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 })
    );
    trunk.position.set(x, 1, z);
    trunk.castShadow = true;
    this.themeGroup.add(trunk);
    this.registerCollider(trunk, 0.45);

    const leaves = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 12, 12),
      new THREE.MeshStandardMaterial({ color: 0xfbb6ce, roughness: 0.8 })
    );
    leaves.position.set(x, 2.4, z);
    leaves.castShadow = true;
    this.themeGroup.add(leaves);
  }

  /**
   * 포장마차 (야타이)
   */
  private createYatai(x: number, z: number): THREE.Group {
    const group = new THREE.Group();
    group.position.set(x, 0, z);

    // 카운터
    const counter = new THREE.Mesh(
      new THREE.BoxGeometry(3, 1, 1.6),
      new THREE.MeshStandardMaterial({ color: 0x8b5cf6, roughness: 0.7 })
    );
    counter.position.y = 0.5;
    group.add(counter);

    // 천막 지붕
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 0.2, 2),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.5 })
    );
    roof.position.y = 2.4;
    group.add(roof);

    // 기둥 4개
    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.9, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
    const offsets = [
      [-1.4, -0.7],
      [1.4, -0.7],
      [-1.4, 0.7],
      [1.4, 0.7]
    ];
    offsets.forEach(([px, pz]) => {
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(px, 1.45, pz);
      group.add(pole);
    });

    return group;
  }

  /**
   * 홍등(등불)
   */
  private createLantern(x: number, y: number, z: number) {
    const lantern = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0xff3b30,
        emissive: 0xff3b30,
        emissiveIntensity: 0.8
      })
    );
    lantern.scale.set(1, 1.3, 1);
    lantern.position.set(x, y, z);
    this.themeGroup.add(lantern);

    const light = new THREE.PointLight(0xff7b00, 0.6, 6);
    light.position.set(x, y - 0.2, z);
    this.themeGroup.add(light);
  }

  /**
   * NPC 아바타 생성 및 배치 (CC0 KayKit 3D 모델 + 애니메이션)
   */
  private spawnNpcs(level: WorldThemeLevel) {
    const npcs = getLevelNpcs(level);
    const generation = this.loadGeneration;

    npcs.forEach((npcData) => {
      const npcGroup = new THREE.Group();
      npcGroup.position.set(...npcData.position);
      npcGroup.name = npcData.id;

      // 플레이어 시작 방향(남쪽 중앙)을 자연스럽게 바라보도록 회전
      npcGroup.lookAt(0, 0, 4);

      // 1. 발밑 원형 그림자
      const shadowGeo = new THREE.CircleGeometry(0.55, 24);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.22,
        depthWrite: false
      });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.025;
      npcGroup.add(shadow);

      // 2. 머리 위 통통 튀는 말풍선 인터랙션 인디케이터 (보석/풍선)
      const bubble = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.2, 0),
        new THREE.MeshStandardMaterial({
          color: 0xffb703,
          emissive: 0xffb703,
          emissiveIntensity: 0.6
        })
      );
      bubble.position.y = 2.35;
      bubble.name = 'indicator';
      npcGroup.add(bubble);

      // 3. 3D 캐릭터 생성 (절차적 SD 캐릭터 우선, 미지정 시 GLB 폴백)
      if (npcData.characterRole) {
        const handle = createProceduralNpc(npcData.characterRole, 1.85);
        npcGroup.add(handle.model);
        this.npcRigs.push(handle);
        this.npcRigMap.set(npcData.id, handle);
      } else {
        loadAnimatedCharacter(npcData.modelUrl, 1.85, npcData.appearance)
          .then((handle) => {
            if (this.loadGeneration !== generation) {
              handle.dispose();
              return;
            }
            npcGroup.add(handle.model);
            this.npcRigs.push(handle);
            this.npcRigMap.set(npcData.id, handle);
          })
          .catch((err) => {
            console.error(`NPC 3D 모델 로드 실패 (${npcData.name}):`, err);
          });
      }

      // 씬에 추가 및 레이캐스팅 대상에 등록
      this.themeGroup.add(npcGroup);
      this.interactableNpcs.push({ mesh: npcGroup, data: npcData });
    });
  }

  /**
   * 대화 시작 시 해당 NPC가 카메라(플레이어) 정면을 바라보고 인사 모션을 취하도록 설정
   */
  public focusNpcForDialogue(npcId: string, lookTarget: THREE.Vector3) {
    const matched = this.interactableNpcs.find((n) => n.data.id === npcId);
    if (matched) {
      matched.mesh.lookAt(lookTarget.x, matched.mesh.position.y, lookTarget.z);
    }
    const rig = this.npcRigMap.get(npcId);
    rig?.playAction('interact', 0.15);
  }

  /**
   * 프레임 애니메이션 (NPC Idle 애니메이션 + 말풍선 회전/바운스)
   */
  public update(delta: number, elapsedTime: number) {
    // 1. 모든 NPC의 스켈레탈 애니메이션 믹서 갱신
    this.npcRigs.forEach((rig) => rig.update(delta));

    // 2. NPC 머리 위 보석 인디케이터 애니메이션
    this.interactableNpcs.forEach(({ mesh }) => {
      const indicator = mesh.getObjectByName('indicator');
      if (indicator) {
        indicator.rotation.y += delta * 2;
        indicator.position.y = 2.35 + Math.sin(elapsedTime * 4) * 0.08;
      }
    });
  }

  /**
   * 메모리 정리
   */
  public dispose() {
    this.clearThemeGroup();
    this.disposeObject(this.groundPlane);
    this.scene.clear();
  }

  private disposeObject(obj: THREE.Object3D) {
    obj.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((mat) => {
              if ('map' in mat && mat.map instanceof THREE.Texture) {
                mat.map.dispose();
              }
              mat.dispose();
            });
          } else {
            if ('map' in mesh.material && mesh.material.map instanceof THREE.Texture) {
              mesh.material.map.dispose();
            }
            mesh.material.dispose();
          }
        }
      }
    });
  }
}

