import type { Comment } from '@/libs/jsonplaceholder'

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className='py-8 text-center text-gray-500'>
        コメントはまだありません
      </div>
    )
  }

  return (
    <div className='space-y-4'>
      <h3 className='mb-4 text-lg font-semibold text-gray-900'>
        コメント ({comments.length}件)
      </h3>

      {comments.map((comment) => (
        <div
          key={comment.id}
          className='rounded-lg border border-gray-200 bg-gray-50 p-4'
        >
          <div className='mb-2 flex items-start justify-between'>
            <div>
              <h4 className='font-medium text-gray-900'>{comment.name}</h4>
              <p className='text-sm text-gray-500'>{comment.email}</p>
            </div>
          </div>
          <p className='leading-relaxed text-gray-700'>{comment.body}</p>
        </div>
      ))}
    </div>
  )
}
