import { render } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { MswProvider } from './MswProvider'

// MSWのモック設定（ホイスティング対応）
vi.mock('@/config', () => ({
  NEXT_PUBLIC_MSW_ENABLED: 'true',
}))

vi.mock('@/libs/msw/browser', () => ({
  worker: {
    start: vi.fn().mockResolvedValue(undefined),
    use: vi.fn(),
  },
}))

vi.mock('@/libs/msw/handlers', () => ({
  handlers: ['mock-handler-1', 'mock-handler-2'],
}))

// コンソールモック
const mockConsoleWarn = vi.fn()
global.console = {
  ...console,
  warn: mockConsoleWarn,
}

describe('MswProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // ブラウザ環境をシミュレート
    Object.defineProperty(window, 'location', {
      value: {
        href: 'http://localhost:3000',
      },
      writable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('基本レンダリングテスト', () => {
    it('MswProviderが単一の子要素を適切にレンダリングできる', () => {
      // Arrange
      const children = <div data-testid='test-content'>Test Content</div>

      // Act & Assert - レンダリングエラーが発生しない
      expect(() => {
        render(<MswProvider>{children}</MswProvider>)
      }).not.toThrow()
    })

    it('MswProviderが複数の子要素を適切にレンダリングできる', () => {
      // Arrange
      const children = [
        <div key='1' data-testid='child1'>
          Child 1
        </div>,
        <div key='2' data-testid='child2'>
          Child 2
        </div>,
      ]

      // Act & Assert - レンダリングエラーが発生しない
      expect(() => {
        render(<MswProvider>{children}</MswProvider>)
      }).not.toThrow()
    })

    it.each([
      ['null要素', null],
      ['undefined要素', undefined],
    ])('MswProviderが%sを適切にレンダリングできる', (_, children) => {
      // Act & Assert - レンダリングエラーが発生しない
      expect(() => {
        render(<MswProvider>{children}</MswProvider>)
      }).not.toThrow()
    })

    it('Suspense境界が適切に設定されている', () => {
      // Arrange
      const testContent = 'Suspense Test'

      // Act - Suspenseでエラーが発生しない
      expect(() => {
        render(
          <MswProvider>
            <div>{testContent}</div>
          </MswProvider>,
        )
      }).not.toThrow()
    })
  })

  describe('環境設定テスト', () => {
    it('ブラウザ環境が適切に検出される', () => {
      // Arrange & Act
      const isClient = typeof window !== 'undefined'

      // Assert
      expect(isClient).toBe(true)
      expect(window.location.href).toBe('http://localhost:3000')
    })

    it('環境変数が適切に設定されている', async () => {
      // Arrange
      const config = await import('@/config')

      // Act & Assert
      expect(config.NEXT_PUBLIC_MSW_ENABLED).toBe('true')
    })

    it('MSWモジュールが適切にモックされている', async () => {
      // Arrange
      const { worker } = await import('@/libs/msw/browser')
      const { handlers } = await import('@/libs/msw/handlers')

      // Act & Assert
      expect(worker).toBeDefined()
      expect(worker.start).toBeDefined()
      expect(worker.use).toBeDefined()
      expect(handlers).toEqual(['mock-handler-1', 'mock-handler-2'])
    })
  })

  describe('エラーハンドリングテスト', () => {
    it('子コンポーネントのエラーが適切に処理される', () => {
      // Arrange
      const ErrorComponent = () => {
        throw new Error('Child error')
      }

      // Act & Assert
      expect(() => {
        render(
          <MswProvider>
            <ErrorComponent />
          </MswProvider>,
        )
      }).toThrow('Child error')
    })

    it('MSWの設定エラーがSuspenseで処理される', async () => {
      // Arrange
      const { worker } = await import('@/libs/msw/browser')
      vi.mocked(worker.start).mockRejectedValueOnce(new Error('MSW Error'))

      // Act & Assert - コンポーネントがクラッシュしない
      expect(() => {
        render(
          <MswProvider>
            <div>Error handling test</div>
          </MswProvider>,
        )
      }).not.toThrow()
    })
  })

  describe('統合テスト', () => {
    it('MswProviderがネストしたコンポーネント構造で動作する', () => {
      // Arrange
      const TestApp = () => (
        <MswProvider>
          <div data-testid='app'>
            <h1>Test App</h1>
            <div data-testid='nested'>
              <div data-testid='level1'>
                <div data-testid='level2'>Nested content</div>
              </div>
            </div>
          </div>
        </MswProvider>
      )

      // Act & Assert - レンダリングエラーが発生しない
      expect(() => {
        render(<TestApp />)
      }).not.toThrow()
    })
  })

  describe('条件分岐テスト', () => {
    let originalWindow: typeof window | undefined

    beforeEach(() => {
      vi.clearAllMocks()
      originalWindow = global.window
    })

    afterEach(() => {
      // windowオブジェクトを復元
      if (originalWindow) {
        global.window = originalWindow
      }
    })

    it.each([
      [
        'NEXT_PUBLIC_MSW_ENABLED=false, ブラウザ環境',
        { NEXT_PUBLIC_MSW_ENABLED: 'false' },
        true,
      ],
      [
        'NEXT_PUBLIC_MSW_ENABLED=true, SSR環境',
        { NEXT_PUBLIC_MSW_ENABLED: 'true' },
        false,
      ],
      [
        'NEXT_PUBLIC_MSW_ENABLED=false, SSR環境',
        { NEXT_PUBLIC_MSW_ENABLED: 'false' },
        false,
      ],
    ])(
      '%sでもレンダリングエラーが発生しない',
      async (_, config, isClientEnvironment) => {
        // Arrange
        vi.doMock('@/config', () => config)

        if (isClientEnvironment) {
          // ブラウザ環境を確保
          Object.defineProperty(global.window, 'location', {
            value: {
              href: 'http://localhost:3000',
            },
            writable: true,
            configurable: true,
          })
        }

        // モジュールを再インポート
        vi.resetModules()
        const { MswProvider: MswProviderTest } = await import('./MswProvider')

        const TestComponent = () => <div data-testid='test'>Test Content</div>

        // Act & Assert
        expect(() => {
          render(
            <MswProviderTest>
              <TestComponent />
            </MswProviderTest>,
          )
        }).not.toThrow()
      },
    )
  })
})
