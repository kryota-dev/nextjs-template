import { NEXT_PUBLIC_HOME_URL } from '@/config'

if (!NEXT_PUBLIC_HOME_URL) {
  throw new Error('NEXT_PUBLIC_HOME_URL is not set')
}

/**
 * ホームURL
 * @description `NEXT_PUBLIC_HOME_URL`をベースに、末尾にスラッシュがない場合は追加する
 */
export const HOME_URL = NEXT_PUBLIC_HOME_URL.endsWith('/')
  ? NEXT_PUBLIC_HOME_URL
  : `${NEXT_PUBLIC_HOME_URL}/`
