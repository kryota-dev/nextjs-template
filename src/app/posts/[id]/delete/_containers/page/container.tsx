'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { getPost, deletePost } from '@/libs/jsonplaceholder'
import type { Post } from '@/libs/jsonplaceholder'

import { DeletePostPagePresentation } from './presentation'

interface DeletePostPageContainerProps {
  id: number
}

export function DeletePostPageContainer({ id }: DeletePostPageContainerProps) {
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

  const handleDelete = async () => {
    if (!post) return

    setIsLoading(true)
    try {
      await deletePost(post.id)

      // 削除後は記事一覧ページに遷移
      router.push('/posts')
    } catch {
      // エラーハンドリング
      alert('投稿の削除に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DeletePostPagePresentation
      post={post}
      onDelete={handleDelete}
      isLoading={isLoading}
      isLoadingPost={isLoadingPost}
      error={error}
    />
  )
}
