import * as THREE from 'three';
import { WorldNpcData } from './types';

export class CharacterController {
  public playerGroup: THREE.Group;
  public camera: THREE.PerspectiveCamera;
  private targetPosition: THREE.Vector3 | null = null;
  private moveSpeed = 4.5;
  private targetRing: THREE.Mesh;
  private isBowing = false;
  private bowTimer = 0;

  // 3인칭 카메라 궤도 제어 변수
  public cameraDistance = 7;
  public cameraAzimuth = 0; // 수평 각도
  public cameraPolar = 0.5; // 수직 각도 (라디안)
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;

  // 시네마틱 대화 모드 변수
  public isDialogueMode = false;
  private dialogueTargetPos: THREE.Vector3 | null = null;

  // 키보드 입력 상태 (WASD 및 화살표 방향키)
  public keys = {
    forward: false,
    backward: false,
    left: false,
    right: false
  };

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.playerGroup = new THREE.Group();
    this.playerGroup.position.set(0, 0, 4);

    // 1. 아바타 3D 모델 생성 (따뜻한 노란 가사/배낭을 맨 귀여운 여행자/동자승 스타일)
    this.buildAvatar();

    // 2. 바닥 클릭 타겟 링 (클릭한 지점에 퍼지는 링)
    const ringGeo = new THREE.RingGeometry(0.2, 0.35, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe07a5f,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0
    });
    this.targetRing = new THREE.Mesh(ringGeo, ringMat);
    this.targetRing.rotation.x = -Math.PI / 2;
    this.targetRing.position.y = 0.03;
  }

  private buildAvatar() {
    // 몸체 (하늘색/회색 승복/여행자 옷)
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.4, 0.85, 16),
      new THREE.MeshStandardMaterial({ color: 0x81e6d9, roughness: 0.6 })
    );
    body.position.y = 0.7;
    body.castShadow = true;
    body.name = 'body';
    this.playerGroup.add(body);

    // 노란 배낭/가사 (산사 동자승 오마주)
    const backpack = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.45, 0.2),
      new THREE.MeshStandardMaterial({ color: 0xf6ad55, roughness: 0.5 })
    );
    backpack.position.set(0, 0.75, -0.32);
    backpack.castShadow = true;
    this.playerGroup.add(backpack);

    // 머리
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffe2c4, roughness: 0.5 })
    );
    head.position.y = 1.35;
    head.castShadow = true;
    head.name = 'head';
    this.playerGroup.add(head);

    // 눈 2개
    const eyeGeo = new THREE.SphereGeometry(0.04, 8, 8);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111111 });
    const leftEye = new THREE.Mesh(eyeGeo, eyeMat);
    leftEye.position.set(-0.11, 1.38, 0.32);
    const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
    rightEye.position.set(0.11, 1.38, 0.32);
    this.playerGroup.add(leftEye, rightEye);

    // 발 (좌/우)
    const footGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const footMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const leftFoot = new THREE.Mesh(footGeo, footMat);
    leftFoot.position.set(-0.18, 0.12, 0);
    leftFoot.scale.set(1, 0.6, 1.5);
    leftFoot.name = 'leftFoot';

    const rightFoot = new THREE.Mesh(footGeo, footMat);
    rightFoot.position.set(0.18, 0.12, 0);
    rightFoot.scale.set(1, 0.6, 1.5);
    rightFoot.name = 'rightFoot';

    this.playerGroup.add(leftFoot, rightFoot);
  }

  public getTargetRing(): THREE.Mesh {
    return this.targetRing;
  }

  /**
   * 바닥 클릭 시 이동 지점 지정
   */
  public moveTo(point: THREE.Vector3) {
    this.targetPosition = point.clone();
    this.targetPosition.y = 0;

    // 타겟 링 표시
    this.targetRing.position.set(point.x, 0.03, point.z);
    (this.targetRing.material as THREE.MeshBasicMaterial).opacity = 0.8;
  }

  /**
   * '인사하기 (お辞儀)' 모션 트리거
   */
  public triggerBow() {
    this.isBowing = true;
    this.bowTimer = 0;
  }

  /**
   * 시네마틱 대화 모드 시작 (NPC 바라보기 및 카메라 클로즈업)
   */
  public startDialogue(npcPos: [number, number, number]) {
    this.isDialogueMode = true;
    this.dialogueTargetPos = new THREE.Vector3(...npcPos);
    this.targetPosition = null;

    // 플레이어가 NPC를 바라보도록 회전
    const dir = this.dialogueTargetPos.clone().sub(this.playerGroup.position);
    dir.y = 0;
    if (dir.lengthSq() > 0.01) {
      this.playerGroup.rotation.y = Math.atan2(dir.x, dir.z);
    }
  }

  /**
   * 대화 모드 종료 (원래 3인칭 시점으로 복귀)
   */
  public endDialogue() {
    this.isDialogueMode = false;
    this.dialogueTargetPos = null;
  }

  /**
   * 마우스/터치 드래그로 카메라 궤도 회전
   */
  public onPointerDown(clientX: number, clientY: number) {
    this.isDragging = true;
    this.lastMouseX = clientX;
    this.lastMouseY = clientY;
  }

  public onPointerMove(clientX: number, clientY: number) {
    if (!this.isDragging) return;
    const deltaX = clientX - this.lastMouseX;
    const deltaY = clientY - this.lastMouseY;
    this.lastMouseX = clientX;
    this.lastMouseY = clientY;

    this.cameraAzimuth -= deltaX * 0.006;
    this.cameraPolar = Math.max(0.1, Math.min(Math.PI / 2 - 0.05, this.cameraPolar + deltaY * 0.006));
  }

  public onPointerUp() {
    this.isDragging = false;
  }

  public onWheel(deltaY: number) {
    this.cameraDistance = Math.max(3.5, Math.min(15, this.cameraDistance + deltaY * 0.005));
  }

  /**
   * 키보드 누름 처리 (WASD / 방향키)
   */
  public onKeyDown(code: string) {
    if (code === 'KeyW' || code === 'ArrowUp') this.keys.forward = true;
    if (code === 'KeyS' || code === 'ArrowDown') this.keys.backward = true;
    if (code === 'KeyA' || code === 'ArrowLeft') this.keys.left = true;
    if (code === 'KeyD' || code === 'ArrowRight') this.keys.right = true;
  }

  /**
   * 키보드 뗌 처리
   */
  public onKeyUp(code: string) {
    if (code === 'KeyW' || code === 'ArrowUp') this.keys.forward = false;
    if (code === 'KeyS' || code === 'ArrowDown') this.keys.backward = false;
    if (code === 'KeyA' || code === 'ArrowLeft') this.keys.left = false;
    if (code === 'KeyD' || code === 'ArrowRight') this.keys.right = false;
  }

  /**
   * 매 프레임 업데이트
   */
  public update(delta: number, elapsedTime: number) {
    // 1. 인사 모션 처리
    if (this.isBowing) {
      this.bowTimer += delta;
      const progress = Math.min(1, this.bowTimer / 1.2);
      const angle = Math.sin(progress * Math.PI) * 0.45; // 약 25도 고개 숙임
      this.playerGroup.rotation.x = angle;
      if (progress >= 1) {
        this.isBowing = false;
        this.playerGroup.rotation.x = 0;
      }
    }

    // 2. 이동 및 회전 처리 (키보드 WASD/방향키 또는 마우스 클릭)
    let isMoving = false;
    const hasKeyInput = this.keys.forward || this.keys.backward || this.keys.left || this.keys.right;

    if (hasKeyInput) {
      // 키보드 조작 시 기존 마우스 클릭 타겟 해제
      this.targetPosition = null;

      // 카메라 수평 각도(Azimuth) 기준 전방/우측 벡터 산출
      const forwardDir = new THREE.Vector3(-Math.sin(this.cameraAzimuth), 0, -Math.cos(this.cameraAzimuth));
      const rightDir = new THREE.Vector3(Math.cos(this.cameraAzimuth), 0, -Math.sin(this.cameraAzimuth));
      const moveDir = new THREE.Vector3(0, 0, 0);

      if (this.keys.forward) moveDir.add(forwardDir);
      if (this.keys.backward) moveDir.sub(forwardDir);
      if (this.keys.right) moveDir.add(rightDir);
      if (this.keys.left) moveDir.sub(rightDir);

      if (moveDir.lengthSq() > 0) {
        isMoving = true;
        moveDir.normalize();
        this.playerGroup.position.addScaledVector(moveDir, this.moveSpeed * delta);

        // 맵 이탈 방지 경계 클램핑 (-25 ~ 25)
        this.playerGroup.position.x = Math.max(-25, Math.min(25, this.playerGroup.position.x));
        this.playerGroup.position.z = Math.max(-25, Math.min(25, this.playerGroup.position.z));

        // 이동 방향으로 부드럽게 회전
        const targetAngle = Math.atan2(moveDir.x, moveDir.z);
        this.playerGroup.rotation.y = THREE.MathUtils.lerp(this.playerGroup.rotation.y, targetAngle, 0.2);

        // 통통 튀는 걸음걸이 바운스
        this.playerGroup.position.y = Math.abs(Math.sin(elapsedTime * 12)) * 0.1;
      }
    } else if (this.targetPosition) {
      // 마우스/터치 클릭 지점 이동 처리
      const distance = this.playerGroup.position.distanceTo(this.targetPosition);

      if (distance > 0.15) {
        isMoving = true;
        const dir = this.targetPosition.clone().sub(this.playerGroup.position).normalize();
        this.playerGroup.position.addScaledVector(dir, this.moveSpeed * delta);

        const targetAngle = Math.atan2(dir.x, dir.z);
        this.playerGroup.rotation.y = THREE.MathUtils.lerp(this.playerGroup.rotation.y, targetAngle, 0.15);
        this.playerGroup.position.y = Math.abs(Math.sin(elapsedTime * 12)) * 0.1;
      } else {
        this.targetPosition = null;
        this.playerGroup.position.y = 0;
      }
    }

    if (!isMoving) {
      this.playerGroup.position.y = 0;
    }

    // 타겟 링 서서히 페이드아웃
    const ringMat = this.targetRing.material as THREE.MeshBasicMaterial;
    if (ringMat.opacity > 0 && !isMoving) {
      ringMat.opacity = Math.max(0, ringMat.opacity - delta * 2.5);
    }

    // 3. 카메라 업데이트 (시네마틱 대화 줌인 vs 일반 3인칭 추적)
    if (this.isDialogueMode && this.dialogueTargetPos) {
      // 대화 중: 플레이어와 NPC가 한 화면에 예쁘게 담기는 시네마틱 측면 미디엄 샷
      const mid = this.playerGroup.position.clone().add(this.dialogueTargetPos).multiplyScalar(0.5);
      const pToN = this.dialogueTargetPos.clone().sub(this.playerGroup.position).normalize();
      const side = new THREE.Vector3(-pToN.z, 0, pToN.x).normalize();

      const camTargetPos = mid.clone()
        .addScaledVector(side, 2.5)
        .add(new THREE.Vector3(0, 1.35, 0))
        .addScaledVector(pToN, -0.8);

      this.camera.position.lerp(camTargetPos, 0.08);
      this.camera.lookAt(mid.clone().add(new THREE.Vector3(0, 1.05, 0)));
    } else {
      // 일반 탐색 중: 3인칭 궤도 추적
      const targetLookAt = this.playerGroup.position.clone().add(new THREE.Vector3(0, 1.2, 0));
      const camX = this.playerGroup.position.x + this.cameraDistance * Math.sin(this.cameraPolar) * Math.sin(this.cameraAzimuth);
      const camY = this.playerGroup.position.y + this.cameraDistance * Math.cos(this.cameraPolar);
      const camZ = this.playerGroup.position.z + this.cameraDistance * Math.sin(this.cameraPolar) * Math.cos(this.cameraAzimuth);

      this.camera.position.lerp(new THREE.Vector3(camX, camY, camZ), 0.12);
      this.camera.lookAt(targetLookAt);
    }
  }

  /**
   * 근접한 NPC 감지 (거리 2.5m 이내)
   */
  public checkNearbyNpc(npcs: { mesh: THREE.Group; data: WorldNpcData }[]): WorldNpcData | null {
    const playerPos = this.playerGroup.position;
    for (const { mesh, data } of npcs) {
      const dist = playerPos.distanceTo(mesh.position);
      if (dist <= 2.6) {
        return data;
      }
    }
    return null;
  }

  public dispose() {
    this.playerGroup.traverse((child) => {
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

