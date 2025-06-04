import { EditPostPageContainer } from './_containers/page'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  return <EditPostPageContainer id={parseInt(id, 10)} />
}
