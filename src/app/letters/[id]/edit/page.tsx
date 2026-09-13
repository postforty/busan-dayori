import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PenSquare, ShieldAlert } from 'lucide-react'
import { getServerUser } from '@/lib/supabase/server-auth'
import { getLetterById } from '@/lib/supabase/queries'
import LetterEditorForm from '@/components/admin/LetterEditorForm'

export const dynamic = 'force-dynamic'

interface EditLetterPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({
  params,
}: EditLetterPageProps): Promise<Metadata> {
  const { id } = await params
  const letter = await getLetterById(id)
  return {
    title: letter ? `편지 수정: ${letter.title} | 부산 다요리` : '편지 수정',
  }
}

export default async function EditLetterPage({ params }: EditLetterPageProps) {
  const { id } = await params
  const { user, isAdmin } = await getServerUser()

  if (!user || !isAdmin) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-xl font-bold text-marine-navy mb-2">관리자 인증이 필요합니다</h1>
        <p className="text-xs text-marine-ink/70 mb-6 leading-relaxed">
          편지를 수정하려면 관리자 권한을 가진 Google 계정으로 로그인해야 합니다.
        </p>
        <Link
          href={`/letters/${id}`}
          className="inline-flex items-center px-4 py-2 bg-marine-blue text-white rounded-xl text-xs font-semibold hover:bg-marine-navy transition-colors"
        >
          해당 편지로 돌아가기
        </Link>
      </div>
    )
  }

  const letter = await getLetterById(id)
  if (!letter) {
    return notFound()
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#E07A5F] text-xs font-bold tracking-wide mb-2 border border-[#F4DDD4]">
          <PenSquare className="w-3.5 h-3.5" />
          <span>お便りの編集</span>
        </div>
        <h1 className="text-2xl font-bold text-[#2D3748]">
          편지 내용 수정하기
        </h1>
        <p className="text-xs text-[#718096] mt-1.5 leading-relaxed">
          기존에 발행된 편지의 본문, 학습 포인트, 사진, 장소 정보를 수정합니다.
        </p>
      </div>

      <LetterEditorForm initialData={letter} isEdit={true} />
    </div>
  )
}
