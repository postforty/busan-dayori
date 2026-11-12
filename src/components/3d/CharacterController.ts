import * as THREE from 'three';
import { WorldNpcData } from './types';
import { loadAnimatedCharacter, CharacterRigHandle } from './modelLoader';

export class CharacterController {
  public playerGroup: THREE.Group;
  public camera: THREE.PerspectiveCamera;
  private targetPosition: THREE.Vector3 | null = null;
  private moveSpeed = 4.5;
  private targetRing: THREE.Mesh;
  private rigHandle: CharacterRigHandle | null = null;
  private isInteracting = false;
  private interactTimer = 0;

  private static readonly DEFAULT_CAMERA_DISTANCE = 5.6;
  private static readonly DEFAULT_CAMERA_AZIMUTH = 0;
  private static readonly DEFAULT_CAMERA_POLAR = 1.07;
  private static readonly DIALOGUE_CAM_DISTANCE = 2.95;
  private static readonly DIALOGUE_CAM_HEIGHT = 1.45;
  private static readonly DIALOGUE_LOOKAT_HEIGHT = 1.05;

  // 3인칭 카메라 궤도 제어 변수
  public cameraDistance = CharacterController.DEFAULT_CAMERA_DISTANCE;
  public cameraAzimuth = CharacterController.DEFAULT_CAMERA_AZIMUTH; // 수평 각도
  public cameraPolar = CharacterController.DEFAULT_CAMERA_POLAR; // 수직 각도 (라디안)
  private isDragging = false;
  private lastMouseX = 0;
  private lastMouseY = 0;

  // 시네마틱 대화 모드 변수
  public isDialogueMode = false;
  private dialogueTargetPos: THREE.Vector3 | null = null;
  private dialogueCamDir: THREE.Vector3 | null = null;

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

    // 1. 발밑 원형 그림자 먼저 생성
    const shadowGeo = new THREE.CircleGeometry(0.55, 24);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.22
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.015;
    this.playerGroup.add(shadow);

    // 2. 귀여운 3D 카툰 캐릭터 모델 비동기 로드 (Protagonist_B - 남성 학습자)
    loadAnimatedCharacter('/models/player.glb', 1.85)
      .then((handle) => {
        this.rigHandle = handle;
        this.playerGroup.add(handle.model);
      })
      .catch((err) => {
        console.error('플레이어 3D 모델 로드 실패:', err);
      });

    // 3. 바닥 클릭 타겟 링 (클릭한 지점에 퍼지는 링)
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

