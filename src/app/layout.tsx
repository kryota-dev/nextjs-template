import 'server-only'

import { setupMswRsc } from '@/libs/msw/setupMswRsc'

import { MSWProvider } from '@/providers'

import { RootLayoutContainer } from './_containers/layout'

import type { Metadata } from 'next'
import type { ComponentProps } from 'react'

import '@/styles/globals.css'

await setupMswRsc()

export const metadata: Metadata = {
  title: {
    default: 'Next.js Static Export Boilerplate',
    template: '%s | Next.js Static Export Boilerplate',
  },
  description: 'microCMSとNext.jsで作成したWebサイト',
}

type Props = ComponentProps<typeof RootLayoutContainer>

export default function RootLayout(props: Props) {
  return (
    <MSWProvider>
      <RootLayoutContainer {...props} />
    </MSWProvider>
  )
}
