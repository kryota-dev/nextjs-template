import 'server-only'

import { loggerError } from '@/libs/logger'
import { getContent } from '@/libs/microcms'

import { ProfileDetailPagePresentation } from './presentation'

type Props = {
  id: string
}

/**
 * ProfileDetailPageContainer
 * @description プロフィール詳細ページのデータ取得とロジック処理を行うコンテナコンポーネント
 */
export const ProfileDetailPageContainer = async ({ id }: Props) => {
  const profile = await getContent('profiles', id).catch((e) => {
    loggerError({
      e,
      __filename,
      fnName: 'ProfileDetailPageContainer',
    })
    throw new Error('プロフィールの取得に失敗しました')
  })

  return <ProfileDetailPagePresentation profile={profile} />
}
