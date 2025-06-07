import 'server-only'

import { loggerError } from '@/libs/logger'
import { getList } from '@/libs/microcms'

import { NewsListPagePresentation } from './presentation'

/**
 * NewsListPageContainer
 * @description ニュース一覧ページのデータ取得とロジック処理を行うコンテナコンポーネント
 */
export const NewsListPageContainer = async () => {
  const newsResponse = await getList('news', {
    limit: 10,
    orders: '-updatedAt',
  }).catch((e) => {
    loggerError({
      e,
      __filename,
      fnName: 'NewsListPageContainer',
    })
    throw new Error('ニュースの取得に失敗しました')
  })

  return (
    <NewsListPagePresentation
      news={newsResponse.contents}
      totalCount={newsResponse.totalCount}
    />
  )
}
