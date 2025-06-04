import 'server-only'

import { RootLayoutContainer } from './_containers/layout'
import '@/styles/globals.css'

import type { Metadata } from 'next'
import type { ComponentProps } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Blog App',
    template: '%s | Blog App',
  },
  description: 'JSONPlaceholderを使用したブログアプリケーション',
}

type Props = ComponentProps<typeof RootLayoutContainer>

export default function RootLayout(props: Props) {
  return <RootLayoutContainer {...props} />
}
