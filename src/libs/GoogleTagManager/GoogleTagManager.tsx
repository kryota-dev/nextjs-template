import { GoogleTagManager as NextGTM } from '@next/third-parties/google'

import { GTM_ID } from '@/config'

/**
 * Google Tag Managerのscriptタグを生成するコンポーネント
 * @description `GTM_ID`が設定されていない場合はnullを返す
 */
export const GoogleTagManager = () => {
  if (!GTM_ID) return null

  return <NextGTM gtmId={GTM_ID} />
}

/**
 * Google Tag Managerのnoscriptタグを生成するコンポーネント
 * @description `GTM_ID`が設定されていない場合はnullを返す
 */
export const GoogleTagManagerNoscript = () => {
  if (!GTM_ID) return null

  return (
    <noscript>
      <iframe
        title='Google Tag Manager'
        loading='lazy'
        src={`//www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
