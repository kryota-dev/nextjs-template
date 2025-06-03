import type { MicroCMSListContent } from 'microcms-js-sdk'

export interface BtnTypeContent extends MicroCMSListContent {
  /** ボタン名 */
  name: string
  /** ボタンの種類 */
  variant: 'primary' | 'secondary'
}
