import type { NewsCategoriesContent } from './newsCategories'
import type { MicroCMSImage, MicroCMSListContent } from 'microcms-js-sdk'

export interface NewsContent extends MicroCMSListContent {
  title: string
  thumbnail: MicroCMSImage
  category: NewsCategoriesContent
  content: string
  pdf?: {
    url: string
    fileSize: number
  }
}
