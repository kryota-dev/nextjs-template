import { PostDetailPageContainer } from './_containers/page'

interface PostDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params
  return <PostDetailPageContainer id={parseInt(id, 10)} />
}
