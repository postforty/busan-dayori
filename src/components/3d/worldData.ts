import { WorldThemeConfig, WorldThemeLevel, WorldInteriorId, WorldNpcData } from './types';
import { getLessonByIdFromCurriculum } from '@/lib/curriculum/curriculumData';

export const WORLD_INTERIOR_LABELS: Record<WorldInteriorId, string> = {
  'starter-cafe': '☕ 카페',
  'starter-restaurant': '🍜 식당',
  'starter-konbini': '🏪 편의점',
  'starter-souvenir': '🎁 기념품 상점'
};

export const WORLD_THEMES: Record<WorldThemeLevel, WorldThemeConfig> = {
  level0: {
    id: 'level0',
    badge: 'Lv.0 입문',
    ambientColor: 0xfff7ed,
    skyColor: 0xe6f4fe,
    groundColor: 0xe2ddd5,
    fogColor: 0xe6f4fe
  },
  level1: {
    id: 'level1',
    badge: 'Lv.1 초급',
    ambientColor: 0xfff3e0,
    skyColor: 0xdff0fc,
    groundColor: 0xdcd8cf,
    fogColor: 0xdff0fc
  },
  level2: {
    id: 'level2',
    badge: 'Lv.2 중급',
    ambientColor: 0xffedd5,
    skyColor: 0xfceee6,
    groundColor: 0xc8bcaf,
    fogColor: 0xfceee6
  },
  level3: {
    id: 'level3',
    badge: 'Lv.3 실전',
    ambientColor: 0xffe4b5,
    skyColor: 0x1a233a,
    groundColor: 0x2d3142,
    fogColor: 0x1f2438
  }
};

