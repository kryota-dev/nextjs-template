import { beforeEach, describe, expect, it, vi } from 'vitest'

import { client } from './client'
import {
  getList,
  getObject,
  getContent,
  getAllContents,
  getAllContentIds,
} from './microcms'

import type { MicroCMSQueries } from 'microcms-js-sdk'

// テスト対象をインポート

// クライアントをモック（ホイスティングのため先頭で定義）
vi.mock('./client', () => ({
  client: {
    getList: vi.fn(),
    get: vi.fn(),
    getAllContents: vi.fn(),
    getAllContentIds: vi.fn(),
  },
}))

describe('microCMS API関数', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // 共通のモックデータ
  const mockContent = {
    id: '1',
    title: 'テスト記事',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
  }

  const mockListResponse = {
    contents: [mockContent],
    totalCount: 1,
    offset: 0,
    limit: 10,
  }

  const mockProfile = {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
  }

  // テストヘルパー関数
  const setupMockResponse = (
    method: keyof typeof client,
    response: unknown,
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    vi.mocked(client[method] as any).mockResolvedValue(response)
  }

  const expectClientCall = (
    method: keyof typeof client,
    expectedParams: object,
  ) => {
    expect(client[method]).toHaveBeenCalledWith(expectedParams)
  }

  describe('getList', () => {
    it('正しいパラメータでclient.getListを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      const queries: MicroCMSQueries = {
        limit: 10,
        offset: 0,
        filters: 'publishedAt[exists]',
      }
      setupMockResponse('getList', mockListResponse)

      // Act
      const result = await getList(endpoint, queries)

      // Assert
      expectClientCall('getList', { endpoint, queries })
      expect(result).toEqual(mockListResponse)
    })

    it('queriesが未指定の場合もclient.getListを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      const emptyResponse = { ...mockListResponse, contents: [], totalCount: 0 }
      setupMockResponse('getList', emptyResponse)

      // Act
      const result = await getList(endpoint)

      // Assert
      expectClientCall('getList', { endpoint, queries: undefined })
      expect(result).toEqual(emptyResponse)
    })

    it('エラーが発生した場合は例外をスローする', async () => {
      // Arrange
      const endpoint = 'news'
      const errorMessage = 'API Error'
      vi.mocked(client.getList).mockRejectedValue(new Error(errorMessage))

      // Act & Assert
      await expect(getList(endpoint)).rejects.toThrow(errorMessage)
      expectClientCall('getList', { endpoint, queries: undefined })
    })
  })

  describe('getObject', () => {
    it('正しいパラメータでclient.getを呼び出す', async () => {
      // Arrange
      const endpoint = 'profiles'
      const queries: MicroCMSQueries = { fields: 'name,email' }
      setupMockResponse('get', mockProfile)

      // Act
      const result = await getObject(endpoint, queries)

      // Assert
      expectClientCall('get', { endpoint, queries })
      expect(result).toEqual(mockProfile)
    })

    it('queriesが未指定の場合もclient.getを呼び出す', async () => {
      // Arrange
      const endpoint = 'profiles'
      const simpleProfile = { id: '1', name: '田中太郎' }
      setupMockResponse('get', simpleProfile)

      // Act
      const result = await getObject(endpoint)

      // Assert
      expectClientCall('get', { endpoint, queries: undefined })
      expect(result).toEqual(simpleProfile)
    })
  })

  describe('getContent', () => {
    it('正しいパラメータでclient.getを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      const contentId = 'article-1'
      const queries: MicroCMSQueries = { fields: 'title,body' }
      const mockContentResponse = {
        id: contentId,
        title: 'テスト記事',
        body: 'テスト内容',
      }
      setupMockResponse('get', mockContentResponse)

      // Act
      const result = await getContent(endpoint, contentId, queries)

      // Assert
      expectClientCall('get', { endpoint, contentId, queries })
      expect(result).toEqual(mockContentResponse)
    })

    it('queriesが未指定の場合もclient.getを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      const contentId = 'article-1'
      const mockContentResponse = { id: contentId, title: 'テスト記事' }
      setupMockResponse('get', mockContentResponse)

      // Act
      const result = await getContent(endpoint, contentId)

      // Assert
      expectClientCall('get', { endpoint, contentId, queries: undefined })
      expect(result).toEqual(mockContentResponse)
    })

    it('contentIdが空文字の場合もclient.getを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      const contentId = ''
      const mockContentResponse = {}
      setupMockResponse('get', mockContentResponse)

      // Act
      const result = await getContent(endpoint, contentId)

      // Assert
      expectClientCall('get', { endpoint, contentId: '', queries: undefined })
      expect(result).toEqual(mockContentResponse)
    })
  })

  describe('getAllContents', () => {
    it('正しいパラメータでclient.getAllContentsを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      const queries: MicroCMSQueries = {
        filters: 'publishedAt[exists]',
        orders: '-publishedAt',
      }
      const mockResponse = [
        mockContent,
        { ...mockContent, id: '2', title: 'テスト記事2' },
      ]
      setupMockResponse('getAllContents', mockResponse)

      // Act
      const result = await getAllContents(endpoint, queries)

      // Assert
      expectClientCall('getAllContents', { endpoint, queries })
      expect(result).toEqual(mockResponse)
    })

    it('queriesが未指定の場合もclient.getAllContentsを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      setupMockResponse('getAllContents', [])

      // Act
      const result = await getAllContents(endpoint)

      // Assert
      expectClientCall('getAllContents', { endpoint, queries: undefined })
      expect(result).toEqual([])
    })

    it('大量のコンテンツを取得できる', async () => {
      // Arrange
      const endpoint = 'news'
      const mockResponse = Array.from({ length: 150 }, (_, i) => ({
        ...mockContent,
        id: `article-${i + 1}`,
        title: `テスト記事${i + 1}`,
      }))
      setupMockResponse('getAllContents', mockResponse)

      // Act
      const result = await getAllContents(endpoint)

      // Assert
      expectClientCall('getAllContents', { endpoint, queries: undefined })
      expect(result).toEqual(mockResponse)
      expect(result.length).toBe(150)
    })
  })

  describe('getAllContentIds', () => {
    it('正しいパラメータでclient.getAllContentIdsを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      const filters = 'publishedAt[exists]'
      const mockResponse = ['article-1', 'article-2', 'article-3']
      setupMockResponse('getAllContentIds', mockResponse)

      // Act
      const result = await getAllContentIds(endpoint, filters)

      // Assert
      expectClientCall('getAllContentIds', { endpoint, filters })
      expect(result).toEqual(mockResponse)
    })

    it('filtersが未指定の場合もclient.getAllContentIdsを呼び出す', async () => {
      // Arrange
      const endpoint = 'news'
      const mockResponse = ['article-1', 'article-2']
      setupMockResponse('getAllContentIds', mockResponse)

      // Act
      const result = await getAllContentIds(endpoint)

      // Assert
      expectClientCall('getAllContentIds', { endpoint, filters: undefined })
      expect(result).toEqual(mockResponse)
    })

    it('空の配列を返すこともできる', async () => {
      // Arrange
      const endpoint = 'news'
      const mockResponse: string[] = []
      setupMockResponse('getAllContentIds', mockResponse)

      // Act
      const result = await getAllContentIds(endpoint)

      // Assert
      expectClientCall('getAllContentIds', { endpoint, filters: undefined })
      expect(result).toEqual([])
    })
  })
})
