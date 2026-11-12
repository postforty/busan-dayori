'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { WorldThemeLevel, WorldNpcData } from './types';
import { WorldSceneManager } from './WorldSceneManager';
import { CharacterController } from './CharacterController';
import WorldHudOverlay from './WorldHudOverlay';
import NpcDialogueModal from './NpcDialogueModal';
import { getLevelNpcs } from './worldData';
import { speakJapanese } from '@/utils/tts';

interface World3DViewerProps {
  initialLevel?: WorldThemeLevel;
}

export default function World3DViewer({ initialLevel = 'level1' }: World3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLevel, setCurrentLevel] = useState<WorldThemeLevel>(initialLevel);
  const [nearbyNpc, setNearbyNpc] = useState<WorldNpcData | null>(null);
  const [activeDialogueNpc, setActiveDialogueNpc] = useState<WorldNpcData | null>(null);
  const [completedMissions, setCompletedMissions] = useState<string[]>([]);

  // Three.js 인스턴스 참조들
  const sceneManagerRef = useRef<WorldSceneManager | null>(null);
  const controllerRef = useRef<CharacterController | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mousePosRef = useRef<THREE.Vector2>(new THREE.Vector2());
  const pointerStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const activeDialogueRef = useRef<WorldNpcData | null>(null);
  const nearbyNpcRef = useRef<WorldNpcData | null>(null);

  useEffect(() => {
    activeDialogueRef.current = activeDialogueNpc;
    if (activeDialogueNpc && controllerRef.current) {
      controllerRef.current.startDialogue(activeDialogueNpc.position);
    } else if (!activeDialogueNpc && controllerRef.current) {
      controllerRef.current.endDialogue();
    }
  }, [activeDialogueNpc]);

  useEffect(() => {
    nearbyNpcRef.current = nearbyNpc;
  }, [nearbyNpc]);

  // 로컬 스토리지에서 완료된 미션 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem('world_completed_missions');
      if (saved) {
        setCompletedMissions(JSON.parse(saved));
      }
    } catch {
      // 무시
    }
  }, []);

  const handleCompleteMission = (npcId: string) => {
    setCompletedMissions((prev) => {
      if (prev.includes(npcId)) return prev;
      const next = [...prev, npcId];
      try {
        localStorage.setItem('world_completed_missions', JSON.stringify(next));
      } catch {
        // 무시
      }
      return next;
    });
  };

  // 1. Three.js 초기화 및 라이프사이클 관리
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1-1. 카메라 생성
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    // 1-2. 씬 매니저 & 캐릭터 컨트롤러 생성
    const sceneManager = new WorldSceneManager();
    const controller = new CharacterController(camera);

    sceneManager.scene.add(controller.playerGroup);
    sceneManager.scene.add(controller.getTargetRing());

    sceneManagerRef.current = sceneManager;
    controllerRef.current = controller;

    // 1-3. WebGL 렌더러 생성
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 초기 테마 설정
    sceneManager.loadTheme(currentLevel);

    // 1-4. 렌더 루프
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // 업데이트
      sceneManager.update(delta, elapsedTime);
      controller.update(delta, elapsedTime, sceneManager.colliders, sceneManager.interactableNpcs);

      // 근접 NPC 체크
      const closeNpc = controller.checkNearbyNpc(sceneManager.interactableNpcs);
      setNearbyNpc((prev) => (prev?.id === closeNpc?.id ? prev : closeNpc));

      renderer.render(sceneManager.scene, camera);
    };

    animate();

    // 1-5. 리사이즈 핸들러
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    // 1-6. 키보드 조작 핸들러 (WASD / 방향키 / E(대화) / Space(인사))
    const handleKeyDown = (e: KeyboardEvent) => {
      // 대화 모달이 열려있을 때는 닫기(ESC)만 지원하고 이동은 차단
      if (activeDialogueRef.current) {
        if (e.code === 'Escape') {
          setActiveDialogueNpc(null);
        }
        return;
      }

      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault(); // 브라우저 스크롤 방지
      }

      if (e.code === 'KeyE') {
        if (nearbyNpcRef.current) {
          setActiveDialogueNpc(nearbyNpcRef.current);
        }
        return;
      }

      if (e.code === 'Space') {
        controller.triggerBow();
        speakJapanese('こんにちは！', 1.0);
        return;
      }

      controller.onKeyDown(e.code);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (!activeDialogueRef.current) {
        controller.onKeyUp(e.code);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 정리(cleanup)
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      cancelAnimationFrame(animationFrameId);

      sceneManager.dispose();
      controller.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // 테마 레벨 전환
  const handleSelectLevel = useCallback((level: WorldThemeLevel) => {
    setCurrentLevel(level);
    if (sceneManagerRef.current) {
      sceneManagerRef.current.loadTheme(level);
    }
  }, []);

  // '인사 (お辞儀)' 실행
  const handleTriggerBow = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.triggerBow();
      speakJapanese('こんにちは！', 1.0);
    }
  }, []);

  // 카메라 리셋
  const handleResetCamera = useCallback(() => {
    controllerRef.current?.resetCamera();
  }, []);

  // ----------------------------------------------------
  // 마우스 및 터치 이벤트 (바닥 클릭 이동 vs 드래그 회전 구분)
  // ----------------------------------------------------
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    };
    if (controllerRef.current) {
      controllerRef.current.onPointerDown(e.clientX, e.clientY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (controllerRef.current) {
      controllerRef.current.onPointerMove(e.clientX, e.clientY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (controllerRef.current) {
      controllerRef.current.onPointerUp();
    }

    const dx = Math.abs(e.clientX - pointerStartRef.current.x);
    const dy = Math.abs(e.clientY - pointerStartRef.current.y);
    const duration = Date.now() - pointerStartRef.current.time;

    // 드래그가 아니고 짧은 탭/클릭인 경우: 바닥 레이캐스팅으로 캐릭터 이동
    if (dx < 8 && dy < 8 && duration < 400 && containerRef.current && sceneManagerRef.current && controllerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mousePosRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mousePosRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mousePosRef.current, controllerRef.current.camera);

      // 1. NPC 클릭 체크
      const npcHits = raycasterRef.current.intersectObjects(
        sceneManagerRef.current.interactableNpcs.map((n) => n.mesh),
        true
      );

      if (npcHits.length > 0) {
        let parentGroup: THREE.Object3D | null = npcHits[0].object;
        while (parentGroup && !parentGroup.name.startsWith('npc-')) {
          parentGroup = parentGroup.parent;
        }
        if (parentGroup) {
          const matchedNpc = sceneManagerRef.current.interactableNpcs.find(
            (n) => n.mesh.name === parentGroup!.name
          );
          if (matchedNpc) {
            controllerRef.current.moveTo(matchedNpc.mesh.position);
            setActiveDialogueNpc(matchedNpc.data);
            return;
          }
        }
      }

      // 2. 바닥 클릭 이동
      const intersects = raycasterRef.current.intersectObject(sceneManagerRef.current.groundPlane);
      if (intersects.length > 0) {
        controllerRef.current.moveTo(intersects[0].point);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (controllerRef.current) {
      controllerRef.current.onWheel(e.deltaY);
    }
  };

  const totalNpcs = getLevelNpcs(currentLevel);

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden touch-none select-none">
      {/* 3D WebGL 캔버스 컨테이너 */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* 미니멀 HUD 오버레이 */}
      <WorldHudOverlay
        currentLevel={currentLevel}
        onSelectLevel={handleSelectLevel}
        nearbyNpc={nearbyNpc}
        onOpenDialogue={(npc) => setActiveDialogueNpc(npc)}
        onTriggerBow={handleTriggerBow}
        onResetCamera={handleResetCamera}
        completedMissions={completedMissions}
        totalNpcsCount={totalNpcs.length}
      />

      {/* NPC 대화 상호작용 모달 */}
      <NpcDialogueModal
        npc={activeDialogueNpc}
        onClose={() => setActiveDialogueNpc(null)}
        onCompleteMission={handleCompleteMission}
        isCompleted={activeDialogueNpc ? completedMissions.includes(activeDialogueNpc.id) : false}
      />
    </div>
  );
}

