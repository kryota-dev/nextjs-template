import { loggerError } from '@/libs/logger'
import { getAllContentIds } from '@/libs/microcms'

import { NewsDetailPageContainer } from './_containers/page'

type Params = { id: string }

/**
 * 静的生成用のパラメータを生成
 */
export async function generateStaticParams(): Promise<Params[]> {
  const contentIds = await getAllContentIds('news')
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
      throw new Error('ニュースの取得に失敗しました')
    })
  return contentIds.map((id) => ({
    id,
  }))
}

type Props = {
  params: Promise<Params>
}

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params
  return <NewsDetailPageContainer id={id} />
}
