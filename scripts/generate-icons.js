/**
 * ============================================================================
 * [부산다요리 (Busan Dayori)] 아이콘 & 파비콘 통합 생성 스크립트
 * ============================================================================
 * 
 * @description
 * 헤더 로고의 편지(Mail Envelope) 심볼과 감성적인 웜톤 컬러 팔레트를 바탕으로,
 * 웹 브라우저 및 모바일 디바이스(iOS/Android)에 필요한 모든 규격의 아이콘/파비콘을
 * 자동으로 렌더링하고 적절한 디렉터리에 배치하는 유틸리티 스크립트입니다.
 * 
 * @usage
 * 터미널에서 다음 명령어를 실행합니다:
 * $ node scripts/generate-icons.js
 * 
 * @dependencies
 * - sharp: 고성능 이미지 프로세싱 라이브러리 (SVG -> 고해상도 PNG 변환)
 * - fs, path: 파일 시스템 제어
 * 
 * @generated_files
 * 1. src/app/favicon.ico          : 브라우저 탭 기본 파비콘 (16x16, 32x32, 48x48 멀티사이즈 ICO)
 * 2. src/app/icon.png             : Next.js App Router 표준 앱 아이콘 (512x512)
 * 3. src/app/apple-icon.png       : iOS Safari 홈 화면 바로가기용 아이콘 (180x180)
 * 4. public/favicon.ico           : 루트 경로 직접 요청 호환용 ICO
 * 5. public/favicon.svg           : 모던 브라우저 고해상도 벡터 파비콘
 * 6. public/icons/icon-192.png    : PWA / 안드로이드 표준 바로가기 아이콘 (192x192)
 * 7. public/icons/icon-512.png    : PWA / 안드로이드 고해상도 바로가기 아이콘 (512x512)
 * 8. public/icons/icon-maskable-512.png : 안드로이드 적응형(Adaptive) 마스크 아이콘 (512x512)
 * 9. public/icons/apple-touch-icon.png  : iOS PWA 대체 경로 호환 아이콘 (180x180)
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');

// 프로젝트 루트의 node_modules에 설치된 sharp 라이브러리를 동적으로 로드합니다.
const sharp = require(path.resolve(process.cwd(), 'node_modules/sharp'));

/**
 * 디자인 토큰 및 설정값
 * 향후 브랜드 색상이나 여백을 변경할 때 이 객체의 값만 수정하면 전체 아이콘에 일괄 적용됩니다.
 */
const CONFIG = {
  // 메인 포인트 색상 (편지 봉투 외곽선 및 접힘선) - 따뜻한 테라코타 코랄
  brandCoral: '#E07A5F',

  // 원형 배경 색상 (헤더 로고의 bg-[#E07A5F]/10 톤과 일치하는 부드러운 살구 크림색)
  circleBg: '#FDF0EA',

  // 원형 테두리 색상 (경계면을 은은하게 구분해주는 소프트 피치 톤)
  circleBorder: '#F3DDD3',

  // 앱 기본 테마 배경색 (iOS 홈 화면 추가 및 Maskable 아이콘의 여백 배경으로 사용)
  // * 참고: iOS는 투명 배경을 지원하지 않아 검은색으로 처리하므로, 솔리드 배경을 채워야 합니다.
  appThemeBg: '#FBF9F5',

  // 기본 캔버스 해상도 (SVG 렌더링 기준)
  canvasSize: 512,
};

/**
 * 1. 투명 배경 원형 아이콘 SVG 생성 함수
 * 
 * @purpose 브라우저 파비콘(Favicon) 및 웹 앱 Any 아이콘에 사용
 * @features
 * - 바깥 배경이 투명하여 브라우저 탭(다크/라이트 모드 무관)에 동그란 웜톤 엠블럼 형태로 깔끔하게 표시됨
 * - 헤더의 1:2 비율(32px 원 안에 16px 편지 아이콘)을 정밀하게 재현
 * - Lucide-react의 'Mail' 아이콘 벡터 패스(24x24 그리드)를 기반으로 작성
 */
