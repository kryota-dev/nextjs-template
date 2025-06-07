import { HOME_URL } from '@/constants/HOME_URL'

import { setupMswRsc } from '@/libs/msw/setupMswRsc'

import type { MetadataRoute } from 'next'

await setupMswRsc(__filename)

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // TODO: サイト公開時にallowに変更する
      disallow: '/',
      crawlDelay: 1, // クロール制限（1秒ごとに1回）
    },
    sitemap: `${HOME_URL}sitemap.xml`,
  }
}
