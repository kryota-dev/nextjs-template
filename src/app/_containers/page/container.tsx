import 'server-only'

import { loggerError } from '@/libs/logger'
import { getList } from '@/libs/microcms'

import { HomePagePresentation } from './presentation'

export async function HomePageContainer() {
  // 最新ニュースを取得（3件）
  const newsResponse = await getList('news', {
    limit: 3,
    orders: '-publishedAt',
  }).catch((e) => {
    loggerError({
      e,
      __filename,
      fnName: 'HomePageContainer',
    })
    throw new Error('ニュースの取得に失敗しました')
  })

  // プロフィールを取得（4件）
  const profilesResponse = await getList('profiles', {
    limit: 4,
    orders: '-publishedAt',
  }).catch((e) => {
    loggerError({
      e,
      __filename,
      fnName: 'HomePageContainer',
    })
    throw new Error('プロフィールの取得に失敗しました')
  })

  return (
    <HomePagePresentation
      latestNews={newsResponse.contents}
      featuredProfiles={profilesResponse.contents}
    />
  )
}
