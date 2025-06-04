import { Footer } from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/Header'

import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from '@/libs/GoogleTagManager'
import { cn } from '@/libs/stylings'

import { geistMono, geistSans } from '@/styles/fonts'

import '@/styles/globals.css'

type Props = Readonly<{
  children: React.ReactNode
  jsonld: React.ReactNode | null
  storybook?: boolean
}>

/**
 * RootLayoutPresentation
 * @description Shared Components or Client Components
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
        )}
      >
        <Header />
        {children}
        <Footer>
          <a
            className='text-sm'
            href='https://github.com/kryota-dev/nextjs-static-export-template/blob/main/LICENSE'
            target='_blank'
            rel='noopener noreferrer'
          >
            Copyright (c) 2025 Ryota Kaneko
          </a>
        </Footer>
        <GoogleTagManagerNoscript />
      </Body>
    </Html>
  )
}
