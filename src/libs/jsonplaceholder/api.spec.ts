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
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

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

      const posts = await getPosts()
      expect(posts).toEqual(mockPosts)
    })
  })

  describe('getPost', () => {
    it('特定の投稿を正常に取得する', async () => {
      const targetPost = mockPosts[0]
      server.use(
        http.get('https://jsonplaceholder.typicode.com/posts/1', () => {
          return HttpResponse.json(targetPost)
        }),
      )

      const post = await getPost(1)
      expect(post).toEqual(targetPost)
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
      const post1Comments = mockComments.filter(
        (comment) => comment.postId === 1,
      )
      server.use(
        http.get(
          'https://jsonplaceholder.typicode.com/posts/1/comments',
          () => {
            return HttpResponse.json(post1Comments)
          },
        ),
      )

      const comments = await getPostComments(1)
      expect(comments).toEqual(post1Comments)
    })

    it('コメントがない投稿の場合は空配列を返す', async () => {
      server.use(
        http.get(
          'https://jsonplaceholder.typicode.com/posts/999/comments',
          () => {
            return HttpResponse.json([])
          },
        ),
      )

      const comments = await getPostComments(999)
      expect(comments).toEqual([])
    })
  })

  describe('createPost', () => {
    it('新しい投稿を正常に作成する', async () => {
      server.use(
        http.post(
          'https://jsonplaceholder.typicode.com/posts',
          async ({ request }) => {
            const body = (await request.json()) as typeof mockCreatePostData
            return HttpResponse.json({
              ...body,
              id: Date.now(), // ユニークなIDを生成
            })
          },
        ),
      )

      const createdPost = await createPost(mockCreatePostData)
      expect(createdPost.title).toBe(mockCreatePostData.title)
      expect(createdPost.body).toBe(mockCreatePostData.body)
      expect(createdPost.userId).toBe(mockCreatePostData.userId)
      expect(createdPost.id).toEqual(expect.any(Number))
    })

    it('空のタイトルでも投稿を作成できる（JSONPlaceholder APIの寛容な仕様）', async () => {
      const emptyTitleData = { title: '', body: 'Test body', userId: 1 }

      server.use(
        http.post(
          'https://jsonplaceholder.typicode.com/posts',
          async ({ request }) => {
            const body = (await request.json()) as typeof emptyTitleData
            return HttpResponse.json({
              ...body,
              id: Date.now(),
            })
          },
        ),
      )

      const createdPost = await createPost(emptyTitleData)
      expect(createdPost.title).toBe('')
      expect(createdPost.body).toBe('Test body')
      expect(createdPost.userId).toBe(1)
      expect(createdPost.id).toEqual(expect.any(Number))
    })
  })

  describe('updatePost', () => {
    it('投稿を正常に更新する', async () => {
      server.use(
        http.put(
          'https://jsonplaceholder.typicode.com/posts/1',
          async ({ request }) => {
            const body = (await request.json()) as typeof mockUpdatePostData
            return HttpResponse.json({
              ...body,
              id: 1,
            })
          },
        ),
      )

      const updatedPost = await updatePost(mockUpdatePostData)
      expect(updatedPost.title).toBe(mockUpdatePostData.title)
      expect(updatedPost.body).toBe(mockUpdatePostData.body)
      expect(updatedPost.userId).toBe(mockUpdatePostData.userId)
      expect(updatedPost.id).toBe(1)
    })

    it('存在しない投稿の場合は404エラーになる', async () => {
      const nonExistentData = { ...mockUpdatePostData, id: 999 }

      server.use(
        http.put('https://jsonplaceholder.typicode.com/posts/999', () => {
          return HttpResponse.json(
            { message: 'Post not found' },
            { status: 404 },
          )
        }),
      )

      await expect(updatePost(nonExistentData)).rejects.toThrow()
    })
  })

  describe('deletePost', () => {
    it('投稿を正常に削除する', async () => {
      server.use(
        http.delete('https://jsonplaceholder.typicode.com/posts/1', () => {
          return HttpResponse.json({})
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
