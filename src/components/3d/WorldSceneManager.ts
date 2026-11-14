import * as THREE from 'three';
import { WorldThemeLevel, WorldInteriorId, WorldNpcData, WorldPortal } from './types';
import { WORLD_THEMES, getLevelNpcs } from './worldData';
import { loadAnimatedCharacter, CharacterRigHandle } from './modelLoader';
import { createProceduralNpc } from './proceduralNpcs';

export class WorldSceneManager {
  public scene: THREE.Scene;
  public groundPlane: THREE.Mesh;
  public interactableNpcs: { mesh: THREE.Group; data: WorldNpcData }[] = [];
  public colliders: THREE.Box3[] = [];
  public portals: WorldPortal[] = [];
  public portalClickTargets: THREE.Object3D[] = [];
  private portalGlowMeshes: THREE.Mesh[] = [];
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

  public loadTheme(level: WorldThemeLevel, interiorId: WorldInteriorId | null = null) {
    this.currentLevel = level;
    const config = WORLD_THEMES[level];

    // 기존 테마 오브젝트 정리
    this.clearThemeGroup();

    if (interiorId) {
      // 전용 실내 씬: 주변 배경을 어둡게 분리하고 실내 전용 조명을 강조
      this.scene.background = new THREE.Color(0x18181b);
      this.scene.fog = new THREE.Fog(0x18181b, 18, 45);
      (this.groundPlane.material as THREE.MeshStandardMaterial).color.setHex(0x18181b);
      this.groundPlane.receiveShadow = false;
      this.dirLight.intensity = 0.4;
      this.dirLight.castShadow = false;
      this.hemiLight.intensity = 0.95;

      this.buildInteriorScene(interiorId);
      this.spawnNpcs(level, interiorId);
      return;
    }

    // 야외 씬 기본 조명 & 배경 복구
    this.scene.background = new THREE.Color(config.skyColor);
    this.scene.fog = new THREE.Fog(config.fogColor, 15, 45);
    (this.groundPlane.material as THREE.MeshStandardMaterial).color.setHex(config.groundColor);
    this.groundPlane.receiveShadow = true;
    this.dirLight.intensity = 1.5;
    this.dirLight.castShadow = true;
    this.hemiLight.intensity = 1.2;

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

    // 야외 NPC 배치
    this.spawnNpcs(level, null);
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
    this.portals = [];
    this.portalClickTargets = [];
    this.portalGlowMeshes = [];
  }

  /**
   * 플레이어 위치가 포탈(출입구/나가기) 반경 이내인지 검사
   */
  public checkPortalTrigger(playerPos: THREE.Vector3): WorldPortal | null {
    for (const portal of this.portals) {
      const dx = playerPos.x - portal.position[0];
      const dz = playerPos.z - portal.position[2];
      if (dx * dx + dz * dz <= portal.radius * portal.radius) {
        return portal;
      }
    }
    return null;
  }

  /**
   * 3D 오브젝트의 바운딩 박스를 계산하여 이동 충돌 영역(AABB)으로 등록
   */
  private registerCollider(obj: THREE.Object3D, padding = 0.45) {
    // 부모 그룹의 position/rotation까지 반영된 월드 좌표 기준 AABB를 계산
    obj.updateWorldMatrix(true, true);
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
   * Lv.0 입문: 거리 NPC 및 포탈 입구가 있는 4개 상점 외관 씬
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

    // 3. 진입 가능한 4개 건물 외관 + 출입구 포탈 매트
    this.createExteriorShopBuilding({
      portalId: 'portal-cafe',
      interiorId: 'starter-cafe',
      portalLabel: '☕ 카페 들어가기',
      x: -9.0,
      z: -2.0,
      returnZ: 3.6,
      wallColor: 0xf6ead9,
      roofColor: 0x9c523b,
      accentColor: 0xe07a5f,
      signText: '☕ CAFE (카페)',
      signBg: '#7b341e'
    });

    this.createExteriorShopBuilding({
      portalId: 'portal-restaurant',
      interiorId: 'starter-restaurant',
      portalLabel: '🍜 식당 들어가기',
      x: 9.0,
      z: -2.0,
      returnZ: 3.6,
      wallColor: 0xf7e7ce,
      roofColor: 0xc53030,
      accentColor: 0xe53e3e,
      signText: '🍜 食堂 (식당)',
      signBg: '#c53030',
      norenColor: 0x2b4c7e
    });

    this.createExteriorShopBuilding({
      portalId: 'portal-konbini',
      interiorId: 'starter-konbini',
      portalLabel: '🏪 편의점 들어가기',
      x: -9.0,
      z: -12.0,
      returnZ: -6.4,
      wallColor: 0xffffff,
      roofColor: 0x3182ce,
      accentColor: 0x4299e1,
      signText: '🏪 コンビニ (편의점)',
      signBg: '#2b6cb0'
    });

    this.createExteriorShopBuilding({
      portalId: 'portal-souvenir',
      interiorId: 'starter-souvenir',
      portalLabel: '🎁 상점 들어가기',
      x: 9.0,
      z: -12.0,
      returnZ: -6.4,
      wallColor: 0xfff5eb,
      roofColor: 0xdd6b20,
      accentColor: 0xed8936,
      signText: '🎁 おみやげ (상점)',
      signBg: '#c05621'
    });
  }

