import type { BtnTypeContent } from './btnType'
import type { NewsContent } from './news'
import type { NewsCategoriesContent } from './newsCategories'
import type { ProfileContent } from './profile'

export type {
  BtnTypeContent,
  ProfileContent,
  NewsContent,
  NewsCategoriesContent,
}

/** microCMSのAPIレスポンス */
export interface Responses {
  /** お知らせ */
  news: NewsContent
  /** プロフィール */
  profiles: ProfileContent
  /** ボタンの種類 */
  btn_type: BtnTypeContent
}

/** microCMSのAPIエンドポイント */
export type Endpoints = keyof Responses
