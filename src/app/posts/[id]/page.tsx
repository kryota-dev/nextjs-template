import { getPosts } from '@/libs/jsonplaceholder'

import { PostDetailPageContainer } from './_containers/page'

interface PostDetailPageProps {
  params: Promise<{ id: string }>
}

/**
 * 静的生成用のパラメータを生成
 */
export async function generateStaticParams() {
  try {
    const posts = await getPosts()
    return posts.map((post) => ({
      id: post.id.toString(),
    }))
  } catch {
    // エラーが発生した場合は空配列を返して、dynamic renderingにフォールバック
    return []
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params
  return <PostDetailPageContainer id={parseInt(id, 10)} />
}
