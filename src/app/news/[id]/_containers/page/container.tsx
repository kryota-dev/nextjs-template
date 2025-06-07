import 'server-only'

import { loggerError } from '@/libs/logger'
import { getContent } from '@/libs/microcms'

import { NewsDetailPagePresentation } from './presentation'

type Props = {
  id: string
}

/**
 * NewsDetailPageContainer
 * @description ニュース詳細ページのデータ取得とロジック処理を行うコンテナコンポーネント
 */
export const NewsDetailPageContainer = async ({ id }: Props) => {
  const news = await getContent('news', id).catch((e) => {
    loggerError({
      e,
      __filename,
      fnName: 'NewsDetailPageContainer',
    })
    throw new Error('ニュースの取得に失敗しました')
  })

  return <NewsDetailPagePresentation news={news} />
}
