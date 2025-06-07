import { NEXT_PUBLIC_BASE_PATH, NEXT_PUBLIC_HOME_URL } from '@/config'

if (!NEXT_PUBLIC_HOME_URL) {
  throw new Error('NEXT_PUBLIC_HOME_URL is not set')
}

/**
 * ホームURL
 * @description `NEXT_PUBLIC_HOME_URL`をベースに、ベースパスを考慮したURLを生成する
 */
export const HOME_URL = NEXT_PUBLIC_BASE_PATH
  ? `${NEXT_PUBLIC_HOME_URL}${NEXT_PUBLIC_BASE_PATH}/`
  : `${NEXT_PUBLIC_HOME_URL}/`
