import Link from 'next/link'

import { PostCard } from '@/components/common/PostCard'

import type { Post } from '@/libs/jsonplaceholder'

interface PostsPagePresentationProps {
  posts: (Post & { commentCount: number })[]
  error?: string
}

export function PostsPagePresentation({
  posts,
  error,
}: PostsPagePresentationProps) {
  if (error) {
    return (
      <div className='py-12 text-center'>
        <div className='text-lg text-red-600'>{error}</div>
      </div>
    )
  }

  return (
    <div className='space-y-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold text-gray-900'>記事一覧</h1>
        <Link
          href='/posts/new'
          className='rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700'
        >
          新規投稿
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className='py-12 text-center text-gray-500'>記事がありません</div>
      ) : (
        <div className='grid gap-6 md:grid-cols-2'>
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
  )
}
