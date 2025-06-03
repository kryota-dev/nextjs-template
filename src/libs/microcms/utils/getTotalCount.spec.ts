import { beforeEach, describe, expect, it, vi } from 'vitest'

// テスト対象をインポート
import { getTotalCount } from './getTotalCount'
import { getAllContentIds } from '../microcms'

import type { MicroCMSQueries } from 'microcms-js-sdk'

// getAllContentIdsをモック（ホイスティングのため先頭で定義）
vi.mock('../microcms', () => ({
  getAllContentIds: vi.fn(),
}))

describe('getTotalCount', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // テストヘルパー関数
  const setupMockResponse = (response: string[]) => {
    vi.mocked(getAllContentIds).mockResolvedValue(response)
  }

  const expectCorrectCall = (endpoint: string, filters?: string) => {
    expect(getAllContentIds).toHaveBeenCalledWith(endpoint, filters)
  }

  describe('正常なケース', () => {
    it('getAllContentIdsから取得したIDの配列の長さを返す', async () => {
      // Arrange
      const endpoint = 'news'
      const filters = 'publishedAt[exists]'
      const mockData = ['article-1', 'article-2', 'article-3']
      setupMockResponse(mockData)

      // Act
      const result = await getTotalCount(endpoint, filters)

      // Assert
      expectCorrectCall(endpoint, filters)
      expect(result).toBe(3)
    })

    it('filtersが未指定の場合でも正しく動作する', async () => {
      // Arrange
      const endpoint = 'news'
      const mockData = [
        'article-1',
        'article-2',
        'article-3',
        'article-4',
        'article-5',
      ]
      setupMockResponse(mockData)

      // Act
      const result = await getTotalCount(endpoint)

      // Assert
      expectCorrectCall(endpoint, undefined)
      expect(result).toBe(5)
    })

    it('空の配列が返された場合は0を返す', async () => {
      // Arrange
      const endpoint = 'news'
      const filters = 'category[equals]non-existent'
      const mockData: string[] = []
      setupMockResponse(mockData)

      // Act
      const result = await getTotalCount(endpoint, filters)

      // Assert
      expectCorrectCall(endpoint, filters)
      expect(result).toBe(0)
    })

    it('大量のコンテンツ数を正しくカウントする', async () => {
      // Arrange
      const endpoint = 'news'
      const filters = 'publishedAt[exists]'
      const mockResponse = Array.from(
        { length: 1000 },
        (_, i) => `article-${i + 1}`,
      )
      setupMockResponse(mockResponse)

      // Act
      const result = await getTotalCount(endpoint, filters)

      // Assert
      expectCorrectCall(endpoint, filters)
      expect(result).toBe(1000)
    })
  })

  describe('エッジケース', () => {
    it('getAllContentIdsが例外をスローした場合は例外を再スローする', async () => {
      // Arrange
      const endpoint = 'news'
      const filters = 'invalid[filter]'
      const errorMessage = 'API request failed'
      vi.mocked(getAllContentIds).mockRejectedValue(new Error(errorMessage))

      // Act & Assert
      await expect(getTotalCount(endpoint, filters)).rejects.toThrow(
        errorMessage,
      )
      expectCorrectCall(endpoint, filters)
    })

    it('異なるエンドポイントに対して正しく動作する', async () => {
      // Arrange
      const endpoint = 'profiles'
      const mockData = ['profile-1', 'profile-2']
      setupMockResponse(mockData)

      // Act
      const result = await getTotalCount(endpoint)

      // Assert
      expectCorrectCall(endpoint, undefined)
      expect(result).toBe(2)
    })

    it('複雑なフィルター条件でも正しく動作する', async () => {
      // Arrange
      const endpoint = 'news'
      const filters: MicroCMSQueries['filters'] =
        'publishedAt[greater_than]2024-01-01T00:00:00.000Z[and]category[equals]tech'
      const mockData = ['article-tech-1', 'article-tech-2', 'article-tech-3']
      setupMockResponse(mockData)

      // Act
      const result = await getTotalCount(endpoint, filters)

      // Assert
      expectCorrectCall(endpoint, filters)
      expect(result).toBe(3)
    })
  })

  describe('型安全性のテスト', () => {
    it('Endpointsの型に適合するエンドポイントを使用できる', async () => {
      // Arrange
      const mockResponse = ['content-1', 'content-2']
      setupMockResponse(mockResponse)

      // Act & Assert - news
      const newsResult = await getTotalCount('news')
      expect(typeof newsResult).toBe('number')
      expectCorrectCall('news', undefined)

      // Act & Assert - profiles
      const profilesResult = await getTotalCount('profiles')
      expect(typeof profilesResult).toBe('number')
      expectCorrectCall('profiles', undefined)

      // Act & Assert - btn_type
      const btnTypeResult = await getTotalCount('btn_type')
      expect(typeof btnTypeResult).toBe('number')
      expectCorrectCall('btn_type', undefined)
    })
  })
})
