import { getPost, getPostComments } from '@/libs/jsonplaceholder'

import { PostDetailPagePresentation } from './presentation'

interface PostDetailPageContainerProps {
  id: number
}

export async function PostDetailPageContainer({
  id,
}: PostDetailPageContainerProps) {
  try {
    const [post, comments] = await Promise.all([
      getPost(id),
      getPostComments(id),
    ])

    return <PostDetailPagePresentation post={post} comments={comments} />
  } catch {
    // エラーが発生した場合はnullとエラーメッセージを渡す
    return (
      <PostDetailPagePresentation
        post={null}
        comments={[]}
        error='記事の取得に失敗しました'
      />
    )
  }
}
