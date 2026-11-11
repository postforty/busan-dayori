import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

export type AnimationName = 'idle' | 'walk' | 'interact';

export interface CharacterRigHandle {
  model: THREE.Object3D;
  mixer: THREE.AnimationMixer;
  playAction: (name: AnimationName, fadeDuration?: number) => void;
  update: (delta: number) => void;
  dispose: () => void;
}

const loader = new GLTFLoader();
const modelCache = new Map<string, Promise<GLTF>>();

interface SharedClips {
  idle?: THREE.AnimationClip;
  walk?: THREE.AnimationClip;
  interact?: THREE.AnimationClip;
}

let sharedClipsPromise: Promise<SharedClips> | null = null;

function loadGLTF(url: string): Promise<GLTF> {
  if (!modelCache.has(url)) {
    modelCache.set(
      url,
      new Promise((resolve, reject) => {
        loader.load(url, resolve, undefined, reject);
      })
    );
  }
  return modelCache.get(url)!;
}

/**
 * 공용 애니메이션 클립(Idle, Walk, Interact) 로드 및 캐싱
 */
function loadSharedAnimations(): Promise<SharedClips> {
  if (!sharedClipsPromise) {
    sharedClipsPromise = Promise.all([
      loadGLTF('/models/anim-general.glb'),
      loadGLTF('/models/anim-movement.glb')
    ]).then(([generalGltf, movementGltf]) => {
      const idleClip =
        generalGltf.animations.find((a) => a.name === 'Idle_A') ||
        generalGltf.animations.find((a) => a.name === 'Idle_B');
      const interactClip =
        generalGltf.animations.find((a) => a.name === 'Interact') ||
        generalGltf.animations.find((a) => a.name === 'PickUp');
      const walkClip =
        movementGltf.animations.find((a) => a.name === 'Walking_A') ||
        movementGltf.animations.find((a) => a.name === 'Walking_B');

      return {
        idle: idleClip,
        walk: walkClip,
        interact: interactClip
      };
    });
  }
  return sharedClipsPromise;
}

/**
 * GLB 3D 카툰 캐릭터 모델 + 스켈레탈 애니메이션 로드
 */
export async function loadAnimatedCharacter(
  url: string,
  targetHeight = 1.85
): Promise<CharacterRigHandle> {
  const [gltf, clips] = await Promise.all([
    loadGLTF(url),
    loadSharedAnimations()
  ]);

  // SkinnedMesh 복제 (스켈레톤 바인딩 유지)
  const clonedScene = SkeletonUtils.clone(gltf.scene);

  // 모든 메쉬 그림자 및 재질 최적화
  clonedScene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    }
  });

  // 크기 정규화 및 발끝 Y=0 바닥 정렬
  const box = new THREE.Box3().setFromObject(clonedScene);
  const size = new THREE.Vector3();
  box.getSize(size);
  if (size.y > 0) {
    const scale = targetHeight / size.y;
    clonedScene.scale.setScalar(scale);
  }

  // 스케일 적용 후 Y 오프셋 계산
  const scaledBox = new THREE.Box3().setFromObject(clonedScene);
  clonedScene.position.y = -scaledBox.min.y;

  // AnimationMixer 및 액션 설정
  const mixer = new THREE.AnimationMixer(clonedScene);
  const actions: Partial<Record<AnimationName, THREE.AnimationAction>> = {};

  if (clips.idle) {
    actions.idle = mixer.clipAction(clips.idle);
  }
  if (clips.walk) {
    actions.walk = mixer.clipAction(clips.walk);
  }
  if (clips.interact) {
    actions.interact = mixer.clipAction(clips.interact);
    actions.interact.setLoop(THREE.LoopOnce, 1);
    actions.interact.clampWhenFinished = false;
  }

  let currentActionName: AnimationName | null = null;

  const playAction = (name: AnimationName, fadeDuration = 0.2) => {
    if (currentActionName === name) return;
    const nextAction = actions[name];
    if (!nextAction) return;

    const prevAction = currentActionName ? actions[currentActionName] : undefined;
    currentActionName = name;

    nextAction.reset();
    nextAction.setEffectiveTimeScale(1);
    nextAction.setEffectiveWeight(1);
    nextAction.play();

    if (prevAction && prevAction !== nextAction) {
      prevAction.crossFadeTo(nextAction, fadeDuration, true);
    }
  };

  // 기본 대기(Idle) 동작 재생 시작
  if (actions.idle) {
    actions.idle.play();
    currentActionName = 'idle';
  }

  // 일회성 Interact(인사) 동작이 끝나면 자동으로 Idle로 부드럽게 복귀
  const onFinished = (e: { action: THREE.AnimationAction }) => {
    if (e.action === actions.interact) {
      currentActionName = null;
      playAction('idle', 0.25);
    }
  };
  mixer.addEventListener('finished', onFinished);

  return {
    model: clonedScene,
    mixer,
    playAction,
    update: (delta: number) => mixer.update(delta),
    dispose: () => {
      mixer.removeEventListener('finished', onFinished);
      mixer.stopAllAction();
      clonedScene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) {
            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((m) => m.dispose());
            } else {
              mesh.material.dispose();
            }
          }
        }
      });
    }
  };
}

