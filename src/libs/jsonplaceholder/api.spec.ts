import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import { describe, expect, it, beforeEach, beforeAll, afterAll } from 'vitest'

import {
  mockPosts,
  mockComments,
  mockCreatePostData,
  mockUpdatePostData,
} from '@/libs/msw/data'

import {
  getPosts,
  getPost,
  getPostComments,
  createPost,
  updatePost,
  deletePost,
} from './api'

// JSONPlaceholder用のテストサーバーを設定
const server = setupServer()

// すべてのテスト前にサーバーを開始
beforeAll(() => server.listen())

// 各テスト後にハンドラーをリセット
beforeEach(() => server.resetHandlers())

// すべてのテスト後にサーバーを閉じる
afterAll(() => server.close())

describe('JSONPlaceholder API', () => {
  describe('getPosts', () => {
    it('投稿一覧を正常に取得する', async () => {
      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts', () => {
          return HttpResponse.json(mockPosts)
        }),
      )

      const result = await getPosts()
      expect(result).toEqual(mockPosts)
    })

    it('APIエラーの場合は例外を投げる', async () => {
      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts', () => {
          return HttpResponse.json({ message: 'Server Error' }, { status: 500 })
        }),
      )

      await expect(getPosts()).rejects.toThrow()
    })
  })

  describe('getPost', () => {
    it('特定の投稿を正常に取得する', async () => {
      const mockPost = mockPosts[0]

      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts/1', () => {
          return HttpResponse.json(mockPost)
        }),
      )

      const result = await getPost(1)
      expect(result).toEqual(mockPost)
    })

    it('存在しない投稿の場合は404エラーになる', async () => {
      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts/999', () => {
          return HttpResponse.json(
            { message: 'Post not found' },
            { status: 404 },
          )
        }),
      )

      await expect(getPost(999)).rejects.toThrow()
    })
  })

  describe('getPostComments', () => {
    it('投稿のコメント一覧を正常に取得する', async () => {
      const postComments = mockComments.filter((c) => c.postId === 1)

      server.use(
        http.get(
          'https://jsonplaceholder.typicode.com/posts/1/comments',
          () => {
            return HttpResponse.json(postComments)
          },
        ),
      )

      const result = await getPostComments(1)
      expect(result).toEqual(postComments)
    })

    it('APIエラーの場合は例外を投げる', async () => {
      server.use(
        http.get(
          'https://jsonplaceholder.typicode.com/posts/1/comments',
          () => {
            return HttpResponse.json(
              { message: 'Server Error' },
              { status: 500 },
            )
          },
        ),
      )

      await expect(getPostComments(1)).rejects.toThrow()
    })
  })

  describe('createPost', () => {
    it('新しい投稿を正常に作成する', async () => {
      const mockCreatedPost = {
        id: 101,
        ...mockCreatePostData,
      }

      server.use(
        http.post(
          'https://jsonplaceholder.typicode.com/posts',
          async ({ request }) => {
            const body = await request.json()
            expect(body).toEqual(mockCreatePostData)
            return HttpResponse.json(mockCreatedPost, { status: 201 })
          },
        ),
      )

      const result = await createPost(mockCreatePostData)
      expect(result).toEqual(mockCreatedPost)
    })

    it('不正なデータで400エラーになる', async () => {
      const invalidData = {
        title: '',
        body: '',
        userId: 1,
      }

      server.use(
        http.post('https://jsonplaceholder.typicode.com/posts', () => {
          return HttpResponse.json({ message: 'Invalid data' }, { status: 400 })
        }),
      )

      await expect(createPost(invalidData)).rejects.toThrow()
    })
  })

  describe('updatePost', () => {
    it('投稿を正常に更新する', async () => {
      server.use(
        http.put(
          'https://jsonplaceholder.typicode.com/posts/1',
          async ({ request }) => {
            const body = await request.json()
            expect(body).toEqual(mockUpdatePostData)
            return HttpResponse.json(mockUpdatePostData)
          },
        ),
      )

      const result = await updatePost(mockUpdatePostData)
      expect(result).toEqual(mockUpdatePostData)
    })

    it('存在しない投稿の場合は404エラーになる', async () => {
      const nonExistentPost = { ...mockUpdatePostData, id: 999 }

      server.use(
        http.put('https://jsonplaceholder.typicode.com/posts/999', () => {
          return HttpResponse.json(
            { message: 'Post not found' },
            { status: 404 },
          )
        }),
      )

      await expect(updatePost(nonExistentPost)).rejects.toThrow()
    })
  })

  describe('deletePost', () => {
    it('投稿を正常に削除する', async () => {
      server.use(
        http.delete('https://jsonplaceholder.typicode.com/posts/1', () => {
          return HttpResponse.json({}, { status: 200 })
        }),
      )

      await expect(deletePost(1)).resolves.toBeUndefined()
    })

    it('存在しない投稿の場合は404エラーになる', async () => {
      server.use(
        http.delete('https://jsonplaceholder.typicode.com/posts/999', () => {
          return HttpResponse.json(
            { message: 'Post not found' },
            { status: 404 },
          )
        }),
      )

      await expect(deletePost(999)).rejects.toThrow()
    })
  })
})
