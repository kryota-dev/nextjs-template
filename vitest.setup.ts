import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

import { server } from '@/libs/msw/node'
import '@testing-library/jest-dom/vitest'

// 環境変数をモック
vi.mock('@/config', () => ({
  NEXT_PUBLIC_GTM_ID: 'GTM-XXX',
  NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN: 'service-domain',
  NEXT_PUBLIC_MICROCMS_API_KEY: 'api-key',
  SERVER_ONLY_MICROCMS_API_KEY: 'api-key',
  NEXT_PUBLIC_BASE_PATH: '',
  NEXT_PUBLIC_HOME_URL: 'http://localhost:3000',
  NEXT_PUBLIC_MSW_ENABLED: 'true',
}))

beforeAll(() => {
  server.listen()

  // JSDOMではHTMLCanvasElement.prototype.getContextが定義されていないため、モックを定義
  if (typeof global.HTMLCanvasElement !== 'undefined') {
    global.HTMLCanvasElement.prototype.getContext = () => null
  }

  // JSDOMではwindow.scrollToが定義されていないため、モックを定義
  const noop = () => {}
  Object.defineProperty(window, 'scrollTo', { value: noop, writable: true })
})

afterEach(() => {
  cleanup()
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})
