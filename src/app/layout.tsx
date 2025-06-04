import 'server-only'

import { HOME_URL } from '@/constants/HOME_URL'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants'

import { RootLayoutContainer } from './_containers/layout'

import type { Metadata } from 'next'
import type { ComponentProps } from 'react'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  authors: [
    // TODO: サイト公開時にauthorを変更する
    {
      name: 'kryota-dev',
      url: 'https://github.com/kryota-dev/',
    },
  ],
  // TODO: サイト公開時にkeywordsを変更する
  keywords: ['Next.js', 'Static Export', 'Template'],
  // TODO: サイト公開時にpublisherを変更する
  publisher: 'kryota-dev',
  metadataBase: new URL(HOME_URL),
  description: SITE_DESCRIPTION,
  // TODO: サイト公開時にrobotsをtrueにする
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: HOME_URL,
  },
  openGraph: {
    type: 'website',
    url: HOME_URL,
    title: SITE_NAME,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: 'ja_JP',
    images: [
      {
        url: `${HOME_URL}ogp.png`,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
  formatDetection: {
    // NOTE: iOS SafariでHydration Errorが発生するため、telephoneをfalseにする
    telephone: false,
  },
}

type Props = ComponentProps<typeof RootLayoutContainer>

export default function RootLayout(props: Props) {
  return <RootLayoutContainer {...props} />
}
