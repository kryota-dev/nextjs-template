import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

// 環境変数をモック
vi.mock('@/config', () => ({
  NEXT_PUBLIC_GTM_ID: 'GTM-1234567890',
}))

beforeAll(() => {
  // TODO: MSW追加後にコメントアウトを外す
  // server.listen()

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
  // TODO: MSW追加後にコメントアウトを外す
  // server.resetHandlers()
})

afterAll(() => {
  // TODO: MSW追加後にコメントアウトを外す
  // server.close()
})
