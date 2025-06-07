import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { server } from '@/libs/msw/node'

import { logger } from '../logger'
import { setupMswRsc } from './setupMswRsc'

// モックの設定（ホイスティング対応）
vi.mock('@/config', () => ({
  NEXT_RUNTIME: 'nodejs',
  NEXT_PUBLIC_FEATURE_FLAG: 'true',
}))

vi.mock('../logger', () => ({
  logger: vi.fn(),
}))

vi.mock('@/libs/msw/node', () => ({
  server: {
    listen: vi.fn(),
  },
}))

// モック関数の型アサーション
const mockLogger = vi.mocked(logger)
const mockServerListen = vi.mocked(server.listen)

describe('setupMswRsc', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('基本機能テスト', () => {
    it('Node.js環境でMSWが有効な場合にサーバーが起動する', async () => {
      // Arrange & Act
      await setupMswRsc('layout')

      // Assert
      expect(mockServerListen).toHaveBeenCalledOnce()
      expect(mockServerListen).toHaveBeenCalledWith({
        onUnhandledRequest: expect.any(Function),
      })
      expect(mockLogger).toHaveBeenCalledWith({
        level: 'warn',
        message: '[MSW] server listening',
        __filename: 'layout',
        fnName: 'server.listen',
        child: {
          NEXT_PUBLIC_FEATURE_FLAG: 'true',
        },
      })
    })

    it('setupMswRsc関数がエラーなく実行される', async () => {
      // Arrange & Act & Assert
      await expect(setupMswRsc('layout')).resolves.toBeUndefined()
    })

    it('MSWサーバーのlistenメソッドが適切な設定で呼ばれる', async () => {
      // Arrange & Act
      await setupMswRsc('layout')

      // Assert
      const callArgs = mockServerListen.mock.calls[0]?.[0]
      expect(callArgs).toBeDefined()
      expect(callArgs).toHaveProperty('onUnhandledRequest')
      expect(typeof callArgs?.onUnhandledRequest).toBe('function')
    })

    it('ログが適切なフォーマットで出力される', async () => {
      // Arrange & Act
      await setupMswRsc('layout')

      // Assert
      expect(mockLogger).toHaveBeenCalledWith({
        level: 'warn',
        message: '[MSW] server listening',
        __filename: 'layout',
        fnName: 'server.listen',
        child: {
          NEXT_PUBLIC_FEATURE_FLAG: 'true',
        },
      })
    })
  })

  describe('設定確認テスト', () => {
    it('環境変数が適切にモックされていることを確認', async () => {
      // Arrange
      const config = await import('@/config')

      // Act & Assert
      expect(config.NEXT_PUBLIC_FEATURE_FLAG).toBe('true')
      expect(config.NEXT_RUNTIME).toBe('nodejs')
    })

    it('依存モジュールが適切にモックされていることを確認', async () => {
      // Arrange & Act & Assert
      expect(mockServerListen).toBeDefined()
      expect(mockLogger).toBeDefined()
      expect(typeof setupMswRsc).toBe('function')
    })
  })

  describe('関数呼び出し回数テスト', () => {
    it('setupMswRscを複数回呼び出した場合の動作', async () => {
      // Arrange & Act
      await setupMswRsc('layout')
      await setupMswRsc('layout')

      // Assert
      expect(mockServerListen).toHaveBeenCalledTimes(2)
      expect(mockLogger).toHaveBeenCalledTimes(2)
    })
  })

  describe('条件分岐テスト', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it.each([
      [
        'NEXT_PUBLIC_FEATURE_FLAGがfalse',
        { NEXT_RUNTIME: 'nodejs', NEXT_PUBLIC_FEATURE_FLAG: 'false' },
      ],
      [
        'NEXT_RUNTIMEがnodejs以外',
        { NEXT_RUNTIME: 'edge', NEXT_PUBLIC_FEATURE_FLAG: 'true' },
      ],
      [
        '両方の条件が無効',
        { NEXT_RUNTIME: 'edge', NEXT_PUBLIC_FEATURE_FLAG: 'false' },
      ],
    ])('%sの場合はMSWサーバーが起動しない', async (_, config) => {
      // Arrange - configモジュールをモック
      vi.doMock('@/config', () => config)

      // モジュールを再インポート
      vi.resetModules()
      const { setupMswRsc: setupMswRscTest } = await import('./setupMswRsc')

      // Act
      await setupMswRscTest('layout')

      // Assert
      expect(mockServerListen).not.toHaveBeenCalled()
      expect(mockLogger).not.toHaveBeenCalled()
    })
  })
})
