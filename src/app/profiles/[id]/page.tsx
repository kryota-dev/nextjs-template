import { loggerError } from '@/libs/logger'
import { getAllContentIds } from '@/libs/microcms'

import { ProfileDetailPageContainer } from './_containers/page'

type Params = { id: string }

/**
 * 静的生成用のパラメータを生成
 */
export async function generateStaticParams(): Promise<Params[]> {
  const contentIds = await getAllContentIds('profiles')
    .then((res) => {
      if (res.length === 0) throw new Error()
      return res
    })
    .catch((e) => {
      loggerError({
        e,
        __filename,
        fnName: 'generateStaticParams',
      })
      throw new Error('プロフィールの取得に失敗しました')
    })
  return contentIds.map((id) => ({
    id,
  }))
}

type Props = {
  params: Promise<Params>
}

export default async function ProfileDetailPage({ params }: Props) {
  const { id } = await params
  return <ProfileDetailPageContainer id={id} />
}
