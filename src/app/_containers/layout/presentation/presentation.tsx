import { Navigation } from '@/components/layouts/Navigation'

import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from '@/libs/GoogleTagManager'

import { geistSans, geistMono } from '@/styles/fonts'

type Props = Readonly<{
  children: React.ReactNode
  jsonld: React.ReactNode | null
  storybook?: boolean
}>

/**
 * RootLayoutPresentation
 * @description RootLayoutのUI表示を担当するPresentationコンポーネント
 */
export const RootLayoutPresentation = ({
  children,
  jsonld,
  storybook = false,
}: Props) => {
  /** htmlタグ（storybookの場合はdiv） */
  const Html = storybook ? 'div' : 'html'
  /** bodyタグ（storybookの場合はdiv） */
  const Body = storybook ? 'div' : 'body'

  return (
    <Html {...(storybook ? {} : { lang: 'ja' })}>
      {!storybook && (
        <>
          <head>{jsonld}</head>
          <GoogleTagManager />
        </>
      )}
      <Body
        className={`min-h-screen bg-gray-50 ${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <Navigation />
        <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {children}
        </main>
        <GoogleTagManagerNoscript />
      </Body>
    </Html>
  )
}
