import { Metadata } from 'next'
import { getServerUser } from '@/lib/supabase/server-auth'
import LetterEditorForm from '@/components/admin/LetterEditorForm'
import { PenTool, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '새 편지 쓰기 | 부산 다요리',
  description: '새로운 부산 로컬 편지를 작성하고 공유합니다.',
}

export default async function NewLetterPage() {
  const { user, isAdmin } = await getServerUser()

  if (!user || !isAdmin) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-marine-navy mb-2">관리자 인증이 필요합니다</h1>
        <p className="text-xs text-marine-ink/70 mb-6 leading-relaxed">
          새 편지를 작성하려면 관리자 권한을 가진 Google 계정으로 로그인해야 합니다.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-marine-blue text-white rounded-xl text-xs font-semibold hover:bg-marine-navy transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#E07A5F] text-xs font-bold tracking-wide mb-2 border border-[#F4DDD4]">
          <PenTool className="w-3.5 h-3.5" />
          <span>釜山のお便り作成</span>
        </div>
        <h1 className="text-2xl font-bold text-[#2D3748]">
          새 로컬 편지 쓰기
        </h1>
        <p className="text-xs text-[#718096] mt-1.5 leading-relaxed">
          부산의 생생한 풍경과 추천 장소, 유용한 일본어 표현을 담은 따뜻한 편지를 써보세요.
        </p>
      </div>

      <LetterEditorForm />
    </div>
  )
}
