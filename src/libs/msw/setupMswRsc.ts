import { NEXT_PUBLIC_MSW_ENABLED, NEXT_RUNTIME } from '@/config'

import { logger } from '../logger'

/**
 * React Server Components環境用のMSWサーバー設定
 * @description MSWProviderと併用することで、RSC環境でもMSWを使用できるようにする
 */
export const setupMswRsc = async () => {
  if (NEXT_RUNTIME === 'nodejs' && NEXT_PUBLIC_MSW_ENABLED === 'true') {
    const { server } = await import('@/libs/msw/node')
    server.listen({
      onUnhandledRequest(request, print) {
        if (request.url.includes('_next')) {
          return
        }
        print.warning()
      },
    })
    logger({
      level: 'warn',
      message: 'MSW server listening',
      __filename: 'layout',
      fnName: 'server.listen',
      // child: {
      //   handlers: server.listHandlers(),
      // },
    })
  }
}
