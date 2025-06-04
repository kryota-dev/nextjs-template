import 'server-only'

import { getPosts, getPostComments } from '@/libs/jsonplaceholder'

import { HomePagePresentation } from './presentation'

export async function HomePageContainer() {
  try {
    const posts = await getPosts()
    const topPosts = posts.slice(0, 5)

    // 各投稿のコメント数を取得
    const postsWithCommentCount = await Promise.all(
      topPosts.map(async (post) => {
        try {
          const comments = await getPostComments(post.id)
          return { ...post, commentCount: comments.length }
        } catch {
          // エラーが発生した場合はコメント数を0とする
          return { ...post, commentCount: 0 }
        }
      }),
    )

    return <HomePagePresentation posts={postsWithCommentCount} />
  } catch {
    // エラーが発生した場合は空の配列とエラーメッセージを渡す
    return <HomePagePresentation posts={[]} error='記事の取得に失敗しました' />
  }
}
