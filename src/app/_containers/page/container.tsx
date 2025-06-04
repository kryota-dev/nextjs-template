import 'server-only'

import { HomePagePresentation } from './presentation'

/**
 * HomePageContainer
 * @description Server Components上でのデータフェッチなどのサーバーサイド処理を行うコンテナコンポーネント
 */
export const HomePageContainer = () => {
  return <HomePagePresentation />
}
