import Link from 'next/link'

import type { Post } from '@/libs/jsonplaceholder'

interface DeletePostPagePresentationProps {
  post: Post | null
  onDelete: () => Promise<void>
  isLoading: boolean
  isLoadingPost: boolean
  error: string | null
}

export function DeletePostPagePresentation({
  post,
  onDelete,
  isLoading,
  isLoadingPost,
  error,
}: DeletePostPagePresentationProps) {
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
        <h1 className='text-3xl font-bold text-gray-900'>記事を削除</h1>
        <Link
          href={`/posts/${post.id}`}
          className='text-gray-600 transition-colors hover:text-gray-900'
        >
          ← 記事詳細に戻る
        </Link>
      </div>

      <div className='rounded-lg bg-white p-6 shadow-md'>
        <div className='space-y-6'>
          <div className='rounded-md border border-red-200 bg-red-50 p-4'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-red-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-red-800'>削除の確認</h3>
                <div className='mt-2 text-sm text-red-700'>
                  <p>
                    この操作は取り消すことができません。本当に削除しますか？
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-md border bg-gray-50 p-4'>
            <h3 className='mb-2 font-medium text-gray-900'>削除対象の記事</h3>
            <h4 className='mb-2 text-lg font-semibold text-gray-800'>
              {post.title}
            </h4>
            <p className='line-clamp-3 text-gray-600'>
              {post.body.length > 150
                ? `${post.body.slice(0, 150)}...`
                : post.body}
            </p>
          </div>

          <div className='flex justify-end space-x-3'>
            <Link
              href={`/posts/${post.id}`}
              className='rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50'
            >
              キャンセル
            </Link>
            <button
              type='button'
              onClick={onDelete}
              disabled={isLoading}
              className='rounded-md bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
            >
              {isLoading ? '削除中...' : '削除する'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
