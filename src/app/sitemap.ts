import { HOME_URL } from '@/constants/HOME_URL'

import { getCurrentDate, toISOFormat } from '@/libs/dateUtils/dateUtils'

import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /**
   * 静的ルート
   */
  const staticPageRoutes = [
    {
      url: HOME_URL,
      lastModified: toISOFormat(getCurrentDate()),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ] as const satisfies MetadataRoute.Sitemap

  /**
   * 動的ルート
   */
  const dynamicPageRoutes: MetadataRoute.Sitemap = []

  // TODO: 動的ルートを追加する

  return [...staticPageRoutes, ...dynamicPageRoutes]
}
