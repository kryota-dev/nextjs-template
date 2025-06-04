'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { getPost, updatePost } from '@/libs/jsonplaceholder'
import type { Post } from '@/libs/jsonplaceholder'

import { EditPostPagePresentation } from './presentation'

interface EditPostPageContainerProps {
  id: number
}

export function EditPostPageContainer({ id }: EditPostPageContainerProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPost, setIsLoadingPost] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(id)
        setPost(fetchedPost)
      } catch {
        // エラーが発生した場合はエラーメッセージを設定
        setError('記事の取得に失敗しました')
      } finally {
        setIsLoadingPost(false)
      }
    }

    fetchPost()
  }, [id])

  const handleSubmit = async (data: { title: string; body: string }) => {
    if (!post) return

    setIsLoading(true)
    try {
      await updatePost({
        id: post.id,
        title: data.title,
        body: data.body,
        userId: post.userId,
      })

      // 更新された投稿の詳細ページに遷移
      router.push(`/posts/${post.id}`)
    } catch {
      // エラーハンドリング
      alert('投稿の更新に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <EditPostPagePresentation
      post={post}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      isLoadingPost={isLoadingPost}
      error={error}
    />
  )
}