export function getLevelNpcs(level: WorldThemeLevel): WorldNpcData[] {
  if (level === 'level0') {
    const s1 = getLessonByIdFromCurriculum('lesson-starter-1');
    const s2 = getLessonByIdFromCurriculum('lesson-starter-2');
    const s3 = getLessonByIdFromCurriculum('lesson-starter-3');
    const s4 = getLessonByIdFromCurriculum('lesson-starter-4');
    const s5 = getLessonByIdFromCurriculum('lesson-starter-5');

    const npcs: WorldNpcData[] = [
      {
        id: 'npc-starter-1',
        name: '카페 친구 하루',
        role: '카페 친구',
        level: 'level0',
        interiorId: 'starter-cafe',
        unitId: 'lesson-starter-1',
        position: [0, 0, -1.6],
        color: 0xe07a5f,
        accentColor: 0xd46b50,
        greetingText: 'どうぞ！(여기 있어요!)',
        avatarImage: '/images/shorts/friend.jpg',
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'friend',
        lessonData: s1!
      },
      {
        id: 'npc-starter-2',
        name: '식당 이모님 미카',
        role: '식당 주인',
        level: 'level0',
        interiorId: 'starter-restaurant',
        unitId: 'lesson-starter-2',
        position: [0, 0, -1.8],
        color: 0xe53e3e,
        accentColor: 0xc53030,
        greetingText: 'いらっしゃいませ！(어서 오세요!)',
        avatarImage: '/images/shorts/auntie.jpg',
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'auntie',
        lessonData: s2!
      },
      {
        id: 'npc-starter-3',
        name: '친절한 행인 유타',
        role: '길거리 행인',
        level: 'level0',
        unitId: 'lesson-starter-3',
        position: [0, 0, -3.5],
        color: 0x48bb78,
        accentColor: 0x38a169,
        greetingText: 'あっちですよ！(저쪽이에요!)',
        avatarImage: '/images/shorts/passerby.jpg',
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'passerby',
        lessonData: s3!
      },
      {
        id: 'npc-starter-4',
        name: '편의점 점원 리나',
        role: '편의점 스태프',
        level: 'level0',
        interiorId: 'starter-konbini',
        unitId: 'lesson-starter-4',
        position: [-1.4, 0, -1.8],
        color: 0x4299e1,
        accentColor: 0x3182ce,
        greetingText: 'ふくろ、いりますか？(봉투 필요하세요?)',
        avatarImage: '/images/shorts/clerk.jpg',
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'clerk',
        lessonData: s4!
      },
      {
        id: 'npc-starter-5',
        name: '기념품 점원 켄지',
        role: '기념품 가게 점원',
        level: 'level0',
        interiorId: 'starter-souvenir',
        unitId: 'lesson-starter-5',
        position: [0, 0, -1.8],
        color: 0xed8936,
        accentColor: 0xdd6b20,
        greetingText: 'いらっしゃいませ！(어서 오세요!)',
        avatarImage: '/images/shorts/clerk.jpg',
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'clerk',
        lessonData: s5!
      }
    ];
    return npcs.filter((npc) => Boolean(npc.lessonData));
  }

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
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'clerk',
        appearance: {
          hideGlasses: true,
          hideBackpack: true,
          hairColor: '#3b2f2f',
          capColor: '#2b6cb0',
          outfitColor: '#38a169',
          pantsColor: '#2d3748'
        },
        lessonData: l1!
      },
      {
        id: 'npc-station',
        name: '사토 안내원',
        role: '전철역 안내원',
        level: 'level1',
        unitId: 'lesson-beginner-2',
        position: [5.2, 0, -5.5],
        color: 0x48bb78,
        accentColor: 0x38a169,
        greetingText: 'どちらへ行かれますか？(어디로 가시나요?)',
        avatarImage: '/images/shorts/passerby.jpg',
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'passerby',
        appearance: {
          hideBackpack: true,
          hairColor: '#4a3525',
          capColor: '#2c5282',
          outfitColor: '#4299e1',
          pantsColor: '#2a4365'
        },
        lessonData: l2!
      },
      {
        id: 'npc-vending',
        name: '마을 친구 미유',
        role: '동네 길 안내',
        level: 'level1',
        unitId: 'lesson-beginner-3',
        position: [0, 0, -8.5],
        color: 0xed8936,
        accentColor: 0xdd6b20,
        greetingText: 'こんにちは！いい天気ですね。(안녕하세요!)',
        avatarImage: '/images/shorts/friend.jpg',
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'friend',
        appearance: {
          hideGlasses: true,
          hairColor: '#7b553a',
          capColor: '#688558',
          outfitColor: '#819765',
          pantsColor: '#4a5568'
        },
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
        characterRole: 'clerk',
        appearance: {
          hideGlasses: true,
          hideBackpack: true,
          hairColor: '#2d2424',
          capColor: '#d6c3a5',
          outfitColor: '#6b4c3b',
          pantsColor: '#3e2723'
        },
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
        modelUrl: '/models/npc-girl.glb',
        characterRole: 'auntie',
        appearance: {
          hideBackpack: true,
          hairColor: '#9aa0a6',
          capColor: '#2b4c7e',
          outfitColor: '#d9a773',
          pantsColor: '#3b4a6b'
        },
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
      name: '맛집 친구 미호',
      role: '동네 미식가 친구',
      level: 'level3',
      unitId: 'lesson-day-2',
      position: [-5.2, 0, -5],
      color: 0x805ad5,
      accentColor: 0x6b46c1,
      greetingText: '今日のおすすめはいかが？(오늘 추천 메뉴 어때요?)',
      avatarImage: '/images/shorts/passerby.jpg',
      modelUrl: '/models/npc-girl.glb',
      characterRole: 'passerby',
      appearance: {
        hideGlasses: true,
        hideBackpack: true,
        hairColor: '#3a2a22',
        capColor: '#e9d8a6',
        outfitColor: '#805ad5',
        pantsColor: '#2d3748'
      },
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
      characterRole: 'friend',
      appearance: {
        hideGlasses: true,
        hairColor: '#5c3c28',
        capColor: '#f6ad55',
        outfitColor: '#ed64a6',
        pantsColor: '#4a5568'
      },
      lessonData: l2!
    }
  ];
  return npcs.filter((npc) => Boolean(npc.lessonData));
}

