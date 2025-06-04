import Link from 'next/link'

import { PostForm } from '@/components/common/PostForm'

interface NewPostPagePresentationProps {
  onSubmit: (data: { title: string; body: string }) => Promise<void>
  isLoading: boolean
}

export function NewPostPagePresentation({
  onSubmit,
  isLoading,
}: NewPostPagePresentationProps) {
  return (
    <div className='mx-auto max-w-2xl space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900'>新規投稿</h1>
        <Link
          href='/posts'
          className='text-gray-600 transition-colors hover:text-gray-900'
        >
          ← 記事一覧に戻る
        </Link>
      </div>

      <div className='rounded-lg bg-white p-6 shadow-md'>
        <PostForm
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitLabel='投稿を作成'
        />
      </div>
    </div>
  )
}
