import { NEXT_PUBLIC_FEATURE_FLAG, NEXT_RUNTIME } from '@/config'

import { logger } from '../logger'

/**
 * React Server Components環境用のMSWサーバー設定
 * @description MSWProviderと併用することで、RSC環境でもMSWを使用できるようにする
 */
export const setupMswRsc = async (__filename: string) => {
  if (NEXT_RUNTIME === 'nodejs' && NEXT_PUBLIC_FEATURE_FLAG === 'true') {
    const { server } = await import('@/libs/msw/node')
    server.listen({
      // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
      onUnhandledRequest(request, print) {
        if (request.url.includes('_next')) {
          return
        }
        // NOTE: 不足しているハンドラーを表示する際に使用する
        // print.warning()
      },
    })
    logger({
      level: 'warn',
      message: '[MSW] server listening',
      __filename,
      fnName: 'server.listen',
      child: {
        NEXT_PUBLIC_FEATURE_FLAG,
        // NOTE: 有効なハンドラーを表示する際に使用する
        // handlers: server.listHandlers(),
      },
    })
  }
}
