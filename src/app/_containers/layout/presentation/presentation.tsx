import Link from 'next/link'

import { Footer, Header } from '@/components/layouts'

import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from '@/libs/GoogleTagManager'
import { cn } from '@/libs/stylings'

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
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'flex min-h-screen flex-col antialiased',
          'bg-gray-50 font-sans',
        )}
      >
        <Header />
        <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
          {children}
        </main>
        <Footer>
          <Link
            className='text-sm'
            href='https://github.com/kryota-dev/nextjs-static-export-template/blob/main/LICENSE'
            target='_blank'
          >
            Copyright (c) 2025 Ryota Kaneko
          </Link>
        </Footer>
        <GoogleTagManagerNoscript />
      </Body>
    </Html>
  )
}
