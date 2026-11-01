import { DailyLesson } from '@/types';
import { ShortsTheme } from './types';

export function resolveShortsTheme(lesson?: DailyLesson | null): ShortsTheme {
  if (!lesson) return 'cafe';

  const title = (lesson.themeTitle || lesson.unitTitle || '').toLowerCase();
  const desc = (lesson.nuanceTip || '').toLowerCase();
  const key = (lesson.keyExpression?.japanese || '').toLowerCase();
  const id = (lesson.id || '').toLowerCase();

  // 1. 야외 길거리 / 지하철역 테마
  if (
    id.includes('starter-3') ||
    id.includes('beginner-3') ||
    title.includes('화장실') ||
    title.includes('길 찾기') ||
    title.includes('지하철') ||
    title.includes('생존 sos') ||
    desc.includes('길 찾기') ||
    key.includes('どこ') ||
    key.includes('どちら') ||
    key.includes('駅')
  ) {
    return 'street';
  }

  // 2. 전통 식당 / 로컬 음식점 테마
  if (
    id.includes('starter-2') ||
    id.includes('intermediate-1') ||
    id.includes('intermediate-2') ||
    id.includes('advanced-1') ||
    id.includes('advanced-2') ||
    title.includes('맘마') ||
    title.includes('냠냠') ||
    title.includes('식당') ||
    title.includes('식사') ||
    title.includes('국밥') ||
    title.includes('맛과 식감') ||
    title.includes('일괄 결제') ||
    desc.includes('식당') ||
    desc.includes('음식') ||
    desc.includes('국물') ||
    key.includes('おいしい') ||
    key.includes('お会計') ||
    key.includes('コク')
  ) {
    return 'restaurant';
  }

  // 3. 편의점 / 잡화점 / 쇼핑 매대 테마
  if (
    id.includes('starter-4') ||
    id.includes('starter-5') ||
    id.includes('beginner-2') ||
    title.includes('쇼핑') ||
    title.includes('얼마예요') ||
    title.includes('호기심') ||
    title.includes('의사표현') ||
    title.includes('결제 수단') ||
    title.includes('카드') ||
    desc.includes('가게') ||
    desc.includes('편의점') ||
    desc.includes('마트') ||
    key.includes('いくら') ||
    key.includes('カード') ||
    key.includes('だいじょうぶ')
  ) {
    return 'shop';
  }

  // 4. 카페 & 베이커리 테마 (기본값)
  return 'cafe';
}

