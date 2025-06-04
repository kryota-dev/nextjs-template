import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Post } from '@/libs/jsonplaceholder'

import { PostCard } from './PostCard'

describe('PostCard', () => {
  const mockPost: Post = {
    id: 1,
    title: 'Test Post Title',
    body: 'This is a test post body with more than 100 characters to test the excerpt functionality. This should be truncated in the display.',
    userId: 1,
  }

  describe('レンダリング', () => {
    it('投稿のタイトルが表示される', () => {
      render(<PostCard post={mockPost} />)
      expect(screen.getByText('Test Post Title')).toBeInTheDocument()
    })

    it('投稿者IDが表示される', () => {
      render(<PostCard post={mockPost} />)
      expect(screen.getByText('投稿者ID: 1')).toBeInTheDocument()
    })

    it('詳細リンクが正しいhrefを持つ', () => {
      render(<PostCard post={mockPost} />)
      const detailLink = screen.getByRole('link', { name: '詳細を見る' })
      expect(detailLink).toHaveAttribute('href', '/posts/1')
    })

    it('タイトルリンクが正しいhrefを持つ', () => {
      render(<PostCard post={mockPost} />)
      const titleLink = screen.getByRole('link', { name: 'Test Post Title' })
      expect(titleLink).toHaveAttribute('href', '/posts/1')
    })
  })

  describe('本文の表示制御', () => {
    it('showExcerpt=trueの場合、本文の抜粋が表示される（デフォルト）', () => {
      render(<PostCard post={mockPost} />)
      expect(
        screen.getByText(
          /This is a test post body with more than 100 characters/,
        ),
      ).toBeInTheDocument()
    })

    it('showExcerpt=falseの場合、本文が表示されない', () => {
      render(<PostCard post={mockPost} showExcerpt={false} />)
      expect(
        screen.queryByText(/This is a test post body/),
      ).not.toBeInTheDocument()
    })

    it('本文が100文字を超える場合、省略記号が表示される', () => {
      render(<PostCard post={mockPost} />)
      expect(screen.getByText(/\.\.\.$/)).toBeInTheDocument()
    })

    it('本文が100文字以下の場合、省略されない', () => {
      const shortPost = {
        ...mockPost,
        body: 'Short body text.',
      }
      render(<PostCard post={shortPost} />)
      expect(screen.getByText('Short body text.')).toBeInTheDocument()
      expect(screen.queryByText(/\.\.\.$/)).not.toBeInTheDocument()
    })
  })

  describe('コメント数の表示', () => {
    it('commentCountが提供された場合、コメント数が表示される', () => {
      render(<PostCard post={mockPost} commentCount={5} />)
      expect(screen.getByText('5件のコメント')).toBeInTheDocument()
    })

    it('commentCountが0の場合、0件のコメントが表示される', () => {
      render(<PostCard post={mockPost} commentCount={0} />)
      expect(screen.getByText('0件のコメント')).toBeInTheDocument()
    })

    it('commentCountが提供されない場合、コメント数が表示されない', () => {
      render(<PostCard post={mockPost} />)
      expect(screen.queryByText(/件のコメント/)).not.toBeInTheDocument()
    })

    it('commentCountと一緒にコメントアイコンが表示される', () => {
      render(<PostCard post={mockPost} commentCount={3} />)
      const svgElement = screen
        .getByText('3件のコメント')
        .parentElement?.querySelector('svg')
      expect(svgElement).toBeInTheDocument()
    })
  })

  describe('スタイリング', () => {
    it('カードが適切なクラス名を持つ', () => {
      const { container } = render(<PostCard post={mockPost} />)
      const card = container.firstChild
      expect(card).toHaveClass(
        'rounded-lg',
        'border',
        'border-gray-200',
        'bg-white',
      )
    })

    it('ホバー効果のクラスが適用される', () => {
      const { container } = render(<PostCard post={mockPost} />)
      const card = container.firstChild
      expect(card).toHaveClass('transition-shadow', 'hover:shadow-lg')
    })
  })
})