function getTransparentCircleSvg() {
  const size = CONFIG.canvasSize; // 512px

  // 512px 캔버스에서 아이콘 크기 스케일 (헤더의 50% 비율에 최적화: 24 * 10.5 = 252px)
  const scale = 10.5;
  const iconPixelSize = 24 * scale;
  const offset = (size - iconPixelSize) / 2; // 중앙 정렬 오프셋

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- 1. 원형 배경 (부드러운 살구색 및 은은한 테두리) -->
  <circle cx="256" cy="256" r="236" fill="${CONFIG.circleBg}" stroke="${CONFIG.circleBorder}" stroke-width="8" />

  <!-- 2. 중앙 Lucide Mail 편지 봉투 아이콘 -->
  <g transform="translate(${offset}, ${offset}) scale(${scale})">
    <!-- 편지 몸체 사각형 (부드러운 라운드 모서리) -->
    <rect width="20" height="16" x="2" y="4" rx="2" fill="none" stroke="${CONFIG.brandCoral}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <!-- 편지 덮개 V자 라인 -->
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="${CONFIG.brandCoral}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;
}

/**
 * 2. 솔리드 배경 아이콘 SVG 생성 함수
 * 
 * @purpose iOS Safari Apple Touch Icon 및 Android Adaptive Icon(Maskable)에 사용
 * @features
 * - [중요] iOS Safari 홈 화면에 바로가기 추가 시, PNG에 투명 채널이 있으면 검은색(Black)으로 채워지는 문제가 발생합니다.
 *   이를 방지하기 위해 전체 캔버스를 앱 테마 배경색(CONFIG.appThemeBg)으로 채웁니다.
 * - 모바일 OS에서 아이콘을 원형/모서리 둥근 사각형(Squircle)으로 자를 때 내용물이 잘리지 않도록
 *   안전 영역(Safe Zone, 중심부 80% 이내)에 맞춰 스케일을 소폭 축소(scale 9)하여 배치합니다.
 */
