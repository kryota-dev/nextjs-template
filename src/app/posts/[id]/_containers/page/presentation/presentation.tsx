import Link from 'next/link'

import { CommentList } from '@/components/common/CommentList'

import type { Post, Comment } from '@/libs/jsonplaceholder'

interface PostDetailPagePresentationProps {
  post: Post | null
  comments: Comment[]
  error?: string
}

export function PostDetailPagePresentation({
  post,
  comments,
  error,
}: PostDetailPagePresentationProps) {
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
    <div className='mx-auto max-w-4xl space-y-8'>
      {/* ナビゲーション */}
      <div className='flex items-center justify-between'>
        <Link
          href='/posts'
          className='text-gray-600 transition-colors hover:text-gray-900'
        >
          ← 記事一覧に戻る
        </Link>
        <div className='flex space-x-2'>
          <Link
            href={`/posts/${post.id}/edit`}
            className='rounded bg-yellow-600 px-3 py-1 text-sm text-white transition-colors hover:bg-yellow-700'
          >
            編集
          </Link>
          <Link
            href={`/posts/${post.id}/delete`}
            className='rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700'
          >
            削除
          </Link>
        </div>
      </div>

      {/* 記事詳細 */}
      <article className='rounded-lg bg-white p-8 shadow-md'>
        <header className='mb-6'>
          <h1 className='mb-4 text-3xl font-bold text-gray-900'>
            {post.title}
          </h1>
          <div className='text-sm text-gray-500'>投稿者ID: {post.userId}</div>
        </header>

        <div className='prose max-w-none'>
          <p className='leading-relaxed whitespace-pre-wrap text-gray-700'>
            {post.body}
          </p>
        </div>
      </article>

      {/* コメント一覧 */}
      <div className='rounded-lg bg-white p-8 shadow-md'>
        <CommentList comments={comments} />
      </div>
    </div>
  )
}
