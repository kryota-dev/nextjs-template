import Link from 'next/link'

import { PostForm } from '@/components/common/PostForm'

import type { Post } from '@/libs/jsonplaceholder'

interface EditPostPagePresentationProps {
  post: Post | null
  onSubmit: (data: { title: string; body: string }) => Promise<void>
  isLoading: boolean
  isLoadingPost: boolean
  error: string | null
}

export function EditPostPagePresentation({
  post,
  onSubmit,
  isLoading,
  isLoadingPost,
  error,
}: EditPostPagePresentationProps) {
  if (isLoadingPost) {
    return (
      <div className='py-12 text-center'>
        <div className='text-gray-600'>記事を読み込み中...</div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className='py-12 text-center'>
        <div className='text-lg text-red-600'>
          {error || '記事が見つかりません'}
        </div>
        <Link
          href='/posts'
          className='mt-4 inline-block text-blue-600 transition-colors hover:text-blue-800'
        >
          ← 記事一覧に戻る
        </Link>
      </div>
    )
  }

  return (
    <div className='mx-auto max-w-2xl space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900'>記事を編集</h1>
        <Link
          href={`/posts/${post.id}`}
          className='text-gray-600 transition-colors hover:text-gray-900'
        >
          ← 記事詳細に戻る
        </Link>
      </div>

      <div className='rounded-lg bg-white p-6 shadow-md'>
        <PostForm
          post={post}
          onSubmit={onSubmit}
          isLoading={isLoading}
          submitLabel='記事を更新'
        />
      </div>
    </div>
  )
}