function getSolidBackgroundSvg() {
  const size = CONFIG.canvasSize; // 512px

  // 모바일 OS 마스크에 잘리지 않도록 약간 더 여백을 확보 (Safe Area 80% 규격)
  const scale = 9;
  const iconPixelSize = 24 * scale;
  const offset = (size - iconPixelSize) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <!-- 1. 캔버스 전체를 채우는 앱 테마 배경 (iOS 투명 영역 검게 변하는 현상 방지) -->
  <rect width="${size}" height="${size}" rx="0" fill="${CONFIG.appThemeBg}" />

  <!-- 2. 중앙 살구색 원형 엠블럼 -->
  <circle cx="256" cy="256" r="210" fill="${CONFIG.circleBg}" stroke="${CONFIG.circleBorder}" stroke-width="7" />

  <!-- 3. 중앙 편지 봉투 심볼 -->
  <g transform="translate(${offset}, ${offset}) scale(${scale})">
    <rect width="20" height="16" x="2" y="4" rx="2" fill="none" stroke="${CONFIG.brandCoral}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="${CONFIG.brandCoral}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </g>
</svg>`;
}

/**
 * 3. 표준 Multi-size Windows/Browser ICO 바이너리 생성기
 * 
 * @param {Array<{ width: number, height: number, buffer: Buffer }>} pngBuffers 
 * @returns {Buffer} 합쳐진 단일 .ico 바이너리 버퍼
 * 
 * @spec
 * Microsoft ICO 파일 포맷 구조:
 * - Header (6 bytes):
 *   - [0-1] Reserved (0)
 *   - [2-3] Resource Type (1 = Icon)
 *   - [4-5] Image Count (포함된 이미지 개수)
 * - Directory Entries (이미지당 16 bytes):
 *   - [0] Width (px, 256은 0으로 표기)
 *   - [1] Height (px)
 *   - [2] Color Count (0 for 32bpp)
 *   - [3] Reserved (0)
 *   - [4-5] Color Planes (1)
 *   - [6-7] Bits per Pixel (32)
 *   - [8-11] Image Data Size (바이트 길이)
 *   - [12-15] Image Data Offset (파일 시작점으로부터의 오프셋)
 * - Raw Image Data: 현대 모든 모던 브라우저 및 Windows Vista 이상에서 지원하는 PNG 압축 바이너리 직접 임베딩
 */
function createIco(pngBuffers) {
  const count = pngBuffers.length;

  // 1. ICONDIR 헤더 생성 (6 bytes)
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);     // 예약 필드 (항상 0)
  header.writeUInt16LE(1, 2);     // 1 = Icon 포맷
  header.writeUInt16LE(count, 4); // 포함된 이미지 개수

  // 2. 각 이미지의 메타데이터 엔트리 생성
  let offset = 6 + 16 * count;
  const entries = [];

  for (const item of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(item.width >= 256 ? 0 : item.width, 0);   // 가로 크기
    entry.writeUInt8(item.height >= 256 ? 0 : item.height, 1); // 세로 크기
    entry.writeUInt8(0, 2);                                   // 팔레트 색상 수 (32비트 트루컬러는 0)
    entry.writeUInt8(0, 3);                                   // 예약 필드
    entry.writeUInt16LE(1, 4);                                // 컬러 플레인
    entry.writeUInt16LE(32, 6);                               // 픽셀당 비트 수 (32-bit RGBA)
    entry.writeUInt32LE(item.buffer.length, 8);               // PNG 이미지 바이트 크기
    entry.writeUInt32LE(offset, 12);                          // 파일 내 시작 오프셋
    entries.push(entry);

    offset += item.buffer.length;
  }

  // 3. 헤더 + 엔트리 목록 + 각 이미지 PNG 바이트 결합
  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buffer)]);
}

/**
 * 4. 메인 실행 파이프라인
 */
async function main() {
  console.log('🚀 [Busan Dayori] 아이콘 및 파비콘 생성을 시작합니다...\n');

  const root = process.cwd();
  const publicDir = path.join(root, 'public');
  const publicIconsDir = path.join(publicDir, 'icons');
  const appDir = path.join(root, 'src', 'app');

  // public/icons 디렉터리가 없으면 자동 생성
  if (!fs.existsSync(publicIconsDir)) {
    fs.mkdirSync(publicIconsDir, { recursive: true });
  }

  // 1단계: 마스터 SVG 템플릿 준비
  const svgCircle = getTransparentCircleSvg();
  const svgSolid = getSolidBackgroundSvg();
  const circleBuf = Buffer.from(svgCircle);
  const solidBuf = Buffer.from(svgSolid);

  // 2단계: 최신 모던 브라우저용 벡터 파비콘(SVG) 저장
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgCircle);
  console.log('  ✓ public/favicon.svg (벡터 파비콘 저장 완료)');

  // 3단계: Sharp를 통해 필요한 모든 해상도의 PNG 버퍼 비동기 래스터라이징
  const [
    png16,
    png32,
    png48,
    png180,
    png192,
    png512,
    png512Maskable,
  ] = await Promise.all([
    sharp(circleBuf).resize(16, 16).png().toBuffer(),           // 파비콘 소형
    sharp(circleBuf).resize(32, 32).png().toBuffer(),           // 파비콘 표준
    sharp(circleBuf).resize(48, 48).png().toBuffer(),           // 파비콘 고해상도
    sharp(solidBuf).resize(180, 180).png().toBuffer(),          // iOS Apple Touch Icon
    sharp(circleBuf).resize(192, 192).png().toBuffer(),         // 안드로이드 홈 화면 바로가기
    sharp(circleBuf).resize(512, 512).png().toBuffer(),         // PWA 스플래시 / 고해상도 앱 아이콘
    sharp(solidBuf).resize(512, 512).png().toBuffer(),          // 안드로이드 적응형 마스크 아이콘
  ]);

  // 4단계: 16px, 32px, 48px를 묶은 멀티사이즈 favicon.ico 생성
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  // 5단계: Next.js App Router 위치에 파일 저장
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(appDir, 'icon.png'), png512);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), png180);
  console.log('  ✓ src/app/favicon.ico, icon.png, apple-icon.png (Next.js 메타 아이콘 저장 완료)');

  // 6단계: public/ 디렉터리에 웹 호환 및 PWA 매니페스트 아이콘 저장
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(publicIconsDir, 'icon-192.png'), png192);
  fs.writeFileSync(path.join(publicIconsDir, 'icon-512.png'), png512);
  fs.writeFileSync(path.join(publicIconsDir, 'icon-maskable-512.png'), png512Maskable);
  fs.writeFileSync(path.join(publicIconsDir, 'apple-touch-icon.png'), png180);
  console.log('  ✓ public/icons/ (PWA/바로가기 설치용 표준 아이콘 세트 저장 완료)');

  console.log('\n🎉 모든 아이콘 및 파비콘 생성이 성공적으로 완료되었습니다!');
}

main().catch((err) => {
  console.error('❌ 아이콘 생성 중 오류가 발생했습니다:', err);
  process.exit(1);
});
