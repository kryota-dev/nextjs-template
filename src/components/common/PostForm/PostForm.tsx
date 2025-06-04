'use client'

import { useState } from 'react'

import type { Post } from '@/libs/jsonplaceholder'

interface PostFormProps {
  post?: Post
  onSubmit: (data: { title: string; body: string }) => Promise<void>
  isLoading?: boolean
  submitLabel?: string
}

export function PostForm({
  post,
  onSubmit,
  isLoading = false,
  submitLabel = '投稿',
}: PostFormProps) {
  const [title, setTitle] = useState(post?.title || '')
  const [body, setBody] = useState(post?.body || '')
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({})

  const validateForm = () => {
    const newErrors: { title?: string; body?: string } = {}

    if (!title.trim()) {
      newErrors.title = 'タイトルは必須です'
    }

    if (!body.trim()) {
      newErrors.body = '本文は必須です'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await onSubmit({ title: title.trim(), body: body.trim() })
    } catch {
      // エラーハンドリングは親コンポーネントで行う
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6'>
      <div>
        <label
          htmlFor='title'
          className='mb-2 block text-sm font-medium text-gray-700'
        >
          タイトル
        </label>
        <input
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='記事のタイトルを入力してください'
          disabled={isLoading}
        />
        {errors.title && (
          <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='body'
          className='mb-2 block text-sm font-medium text-gray-700'
        >
          本文
        </label>
        <textarea
          id='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={8}
          className={`w-full rounded-md border px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${
            errors.body ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder='記事の本文を入力してください'
          disabled={isLoading}
        />
        {errors.body && (
          <p className='mt-1 text-sm text-red-600'>{errors.body}</p>
        )}
      </div>

      <div className='flex justify-end'>
        <button
          type='submit'
          disabled={isLoading}
          className='rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isLoading ? '送信中...' : submitLabel}
        </button>
      </div>
    </form>
  )
}
