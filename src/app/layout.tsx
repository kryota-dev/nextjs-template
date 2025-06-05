import 'server-only'

import { RootLayoutContainer } from './_containers/layout'
import '@/styles/globals.css'

import type { Metadata } from 'next'
import type { ComponentProps } from 'react'

export const metadata: Metadata = {
  title: {
    default: 'Next.js Static Export Boilerplate',
    template: '%s | Next.js Static Export Boilerplate',
  },
  description: 'microCMSとNext.jsで作成したWebサイト',
}

type Props = ComponentProps<typeof RootLayoutContainer>

export default function RootLayout(props: Props) {
  return <RootLayoutContainer {...props} />
}
