import { PostCard } from '@/components/common/PostCard'

import type { Post } from '@/libs/jsonplaceholder'

type Props = {
  posts: (Post & { commentCount: number })[]
  error?: string
}

export function HomePagePresentation({ posts, error }: Props) {
  if (error) {
    return (
      <div className='py-12 text-center'>
        <div className='text-lg text-red-600'>{error}</div>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <div className='text-center'>
        <h1 className='mb-4 text-3xl font-bold text-gray-900'>
          ブログアプリへようこそ
        </h1>
        <p className='mx-auto max-w-2xl text-lg text-gray-600'>
          最新の記事をお楽しみください。気になる記事があれば詳細をご覧ください。
        </p>
      </div>

      <div className='border-t border-gray-200 pt-8'>
        <h2 className='mb-6 text-2xl font-semibold text-gray-900'>新着記事</h2>

        {posts.length === 0 ? (
          <div className='py-12 text-center text-gray-500'>
            記事がありません
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                commentCount={post.commentCount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
