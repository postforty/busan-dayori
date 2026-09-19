/**
 * 부산 주소 정보를 바탕으로 여행 친화적인 구역명 및 지도 링크를 생성하는 유틸리티
 */

interface RegionMappingRule {
  keywords: string[];
  region: string;
}

const BUSAN_HOTSPOT_RULES: RegionMappingRule[] = [
  // 수영구: 광안리
  { keywords: ['민락', '광안', '남천', '망미', '수영구'], region: '광안리' },
  // 해운대구: 해운대 & 송정
  { keywords: ['송정'], region: '송정' },
  { keywords: ['센텀', '마린시티', '우동', '중동', '좌동', '재송', '반여', '해운대'], region: '해운대' },
  // 부산진구: 전포동 & 서면 (전포를 서면보다 먼저 검사하여 전포대로/전포동 우선 매핑)
  { keywords: ['전포'], region: '전포동' },
  { keywords: ['서면', '부전', '범천', '양정', '가야', '당감', '개금', '부산진구'], region: '서면' },
  // 중구: 남포동 & 자갈치
  { keywords: ['남포', '광복', '부평', '자갈치', '중앙동', '보수동', '대청동', '신창동', '창선동', '중구'], region: '남포동' },
  // 영도구: 영도 & 흰여울
  { keywords: ['영선', '봉래', '청학', '동삼', '신선동', '흰여울', '태종대', '영도'], region: '영도' },
  // 서구: 송도 & 대신동
  { keywords: ['암남', '송도'], region: '송도' },
  { keywords: ['대신동', '서구'], region: '서구' },
  // 동구: 초량 (부산역)
  { keywords: ['초량', '수정동', '범일', '좌천', '이바구', '부산역', '동구'], region: '초량' },
  // 사하구: 다대포 & 감천
  { keywords: ['다대'], region: '다대포' },
  { keywords: ['감천'], region: '감천' },
  { keywords: ['하단', '괴정', '당리', '장림', '신평', '사하구'], region: '사하' },
  // 기장군: 기장 & 일광
  { keywords: ['일광'], region: '일광' },
  { keywords: ['기장', '연화리', '대변리', '오시리아'], region: '기장' },
  // 동래구/연제구: 온천천 & 동래
  { keywords: ['온천천'], region: '온천천' },
  { keywords: ['온천동', '사직', '안락', '명륜', '명장', '동래구'], region: '동래' },
  { keywords: ['연산', '거제', '연제구'], region: '연제' },
  // 금정구: 부산대
  { keywords: ['부산대', '장전', '구서', '남산동', '금정구'], region: '부산대' },
  // 사상구/북구
  { keywords: ['괘법', '삼락', '모라', '엄궁', '덕포', '사상구'], region: '사상' },
  { keywords: ['화명', '덕천', '만덕', '구포', '북구'], region: '화명' },
  // 강서구: 명지
  { keywords: ['명지'], region: '명지' },
];

/**
 * 부산의 대표 핫스팟/관광지 중심 위경도 좌표 목록
 */
export interface BusanHotspotCoord {
  region: string;
  lat: number;
  lng: number;
  description: string;
}

export const BUSAN_HOTSPOT_COORDS: BusanHotspotCoord[] = [
  // 전포 카페거리 & 서면
  { region: '전포동', lat: 35.1554, lng: 129.0664, description: '전포 카페거리/전포역' },
  { region: '서면', lat: 35.1578, lng: 129.0592, description: '서면역/번화가' },

  // 광안리 & 민락 & 남천
  { region: '광안리', lat: 35.1532, lng: 129.1189, description: '광안리 해수욕장' },
  { region: '광안리', lat: 35.1548, lng: 129.1294, description: '민락더마켓/수변공원' },
  { region: '광안리', lat: 35.1438, lng: 129.1127, description: '남천동 삼익비치' },

  // 해운대 & 송정 & 센텀
  { region: '해운대', lat: 35.1631, lng: 129.1636, description: '해운대역/구남로' },
  { region: '해운대', lat: 35.1585, lng: 129.1705, description: '미포/엘시티' },
  { region: '해운대', lat: 35.1560, lng: 129.1440, description: '마린시티/더베이101' },
  { region: '센텀', lat: 35.1691, lng: 129.1306, description: '센텀시티/벡스코' },
  { region: '송정', lat: 35.1786, lng: 129.1997, description: '송정 해수욕장' },

  // 남포동 & 자갈치 & 영도
  { region: '남포동', lat: 35.0979, lng: 129.0305, description: 'BIFF광장/남포동' },
  { region: '남포동', lat: 35.0967, lng: 129.0350, description: '자갈치시장' },
  { region: '영도', lat: 35.0784, lng: 129.0448, description: '흰여울문화마을' },
  { region: '영도', lat: 35.0935, lng: 129.0405, description: '봉래동/영도대교' },

  // 부산역 & 초량
  { region: '초량', lat: 35.1152, lng: 129.0422, description: '부산역/초량 이바구길' },

  // 송도 & 감천 & 다대포
  { region: '송도', lat: 35.0760, lng: 129.0175, description: '송도 해수욕장/케이블카' },
  { region: '감천', lat: 35.0975, lng: 129.0106, description: '감천문화마을' },
  { region: '다대포', lat: 35.0475, lng: 128.9665, description: '다대포 해수욕장' },

  // 기장 & 일광
  { region: '기장', lat: 35.2201, lng: 129.2272, description: '기장 연화리/해녀촌' },
  { region: '기장', lat: 35.1950, lng: 129.2290, description: '기장 아난티/오시리아' },
  { region: '일광', lat: 35.2612, lng: 129.2335, description: '일광 해수욕장' },

  // 동래 & 온천천 & 부산대
  { region: '동래', lat: 35.2052, lng: 129.0833, description: '동래역/명륜동' },
  { region: '온천천', lat: 35.1950, lng: 129.1000, description: '온천천 카페거리' },
  { region: '부산대', lat: 35.2315, lng: 129.0863, description: '부산대/장전동' },

  // 사상 & 화명/덕천
  { region: '사상', lat: 35.1628, lng: 128.9856, description: '사상역/서부터미널' },
  { region: '화명', lat: 35.2340, lng: 129.0135, description: '화명 생태공원' },
  { region: '덕천', lat: 35.2104, lng: 129.0065, description: '덕천 젊음의 거리' },
];

