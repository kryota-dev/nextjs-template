import { DeletePostPageContainer } from './_containers/page'

interface DeletePostPageProps {
  params: Promise<{ id: string }>
}

export default async function DeletePostPage({ params }: DeletePostPageProps) {
  const { id } = await params
  return <DeletePostPageContainer id={parseInt(id, 10)} />
}
