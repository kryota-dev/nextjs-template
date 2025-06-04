import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import type { Comment } from '@/libs/jsonplaceholder'

import { CommentList } from './CommentList'

describe('CommentList', () => {
  const mockComments: Comment[] = [
    {
      id: 1,
      postId: 1,
      name: 'Test Comment 1',
      email: 'test1@example.com',
      body: 'This is the first test comment body.',
    },
    {
      id: 2,
      postId: 1,
      name: 'Test Comment 2',
      email: 'test2@example.com',
      body: 'This is the second test comment body.',
    },
    {
      id: 3,
      postId: 1,
      name: 'Test Comment 3',
      email: 'test3@example.com',
      body: 'This is the third test comment body.',
    },
  ]

  describe('レンダリング', () => {
    it('コメント一覧のタイトルが表示される', () => {
      render(<CommentList comments={mockComments} />)
      expect(screen.getByText('コメント (3件)')).toBeInTheDocument()
    })

    it('すべてのコメントが表示される', () => {
      render(<CommentList comments={mockComments} />)

      expect(screen.getByText('Test Comment 1')).toBeInTheDocument()
      expect(screen.getByText('test1@example.com')).toBeInTheDocument()
      expect(
        screen.getByText('This is the first test comment body.'),
      ).toBeInTheDocument()

      expect(screen.getByText('Test Comment 2')).toBeInTheDocument()
      expect(screen.getByText('test2@example.com')).toBeInTheDocument()
      expect(
        screen.getByText('This is the second test comment body.'),
      ).toBeInTheDocument()

      expect(screen.getByText('Test Comment 3')).toBeInTheDocument()
      expect(screen.getByText('test3@example.com')).toBeInTheDocument()
      expect(
        screen.getByText('This is the third test comment body.'),
      ).toBeInTheDocument()
    })

    it('コメント数が正しく表示される', () => {
      render(<CommentList comments={mockComments.slice(0, 2)} />)
      expect(screen.getByText('コメント (2件)')).toBeInTheDocument()
    })

    it('単一コメントの場合も正しく表示される', () => {
      render(<CommentList comments={[mockComments[0]]} />)
      expect(screen.getByText('コメント (1件)')).toBeInTheDocument()
      expect(screen.getByText('Test Comment 1')).toBeInTheDocument()
    })
  })

  describe('空状態', () => {
    it('コメントが空の場合、メッセージが表示される', () => {
      render(<CommentList comments={[]} />)
      expect(screen.getByText('コメントはまだありません')).toBeInTheDocument()
    })

    it('コメントが空の場合、タイトルは表示されない', () => {
      render(<CommentList comments={[]} />)
      expect(screen.queryByText(/コメント \(\d+件\)/)).not.toBeInTheDocument()
    })
  })

  describe('コメント構造', () => {
    it('各コメントが適切な要素でマークアップされている', () => {
      render(<CommentList comments={[mockComments[0]]} />)

      // コメントの最外側要素を取得（key属性を持つdiv要素）
      const commentElements = document.querySelectorAll(
        '[data-testid="comment-item"]',
      )
      if (commentElements.length === 0) {
        // data-testidがない場合、構造から推測
        const commentElement = screen
          .getByText('Test Comment 1')
          .closest('.rounded-lg')
        expect(commentElement).toBeInTheDocument()
        expect(commentElement).toHaveClass(
          'rounded-lg',
          'border',
          'border-gray-200',
          'bg-gray-50',
          'p-4',
        )
      } else {
        expect(commentElements[0]).toHaveClass(
          'rounded-lg',
          'border',
          'border-gray-200',
          'bg-gray-50',
          'p-4',
        )
      }
    })

    it('コメント名がheading要素でマークアップされている', () => {
      render(<CommentList comments={[mockComments[0]]} />)

      const nameElement = screen.getByRole('heading', {
        level: 4,
        name: 'Test Comment 1',
      })
      expect(nameElement).toBeInTheDocument()
    })

    it('メールアドレスが適切にスタイリングされている', () => {
      render(<CommentList comments={[mockComments[0]]} />)

      const emailElement = screen.getByText('test1@example.com')
      expect(emailElement).toHaveClass('text-sm', 'text-gray-500')
    })
  })

  describe('スタイリング', () => {
    it('コメントリストコンテナが適切なクラスを持つ', () => {
      const { container } = render(<CommentList comments={mockComments} />)
      const commentListContainer = container.firstChild
      expect(commentListContainer).toHaveClass('space-y-4')
    })

    it('個別のコメントアイテムが適切なスタイルを持つ', () => {
      render(<CommentList comments={[mockComments[0]]} />)

      // コメントの最外側要素を取得
      const commentElement = screen
        .getByText('Test Comment 1')
        .closest('.rounded-lg')
      expect(commentElement).toHaveClass(
        'rounded-lg',
        'border',
        'border-gray-200',
        'bg-gray-50',
        'p-4',
      )
    })

    it('タイトルが適切なスタイルを持つ', () => {
      render(<CommentList comments={mockComments} />)

      const titleElement = screen.getByText('コメント (3件)')
      expect(titleElement).toHaveClass(
        'mb-4',
        'text-lg',
        'font-semibold',
        'text-gray-900',
      )
    })
  })

  describe('アクセシビリティ', () => {
    it('コメントリストに適切なセマンティクスが設定されている', () => {
      render(<CommentList comments={mockComments} />)

      // メインタイトルがh3要素として正しく設定されている
      const mainHeading = screen.getByRole('heading', { level: 3 })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveTextContent('コメント (3件)')
    })

    it('各コメントの名前がheading要素でマークアップされている', () => {
      render(<CommentList comments={mockComments} />)

      const nameHeadings = screen.getAllByRole('heading', { level: 4 })
      expect(nameHeadings).toHaveLength(3)
      expect(nameHeadings[0]).toHaveTextContent('Test Comment 1')
      expect(nameHeadings[1]).toHaveTextContent('Test Comment 2')
      expect(nameHeadings[2]).toHaveTextContent('Test Comment 3')
    })

    it('コメント名がheading要素でマークアップされている', () => {
      render(<CommentList comments={mockComments} />)

      mockComments.forEach((comment) => {
        const nameElement = screen.getByRole('heading', { name: comment.name })
        expect(nameElement).toBeInTheDocument()
      })
    })
  })

  describe('データの表示', () => {
    it('改行を含むコメント本文が正しく表示される', () => {
      const commentWithNewline = {
        ...mockComments[0],
        body: 'First line\nSecond line\nThird line',
      }

      render(<CommentList comments={[commentWithNewline]} />)

      // 改行文字を含むテキストを部分的に検索
      expect(screen.getByText(/First line/)).toBeInTheDocument()
      expect(screen.getByText(/Second line/)).toBeInTheDocument()
      expect(screen.getByText(/Third line/)).toBeInTheDocument()
    })

    it('長いコメント名やメールアドレスが適切に表示される', () => {
      const longComment = {
        ...mockComments[0],
        name: 'This is a very long comment name that might wrap to multiple lines',
        email: 'verylongemailaddress@verylongdomainname.example.com',
      }

      render(<CommentList comments={[longComment]} />)
      expect(
        screen.getByText(
          'This is a very long comment name that might wrap to multiple lines',
        ),
      ).toBeInTheDocument()
      expect(
        screen.getByText('verylongemailaddress@verylongdomainname.example.com'),
      ).toBeInTheDocument()
    })

    it('特殊文字を含むコメントが正しく表示される', () => {
      const specialComment = {
        ...mockComments[0],
        name: 'Test & Comment <with> "special" characters',
        body: 'Body with special chars: @#$%^&*()_+{}[]|\\:";\'<>?,./',
      }

      render(<CommentList comments={[specialComment]} />)
      expect(
        screen.getByText('Test & Comment <with> "special" characters'),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'Body with special chars: @#$%^&*()_+{}[]|\\:";\'<>?,./',
        ),
      ).toBeInTheDocument()
    })
  })
})