/**
 * 위경도 두 지점 사이의 거리(km)를 하버사인 공식으로 계산
 */
export function getDistanceFromLatLonInKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // 지구 반경 (km)
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * 위도, 경도를 바탕으로 가장 가까운 부산 대표 구역명을 반환합니다.
 */
export function getBusanRegionFromCoords(lat: number, lng: number): string {
  let closestRegion = '부산';
  let minDistance = Infinity;

  for (const spot of BUSAN_HOTSPOT_COORDS) {
    const dist = getDistanceFromLatLonInKm(lat, lng, spot.lat, spot.lng);
    if (dist < minDistance) {
      minDistance = dist;
      closestRegion = spot.region;
    }
  }

  // 15km 이내에 핫스팟이 있다면 해당 구역 반환
  if (minDistance <= 15) {
    return closestRegion;
  }

  return '부산';
}

/**
 * 시군구, 법정동, 도로명 주소를 분석하여 부산의 대표 감성/여행 구역명을 반환합니다.
 */
export function extractBusanRegion(sigungu: string, bname: string, roadAddress: string = ''): string {
  const fullText = `${sigungu} ${bname} ${roadAddress}`;
  for (const rule of BUSAN_HOTSPOT_RULES) {
    for (const kw of rule.keywords) {
      if (fullText.includes(kw)) {
        return rule.region;
      }
    }
  }

  // 매핑 규칙에 없는 경우 법정동(예: 초량동)이나 시군구(예: 강서구) 반환
  if (bname) {
    return bname.replace(/[0-9]+가$/, '');
  }
  if (sigungu) {
    return sigungu;
  }
  return '부산';
}

/**
 * 네이버 지도 검색 URL 생성
 */
export function generateNaverMapUrl(
  address: string,
  placeName?: string,
  lat?: number,
  lng?: number
): string {
  if (lat && lng) {
    return `https://map.naver.com/p/search/${lat},${lng}`;
  }
  const query = (placeName ? `${placeName} ${address}` : address).trim();
  return `https://map.naver.com/p/search/${encodeURIComponent(query || address)}`;
}

/**
 * 카카오맵 검색 URL 생성
 */
export function generateKakaoMapUrl(
  address: string,
  placeName?: string,
  lat?: number,
  lng?: number
): string {
  if (lat && lng) {
    const label = placeName?.trim() ? encodeURIComponent(placeName.trim()) : '현재위치';
    return `https://map.kakao.com/link/map/${label},${lat},${lng}`;
  }
  const query = (placeName ? `${placeName} ${address}` : address).trim();
  return `https://map.kakao.com/link/search/${encodeURIComponent(query || address)}`;
}

/**
 * 구글 지도 검색 URL 생성
 * 
 * 중요: 한국의 식당/카페의 경우 구글 지도가 상호명(예: '카츠', '밀면', '돼지국밥')과 주소를 함께 검색하면,
 * 해당 상호명이 구글 비즈니스(POI)로 등록되어 있지 않을 때 유사한 이름을 가진 전혀 엉뚱한 다른 매장(해운대, 서면 등)으로 핀이 튀는 문제가 발생합니다.
 * 반면 한국의 도로명 주소는 구글 지도 지오코더에 정확하게 등록되어 있으므로,
 * 주소가 있을 때는 도로명 주소를 단독 검색어로 전달해야 정확한 건물 위치에 마커가 표시됩니다.
 */
export function generateGoogleMapUrl(
  address: string,
  placeName?: string,
  lat?: number,
  lng?: number
): string {
  if (lat && lng) {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
  // 도로명 주소가 있으면 주소를 우선 사용하여 정확한 건물 핀을 유도 (상호명이 모호할 때의 핀 튐 방지)
  const query = address.trim() || placeName?.trim() || '부산';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
