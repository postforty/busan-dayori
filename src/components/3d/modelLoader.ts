import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';
import { WorldNpcAppearance } from './types';

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

function darkenHex(hex: string, factor = 0.72): string {
  const clean = hex.replace('#', '');
  const num = parseInt(clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean, 16);
  const r = Math.max(0, Math.min(255, Math.round(((num >> 16) & 255) * factor)));
  const g = Math.max(0, Math.min(255, Math.round(((num >> 8) & 255) * factor)));
  const b = Math.max(0, Math.min(255, Math.round((num & 255) * factor)));
  return `rgb(${r}, ${g}, ${b})`;
}

function paintPaletteCell(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  uStart: number,
  uEnd: number,
  vStart: number,
  vEnd: number,
  hexColor: string
) {
  const x = uStart * width;
  const y = vStart * height;
  const w = (uEnd - uStart) * width;
  const h = (vEnd - vStart) * height;
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, hexColor);
  grad.addColorStop(1, darkenHex(hexColor));
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);
}

function buildCustomizedTexture(
  baseTexture: THREE.Texture,
  appearance: WorldNpcAppearance
): THREE.CanvasTexture | null {
  if (typeof document === 'undefined' || !baseTexture.image) return null;
  const image = baseTexture.image as HTMLImageElement | HTMLCanvasElement | ImageBitmap;
  const width = image.width || 512;
  const height = image.height || 512;
  if (width === 0 || height === 0) return null;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.drawImage(image as CanvasImageSource, 0, 0, width, height);

  if (appearance.hairColor) {
    paintPaletteCell(ctx, width, height, 0.125, 0.1875, 0, 0.25, appearance.hairColor);
  }
  if (appearance.capColor) {
    paintPaletteCell(ctx, width, height, 0.1875, 0.25, 0, 0.25, appearance.capColor);
  }
  if (appearance.outfitColor) {
    paintPaletteCell(ctx, width, height, 0.125, 0.25, 0.25, 0.5, appearance.outfitColor);
  }
  if (appearance.pantsColor) {
    paintPaletteCell(ctx, width, height, 0, 0.125, 0.25, 0.5, appearance.pantsColor);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = baseTexture.flipY;
  texture.colorSpace = baseTexture.colorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * GLB 3D 카툰 캐릭터 모델 + 스켈레탈 애니메이션 로드
 */
export async function loadAnimatedCharacter(
  url: string,
  targetHeight = 1.85,
  appearance?: WorldNpcAppearance
): Promise<CharacterRigHandle> {
  const [gltf, clips] = await Promise.all([
    loadGLTF(url),
    loadSharedAnimations()
  ]);

  // SkinnedMesh 복제 (스켈레톤 바인딩 유지)
  const clonedScene = SkeletonUtils.clone(gltf.scene);

  const hasColorCustomization = Boolean(
    appearance?.hairColor ||
    appearance?.outfitColor ||
    appearance?.capColor ||
    appearance?.pantsColor
  );
  const customTextureCache = new Map<THREE.Texture, THREE.CanvasTexture>();

  // 모든 메쉬 그림자, 액세서리 가시성 및 재질 최적화
  clonedScene.traverse((child) => {
    if (appearance?.hideGlasses && child.name.includes('Glasses')) {
      child.visible = false;
    }
    if (appearance?.hideBackpack && child.name.includes('Backpack')) {
      child.visible = false;
    }

    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      if (hasColorCustomization && appearance && mesh.material) {
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        const clonedMaterials = materials.map((mat) => {
          const cloned = mat.clone() as THREE.MeshStandardMaterial;
          if (cloned.map && cloned.name !== 'glass') {
            let customTex = customTextureCache.get(cloned.map);
            if (!customTex) {
              const built = buildCustomizedTexture(cloned.map, appearance);
              if (built) {
                customTextureCache.set(cloned.map, built);
                customTex = built;
              }
            }
            if (customTex) {
              cloned.map = customTex;
              cloned.needsUpdate = true;
            }
          }
          return cloned;
        });
        mesh.material = Array.isArray(mesh.material) ? clonedMaterials : clonedMaterials[0];
      }
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
      customTextureCache.forEach((tex) => tex.dispose());
      customTextureCache.clear();
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

