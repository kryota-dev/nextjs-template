import { beforeEach, describe, expect, it, vi } from 'vitest'

// createClientをモック
vi.mock('microcms-js-sdk', () => ({
  createClient: vi.fn().mockReturnValue({
    getList: vi.fn(),
    get: vi.fn(),
    getAllContents: vi.fn(),
    getAllContentIds: vi.fn(),
  }),
}))

// 環境変数をモック
vi.mock('@/config', () => ({
  NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN: undefined,
  NEXT_PUBLIC_MICROCMS_API_KEY: undefined,
  SERVER_ONLY_MICROCMS_API_KEY: undefined,
}))

describe('microCMS Client', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  // テストヘルパー関数
  const mockConfig = (config: {
    serviceDomain?: string
    publicApiKey?: string
    serverApiKey?: string
  }) => {
    vi.doMock('@/config', () => ({
      NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN: config.serviceDomain,
      NEXT_PUBLIC_MICROCMS_API_KEY: config.publicApiKey,
      SERVER_ONLY_MICROCMS_API_KEY: config.serverApiKey,
    }))
  }

  const expectImportError = async (expectedError: string) => {
    await expect(async () => {
      await import('./client')
    }).rejects.toThrow(expectedError)
  }

  const getMockCreateClient = async () => {
    return import('microcms-js-sdk').then((module) => module.createClient)
  }

  describe('サービスドメインの検証', () => {
    it('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAINが設定されていない場合はエラーを投げる', async () => {
      // Arrange
      mockConfig({
        serviceDomain: undefined,
        publicApiKey: 'test-api-key',
      })

      // Act & Assert
      await expectImportError('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is not set')
    })

    it('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAINが空文字の場合はエラーを投げる', async () => {
      // Arrange
      mockConfig({
        serviceDomain: '',
        publicApiKey: 'test-api-key',
      })

      // Act & Assert
      await expectImportError('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is not set')
    })
  })

  describe('APIキーの検証', () => {
    it('APIキーが設定されていない場合はエラーを投げる', async () => {
      // Arrange
      mockConfig({
        serviceDomain: 'test-domain',
        publicApiKey: undefined,
        serverApiKey: undefined,
      })

      // Act & Assert
      await expectImportError(
        'NEXT_PUBLIC_MICROCMS_API_KEY or SERVER_ONLY_MICROCMS_API_KEY is not set',
      )
    })

    it('NEXT_PUBLIC_MICROCMS_API_KEYが空文字の場合はエラーを投げる', async () => {
      // Arrange
      mockConfig({
        serviceDomain: 'test-domain',
        publicApiKey: '',
        serverApiKey: undefined,
      })

      // Act & Assert
      await expectImportError(
        'NEXT_PUBLIC_MICROCMS_API_KEY or SERVER_ONLY_MICROCMS_API_KEY is not set',
      )
    })
  })

  describe('クライアント作成の優先順位', () => {
    it('SERVER_ONLY_MICROCMS_API_KEYが設定されている場合はそれを優先して使用する', async () => {
      // Arrange
      const mockCreateClient = await getMockCreateClient()
      mockConfig({
        serviceDomain: 'test-domain',
        publicApiKey: 'public-api-key',
        serverApiKey: 'server-api-key',
      })

      // Act
      await import('./client')

      // Assert
      expect(mockCreateClient).toHaveBeenCalledWith({
        serviceDomain: 'test-domain',
        apiKey: 'server-api-key',
      })
    })

    it('SERVER_ONLY_MICROCMS_API_KEYが設定されていない場合はNEXT_PUBLIC_MICROCMS_API_KEYを使用する', async () => {
      // Arrange
      const mockCreateClient = await getMockCreateClient()
      mockConfig({
        serviceDomain: 'test-domain',
        publicApiKey: 'public-api-key',
        serverApiKey: undefined,
      })

      // Act
      await import('./client')

      // Assert
      expect(mockCreateClient).toHaveBeenCalledWith({
        serviceDomain: 'test-domain',
        apiKey: 'public-api-key',
      })
    })

    it('SERVER_ONLY_MICROCMS_API_KEYが空文字の場合はNEXT_PUBLIC_MICROCMS_API_KEYを使用する', async () => {
      // Arrange
      const mockCreateClient = await getMockCreateClient()
      mockConfig({
        serviceDomain: 'test-domain',
        publicApiKey: 'public-api-key',
        serverApiKey: '',
      })

      // Act
      await import('./client')

      // Assert
      expect(mockCreateClient).toHaveBeenCalledWith({
        serviceDomain: 'test-domain',
        apiKey: 'public-api-key',
      })
    })
  })

  describe('正常なクライアント作成', () => {
    it('適切な環境変数が設定されている場合、クライアントが正常に作成される', async () => {
      // Arrange
      const mockCreateClient = await getMockCreateClient()
      mockConfig({
        serviceDomain: 'test-domain',
        publicApiKey: 'test-api-key',
      })

      // Act
      const { client } = await import('./client')

      // Assert
      expect(mockCreateClient).toHaveBeenCalledWith({
        serviceDomain: 'test-domain',
        apiKey: 'test-api-key',
      })
      expect(client).toBeDefined()

      // クライアントの必要なメソッドが定義されていることを確認
      expect(client.getList).toBeDefined()
      expect(client.get).toBeDefined()
      expect(client.getAllContents).toBeDefined()
      expect(client.getAllContentIds).toBeDefined()
    })
  })
})
