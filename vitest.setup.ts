import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

import { server } from '@/libs/msw/node'
import '@testing-library/jest-dom/vitest'

// 環境変数をモック
vi.mock('@/config', () => ({
  NEXT_PUBLIC_GTM_ID: 'GTM-1234567890',
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
