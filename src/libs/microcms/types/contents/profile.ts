import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export interface ProfileContent extends MicroCMSListContent {
  /** 名前 */
  name: string
  /** 写真 */
  photo?: MicroCMSImage
  /** 自己紹介 */
  introduce?: string
  /** 生年月日 */
  birth_date?: string
  /** 出身地 */
  birth_place?: string
  /** 経歴 */
  career?: string
  /** 趣味 */
  hobby?: string
}
