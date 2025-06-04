import { getPosts, getPostComments } from '@/libs/jsonplaceholder'

import { PostsPagePresentation } from './presentation'

export async function PostsPageContainer() {
  try {
    const posts = await getPosts()

    // 各投稿のコメント数を取得（最初の10件のみ）
    const displayPosts = posts.slice(0, 10)
    const postsWithCommentCount = await Promise.all(
      displayPosts.map(async (post) => {
        try {
          const comments = await getPostComments(post.id)
          return { ...post, commentCount: comments.length }
        } catch {
          // エラーが発生した場合はコメント数を0とする
          return { ...post, commentCount: 0 }
        }
      }),
    )

    return <PostsPagePresentation posts={postsWithCommentCount} />
  } catch {
    // エラーが発生した場合は空の配列とエラーメッセージを渡す
    return <PostsPagePresentation posts={[]} error='記事の取得に失敗しました' />
  }
}
