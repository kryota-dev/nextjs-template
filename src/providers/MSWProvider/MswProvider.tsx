'use client'

import { Suspense, use } from 'react'

import { NEXT_PUBLIC_MSW_ENABLED } from '@/config'

const mockingEnabledPromise = (async () => {
  if (typeof window === 'undefined' || NEXT_PUBLIC_MSW_ENABLED !== 'true') {
    return Promise.resolve()
  }

  const { worker } = await import('@/libs/msw/browser')
  await worker.start({
    // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
    onUnhandledRequest(request, print) {
      if (request.url.includes('_next')) {
        return
      }
      // NOTE: 不足しているハンドラーを表示する際に使用する
      // print.warning()
    },
  })
  const { handlers } = await import('@/libs/msw/handlers')
  worker.use(...handlers)

  // eslint-disable-next-line no-console
  console.log('%c[MSW] worker started', 'color: #FF4500; font-weight: bold;', {
    NEXT_PUBLIC_MSW_ENABLED,
    // NOTE: 有効なハンドラーを表示する際に使用する
    // handlers: worker.listHandlers(),
  })
})()

export function MSWProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // MSW が有効な場合、ワーカーが開始するまで待つ必要があります。
  // そのため、準備が整うまで子プロセスを Suspense boundary で囲みます。
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
