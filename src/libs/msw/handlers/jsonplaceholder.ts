import { http, HttpResponse } from 'msw'

import type { CreatePostData, UpdatePostData } from '@/libs/jsonplaceholder'

import { mockPosts, mockComments, createMockPost } from '../data'

/**
 * JSONPlaceholder API用のMSWハンドラー
 */
export const jsonplaceholderHandlers = [
  // 投稿一覧取得
  http.get('https://jsonplaceholder.typicode.com/posts', () => {
    return HttpResponse.json(mockPosts)
  }),

  // 特定の投稿取得
  http.get('https://jsonplaceholder.typicode.com/posts/:id', ({ params }) => {
    const { id } = params
    const post = mockPosts.find((p) => p.id === Number(id))

    if (!post) {
      return HttpResponse.json({ message: 'Post not found' }, { status: 404 })
    }

    return HttpResponse.json(post)
  }),

  // 投稿のコメント取得
  http.get(
    'https://jsonplaceholder.typicode.com/posts/:id/comments',
    ({ params }) => {
      const { id } = params
      const postComments = mockComments.filter(
        (comment) => comment.postId === Number(id),
      )
      return HttpResponse.json(postComments)
    },
  ),

  // コメント一覧取得（投稿IDで絞り込み）
  http.get('https://jsonplaceholder.typicode.com/comments', ({ request }) => {
    const url = new URL(request.url)
    const postId = url.searchParams.get('postId')

    if (postId) {
      const postComments = mockComments.filter(
        (c) => c.postId === Number(postId),
      )
      return HttpResponse.json(postComments)
    }

    return HttpResponse.json(mockComments)
  }),

  // 投稿作成
  http.post(
    'https://jsonplaceholder.typicode.com/posts',
    async ({ request }) => {
      const body = (await request.json()) as CreatePostData
      const newPost = createMockPost(body)
      return HttpResponse.json(newPost, { status: 201 })
    },
  ),

  // 投稿更新（PUT）
  http.put(
    'https://jsonplaceholder.typicode.com/posts/:id',
    async ({ params, request }) => {
      const { id } = params
      const body = (await request.json()) as UpdatePostData

      const existingPost = mockPosts.find((p) => p.id === Number(id))
      if (!existingPost) {
        return HttpResponse.json({ message: 'Post not found' }, { status: 404 })
      }

      const updatedPost = {
        ...existingPost,
        ...body,
        id: Number(id), // idは変更されない
      }

      return HttpResponse.json(updatedPost)
    },
  ),

  // 投稿更新（PATCH）
  http.patch(
    'https://jsonplaceholder.typicode.com/posts/:id',
    async ({ params, request }) => {
      const { id } = params
      const body = (await request.json()) as Partial<UpdatePostData>

      const existingPost = mockPosts.find((p) => p.id === Number(id))
      if (!existingPost) {
        return HttpResponse.json({ message: 'Post not found' }, { status: 404 })
      }

      const updatedPost = {
        ...existingPost,
        ...body,
        id: Number(id), // idは変更されない
      }

      return HttpResponse.json(updatedPost)
    },
  ),

  // 投稿削除
  http.delete(
    'https://jsonplaceholder.typicode.com/posts/:id',
    ({ params }) => {
      const { id } = params
      const post = mockPosts.find((p) => p.id === Number(id))

      if (!post) {
        return HttpResponse.json({ message: 'Post not found' }, { status: 404 })
      }

      return HttpResponse.json({}, { status: 200 })
    },
  ),
]
