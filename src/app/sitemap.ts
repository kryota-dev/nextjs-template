import { HOME_URL } from '@/constants/HOME_URL'

import { getNewerDate, toISOFormat } from '@/libs/dateUtils/dateUtils'
import { loggerError } from '@/libs/logger'
import { getList } from '@/libs/microcms'
import { setupMswRsc } from '@/libs/msw/setupMswRsc'

import type { MetadataRoute } from 'next'

await setupMswRsc(__filename)

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  /**
   * 静的サイトマップ
   */
  const staticSiteMap = [] as const satisfies MetadataRoute.Sitemap

  /**
   * 動的サイトマップ
   */
  const dynamicSiteMap: MetadataRoute.Sitemap = []

  // ニュースを取得
  const news = await getList('news', {
    orders: 'publishedAt',
  }).catch((e) => {
    loggerError({
      e,
      __filename,
      fnName: 'sitemap',
    })
    throw new Error('ニュースの取得に失敗しました')
  })

  // プロフィールを取得
  const profiles = await getList('profiles', {
    orders: 'updatedAt',
  }).catch((e) => {
    loggerError({
      e,
      __filename,
      fnName: 'sitemap',
    })
    throw new Error('プロフィールの取得に失敗しました')
  })

  // 最新ニュースの更新日時
  const newsUpdatedAt = news.contents.slice(-1)[0].updatedAt
  // 最新プロフィールの更新日時
  const profileUpdatedAt = profiles.contents.slice(-1)[0].updatedAt

  /** トップページのサイトマップ */
  dynamicSiteMap.push({
    url: HOME_URL,
    changeFrequency: 'daily',
    priority: 1,
    lastModified: getNewerDate(newsUpdatedAt, profileUpdatedAt),
  })

  /** ニュースのサイトマップ */
  dynamicSiteMap.push({
    url: `${HOME_URL}news`,
    changeFrequency: 'daily',
    priority: 0.5,
    lastModified: toISOFormat(newsUpdatedAt),
  })

  // ニュース詳細ページのサイトマップ
  news.contents.forEach((news) => {
    dynamicSiteMap.push({
      url: `${HOME_URL}news/${news.id}`,
      changeFrequency: 'daily',
      priority: 0.8,
      lastModified: toISOFormat(news.updatedAt),
    })
  })

  /** プロフィールのサイトマップ */
  dynamicSiteMap.push({
    url: `${HOME_URL}profiles`,
    changeFrequency: 'daily',
    priority: 0.5,
    lastModified: toISOFormat(profileUpdatedAt),
  })

  // プロフィール詳細ページのサイトマップ
  profiles.contents.forEach((profile) => {
    dynamicSiteMap.push({
      url: `${HOME_URL}profiles/${profile.id}`,
      changeFrequency: 'daily',
      priority: 0.8,
      lastModified: toISOFormat(profile.updatedAt),
    })
  })

  return [...staticSiteMap, ...dynamicSiteMap]
}
