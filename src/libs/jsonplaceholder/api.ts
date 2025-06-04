import type { Comment, CreatePostData, Post, UpdatePostData } from './types'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

/**
 * 全ての投稿を取得
 */
export async function getPosts(): Promise<Post[]> {
  const response = await fetch(`${BASE_URL}/posts`)
  if (!response.ok) {
    throw new Error('投稿の取得に失敗しました')
  }
  return response.json()
}

/**
 * 指定されたIDの投稿を取得
 */
export async function getPost(id: number): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${id}`)
  if (!response.ok) {
    throw new Error('投稿の取得に失敗しました')
  }
  return response.json()
}

/**
 * 指定された投稿のコメントを取得
 */
export async function getPostComments(postId: number): Promise<Comment[]> {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`)
  if (!response.ok) {
    throw new Error('コメントの取得に失敗しました')
  }
  return response.json()
}

/**
 * 新しい投稿を作成
 */
export async function createPost(data: CreatePostData): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (!response.ok) {
    throw new Error('投稿の作成に失敗しました')
  }
  return response.json()
}

/**
 * 投稿を更新
 */
export async function updatePost(data: UpdatePostData): Promise<Post> {
  const response = await fetch(`${BASE_URL}/posts/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  if (!response.ok) {
    throw new Error('投稿の更新に失敗しました')
  }
  return response.json()
}

/**
 * 投稿を削除
 */
export async function deletePost(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('投稿の削除に失敗しました')
  }
}
