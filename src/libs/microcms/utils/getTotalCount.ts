import { getAllContentIds } from '../microcms'

import type { Endpoints } from '../types'
import type { MicroCMSQueries } from 'microcms-js-sdk'

/**
 * 全コンテンツ数を取得
 * @param endpoint エンドポイント
 * @param filters フィルター
 * @returns 全コンテンツ数
 */
export const getTotalCount = async <T extends Endpoints>(
  endpoint: T,
  filters?: MicroCMSQueries['filters'],
) => {
  const totalCount = await getAllContentIds(endpoint, filters).then(
    (res) => res.length,
  )
  return totalCount
}