  /**
   * 캔버스 기반 표지판/간판 텍스처 메쉬 생성
   */
  private createSignBoard(
    text: string,
    bgHex: string,
    textColor = '#ffffff',
    width = 3.4,
    height = 0.75
  ): THREE.Mesh | null {
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
    ctx.font = 'bold 40px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    return new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ map: texture })
    );
  }

  /**
   * 출입구 포탈 매트(입장/나가기 공통) 생성
   */
  private createPortalMat(opts: {
    portal: WorldPortal;
    color: number;
    labelText: string;
    labelBg: string;
  }) {
    const { portal, color, labelText, labelBg } = opts;
    const [px, , pz] = portal.position;

    const group = new THREE.Group();
    group.position.set(px, 0, pz);
    group.userData.portalId = portal.id;

    // 발판 매트
    const matBase = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.04, 1.3),
      new THREE.MeshStandardMaterial({ color, roughness: 0.5 })
    );
    matBase.position.y = 0.02;
    matBase.receiveShadow = true;
    group.add(matBase);

    // 발광 테두리 링 (맥동 애니메이션)
    const glowRing = new THREE.Mesh(
      new THREE.RingGeometry(0.95, 1.15, 28),
      new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75,
        depthWrite: false
      })
    );
    glowRing.rotation.x = -Math.PI / 2;
    glowRing.position.y = 0.028;
    group.add(glowRing);
    this.portalGlowMeshes.push(glowRing);

    // 매트 위 안내 라벨 (ENTER / EXIT)
    const labelMesh = this.createSignBoard(labelText, labelBg, '#ffffff', 1.9, 0.44);
    if (labelMesh) {
      labelMesh.rotation.x = -Math.PI / 2;
      labelMesh.position.y = 0.045;
      group.add(labelMesh);
    }

    this.themeGroup.add(group);
    this.portals.push(portal);
    this.portalClickTargets.push(group);
  }

  /**
   * 야외 상점 건물 외관 + 출입구 포탈 생성
   */
  private createExteriorShopBuilding(opts: {
    portalId: string;
    interiorId: WorldInteriorId;
    portalLabel: string;
    x: number;
    z: number;
    returnZ: number;
    wallColor: number;
    roofColor: number;
    accentColor: number;
    signText: string;
    signBg: string;
    norenColor?: number;
  }) {
    const {
      portalId,
      interiorId,
      portalLabel,
      x,
      z,
      returnZ,
      wallColor,
      roofColor,
      accentColor,
      signText,
      signBg,
      norenColor
    } = opts;
    const w = 7.2;
    const h = 3.8;
    const d = 6.0;

    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.userData.portalId = portalId;

    // 건물 본체
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.7 })
    );
    body.position.y = h / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // 지붕
    const roof = new THREE.Mesh(
      new THREE.BoxGeometry(w + 0.6, 0.55, d + 0.6),
      new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.55 })
    );
    roof.position.y = h + 0.275;
    roof.castShadow = true;
    group.add(roof);

    // 전면 출입문 & 좌우 따뜻한 쇼윈도
    const frontZ = d / 2 + 0.02;
    const door = new THREE.Mesh(
      new THREE.BoxGeometry(1.9, 2.35, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x3b2f2f, roughness: 0.5 })
    );
    door.position.set(0, 1.175, frontZ);
    group.add(door);

    const doorGlass = new THREE.Mesh(
      new THREE.PlaneGeometry(1.45, 1.7),
      new THREE.MeshStandardMaterial({
        color: 0xffedd5,
        emissive: 0xfbd38d,
        emissiveIntensity: 0.35
      })
    );
    doorGlass.position.set(0, 1.3, frontZ + 0.05);
    group.add(doorGlass);

    for (const sx of [-2.3, 2.3] as const) {
      const win = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 1.45),
        new THREE.MeshStandardMaterial({
          color: 0xbee3f8,
          emissive: 0xfefcbf,
          emissiveIntensity: 0.28,
          roughness: 0.2
        })
      );
      win.position.set(sx, 1.55, frontZ);
      group.add(win);
    }

    // 차양 / 노렌 장식
    const awning = new THREE.Mesh(
      new THREE.BoxGeometry(w * 0.88, 0.22, 0.9),
      new THREE.MeshStandardMaterial({
        color: norenColor ?? roofColor,
        roughness: 0.6
      })
    );
    awning.position.set(0, 2.65, d / 2 + 0.42);
    awning.rotation.x = 0.22;
    group.add(awning);

    // 간판
    const signBoard = this.createSignBoard(signText, signBg);
    if (signBoard) {
      signBoard.position.set(0, 3.35, frontZ + 0.04);
      group.add(signBoard);
    }

    this.themeGroup.add(group);
    this.registerCollider(body, 0.25);
    this.portalClickTargets.push(group);

    // 건물 앞 포탈 매트
    const doorMatZ = z + d / 2 + 0.85;
    this.createPortalMat({
      portal: {
        id: portalId,
        kind: 'enter',
        label: portalLabel,
        interiorId,
        position: [x, 0, doorMatZ],
        radius: 1.1,
        returnPosition: [x, 0, returnZ]
      },
      color: accentColor,
      labelText: 'ENTER · 입장',
      labelBg: signBg
    });
  }

  /**
   * 전용 실내 씬 빌드 (방식 A: 독립 디오라마 공간)
   */
  private buildInteriorScene(interiorId: WorldInteriorId) {
    if (interiorId === 'starter-cafe') {
      this.buildInteriorRoomShell({
        floorColor: 0xc99e74,
        wallColor: 0xf7efe2,
        trimColor: 0x6b3e26,
        lightColor: 0xffe4b5,
        lightIntensity: 1.35,
        bannerText: '☕ CAFE (카페)',
        bannerBg: '#7b341e',
        exitColor: 0xe07a5f
      });
      this.createInteriorCounter(0, -3.4, 5.6, 0x6b3e26, 0xeadbc8);
      this.createCafeProps();
      this.createInteriorTable(-3.6, -0.4, 0x8b5a2b);
      this.createInteriorTable(3.6, -0.4, 0x8b5a2b);
      this.createInteriorTable(-3.6, 2.2, 0x8b5a2b);
      this.createPottedPlant(-5.1, -4.1);
      this.createPottedPlant(5.1, -4.1);
      return;
    }

    if (interiorId === 'starter-restaurant') {
      this.buildInteriorRoomShell({
        floorColor: 0xd6bc94,
        wallColor: 0xfbf2e3,
        trimColor: 0x8b261d,
        lightColor: 0xffd89b,
        lightIntensity: 1.35,
        bannerText: '🍜 食堂 (식당)',
        bannerBg: '#c53030',
        exitColor: 0xe53e3e
      });
      this.createInteriorCounter(0, -3.4, 6.2, 0x7c4a2d, 0xf3e5ab);
      // 식당 카운터 위 노렌(포렴)
      const noren = new THREE.Mesh(
        new THREE.BoxGeometry(5.6, 0.55, 0.08),
        new THREE.MeshStandardMaterial({ color: 0x2b4c7e, roughness: 0.85 })
      );
      noren.position.set(0, 2.55, -3.0);
      this.themeGroup.add(noren);

      this.createInteriorTable(-3.5, -0.3, 0x9c6644);
      this.createInteriorTable(3.5, -0.3, 0x9c6644);
      this.createInteriorTable(-3.5, 2.2, 0x9c6644);
      this.createInteriorTable(3.5, 2.2, 0x9c6644);
      this.createLantern(-4.8, 2.8, -4.3);
      this.createLantern(4.8, 2.8, -4.3);
      return;
    }

    if (interiorId === 'starter-konbini') {
      this.buildInteriorRoomShell({
        floorColor: 0xe2e8f0,
        wallColor: 0xf8fafc,
        trimColor: 0x2b6cb0,
        lightColor: 0xffffff,
        lightIntensity: 1.5,
        bannerText: '🏪 コンビニ (편의점)',
        bannerBg: '#2b6cb0',
        exitColor: 0x4299e1
      });
      // 편의점 포인트 스트라이프 띠
      const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(11.9, 0.22, 0.06),
        new THREE.MeshStandardMaterial({ color: 0x38a169, roughness: 0.5 })
      );
      stripe.position.set(0, 2.5, -4.85);
      this.themeGroup.add(stripe);

      this.createInteriorCounter(-1.6, -3.2, 4.4, 0x2b6cb0, 0xf8fafc);
      this.createBeverageCooler(3.3, -4.3);
      this.createInteriorShelf(3.2, -0.5, 0x3182ce);
      this.createInteriorShelf(3.2, 2.2, 0x38a169);
      this.createInteriorShelf(-4.8, 0.6, 0xed8936);
      return;
    }

    // starter-souvenir
    this.buildInteriorRoomShell({
      floorColor: 0xe6d3b3,
      wallColor: 0xfff7ed,
      trimColor: 0xc05621,
      lightColor: 0xffedd5,
      lightIntensity: 1.4,
      bannerText: '🎁 おみやげ (기념품 상점)',
      bannerBg: '#c05621',
      exitColor: 0xed8936
    });
    this.createInteriorCounter(0, -3.3, 4.8, 0xc05621, 0xfef3c7);
    this.createGiftDisplayTable(-3.6, -0.6);
    this.createGiftDisplayTable(3.6, -0.6);
    this.createGiftDisplayTable(-3.6, 2.1);
    this.createGiftDisplayTable(3.6, 2.1);
    this.createPottedPlant(-5.1, -4.1);
    this.createPottedPlant(5.1, -4.1);
  }

  /**
   * 전용 실내 씬 공통 방 구조 (12m × 10m 디오라마 + 나가기 포탈)
   */
  private buildInteriorRoomShell(opts: {
    floorColor: number;
    wallColor: number;
    trimColor: number;
    lightColor: number;
    lightIntensity: number;
    bannerText: string;
    bannerBg: string;
    exitColor: number;
  }) {
    const { floorColor, wallColor, trimColor, lightColor, lightIntensity, bannerText, bannerBg, exitColor } = opts;
    const roomW = 12;
    const roomD = 10;
    const wallH = 3.8;
    const t = 0.25;

    // 실내 바닥
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(roomW, roomD),
      new THREE.MeshStandardMaterial({ color: floorColor, roughness: 0.85 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0.01, 0);
    floor.receiveShadow = true;
    this.themeGroup.add(floor);

    const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.75 });
    const trimMat = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.6 });

    const addWall = (w: number, h: number, d: number, px: number, py: number, pz: number) => {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
      wall.position.set(px, py, pz);
      wall.receiveShadow = true;
      this.themeGroup.add(wall);
      this.registerCollider(wall, 0.2);
    };

    // 뒷벽, 좌측벽, 우측벽
    addWall(roomW, wallH, t, 0, wallH / 2, -roomD / 2);
    addWall(t, wallH, roomD, -roomW / 2, wallH / 2, 0);
    addWall(t, wallH, roomD, roomW / 2, wallH / 2, 0);

    // 걸레받이 트림
    const backTrim = new THREE.Mesh(new THREE.BoxGeometry(roomW, 0.24, 0.3), trimMat);
    backTrim.position.set(0, 0.12, -roomD / 2 + 0.04);
    this.themeGroup.add(backTrim);

    // 남쪽 카메라 시야를 가리지 않는 낮은 경계턱 (방 밖 이탈 방지)
    const southCurb = new THREE.Mesh(new THREE.BoxGeometry(roomW, 0.16, 0.2), trimMat);
    southCurb.position.set(0, 0.08, roomD / 2 + 0.1);
    this.themeGroup.add(southCurb);
    this.registerCollider(southCurb, 0.2);

    // 뒷벽 상단 장소 배너
    const banner = this.createSignBoard(bannerText, bannerBg, '#ffffff', 4.4, 0.9);
    if (banner) {
      banner.position.set(0, 3.05, -roomD / 2 + 0.16);
      this.themeGroup.add(banner);
    }

    // 실내 전용 포인트 조명 (중앙 + 안쪽)
    const centerLight = new THREE.PointLight(lightColor, lightIntensity, 22);
    centerLight.position.set(0, 3.5, 0.5);
    this.themeGroup.add(centerLight);

    const backLight = new THREE.PointLight(lightColor, lightIntensity * 0.75, 18);
    backLight.position.set(0, 3.2, -3.2);
    this.themeGroup.add(backLight);

    // 남쪽 출구(EXIT) 포탈 매트
    this.createPortalMat({
      portal: {
        id: 'portal-exit',
        kind: 'exit',
        label: '🚪 밖으로 나가기',
        position: [0, 0, 4.15],
        radius: 1.05
      },
      color: exitColor,
      labelText: 'EXIT · 나가기',
      labelBg: '#2d3748'
    });
  }

  /**
   * 카페 카운터 위 커피머신·디저트 쇼케이스 소품
   */
  private createCafeProps() {
    const machine = new THREE.Mesh(
      new THREE.BoxGeometry(0.9, 0.65, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.4, metalness: 0.3 })
    );
    machine.position.set(-1.5, 1.35, -3.4);
    this.themeGroup.add(machine);

    const showcase = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.55, 0.65),
      new THREE.MeshStandardMaterial({
        color: 0xbae6fd,
        transparent: true,
        opacity: 0.65,
        roughness: 0.2
      })
    );
    showcase.position.set(1.5, 1.3, -3.4);
    this.themeGroup.add(showcase);
  }

  /**
   * 편의점 음료 냉장고
   */
  private createBeverageCooler(x: number, z: number) {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 2.2, 0.8),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 })
    );
    body.position.set(x, 1.1, z);
    this.themeGroup.add(body);
    this.registerCollider(body, 0.15);

    const glass = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 1.7),
      new THREE.MeshStandardMaterial({
        color: 0xe0f2fe,
        emissive: 0xbae6fd,
        emissiveIntensity: 0.45
      })
    );
    glass.position.set(x, 1.18, z + 0.41);
    this.themeGroup.add(glass);
  }

  /**
   * 기념품 가게 진열 테이블 & 선물 상자
   */
  private createGiftDisplayTable(x: number, z: number) {
    const table = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 0.8, 1.2),
      new THREE.MeshStandardMaterial({ color: 0xd9a773, roughness: 0.65 })
    );
    table.position.set(x, 0.4, z);
    this.themeGroup.add(table);
    this.registerCollider(table, 0.15);

    const colors = [0xe07a5f, 0x4299e1, 0xf6ad55];
    colors.forEach((c, idx) => {
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.3, 0.36),
        new THREE.MeshStandardMaterial({ color: c, roughness: 0.5 })
      );
      box.position.set(x - 0.45 + idx * 0.45, 0.95, z);
      this.themeGroup.add(box);
    });
  }

  /**
   * 실내 화분 데코
   */
  private createPottedPlant(x: number, z: number) {
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.24, 0.45, 12),
      new THREE.MeshStandardMaterial({ color: 0xc05621, roughness: 0.7 })
    );
    pot.position.set(x, 0.225, z);
    this.themeGroup.add(pot);
    this.registerCollider(pot, 0.15);

    const bush = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 10, 10),
      new THREE.MeshStandardMaterial({ color: 0x38a169, roughness: 0.8 })
    );
    bush.position.set(x, 0.72, z);
    this.themeGroup.add(bush);
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
   * NPC 아바타 생성 및 배치 (야외 / 전용 실내 필터링)
   */
  private spawnNpcs(level: WorldThemeLevel, interiorId: WorldInteriorId | null) {
    const npcs = getLevelNpcs(level).filter((npc) =>
      interiorId ? npc.interiorId === interiorId : !npc.interiorId
    );
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

    // 3. 출입구/나가기 포탈 글로우 맥동 애니메이션
    const pulse = 0.55 + Math.sin(elapsedTime * 3.5) * 0.25;
    this.portalGlowMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse;
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

