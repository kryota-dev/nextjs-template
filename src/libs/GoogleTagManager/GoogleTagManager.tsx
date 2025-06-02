import { GoogleTagManager as NextGTM } from '@next/third-parties/google'

import { NEXT_PUBLIC_GTM_ID } from '@/config'

/**
 * Google Tag Managerのscriptタグを生成するコンポーネント
 * @description `NEXT_PUBLIC_GTM_ID`が設定されていない場合はnullを返す
 */
export const GoogleTagManager = () => {
  if (!NEXT_PUBLIC_GTM_ID) return null

  return <NextGTM gtmId={NEXT_PUBLIC_GTM_ID} />
}

/**
 * Google Tag Managerのnoscriptタグを生成するコンポーネント
 * @description `NEXT_PUBLIC_GTM_ID`が設定されていない場合はnullを返す
 */
export const GoogleTagManagerNoscript = () => {
  if (!NEXT_PUBLIC_GTM_ID) return null

  return (
    <noscript data-testid='gtm-noscript' data-test-gtm-id={NEXT_PUBLIC_GTM_ID}>
      <iframe
        title='Google Tag Manager'
        loading='lazy'
        src={`//www.googletagmanager.com/ns.html?id=${NEXT_PUBLIC_GTM_ID}`}
        height='0'
        width='0'
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