    // 4. 초기 시점을 정면 3인칭 구도로 즉시 설정
    const initialCam = this.getThirdPersonCameraTarget();
    this.camera.position.copy(initialCam.position);
    this.camera.lookAt(initialCam.lookAt);
  }

  /**
   * 3인칭 카메라 목표 위치 및 주시점 계산
   */
  private getThirdPersonCameraTarget(): { position: THREE.Vector3; lookAt: THREE.Vector3 } {
    const lookAt = this.playerGroup.position.clone().add(new THREE.Vector3(0, 1.2, 0));
    const camX = this.playerGroup.position.x + this.cameraDistance * Math.sin(this.cameraPolar) * Math.sin(this.cameraAzimuth);
    const camY = this.playerGroup.position.y + this.cameraDistance * Math.cos(this.cameraPolar);
    const camZ = this.playerGroup.position.z + this.cameraDistance * Math.sin(this.cameraPolar) * Math.cos(this.cameraAzimuth);
    return {
      position: new THREE.Vector3(camX, camY, camZ),
      lookAt
    };
  }

  /**
   * 카메라를 기본 시작 시점(정면 구도)으로 초기화
   */
  public resetCamera() {
    this.cameraAzimuth = CharacterController.DEFAULT_CAMERA_AZIMUTH;
    this.cameraPolar = CharacterController.DEFAULT_CAMERA_POLAR;
    this.cameraDistance = CharacterController.DEFAULT_CAMERA_DISTANCE;
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
   * '인사하기 (お辞儀)' 애니메이션 트리거
   */
  public triggerBow() {
    this.isInteracting = true;
    this.interactTimer = 0;
    if (this.rigHandle) {
      this.rigHandle.playAction('interact', 0.15);
    }
  }

  /**
   * 시네마틱 대화 모드 시작 (상대 NPC 정면 얼굴 클로즈업)
   */
  public startDialogue(npcPos: [number, number, number], colliders: THREE.Box3[] = []): THREE.Vector3 {
    this.isDialogueMode = true;
    this.dialogueTargetPos = new THREE.Vector3(...npcPos);
    this.targetPosition = null;

    // 플레이어가 NPC를 바라보도록 회전
    const playerToNpc = this.dialogueTargetPos.clone().sub(this.playerGroup.position);
    playerToNpc.y = 0;
    if (playerToNpc.lengthSq() > 0.01) {
      this.playerGroup.rotation.y = Math.atan2(playerToNpc.x, playerToNpc.z);
    }

    // NPC → 플레이어 방향을 기본 카메라 정면 방향으로 잡고, 건물 충돌 시 개방 방향(남쪽)으로 폴백
    const npcToPlayer = this.playerGroup.position.clone().sub(this.dialogueTargetPos);
    npcToPlayer.y = 0;
    const candidateDir =
      npcToPlayer.lengthSq() > 0.01 ? npcToPlayer.normalize() : new THREE.Vector3(0, 0, 1);

    const candidateCamPos = this.dialogueTargetPos
      .clone()
      .addScaledVector(candidateDir, CharacterController.DIALOGUE_CAM_DISTANCE);
    candidateCamPos.y = CharacterController.DIALOGUE_CAM_HEIGHT;

    const hitsCollider = colliders.some((box) => box.containsPoint(candidateCamPos));
    this.dialogueCamDir = hitsCollider ? new THREE.Vector3(0, 0, 1) : candidateDir;

    // 클로즈업 시야를 가리지 않도록 대화 중에는 플레이어 캐릭터를 숨김
    this.playerGroup.visible = false;

    return this.dialogueTargetPos
      .clone()
      .addScaledVector(this.dialogueCamDir, CharacterController.DIALOGUE_CAM_DISTANCE);
  }

  /**
   * 대화 모드 종료 (원래 3인칭 시점으로 복귀)
   */
  public endDialogue() {
    this.isDialogueMode = false;
    this.dialogueTargetPos = null;
    this.dialogueCamDir = null;
    this.playerGroup.visible = true;
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
  private isColliding(
    pos: THREE.Vector3,
    colliders: THREE.Box3[],
    npcs: { mesh: THREE.Group }[]
  ): boolean {
    const testPoint = new THREE.Vector3(pos.x, 0.5, pos.z);
    for (const box of colliders) {
      if (box.containsPoint(testPoint)) return true;
    }
    for (const npc of npcs) {
      const dx = pos.x - npc.mesh.position.x;
      const dz = pos.z - npc.mesh.position.z;
      if (dx * dx + dz * dz < 0.85 * 0.85) return true;
    }
    return false;
  }

  private tryMoveWithSlide(
    dx: number,
    dz: number,
    colliders: THREE.Box3[],
    npcs: { mesh: THREE.Group }[]
  ): boolean {
    const startX = this.playerGroup.position.x;
    const startZ = this.playerGroup.position.z;

    const nextX = Math.max(-25, Math.min(25, startX + dx));
    if (!this.isColliding(new THREE.Vector3(nextX, 0, startZ), colliders, npcs)) {
      this.playerGroup.position.x = nextX;
    }

    const nextZ = Math.max(-25, Math.min(25, startZ + dz));
    if (!this.isColliding(new THREE.Vector3(this.playerGroup.position.x, 0, nextZ), colliders, npcs)) {
      this.playerGroup.position.z = nextZ;
    }

    return (
      Math.abs(this.playerGroup.position.x - startX) > 1e-4 ||
      Math.abs(this.playerGroup.position.z - startZ) > 1e-4
    );
  }

  public update(
    delta: number,
    _elapsedTime: number,
    colliders: THREE.Box3[] = [],
    npcs: { mesh: THREE.Group }[] = []
  ) {
    // 1. 스켈레탈 애니메이션 믹서 업데이트
    if (this.rigHandle) {
      this.rigHandle.update(delta);
    }

    if (this.isInteracting) {
      this.interactTimer += delta;
      if (this.interactTimer > 1.2) {
        this.isInteracting = false;
      }
    }

    const stepDistance = this.moveSpeed * Math.min(delta, 0.1);

    // 2. 이동 및 회전 처리 (키보드 WASD/방향키 또는 마우스 클릭)
    let isMoving = false;
    const hasKeyInput = this.keys.forward || this.keys.backward || this.keys.left || this.keys.right;

    if (hasKeyInput) {
      this.targetPosition = null;
      this.isInteracting = false;

      const forwardDir = new THREE.Vector3(-Math.sin(this.cameraAzimuth), 0, -Math.cos(this.cameraAzimuth));
      const rightDir = new THREE.Vector3(Math.cos(this.cameraAzimuth), 0, -Math.sin(this.cameraAzimuth));
      const moveDir = new THREE.Vector3(0, 0, 0);

      if (this.keys.forward) moveDir.add(forwardDir);
      if (this.keys.backward) moveDir.sub(forwardDir);
      if (this.keys.right) moveDir.add(rightDir);
      if (this.keys.left) moveDir.sub(rightDir);

      if (moveDir.lengthSq() > 0) {
        moveDir.normalize();
        isMoving = this.tryMoveWithSlide(
          moveDir.x * stepDistance,
          moveDir.z * stepDistance,
          colliders,
          npcs
        );

        // 이동 방향으로 부드럽게 몸체 회전
        const targetAngle = Math.atan2(moveDir.x, moveDir.z);
        this.playerGroup.rotation.y = this.lerpAngle(this.playerGroup.rotation.y, targetAngle, 0.2);
      }
    } else if (this.targetPosition) {
      const distance = this.playerGroup.position.distanceTo(this.targetPosition);

      if (distance > 0.15) {
        this.isInteracting = false;
        const dir = this.targetPosition.clone().sub(this.playerGroup.position).normalize();
        const moveStep = Math.min(stepDistance, distance);
        const moved = this.tryMoveWithSlide(
          dir.x * moveStep,
          dir.z * moveStep,
          colliders,
          npcs
        );

        if (moved) {
          isMoving = true;
          const targetAngle = Math.atan2(dir.x, dir.z);
          this.playerGroup.rotation.y = this.lerpAngle(this.playerGroup.rotation.y, targetAngle, 0.15);
        } else {
          this.targetPosition = null;
        }
      } else {
        this.targetPosition = null;
      }
    }

    // 이동 / 대기 애니메이션 전환
    if (this.rigHandle) {
      if (isMoving) {
        this.rigHandle.playAction('walk', 0.15);
      } else if (!this.isInteracting) {
        this.rigHandle.playAction('idle', 0.25);
      }
    }

    // 타겟 링 서서히 페이드아웃
    const ringMat = this.targetRing.material as THREE.MeshBasicMaterial;
    if (ringMat.opacity > 0 && !isMoving) {
      ringMat.opacity = Math.max(0, ringMat.opacity - delta * 2.5);
    }

    // 3. 카메라 업데이트 (상대 NPC 정면 클로즈업 vs 일반 3인칭 추적)
    if (this.isDialogueMode && this.dialogueTargetPos && this.dialogueCamDir) {
      const camTargetPos = this.dialogueTargetPos.clone()
        .addScaledVector(this.dialogueCamDir, CharacterController.DIALOGUE_CAM_DISTANCE)
        .add(new THREE.Vector3(0, CharacterController.DIALOGUE_CAM_HEIGHT, 0));

      this.camera.position.lerp(camTargetPos, 0.1);
      this.camera.lookAt(
        this.dialogueTargetPos.x,
        this.dialogueTargetPos.y + CharacterController.DIALOGUE_LOOKAT_HEIGHT,
        this.dialogueTargetPos.z
      );
    } else {
      const { position, lookAt } = this.getThirdPersonCameraTarget();
      this.camera.position.lerp(position, 0.12);
      this.camera.lookAt(lookAt);
    }
  }

  /**
   * 360도 각도 보간 헬퍼 (최단 회전 방향 보장)
   */
  private lerpAngle(a: number, b: number, t: number): number {
    let diff = (b - a) % (Math.PI * 2);
    if (diff > Math.PI) diff -= Math.PI * 2;
    if (diff < -Math.PI) diff += Math.PI * 2;
    return a + diff * t;
  }

  /**
   * 근접한 NPC 감지 (거리 2.6m 이내)
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
    if (this.rigHandle) {
      this.rigHandle.dispose();
    }
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
