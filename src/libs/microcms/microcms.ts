import { client } from './client'

import type { Endpoints, Responses } from './types'
import type { MicroCMSQueries } from 'microcms-js-sdk'

/**
 * microCMSからリストを取得
 * @param endpoint エンドポイント
 * @param queries クエリパラメータ
 * @returns APIレスポンス
 */
export const getList = async <T extends Endpoints>(
  endpoint: T,
  queries?: MicroCMSQueries,
) => await client.getList<Responses[T]>({ endpoint, queries })

/**
 * microCMSからオブジェクトを取得
 * @param endpoint エンドポイント
 * @param queries クエリパラメータ
 * @returns APIレスポンス
 */
export const getObject = async <T extends Endpoints>(
  endpoint: T,
  queries?: MicroCMSQueries,
) => await client.get<Responses[T]>({ endpoint, queries })

/**
 * microCMSからコンテンツを取得
 * @param endpoint エンドポイント
 * @param contentId コンテンツID
 * @param queries クエリパラメータ
 * @returns APIレスポンス
 */
export const getContent = async <T extends Endpoints>(
  endpoint: T,
  contentId: string,
  queries?: MicroCMSQueries,
) => await client.get<Responses[T]>({ endpoint, contentId, queries })

/**
 * microCMSから全コンテンツを取得（101件以上可）
 * @param endpoint エンドポイント
 * @param queries クエリパラメータ
 * @returns APIレスポンス
 */
export const getAllContents = async <T extends Endpoints>(
  endpoint: T,
  queries?: MicroCMSQueries,
) => await client.getAllContents<Responses[T]>({ endpoint, queries })

/**
 * microCMSから全コンテンツIDを取得（101件以上可）
 * @param endpoint エンドポイント
 * @param filters フィルター
 * @returns APIレスポンス
 */
export const getAllContentIds = async <T extends Endpoints>(
  endpoint: T,
  filters?: MicroCMSQueries['filters'],
) => await client.getAllContentIds({ endpoint, filters })
