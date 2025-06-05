import 'server-only'

import { logger } from '@/libs/logger'

import { NEXT_RUNTIME, NEXT_PUBLIC_MSW_ENABLED } from '@/config'
import { MSWProvider } from '@/providers'

import { RootLayoutContainer } from './_containers/layout'

import type { Metadata } from 'next'
import type { ComponentProps } from 'react'

import '@/styles/globals.css'

if (NEXT_RUNTIME === 'nodejs' && NEXT_PUBLIC_MSW_ENABLED === 'true') {
  const { server } = await import('@/libs/msw/node')
  server.listen()
  logger({
    level: 'warn',
    message: 'MSW server started',
    __filename: 'layout',
    fnName: 'server.listen',
    // child: {
    //   handlers: server.listHandlers(),
    // },
  })
}

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
