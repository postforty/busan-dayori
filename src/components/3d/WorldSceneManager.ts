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
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.bias = -0.0005;
    this.dirLight.shadow.normalBias = 0.02;
    this.dirLight.shadow.camera.near = 0.5;
    this.dirLight.shadow.camera.far = 60;
    this.dirLight.shadow.camera.left = -16;
    this.dirLight.shadow.camera.right = 16;
    this.dirLight.shadow.camera.top = 16;
    this.dirLight.shadow.camera.bottom = -16;
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

    // 야외 씬 기본 조명 & 배경 복구 (Lv.0는 노을 해변 골목 전용 석양빛 적용)
    this.scene.background = new THREE.Color(config.skyColor);
    (this.groundPlane.material as THREE.MeshStandardMaterial).color.setHex(config.groundColor);
    this.groundPlane.receiveShadow = true;
    this.dirLight.castShadow = true;

    if (level === 'level0') {
      this.scene.fog = new THREE.Fog(config.fogColor, 36, 86);
      this.dirLight.color.setHex(0xffd29d);
      this.dirLight.intensity = 1.65;
      this.dirLight.position.set(5, 11, -18);
      this.hemiLight.color.setHex(0xdceefb);
      this.hemiLight.groundColor.setHex(0xd4a373);
      this.hemiLight.intensity = 1.35;
    } else {
      this.scene.fog = new THREE.Fog(config.fogColor, 15, 45);
      this.dirLight.color.setHex(0xfffaed);
      this.dirLight.intensity = 1.5;
      this.dirLight.position.set(10, 20, 10);
      this.hemiLight.color.setHex(0xffffff);
      this.hemiLight.groundColor.setHex(0x444444);
      this.hemiLight.intensity = 1.2;
    }

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
   * 바닥 클릭 좌표가 이동 가능한(바다/건물/경계 밖이 아닌) 영역인지 검사
   */
  public isWalkableGroundPoint(point: THREE.Vector3): boolean {
    const testPoint = new THREE.Vector3(point.x, 0.5, point.z);
    return !this.colliders.some((box) => box.containsPoint(testPoint));
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
   * Lv.0 입문: 노을 지는 바닷가 골목길 & 진입 가능한 4개 2층 상점 씬
   */
  private buildLevel0Starter() {
    // 1. 하늘 노을 그라데이션 & 바다 · 항구 원경
    this.buildLevel0CoastalVista();

    // 2. 따뜻한 햇빛이 내린 골목 돌바닥 & 양측 인도 연석 + 배수로 그레이트
    const roadTex = this.createAlleyRoadTexture();
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 28.5),
      roadTex
        ? new THREE.MeshStandardMaterial({ map: roadTex, roughness: 0.88 })
        : new THREE.MeshStandardMaterial({ color: 0xc2b8ad, roughness: 0.88 })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.012, -2.5);
    road.receiveShadow = true;
    this.themeGroup.add(road);

    for (const sideX of [-3.1, 3.1] as const) {
      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(0.65, 0.08, 28.5),
        new THREE.MeshStandardMaterial({ color: 0xafa191, roughness: 0.85 })
      );
      curb.position.set(sideX, 0.04, -2.5);
      curb.receiveShadow = true;
      this.themeGroup.add(curb);
    }

    // 도로 하단 금속 배수구 그레이트 (그림자 레이어 0.035 아래 유지)
    const grate = new THREE.Mesh(
      new THREE.BoxGeometry(5.2, 0.008, 0.42),
      new THREE.MeshStandardMaterial({ color: 0x5c646d, roughness: 0.6, metalness: 0.3 })
    );
    grate.position.set(0, 0.016, 2.2);
    this.themeGroup.add(grate);

    // 3. 골목 끝 해안 석재 난간 & 전체 해안선·골목 외곽 충돌 차단 (바다 위 이동 및 건물 뒤 우회 방지)
    const harborRail = new THREE.Mesh(
      new THREE.BoxGeometry(24, 0.48, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x9c8e7e, roughness: 0.8 })
    );
    harborRail.position.set(0, 0.24, -16.75);
    harborRail.castShadow = true;
    harborRail.receiveShadow = true;
    this.themeGroup.add(harborRail);

    const railCap = new THREE.Mesh(
      new THREE.BoxGeometry(24, 0.08, 0.42),
      new THREE.MeshStandardMaterial({ color: 0x6e5e4e, roughness: 0.75 })
    );
    railCap.position.set(0, 0.52, -16.75);
    this.themeGroup.add(railCap);

    // 바다 전체(-Z) · 좌우 건물 너머(±X) · 골목 남단(+Z) 이동 불가 영역 고정
    this.colliders.push(
      new THREE.Box3(new THREE.Vector3(-30, -1, -58), new THREE.Vector3(30, 5, -16.45)),
      new THREE.Box3(new THREE.Vector3(-30, -1, -20), new THREE.Vector3(-3.3, 5, 16)),
      new THREE.Box3(new THREE.Vector3(3.3, -1, -20), new THREE.Vector3(30, 5, 16)),
      new THREE.Box3(new THREE.Vector3(-30, -1, 7.6), new THREE.Vector3(30, 5, 18))
    );

    // 4. 공중화장실 부스 (중앙 바다 전망을 가리지 않도록 골목 북서쪽 코너 배치)
    const restroom = this.createBuilding(2.9, 2.6, 2.4, 0xf8fafc, 0x3b76a8, '🚻 トイレ');
    restroom.position.set(-4.85, 1.3, -14.7);
    restroom.rotation.y = Math.PI / 2;
    this.themeGroup.add(restroom);
    this.registerCollider(restroom, 0.25);
    const restroomSign = this.createSignBoard('🚻 トイレ (화장실)', '#2b6cb0', '#ffffff', 2.4, 0.56);
    if (restroomSign) {
      restroomSign.position.set(-3.62, 2.2, -14.7);
      restroomSign.rotation.y = Math.PI / 2;
      this.themeGroup.add(restroomSign);
    }

    // 5. 골목 양쪽을 따라 늘어선 2층 목조·기와 지붕 상점 4채
    this.createAlleyShopBuilding({
      portalId: 'portal-restaurant',
      interiorId: 'starter-restaurant',
      portalLabel: '🍜 식당 들어가기',
      side: 'left',
      x: -6.2,
      z: -1.1,
      wallColor: 0xe6d4be,
      trimColor: 0x6e4a30,
      roofColor: 0x5d7285,
      awningColor: 0x3f5e7a,
      accentColor: 0xe53e3e,
      signText: 'あさひ食堂',
      signBg: '#f6ead9',
      signTextColor: '#4a2e1b',
      verticalSign: true
    });

    this.createAlleyShopBuilding({
      portalId: 'portal-cafe',
      interiorId: 'starter-cafe',
      portalLabel: '☕ 카페 들어가기',
      side: 'right',
      x: 6.2,
      z: -1.1,
      wallColor: 0xf2e4d0,
      trimColor: 0x724c30,
      roofColor: 0x597086,
      awningColor: 0x669458,
      accentColor: 0xe07a5f,
      signText: 'カフェ こもれび',
      signBg: '#fff8ec',
      signTextColor: '#3f2a1d',
      verticalSign: false,
      hasRoofCat: 'tabby'
    });

    this.createAlleyShopBuilding({
      portalId: 'portal-konbini',
      interiorId: 'starter-konbini',
      portalLabel: '🏪 편의점 들어가기',
      side: 'left',
      x: -6.2,
      z: -8.7,
      wallColor: 0xf4eee4,
      trimColor: 0x5f422d,
      roofColor: 0x4b7096,
      awningColor: 0x3b82c4,
      accentColor: 0x4299e1,
      signText: 'こもれび商店',
      signBg: '#eef6ff',
      signTextColor: '#1e4268',
      verticalSign: true
    });

    this.createAlleyShopBuilding({
      portalId: 'portal-souvenir',
      interiorId: 'starter-souvenir',
      portalLabel: '🎁 상점 들어가기',
      side: 'right',
      x: 6.2,
      z: -8.7,
      wallColor: 0xf5e5d3,
      trimColor: 0x6e482e,
      roofColor: 0xc96b4b,
      awningColor: 0xd97d48,
      accentColor: 0xed8936,
      signText: '미도상점',
      signBg: '#fff7eb',
      signTextColor: '#4e2f1d',
      verticalSign: true,
      hasRoofCat: 'ginger'
    });

    // 6. 전봇대 + 변압기 + 가로등 + 하늘 가로지르는 전선줄
    const poleCoords: [number, number, 1 | -1][] = [
      [-2.95, 1.9, 1],
      [2.95, -4.8, -1],
      [-2.95, -11.9, 1],
      [2.95, -16.1, -1]
    ];
    poleCoords.forEach(([px, pz, dir], idx) => {
      this.createUtilityPoleWithLamp(px, pz, dir, idx % 2 === 0);
    });
    this.createAlleyPowerLines(poleCoords);

    // 7. 골목 생활감 소품 (자전거, 자판기, 빨간 우체통, 수국 화분, 나무 울타리, 입간판)
    this.createAlleyLifestyleProps();
  }

  /**
   * 캔버스 기반 골목길 돌바닥 텍스처 (따뜻한 햇살 패치 + 가장자리 판석)
   */
  private createAlleyRoadTexture(): THREE.CanvasTexture | null {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#ead4b4');
    grad.addColorStop(0.45, '#d6c6b3');
    grad.addColorStop(1, '#b8b2ac');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 햇살이 사선으로 비추는 따뜻한 빛 패치
    const sunGrad = ctx.createRadialGradient(240, 420, 30, 240, 420, 240);
    sunGrad.addColorStop(0, 'rgba(255, 228, 173, 0.55)');
    sunGrad.addColorStop(1, 'rgba(255, 228, 173, 0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 120, canvas.width, 620);

    // 은은한 돌판·노면 질감 & 타이어/물웅덩이 느낌
    ctx.fillStyle = 'rgba(130, 138, 148, 0.22)';
    for (let i = 0; i < 16; i++) {
      const rx = 65 + ((i * 73) % 360);
      const ry = 80 + ((i * 119) % 860);
      ctx.beginPath();
      ctx.ellipse(rx, ry, 28 + (i % 3) * 14, 14 + (i % 4) * 6, (i % 5) * 0.2, 0, Math.PI * 2);
      ctx.fill();
    }

    // 좌우 연석 안쪽 블록선
    ctx.strokeStyle = 'rgba(110, 96, 82, 0.35)';
    ctx.lineWidth = 3;
    for (const bx of [16, 496] as const) {
      ctx.beginPath();
      ctx.moveTo(bx, 0);
      ctx.lineTo(bx, canvas.height);
      ctx.stroke();
    }
    ctx.lineWidth = 2;
    for (let y = 0; y < canvas.height; y += 44) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(24, y);
      ctx.moveTo(488, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * 캔버스 기반 밝은 파스텔 바다 텍스처 (잔잔한 물결 + 석양 윤슬 + 해안 포말)
   */
  private createCoastalSeaTexture(): THREE.CanvasTexture | null {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // 수평선(위)에서 가까운 연안(아래)으로 이어지는 밝은 바다색 그라데이션
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0.0, '#c8e4ea');
    grad.addColorStop(0.28, '#95c9d8');
    grad.addColorStop(0.7, '#7eb8cc');
    grad.addColorStop(1.0, '#8cc4d2');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 중앙~좌측 석양빛 수면 반사 (황금빛 윤슬 영역)
    const sunGrad = ctx.createRadialGradient(256, 110, 12, 256, 210, 185);
    sunGrad.addColorStop(0, 'rgba(255, 243, 200, 0.85)');
    sunGrad.addColorStop(0.5, 'rgba(255, 224, 165, 0.42)');
    sunGrad.addColorStop(1, 'rgba(255, 224, 165, 0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 수평 물결 하이라이트
    for (let i = 0; i < 65; i++) {
      const rx = 25 + ((i * 89) % 440);
      const ry = 20 + ((i * 53) % 470);
      const rw = 18 + (i % 4) * 14;
      const inSunBand = Math.abs(rx - 256) < 95;
      ctx.fillStyle = inSunBand
        ? 'rgba(255, 250, 220, 0.78)'
        : 'rgba(235, 250, 255, 0.42)';
      ctx.fillRect(rx, ry, rw, 2.5);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }

  /**
   * Lv.0 노을 하늘 그라데이션 돔 + 구름 + 바다 + 선착장 + 배 + 해안 언덕 및 원경 마을
   */
  private buildLevel0CoastalVista() {
    // 그라데이션 스카이 돔
    let skyTex: THREE.CanvasTexture | null = null;
    if (typeof document !== 'undefined') {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const g = ctx.createLinearGradient(0, 0, 0, 512);
        g.addColorStop(0.0, '#9ecbe0');
        g.addColorStop(0.34, '#cfe6ec');
        g.addColorStop(0.49, '#fde7c8');
        g.addColorStop(0.56, '#ffd29b');
        g.addColorStop(1.0, '#fae2c8');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 64, 512);
        skyTex = new THREE.CanvasTexture(canvas);
        skyTex.colorSpace = THREE.SRGBColorSpace;
        skyTex.needsUpdate = true;
      }
    }

    const skyDome = new THREE.Mesh(
      new THREE.SphereGeometry(56, 24, 16),
      skyTex
        ? new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false, depthWrite: false })
        : new THREE.MeshBasicMaterial({ color: 0xfbe2c8, side: THREE.BackSide, fog: false, depthWrite: false })
    );
    this.themeGroup.add(skyDome);

    // 노을빛 구름 클러스터
    const cloudMat = new THREE.MeshBasicMaterial({ color: 0xfff0df, fog: false });
    const cloudUnderMat = new THREE.MeshBasicMaterial({ color: 0xf7cdb8, fog: false });
    const cloudGroups: [number, number, number, number][] = [
      [8.5, 14.2, -38, 1.3],
      [14.5, 16.0, -41, 1.0],
      [-10.5, 13.5, -39, 1.1]
    ];
    cloudGroups.forEach(([cx, cy, cz, scale]) => {
      const cg = new THREE.Group();
      cg.position.set(cx, cy, cz);
      cg.scale.setScalar(scale);
      const puffs: [number, number, number, number, boolean][] = [
        [0, 0.3, 0, 1.8, false],
        [-1.6, 0.0, 0.2, 1.25, true],
        [1.7, 0.1, -0.1, 1.35, false],
        [0.6, 0.85, 0, 1.15, false],
        [-0.7, -0.3, 0.1, 1.1, true]
      ];
      puffs.forEach(([px, py, pz, r, isUnder]) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), isUnder ? cloudUnderMat : cloudMat);
        puff.position.set(px, py, pz);
        puff.scale.set(1.2, 0.72, 0.65);
        cg.add(puff);
      });
      this.themeGroup.add(cg);
    });

    // 밝은 파스텔 바다 수면 (환경광 부족으로 어두워지지 않도록 BasicMaterial + 물결/윤슬 텍스처 사용)
    const seaTex = this.createCoastalSeaTexture();
    const sea = new THREE.Mesh(
      new THREE.PlaneGeometry(110, 38),
      seaTex
        ? new THREE.MeshBasicMaterial({ map: seaTex })
        : new THREE.MeshBasicMaterial({ color: 0x8cc4d4 })
    );
    sea.rotation.x = -Math.PI / 2;
    sea.position.set(0, 0.02, -36);
    this.themeGroup.add(sea);

    // 해안선 하얀 물결 포말 라인
    const shorelineFoam = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 0.48),
      new THREE.MeshBasicMaterial({ color: 0xf4fbff, transparent: true, opacity: 0.72 })
    );
    shorelineFoam.rotation.x = -Math.PI / 2;
    shorelineFoam.position.set(0, 0.032, -17.15);
    this.themeGroup.add(shorelineFoam);

    // 만 건너편 좌·우 해안 선착장/지반 (가까운 바다(z=-17~-25) 너머에 원경 마을 배치)
    const pierDeckMat = new THREE.MeshStandardMaterial({ color: 0xcabaa5, roughness: 0.85 });
    const pierWallMat = new THREE.MeshStandardMaterial({ color: 0x8b7e6f, roughness: 0.85 });
    for (const px of [-12.0, 12.0] as const) {
      const pier = new THREE.Mesh(new THREE.BoxGeometry(12.5, 0.42, 9.5), pierWallMat);
      pier.position.set(px, 0.21, -29.8);
      this.themeGroup.add(pier);

      const deck = new THREE.Mesh(new THREE.PlaneGeometry(12.5, 9.5), pierDeckMat);
      deck.rotation.x = -Math.PI / 2;
      deck.position.set(px, 0.425, -29.8);
      this.themeGroup.add(deck);
    }

    // 해수면 위 작은 배/페리 2척
    const boats: [number, number, number][] = [
      [-2.1, -22.5, 1.0],
      [2.2, -28.0, 0.88]
    ];
    boats.forEach(([bx, bz, bs]) => {
      const boat = new THREE.Group();
      boat.position.set(bx, 0.08, bz);
      boat.scale.setScalar(bs);
      const hull = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.26, 0.52),
        new THREE.MeshBasicMaterial({ color: 0x455a6b })
      );
      boat.add(hull);
      const stripe = new THREE.Mesh(
        new THREE.BoxGeometry(1.52, 0.08, 0.53),
        new THREE.MeshBasicMaterial({ color: 0xd96b52 })
      );
      stripe.position.y = 0.08;
      boat.add(stripe);
      const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(0.68, 0.28, 0.36),
        new THREE.MeshBasicMaterial({ color: 0xfff8ef })
      );
      cabin.position.set(0.1, 0.25, 0);
      boat.add(cabin);
      this.themeGroup.add(boat);
    });

    // 원경 해안 산맥 실루엣 (해안과 하늘을 부드럽게 구분)
    const hillConfigs: [number, number, number, number, number, number][] = [
      [-21, 3.6, -44, 19, 9.5, 0x7fa3a6],
      [-7.5, 2.5, -46, 15, 7.2, 0x94b5b3],
      [18, 4.1, -43, 20, 10.5, 0x76999c],
      [6.5, 2.2, -47, 14, 6.2, 0x9ab8b3]
    ];
    hillConfigs.forEach(([hx, hy, hz, rx, ry, col]) => {
      const hill = new THREE.Mesh(
        new THREE.ConeGeometry(rx, ry, 18),
        new THREE.MeshBasicMaterial({ color: col })
      );
      hill.position.set(hx, hy * 0.5, hz);
      hill.scale.set(1.25, 0.68, 0.45);
      this.themeGroup.add(hill);
    });

    // 선착장 지반 위에 올라선 바닷가 원경 마을 건물들 (중앙 바다 시야는 열어둠)
    const distantHouses: [number, number, number, number, number, number][] = [
      [-7.8, -27.2, 2.4, 2.3, 0xe7d9c4, 0x5d7285],
      [-11.2, -30.2, 2.8, 3.1, 0xd8cdb9, 0xc96b4b],
      [7.8, -27.4, 2.5, 2.5, 0xe8d8c3, 0x5d7285],
      [11.0, -30.0, 3.0, 3.4, 0xd4dde2, 0x4b7096],
      [14.2, -31.8, 2.8, 4.0, 0xe0d2be, 0xc96b4b]
    ];
    const winGlowMat = new THREE.MeshBasicMaterial({ color: 0xffe4a8 });
    distantHouses.forEach(([dx, dz, dw, dh, wallCol, roofCol]) => {
      const baseY = 0.42;
      const box = new THREE.Mesh(
        new THREE.BoxGeometry(dw, dh, dw * 0.9),
        new THREE.MeshStandardMaterial({ color: wallCol, roughness: 0.8 })
      );
      box.position.set(dx, baseY + dh / 2, dz);
      this.themeGroup.add(box);

      const cap = new THREE.Mesh(
        new THREE.ConeGeometry(dw * 0.78, 0.9, 4),
        new THREE.MeshStandardMaterial({ color: roofCol, roughness: 0.7 })
      );
      cap.position.set(dx, baseY + dh + 0.45, dz);
      cap.rotation.y = Math.PI / 4;
      this.themeGroup.add(cap);

      // 건물 정면 창문 디테일
      for (const wy of [0.35, 0.7] as const) {
        const win = new THREE.Mesh(new THREE.PlaneGeometry(dw * 0.45, 0.36), winGlowMat);
        win.position.set(dx, baseY + dh * wy, dz + (dw * 0.9) / 2 + 0.02);
        this.themeGroup.add(win);
      }
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
    height = 0.75,
    borderColor = '#ffffff'
  ): THREE.Mesh | null {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 112;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = borderColor;
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
   * 캔버스 기반 세로형 목조 간판 생성 (あさひ食堂 / 미도상점 스타일)
   */
  private createVerticalSignBoard(
    text: string,
    bgHex: string,
    textColor = '#3b2416',
    width = 0.56,
    height = 1.7
  ): THREE.Mesh | null {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 384;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = bgHex;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#5c4028';
    ctx.lineWidth = 8;
    ctx.strokeRect(6, 6, canvas.width - 12, canvas.height - 12);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 46px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const chars = Array.from(text);
    const step = (canvas.height - 56) / Math.max(1, chars.length);
    chars.forEach((ch, idx) => {
      ctx.fillText(ch, canvas.width / 2, 34 + step * (idx + 0.5));
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    return new THREE.Mesh(
      new THREE.BoxGeometry(width, height, 0.08),
      new THREE.MeshBasicMaterial({ map: texture })
    );
  }

  /**
   * Lv.0 골목길 2층 목조·기와 지붕 상점 외관 + 출입구 포탈 생성
   */
  private createAlleyShopBuilding(opts: {
    portalId: string;
    interiorId: WorldInteriorId;
    portalLabel: string;
    side: 'left' | 'right';
    x: number;
    z: number;
    wallColor: number;
    trimColor: number;
    roofColor: number;
    awningColor: number;
    accentColor: number;
    signText: string;
    signBg: string;
    signTextColor: string;
    verticalSign: boolean;
    hasRoofCat?: 'tabby' | 'ginger';
  }) {
    const {
      portalId,
      interiorId,
      portalLabel,
      side,
      x,
      z,
      wallColor,
      trimColor,
      roofColor,
      awningColor,
      accentColor,
      signText,
      signBg,
      signTextColor,
      verticalSign,
      hasRoofCat
    } = opts;

    const frontWidth = 6.2; // 골목(Z축)을 따라 늘어선 정면 폭
    const depth = 5.4; // 건물 깊이
    const height = 5.4; // 2층 높이

    const group = new THREE.Group();
    group.position.set(x, 0, z);
    group.rotation.y = side === 'left' ? Math.PI / 2 : -Math.PI / 2;
    group.userData.portalId = portalId;

    const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.78 });
    const trimMat = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.65 });
    const roofMat = new THREE.MeshStandardMaterial({ color: roofColor, roughness: 0.58 });
    const warmGlowMat = new THREE.MeshStandardMaterial({
      color: 0xffefc9,
      emissive: 0xffbe66,
      emissiveIntensity: 0.65,
      roughness: 0.25
    });

    // 1. 2층 건물 본체
    const body = new THREE.Mesh(new THREE.BoxGeometry(frontWidth, height, depth), wallMat);
    body.position.y = height / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // 목재 기둥 & 층간 띠장
    for (const px of [-frontWidth / 2 + 0.14, 0, frontWidth / 2 - 0.14] as const) {
      const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.18, height, 0.14), trimMat);
      pillar.position.set(px, height / 2, depth / 2 + 0.03);
      group.add(pillar);
    }
    const midBeam = new THREE.Mesh(new THREE.BoxGeometry(frontWidth + 0.1, 0.22, 0.2), trimMat);
    midBeam.position.set(0, 3.05, depth / 2 + 0.06);
    group.add(midBeam);

    // 2. 1층 돌출 기와 처마 + 2층 경사 기와 지붕
    const eave = new THREE.Mesh(new THREE.BoxGeometry(frontWidth + 0.5, 0.22, 1.35), roofMat);
    eave.position.set(0, 2.78, depth / 2 + 0.52);
    eave.rotation.x = 0.24;
    eave.castShadow = true;
    group.add(eave);

    const upperRoof = new THREE.Mesh(new THREE.BoxGeometry(frontWidth + 0.7, 0.3, depth + 0.8), roofMat);
    upperRoof.position.set(0, height + 0.3, 0.1);
    upperRoof.rotation.x = 0.18;
    upperRoof.castShadow = true;
    group.add(upperRoof);

    const ridge = new THREE.Mesh(
      new THREE.BoxGeometry(frontWidth + 0.75, 0.26, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x3b4856, roughness: 0.5 })
    );
    ridge.position.set(0, height + 0.65, -0.4);
    group.add(ridge);

    // 3. 1층 격자 미닫이문 & 따뜻한 쇼윈도
    const frontZ = depth / 2 + 0.04;
    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(2.15, 2.25, 0.08), trimMat);
    doorFrame.position.set(-0.85, 1.125, frontZ);
    group.add(doorFrame);

    const doorGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 1.85), warmGlowMat);
    doorGlass.position.set(-0.85, 1.12, frontZ + 0.05);
    group.add(doorGlass);

    for (const gx of [-1.25, -0.85, -0.45] as const) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.85, 0.04), trimMat);
      bar.position.set(gx, 1.12, frontZ + 0.07);
      group.add(bar);
    }

    // 1층 오른쪽 큰 격자 창문 + 2층 창문 2개
    const win1Frame = new THREE.Mesh(new THREE.BoxGeometry(2.05, 1.55, 0.08), trimMat);
    win1Frame.position.set(1.5, 1.38, frontZ);
    group.add(win1Frame);
    const win1Glass = new THREE.Mesh(new THREE.PlaneGeometry(1.72, 1.25), warmGlowMat);
    win1Glass.position.set(1.5, 1.38, frontZ + 0.05);
    group.add(win1Glass);

    for (const wx of [-1.5, 1.5] as const) {
      const win2Frame = new THREE.Mesh(new THREE.BoxGeometry(1.65, 1.35, 0.08), trimMat);
      win2Frame.position.set(wx, 4.1, frontZ);
      group.add(win2Frame);
      const win2Glass = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 1.05), warmGlowMat);
      win2Glass.position.set(wx, 4.1, frontZ + 0.05);
      group.add(win2Glass);
    }

    // 4. 캔버스 어닝 & 벽등
    const awning = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 0.16, 0.95),
      new THREE.MeshStandardMaterial({ color: awningColor, roughness: 0.65 })
    );
    awning.position.set(-0.85, 2.38, depth / 2 + 0.45);
    awning.rotation.x = 0.25;
    group.add(awning);

    const lampHousing = new THREE.Mesh(
      new THREE.SphereGeometry(0.14, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffe4a0 })
    );
    lampHousing.position.set(0.45, 2.35, frontZ + 0.25);
    group.add(lampHousing);

    // 5. 돌출 간판 (세로 일본어/한국어 간판 또는 카페 가로 간판)
    if (verticalSign) {
      const vSign = this.createVerticalSignBoard(signText, signBg, signTextColor);
      if (vSign) {
        vSign.position.set(2.1, 3.65, frontZ + 0.55);
        vSign.rotation.y = Math.PI / 2;
        group.add(vSign);
      }
    } else {
      const hSign = this.createSignBoard(signText, signBg, signTextColor, 1.85, 0.68, '#5c4028');
      if (hSign) {
        hSign.position.set(0.95, 3.35, frontZ + 0.36);
        group.add(hSign);
      }
    }

    // 6. 기와 처마 위 낮잠 자는 고양이
    if (hasRoofCat) {
      const catColor = hasRoofCat === 'ginger' ? 0xd98a4e : 0xa5896b;
      const catMat = new THREE.MeshStandardMaterial({ color: catColor, roughness: 0.7 });
      const cat = new THREE.Group();
      cat.position.set(0.9, 3.05, depth / 2 + 0.48);
      const catBody = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), catMat);
      catBody.scale.set(1.3, 0.85, 0.9);
      cat.add(catBody);
      const catHead = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 10), catMat);
      catHead.position.set(-0.18, 0.14, 0.05);
      cat.add(catHead);
      for (const earZ of [-0.05, 0.05] as const) {
        const ear = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.08, 4), catMat);
        ear.position.set(-0.18, 0.25, 0.05 + earZ);
        cat.add(ear);
      }
      group.add(cat);
    }

    this.themeGroup.add(group);
    this.registerCollider(body, 0.25);
    this.portalClickTargets.push(group);

    // 7. 상점 앞 골목 가장자리 포탈 매트
    const matX = side === 'left' ? -2.45 : 2.45;
    const returnX = side === 'left' ? -1.15 : 1.15;
    const doorWorldZ = side === 'left' ? z - 0.85 : z + 0.85;
    this.createPortalMat({
      portal: {
        id: portalId,
        kind: 'enter',
        label: portalLabel,
        interiorId,
        position: [matX, 0, doorWorldZ],
        radius: 1.0,
        returnPosition: [returnX, 0, doorWorldZ]
      },
      color: accentColor,
      labelText: 'ENTER · 입장',
      labelBg: '#4a2e1b'
    });
  }

  /**
   * Lv.0 골목 전봇대 + 변압기 + 따뜻한 노란 가로등 생성
   */
  private createUtilityPoleWithLamp(x: number, z: number, facingDir: 1 | -1, withTransformer: boolean) {
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x8e969e, roughness: 0.75 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x3b434d, roughness: 0.6 });

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 7.6, 10), poleMat);
    pole.position.set(x, 3.8, z);
    pole.castShadow = true;
    this.themeGroup.add(pole);
    this.registerCollider(pole, 0.24);

    // 하단 노란·검정 안전 반사 띠
    const cautionBand = new THREE.Mesh(
      new THREE.CylinderGeometry(0.145, 0.145, 0.45, 10),
      new THREE.MeshStandardMaterial({ color: 0xe8b948, roughness: 0.5 })
    );
    cautionBand.position.set(x, 1.05, z);
    this.themeGroup.add(cautionBand);

    // 상단 완철(가로 지지대)
    const crossArm = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.08, 0.08), darkMat);
    crossArm.position.set(x, 6.95, z);
    this.themeGroup.add(crossArm);

    if (withTransformer) {
      const transformer = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.72, 12), poleMat);
      transformer.position.set(x + facingDir * 0.28, 5.55, z);
      transformer.castShadow = true;
      this.themeGroup.add(transformer);
    }

    // 따뜻한 가로등 암 & 등
    const lampArm = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.07, 0.07), darkMat);
    lampArm.position.set(x + facingDir * 0.46, 4.15, z);
    this.themeGroup.add(lampArm);

    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.16, 10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffe49e })
    );
    bulb.position.set(x + facingDir * 0.9, 4.08, z);
    bulb.scale.set(1.2, 0.6, 0.9);
    this.themeGroup.add(bulb);
  }

  /**
   * 전봇대 사이를 가로지르는 처진 전선줄(카테너리 곡선)
   */
  private createAlleyPowerLines(poles: [number, number, 1 | -1][]) {
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x2c333b });
    const addWire = (p1: [number, number, number], p2: [number, number, number], sag: number) => {
      const mid: [number, number, number] = [
        (p1[0] + p2[0]) / 2,
        (p1[1] + p2[1]) / 2 - sag,
        (p1[2] + p2[2]) / 2
      ];
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(...p1),
        new THREE.Vector3(...mid),
        new THREE.Vector3(...p2)
      ]);
      const wire = new THREE.Mesh(new THREE.TubeGeometry(curve, 12, 0.015, 4, false), wireMat);
      this.themeGroup.add(wire);
    };

    for (let i = 0; i < poles.length - 1; i++) {
      const [x1, z1] = poles[i];
      const [x2, z2] = poles[i + 1];
      addWire([x1, 6.95, z1], [x2, 6.95, z2], 0.42);
      addWire([x1 * 0.86, 6.9, z1], [x2 * 0.86, 6.9, z2], 0.55);
      addWire([x1, 6.25, z1], [x2, 6.25, z2], 0.35);
    }
    // 골목을 가로지르는 인입선
    addWire([-2.95, 6.8, 1.9], [3.5, 5.2, 0.2], 0.38);
    addWire([2.95, 6.8, -4.8], [-3.5, 5.2, -3.2], 0.36);
  }

  /**
   * Lv.0 골목 생활감 소품 (자전거, 자판기, 빨간 우체통, 수국/화분, 나무 울타리, 입간판)
   */
  private createAlleyLifestyleProps() {
    const woodMat = new THREE.MeshStandardMaterial({ color: 0xb78456, roughness: 0.78 });
    const potMat = new THREE.MeshStandardMaterial({ color: 0xb86646, roughness: 0.7 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x6c9c5e, roughness: 0.75 });

    // 1. 앞쪽·건물 사이·해안가 쪽 좌·우 나무 울타리 & 조경 (틈새 이탈 및 공허한 배경 노출 방지)
    for (const sideX of [-3.35, 3.35] as const) {
      const frontFence = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.15, 5.6), woodMat);
      frontFence.position.set(sideX, 0.575, 4.8);
      frontFence.castShadow = true;
      this.themeGroup.add(frontFence);

      const midFence = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.35, 1.8), woodMat);
      midFence.position.set(sideX, 0.675, -4.9);
      midFence.castShadow = true;
      this.themeGroup.add(midFence);

      const hedge = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.85, 1.5), leafMat);
      hedge.position.set(sideX - Math.sign(sideX) * 0.15, 0.425, -4.9);
      this.themeGroup.add(hedge);
    }
    const rightNorthFence = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.0, 4.9), woodMat);
    rightNorthFence.position.set(3.35, 0.5, -14.25);
    this.themeGroup.add(rightNorthFence);
    const leftNorthFence = new THREE.Mesh(new THREE.BoxGeometry(0.14, 1.0, 1.8), woodMat);
    leftNorthFence.position.set(-3.35, 0.5, -12.6);
    this.themeGroup.add(leftNorthFence);

    // 2. 오른쪽 앞 돌계단 + 수국 & 꽃 화분
    const flowerPositions: [number, number, number][] = [
      [2.95, 3.3, 0x8db3e2], // 하늘색 수국
      [2.95, 4.0, 0xd88ca4], // 분홍 꽃
      [-3.05, 4.1, 0x72a663], // 좌측 잎사귀 화분
      [2.95, -5.6, 0x99b8e6]
    ];
    flowerPositions.forEach(([fx, fz, bloomCol]) => {
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.32, 10), potMat);
      pot.position.set(fx, 0.16, fz);
      pot.castShadow = true;
      this.themeGroup.add(pot);

      const bush = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 8), leafMat);
      bush.position.set(fx, 0.42, fz);
      this.themeGroup.add(bush);

      const bloom = new THREE.Mesh(
        new THREE.SphereGeometry(0.17, 10, 8),
        new THREE.MeshStandardMaterial({ color: bloomCol, roughness: 0.65 })
      );
      bloom.position.set(fx - 0.05, 0.56, fz);
      this.themeGroup.add(bloom);
    });

    // 3. 왼쪽 앞 바구니 달린 레트로 자전거
    const bike = new THREE.Group();
    bike.position.set(-2.85, 0, 2.85);
    bike.rotation.y = 0.25;
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x6ea0b5, roughness: 0.5 });
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x333940, roughness: 0.7 });
    for (const wz of [-0.4, 0.4] as const) {
      const wheel = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.035, 8, 18), tireMat);
      wheel.position.set(0, 0.27, wz);
      wheel.rotation.y = Math.PI / 2;
      bike.add(wheel);
    }
    const bikeBody = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.45, 0.85), frameMat);
    bikeBody.position.set(0, 0.52, 0);
    bike.add(bikeBody);
    const basket = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.22, 0.28),
      new THREE.MeshStandardMaterial({ color: 0xc28e5c, roughness: 0.75 })
    );
    basket.position.set(0, 0.75, 0.36);
    bike.add(basket);
    this.themeGroup.add(bike);
    this.registerCollider(bike, 0.12);

    // 4. 오른쪽 자판기 2대 + 빨간 우체통
    const machines: [number, number, number][] = [
      [3.02, 2.0, 0xe8eff5], // 흰색/하늘 자판기
      [3.02, 2.85, 0xd96150] // 빨강/주황 자판기
    ];
    machines.forEach(([mx, mz, col]) => {
      const vm = new THREE.Group();
      vm.position.set(mx, 0, mz);
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 1.75, 0.78),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.45 })
      );
      body.position.y = 0.875;
      body.castShadow = true;
      vm.add(body);
      const display = new THREE.Mesh(
        new THREE.PlaneGeometry(0.6, 0.82),
        new THREE.MeshStandardMaterial({ color: 0xfefefe, emissive: 0xfff3d1, emissiveIntensity: 0.45 })
      );
      display.position.set(-0.36, 1.08, 0);
      display.rotation.y = -Math.PI / 2;
      vm.add(display);
      this.themeGroup.add(vm);
      this.registerCollider(vm, 0.12);
    });

    const postbox = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.48, 0.3),
      new THREE.MeshStandardMaterial({ color: 0xc94238, roughness: 0.45 })
    );
    postbox.position.set(3.25, 1.15, 1.35);
    this.themeGroup.add(postbox);

    // 5. 식당 앞 나무 A형 입간판
    const aSign = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.78, 0.48), woodMat);
    aSign.position.set(-2.82, 0.39, 0.6);
    this.themeGroup.add(aSign);
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
        bannerText: '☕ カフェ こもれび (카페)',
        bannerBg: '#fff8ec',
        bannerTextColor: '#3f2a1d',
        bannerBorderColor: '#5c4028',
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
        bannerText: '🍜 あさひ食堂 (식당)',
        bannerBg: '#f6ead9',
        bannerTextColor: '#4a2e1b',
        bannerBorderColor: '#5c4028',
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
        bannerText: '🏪 こもれび商店 (편의점)',
        bannerBg: '#eef6ff',
        bannerTextColor: '#1e4268',
        bannerBorderColor: '#3b5978',
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
      bannerText: '🎁 미도상점 (기념품 상점)',
      bannerBg: '#fff7eb',
      bannerTextColor: '#4e2f1d',
      bannerBorderColor: '#5c4028',
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
    bannerTextColor?: string;
    bannerBorderColor?: string;
    exitColor: number;
  }) {
    const {
      floorColor,
      wallColor,
      trimColor,
      lightColor,
      lightIntensity,
      bannerText,
      bannerBg,
      bannerTextColor = '#ffffff',
      bannerBorderColor = '#ffffff',
      exitColor
    } = opts;
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

    // 뒷벽 상단 장소 배너 (야외 건물 간판과 이름·톤 통일)
    const banner = this.createSignBoard(
      bannerText,
      bannerBg,
      bannerTextColor,
      4.8,
      0.9,
      bannerBorderColor
    );
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

      // 1. 발밑 원형 그림자 (도로·바닥·횡단보도(0.01~0.02)보다 위 계층에 배치해 Z-fighting 방지)
      const shadowGeo = new THREE.CircleGeometry(0.55, 24);
      const shadowMat = new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1
      });
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.position.y = 0.035;
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

