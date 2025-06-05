'use client'

import { Suspense, use } from 'react'

import { NEXT_PUBLIC_MSW_ENABLED } from '@/config'

const mockingEnabledPromise = (async () => {
  if (typeof window === 'undefined' || NEXT_PUBLIC_MSW_ENABLED !== 'true') {
    return Promise.resolve()
  }

  const { worker } = await import('@/libs/msw/browser')
  await worker.start({
    onUnhandledRequest(request, print) {
      if (request.url.includes('_next')) {
        return
      }
      print.warning()
    },
  })
  const { handlers } = await import('@/libs/msw/handlers')
  worker.use(...handlers)

  // eslint-disable-next-line no-console
  console.warn('MSW worker started')
})()

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // If MSW is enabled, we need to wait for the worker to start,
  // so we wrap the children in a Suspense boundary until it's ready.
  return (
    <Suspense fallback={null}>
      <MSWProviderWrapper>{children}</MSWProviderWrapper>
    </Suspense>
  )
}

function MSWProviderWrapper({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  use(mockingEnabledPromise)
  return children
}
