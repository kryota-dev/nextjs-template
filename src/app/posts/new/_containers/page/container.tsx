'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { createPost } from '@/libs/jsonplaceholder'

import { NewPostPagePresentation } from './presentation'

export function NewPostPageContainer() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: { title: string; body: string }) => {
    setIsLoading(true)
    try {
      const newPost = await createPost({
        ...data,
        userId: 1, // 固定値として設定
      })

      // 作成された投稿の詳細ページに遷移
      router.push(`/posts/${newPost.id}`)
    } catch {
      // エラーハンドリング
      alert('投稿の作成に失敗しました')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <NewPostPagePresentation onSubmit={handleSubmit} isLoading={isLoading} />
  )
}
