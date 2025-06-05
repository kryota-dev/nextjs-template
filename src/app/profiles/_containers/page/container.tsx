import 'server-only'

import { loggerError } from '@/libs/logger'
import { getList } from '@/libs/microcms'

import { ProfileListPagePresentation } from './presentation'

/**
 * ProfileListPageContainer
 * @description プロフィール一覧ページのデータ取得とロジック処理を行うコンテナコンポーネント
 */
export const ProfileListPageContainer = async () => {
  const profilesResponse = await getList('profiles', {
    limit: 10,
    orders: '-publishedAt',
  }).catch((e) => {
    loggerError({
      e,
      __filename,
      fnName: 'ProfileListPageContainer',
    })
    throw new Error('プロフィールの取得に失敗しました')
  })

  return (
    <ProfileListPagePresentation
      profiles={profilesResponse.contents}
      totalCount={profilesResponse.totalCount}
    />
  )
}
