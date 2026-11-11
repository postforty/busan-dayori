import * as THREE from 'three';
import { WorldThemeLevel, WorldNpcData } from './types';
import { WORLD_THEMES, getLevelNpcs } from './worldData';

export class WorldSceneManager {
  public scene: THREE.Scene;
  public groundPlane: THREE.Mesh;
  public interactableNpcs: { mesh: THREE.Group; data: WorldNpcData }[] = [];
  private themeGroup: THREE.Group;
  private currentLevel: WorldThemeLevel = 'level1';
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
    this.loadTheme('level1');
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
    if (level === 'level1') {
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
    while (this.themeGroup.children.length > 0) {
      const child = this.themeGroup.children[0];
      this.themeGroup.remove(child);
      this.disposeObject(child);
    }
    this.interactableNpcs = [];
  }

  /**
   * Lv.1 도쿄 골목길 & 편의점 씬
   */
  private buildLevel1Town() {
    // 도로 아스팔트 & 횡단보도
    const road = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 30),
      new THREE.MeshStandardMaterial({ color: 0x4a5568, roughness: 0.9 })
    );
    road.rotation.x = -Math.PI / 2;
    road.position.set(0, 0.01, 0);
    road.receiveShadow = true;
    this.themeGroup.add(road);

    // 횡단보도 줄무늬
    for (let i = -10; i <= 10; i += 3) {
      const stripe = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 1),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 })
      );
      stripe.rotation.x = -Math.PI / 2;
      stripe.position.set(0, 0.02, i);
      this.themeGroup.add(stripe);
    }

    // 편의점 건물 (좌측)
    const konbini = this.createBuilding(10, 5, 8, 0xffffff, 0x3182ce, '🏪 LAWSON / 7-ELEVEN');
    konbini.position.set(-9, 2.5, -6);
    this.themeGroup.add(konbini);

    // 전철역 입구 건물 (우측)
    const station = this.createBuilding(10, 6, 8, 0xedf2f7, 0x38a169, '🚉 駅 STATION');
    station.position.set(9, 3, -6);
    this.themeGroup.add(station);

    // 빨간 자판기 (우측 인도)
    const vendingMachine = this.createVendingMachine(0xe53e3e);
    vendingMachine.position.set(4.5, 0, -2);
    this.themeGroup.add(vendingMachine);

    // 파란 자판기 (좌측 인도)
    const vendingMachine2 = this.createVendingMachine(0x3182ce);
    vendingMachine2.position.set(-4.5, 0, -2);
    this.themeGroup.add(vendingMachine2);

    // 가로등 배치
    this.createStreetLamp(-4.5, 1);
    this.createStreetLamp(4.5, 1);
    this.createStreetLamp(-4.5, -10);
    this.createStreetLamp(4.5, -10);
  }

  /**
   * Lv.2 교토 카페 & 식당 골목 씬
   */
  private buildLevel2Cafe() {
    // 벽돌길 보도블록
    const brickRoad = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 30),
      new THREE.MeshStandardMaterial({ color: 0x8c786a, roughness: 0.9 })
    );
    brickRoad.rotation.x = -Math.PI / 2;
    brickRoad.position.set(0, 0.01, 0);
    brickRoad.receiveShadow = true;
    this.themeGroup.add(brickRoad);

    // 카페 건물 (목조 느낌)
    const cafe = this.createBuilding(9, 5, 8, 0xebd7c1, 0x7b341e, '☕ CAFE KYOTO');
    cafe.position.set(-8.5, 2.5, -5.5);
    this.themeGroup.add(cafe);

    // 라멘집 건물
    const ramenShop = this.createBuilding(9, 5, 8, 0xedd5b3, 0xc53030, '🍜 ラーメン 一福');
    ramenShop.position.set(8.5, 2.5, -5.5);
    this.themeGroup.add(ramenShop);

    // 야외 카페 테이블 & 의자
    this.createCafeTable(-3.5, -1);
    this.createCafeTable(-3.5, 3);

    // 벚꽃 나무 (작은 데코)
    this.createSakuraTree(5.5, 0);
    this.createSakuraTree(-5.5, 6);
  }

  /**
   * Lv.3 이자카야 & 축제(마츠리) 밤거리 씬
   */
  private buildLevel3Izakaya() {
    // 짙은 돌길
    const stonePath = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 30),
      new THREE.MeshStandardMaterial({ color: 0x2d3748, roughness: 0.8 })
    );
    stonePath.rotation.x = -Math.PI / 2;
    stonePath.position.set(0, 0.01, 0);
    this.themeGroup.add(stonePath);

    // 이자카야 건물 (어두운 목조)
    const izakaya = this.createBuilding(9, 5, 8, 0x3d312a, 0xdd6b20, '🏮 居酒屋 錦');
    izakaya.position.set(-8.5, 2.5, -6);
    this.themeGroup.add(izakaya);

    // 포장마차 (야타이)
    const yatai = this.createYatai(3, -5);
    this.themeGroup.add(yatai);

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
   * NPC 아바타 생성 및 배치
   */
  private spawnNpcs(level: WorldThemeLevel) {
    const npcs = getLevelNpcs(level);

    npcs.forEach((npcData) => {
      const npcGroup = new THREE.Group();
      npcGroup.position.set(...npcData.position);
      npcGroup.name = npcData.id;

      // 1. 몸체 (둥근 캡슐 / 실린더)
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.35, 0.45, 0.9, 16),
        new THREE.MeshStandardMaterial({ color: npcData.color, roughness: 0.5 })
      );
      body.position.y = 0.75;
      body.castShadow = true;
      npcGroup.add(body);

      // 2. 머리
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.38, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xffe2c4, roughness: 0.6 })
      );
      head.position.y = 1.4;
      head.castShadow = true;
      npcGroup.add(head);

      // 3. 눈 (2개)
      const eyeGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
      const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
      leftEye.position.set(-0.12, 1.42, 0.35);
      const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
      rightEye.position.set(0.12, 1.42, 0.35);
      npcGroup.add(leftEye, rightEye);

      // 4. 머리 위 통통 튀는 말풍선 인터랙션 인디케이터 (보석/풍선)
      const bubble = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.22, 0),
        new THREE.MeshStandardMaterial({
          color: 0xffb703,
          emissive: 0xffb703,
          emissiveIntensity: 0.6
        })
      );
      bubble.position.y = 2.15;
      bubble.name = 'indicator';
      npcGroup.add(bubble);

      // 씬에 추가 및 레이캐스팅 대상에 등록
      this.themeGroup.add(npcGroup);
      this.interactableNpcs.push({ mesh: npcGroup, data: npcData });
    });
  }

  /**
   * 프레임 애니메이션 (말풍선 회전/바운스)
   */
  public update(delta: number, elapsedTime: number) {
    this.interactableNpcs.forEach(({ mesh }) => {
      const indicator = mesh.getObjectByName('indicator');
      if (indicator) {
        indicator.rotation.y += delta * 2;
        indicator.position.y = 2.15 + Math.sin(elapsedTime * 4) * 0.08;
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
            mesh.material.forEach((mat) => mat.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      }
    });
  }
}

