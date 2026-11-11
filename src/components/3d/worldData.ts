import { WorldThemeConfig, WorldThemeLevel, WorldNpcData } from './types';
import { getLessonByIdFromCurriculum } from '@/lib/curriculum/curriculumData';

export const WORLD_THEMES: Record<WorldThemeLevel, WorldThemeConfig> = {
  level1: {
    id: 'level1',
    name: '도쿄 골목길 & 편의점',
    subTitle: 'Lv.1 초급 마치나카 (街中)',
    badge: 'Lv.1 초급',
    ambientColor: 0xfff3e0,
    skyColor: 0xdff0fc,
    groundColor: 0xdcd8cf,
    fogColor: 0xdff0fc
  },
  level2: {
    id: 'level2',
    name: '교토 카페 & 골목길',
    subTitle: 'Lv.2 중급 카페 & 라멘집',
    badge: 'Lv.2 중급',
    ambientColor: 0xffedd5,
    skyColor: 0xfceee6,
    groundColor: 0xc8bcaf,
    fogColor: 0xfceee6
  },
  level3: {
    id: 'level3',
    name: '이자카야 & 축제 거리',
    subTitle: 'Lv.3 실전 마츠리 & 밤거리',
    badge: 'Lv.3 실전',
    ambientColor: 0xffe4b5,
    skyColor: 0x1a233a,
    groundColor: 0x2d3142,
    fogColor: 0x1f2438
  }
};

export function getLevelNpcs(level: WorldThemeLevel): WorldNpcData[] {
  if (level === 'level1') {
    const l1 = getLessonByIdFromCurriculum('lesson-beginner-1');
    const l2 = getLessonByIdFromCurriculum('lesson-beginner-2');
    const l3 = getLessonByIdFromCurriculum('lesson-beginner-3');

    const npcs: WorldNpcData[] = [
      {
        id: 'npc-konbini',
        name: '다나카 점원',
        role: '편의점 스태프',
        level: 'level1',
        unitId: 'lesson-beginner-1',
        position: [-5.2, 0, -5.5],
        color: 0x4299e1,
        accentColor: 0x3182ce,
        greetingText: 'いらっしゃいませ！(어서오세요!)',
        avatarImage: '/images/shorts/clerk.jpg',
        modelUrl: '/models/npc-clerk.glb',
        lessonData: l1!
      },
      {
        id: 'npc-station',
        name: '사토 역무원',
        role: '전철역 안내원',
        level: 'level1',
        unitId: 'lesson-beginner-2',
        position: [5.2, 0, -5.5],
        color: 0x48bb78,
        accentColor: 0x38a169,
        greetingText: 'どちらへ行かれますか？(어디로 가시나요?)',
        avatarImage: '/images/shorts/passerby.jpg',
        modelUrl: '/models/npc-driver.glb',
        lessonData: l2!
      },
      {
        id: 'npc-vending',
        name: '마을 친구 렌',
        role: '동네 길 안내',
        level: 'level1',
        unitId: 'lesson-beginner-3',
        position: [0, 0, -8.5],
        color: 0xed8936,
        accentColor: 0xdd6b20,
        greetingText: 'こんにちは！いい天気ですね。(안녕하세요!)',
        avatarImage: '/images/shorts/friend.jpg',
        modelUrl: '/models/npc-girl.glb',
        lessonData: l3!
      }
    ];
    return npcs.filter((npc) => Boolean(npc.lessonData));
  }

  if (level === 'level2') {
    const l1 = getLessonByIdFromCurriculum('lesson-day-1');
    const l2 = getLessonByIdFromCurriculum('lesson-day-3');

    const npcs: WorldNpcData[] = [
      {
        id: 'npc-cafe',
        name: '유키 바리스타',
        role: '골목 카페 점장',
        level: 'level2',
        unitId: 'lesson-day-1',
        position: [-5.2, 0, -4.5],
        color: 0xb7791f,
        accentColor: 0x975a16,
        greetingText: 'ご注文をお伺いいたします。(주문 도와드릴게요.)',
        avatarImage: '/images/shorts/clerk.jpg',
        modelUrl: '/models/npc-girl.glb',
        lessonData: l1!
      },
      {
        id: 'npc-ramen',
        name: '정숙 이모님',
        role: '골목 식당 주인',
        level: 'level2',
        unitId: 'lesson-day-3',
        position: [5.2, 0, -4.5],
        color: 0xe53e3e,
        accentColor: 0xc53030,
        greetingText: 'へい、らっしゃい！(어서오세요!)',
        avatarImage: '/images/shorts/auntie.jpg',
        modelUrl: '/models/npc-clerk.glb',
        lessonData: l2!
      }
    ];
    return npcs.filter((npc) => Boolean(npc.lessonData));
  }

  // level3
  const l1 = getLessonByIdFromCurriculum('lesson-day-2');
  const l2 = getLessonByIdFromCurriculum('lesson-advanced-2');

  const npcs: WorldNpcData[] = [
    {
      id: 'npc-izakaya',
      name: '마스터 신',
      role: '이자카야 점주',
      level: 'level3',
      unitId: 'lesson-day-2',
      position: [-5.2, 0, -5],
      color: 0x805ad5,
      accentColor: 0x6b46c1,
      greetingText: '今日のおすすめはいかが？(오늘 추천 메뉴 어때요?)',
      avatarImage: '/images/shorts/passerby.jpg',
      modelUrl: '/models/npc-driver.glb',
      lessonData: l1!
    },
    {
      id: 'npc-matsuri',
      name: '축제 상인 아오이',
      role: '포장마차 달인',
      level: 'level3',
      unitId: 'lesson-advanced-2',
      position: [3.3, 0, -5],
      color: 0xd53f8c,
      accentColor: 0xb83280,
      greetingText: 'お祭り楽しんでいってね！(축제 재미있게 즐겨요!)',
      avatarImage: '/images/shorts/friend.jpg',
      modelUrl: '/models/npc-girl.glb',
      lessonData: l2!
    }
  ];
  return npcs.filter((npc) => Boolean(npc.lessonData));
}

