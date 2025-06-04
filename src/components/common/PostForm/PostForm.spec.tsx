import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import type { Post } from '@/libs/jsonplaceholder'

import { PostForm } from './PostForm'

describe('PostForm', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Existing Post Title',
    body: 'Existing post body content',
    userId: 1,
  }

  describe('レンダリング', () => {
    it('必要なフォーム要素が表示される', () => {
      render(<PostForm onSubmit={vi.fn()} submitLabel='送信' />)

      expect(screen.getByLabelText('タイトル')).toBeInTheDocument()
      expect(screen.getByLabelText('本文')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument()
    })

    it('カスタムsubmitLabelが表示される', () => {
      render(<PostForm onSubmit={vi.fn()} submitLabel='更新' />)
      expect(screen.getByRole('button', { name: '更新' })).toBeInTheDocument()
    })

    it('初期データがある場合、フォームに値が設定される', () => {
      render(<PostForm post={mockPost} onSubmit={vi.fn()} />)

      expect(
        screen.getByDisplayValue('Existing Post Title'),
      ).toBeInTheDocument()
      expect(
        screen.getByDisplayValue('Existing post body content'),
      ).toBeInTheDocument()
    })
  })

  describe('ローディング状態', () => {
    it('ローディング中はフォームが無効化される', () => {
      render(
        <PostForm onSubmit={vi.fn()} isLoading={true} submitLabel='送信' />,
      )

      expect(screen.getByLabelText('タイトル')).toBeDisabled()
      expect(screen.getByLabelText('本文')).toBeDisabled()
      expect(screen.getByRole('button')).toBeDisabled()
    })

    it('ローディング中はボタンテキストが変更される', () => {
      render(
        <PostForm onSubmit={vi.fn()} isLoading={true} submitLabel='送信' />,
      )

      expect(
        screen.getByRole('button', { name: '送信中...' }),
      ).toBeInTheDocument()
    })
  })

  describe('バリデーション', () => {
    it('タイトルが空の場合、エラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      render(<PostForm onSubmit={vi.fn()} />)

      await user.click(screen.getByRole('button', { name: '投稿' }))

      await waitFor(() => {
        expect(screen.getByText('タイトルは必須です')).toBeInTheDocument()
      })
    })

    it('本文が空の場合、エラーメッセージが表示される', async () => {
      const user = userEvent.setup()
      render(<PostForm onSubmit={vi.fn()} />)

      await user.click(screen.getByRole('button', { name: '投稿' }))

      await waitFor(() => {
        expect(screen.getByText('本文は必須です')).toBeInTheDocument()
      })
    })

    it('有効な入力の場合、エラーメッセージが表示されない', async () => {
      const user = userEvent.setup()
      render(<PostForm onSubmit={vi.fn()} />)

      await user.type(screen.getByLabelText('タイトル'), 'Valid Title')
      await user.type(screen.getByLabelText('本文'), 'Valid body content')

      expect(screen.queryByText('タイトルは必須です')).not.toBeInTheDocument()
      expect(screen.queryByText('本文は必須です')).not.toBeInTheDocument()
    })
  })

  describe('フォーム送信', () => {
    it('有効なデータで送信した場合、onSubmitが正しい値で呼ばれる', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn().mockResolvedValue(undefined)

      render(<PostForm onSubmit={mockOnSubmit} />)

      await user.type(screen.getByLabelText('タイトル'), 'Test Title')
      await user.type(screen.getByLabelText('本文'), 'Test body content')
      await user.click(screen.getByRole('button', { name: '投稿' }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Title',
          body: 'Test body content',
        })
      })
    })

    it('無効なデータで送信した場合、onSubmitが呼ばれない', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn()

      render(<PostForm onSubmit={mockOnSubmit} />)

      await user.click(screen.getByRole('button', { name: '投稿' }))

      await waitFor(() => {
        expect(screen.getByText('タイトルは必須です')).toBeInTheDocument()
      })

      expect(mockOnSubmit).not.toHaveBeenCalled()
    })

    it('前後の空白は自動的に削除される', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn().mockResolvedValue(undefined)

      render(<PostForm onSubmit={mockOnSubmit} />)

      await user.type(screen.getByLabelText('タイトル'), '  Test Title  ')
      await user.type(screen.getByLabelText('本文'), '  Test body  ')
      await user.click(screen.getByRole('button', { name: '投稿' }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          title: 'Test Title',
          body: 'Test body',
        })
      })
    })
  })

  describe('エラーハンドリング', () => {
    it('送信エラーが発生してもフォームは正常に動作する', async () => {
      const user = userEvent.setup()
      const mockOnSubmit = vi.fn().mockRejectedValue(new Error('Network error'))

      render(<PostForm onSubmit={mockOnSubmit} />)

      await user.type(screen.getByLabelText('タイトル'), 'Test Title')
      await user.type(screen.getByLabelText('本文'), 'Test body')
      await user.click(screen.getByRole('button', { name: '投稿' }))

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalled()
      })

      // エラーが発生してもフォームは利用可能な状態を維持
      expect(screen.getByLabelText('タイトル')).not.toBeDisabled()
      expect(screen.getByLabelText('本文')).not.toBeDisabled()
    })
  })

  describe('スタイリング', () => {
    it('エラー状態のときに適切なスタイルが適用される', async () => {
      const user = userEvent.setup()
      render(<PostForm onSubmit={vi.fn()} />)

      await user.click(screen.getByRole('button', { name: '投稿' }))

      await waitFor(() => {
        const titleInput = screen.getByLabelText('タイトル')
        expect(titleInput).toHaveClass('border-red-500')
      })
    })

    it('正常状態のときに適切なスタイルが適用される', () => {
      render(<PostForm onSubmit={vi.fn()} />)

      const titleInput = screen.getByLabelText('タイトル')
      expect(titleInput).toHaveClass('border-gray-300')
    })
  })
})
