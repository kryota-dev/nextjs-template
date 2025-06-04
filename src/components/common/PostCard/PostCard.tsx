import Link from 'next/link'

import type { Post } from '@/libs/jsonplaceholder'

interface PostCardProps {
  post: Post
  commentCount?: number
  showExcerpt?: boolean
}

export function PostCard({
  post,
  commentCount,
  showExcerpt = true,
}: PostCardProps) {
  return (
    <div className='rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg'>
      <div className='space-y-3'>
        <h2 className='line-clamp-2 text-xl font-semibold text-gray-900'>
          <Link
            href={`/posts/${post.id}`}
            className='transition-colors hover:text-blue-600'
          >
            {post.title}
          </Link>
        </h2>

        {showExcerpt && (
          <p className='line-clamp-3 text-gray-600'>
            {post.body.length > 100
              ? `${post.body.slice(0, 100)}...`
              : post.body}
          </p>
        )}

        <div className='flex items-center justify-between text-sm text-gray-500'>
          <span>投稿者ID: {post.userId}</span>
          {commentCount !== undefined && (
            <span className='flex items-center'>
              <svg
                className='mr-1 h-4 w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              {commentCount}件のコメント
            </span>
          )}
        </div>

        <div className='pt-3'>
          <Link
            href={`/posts/${post.id}`}
            className='inline-flex items-center text-blue-600 transition-colors hover:text-blue-800'
          >
            詳細を見る
            <svg
              className='ml-1 h-4 w-4'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
