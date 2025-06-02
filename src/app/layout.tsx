import { HOME_URL } from '@/constants/HOME_URL'

import {
  GoogleTagManager,
  GoogleTagManagerNoscript,
} from '@/libs/GoogleTagManager'
import { cn } from '@/libs/stylings'

import { geistMono, geistSans } from '@/styles/fonts'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants'

import type { Metadata } from 'next'

import '@/styles/globals.css'

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='ja'>
      <GoogleTagManager />
      <body
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        {children}
        <GoogleTagManagerNoscript />
      </body>
    </html>
  )
}
