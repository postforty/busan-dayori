import type { Metadata } from 'next';
import './globals.css';
import { Suspense } from 'react';
import Header from '@/components/common/Header';
import BottomNav from '@/components/common/BottomNav';
import GlobalToast from '@/components/common/GlobalToast';

export const metadata: Metadata = {
  title: '釜山だより (Busan Dayori) | 日本語を勉強中の釜山っ子のリアル旅便り',
  description:
    '釜山在住の韓国人が日本語を勉強しながら綴る、リアルな釜山ローカル旅ブログ。テジクッパや隠れ家カフェ、指差し韓国語会話、方言プチノートまで！',
  keywords: [
    '釜山旅行',
    '釜山グルメ',
    '韓国旅行',
    '釜山一人旅',
    'テジクッパ',
    '指差し会話',
    '釜山方言',
    '釜山だより'
  ],
  openGraph: {
    title: '釜山だより (Busan Dayori) | 日本語勉強中の釜山っ子がお届けする旅便り',
    description: '釜山在住の韓国人が届ける、ローカルな旅のお便り。本当におすすめしたい行きつけの店と実戦の旅のヒント！',
    url: 'https://trip-to-busan.vercel.app',
    siteName: '釜山だより',
    locale: 'ja_JP',
    type: 'website'
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/manifest.webmanifest'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FBF9F5] text-[#2D3748] antialiased selection:bg-[#E07A5F]/20 selection:text-[#E07A5F]">
        <div className="w-full max-w-xl mx-auto min-h-screen flex flex-col bg-white shadow-sm border-x border-[#EDE8E1]">
          <Suspense fallback={null}>
            <GlobalToast />
          </Suspense>
          <Header />
          <main className="flex-1 pb-24">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
