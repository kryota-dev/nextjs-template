import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Navigation } from './Navigation'

describe('Navigation', () => {
  describe('レンダリング', () => {
    it('すべてのナビゲーションリンクが表示される', () => {
      render(<Navigation />)

      expect(screen.getByRole('link', { name: 'Blog App' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'ニュース' })).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'プロフィール' }),
      ).toBeInTheDocument()
    })

    it('ナビゲーションが適切なセマンティクスを持つ', () => {
      render(<Navigation />)

      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })
  })

  describe('リンク属性', () => {
    it('Blog Appリンクが正しいhrefを持つ', () => {
      render(<Navigation />)

      const blogAppLink = screen.getByRole('link', { name: 'Blog App' })
      expect(blogAppLink).toHaveAttribute('href', '/')
    })

    it('ホームページリンクが正しいhrefを持つ', () => {
      render(<Navigation />)

      const homeLink = screen.getByRole('link', { name: 'ホーム' })
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('ニュースリンクが正しいhrefを持つ', () => {
      render(<Navigation />)

      const newsLink = screen.getByRole('link', { name: 'ニュース' })
      expect(newsLink).toHaveAttribute('href', '/news')
    })

    it('プロフィールリンクが正しいhrefを持つ', () => {
      render(<Navigation />)

      const profilesLink = screen.getByRole('link', { name: 'プロフィール' })
      expect(profilesLink).toHaveAttribute('href', '/profiles')
    })
  })

  describe('スタイリング', () => {
    it('ナビゲーションコンテナが適切なクラスを持つ', () => {
      const { container } = render(<Navigation />)
      const nav = container.firstChild
      expect(nav).toHaveClass('border-b', 'bg-white', 'shadow-sm')
    })

    it('通常のリンクが適切なスタイルを持つ', () => {
      render(<Navigation />)

      const homeLink = screen.getByRole('link', { name: 'ホーム' })
      expect(homeLink).toHaveClass('text-gray-900', 'hover:text-blue-600')
    })

    it('ニュースリンクが適切なスタイルを持つ', () => {
      render(<Navigation />)

      const newsLink = screen.getByRole('link', { name: 'ニュース' })
      expect(newsLink).toHaveClass('text-gray-900', 'hover:text-blue-600')
    })

    it('プロフィールリンクが適切なスタイルを持つ', () => {
      render(<Navigation />)

      const profilesLink = screen.getByRole('link', { name: 'プロフィール' })
      expect(profilesLink).toHaveClass('text-gray-900', 'hover:text-blue-600')
    })
  })

  describe('アクセシビリティ', () => {
    it('すべてのリンクがアクセス可能', () => {
      render(<Navigation />)

      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(4)

      links.forEach((link) => {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href')
      })
    })
  })

  describe('レスポンシブ対応', () => {
    it('最大幅が設定されている', () => {
      const { container } = render(<Navigation />)

      const maxWidthContainer = container.querySelector('.max-w-7xl')
      expect(maxWidthContainer).toBeInTheDocument()
    })

    it('適切なパディングが設定されている', () => {
      const { container } = render(<Navigation />)

      const paddingContainer = container.querySelector('.px-4')
      expect(paddingContainer).toBeInTheDocument()
    })

    it('フレックスレイアウトが適用されている', () => {
      const { container } = render(<Navigation />)

      const flexContainer = container.querySelector('.flex')
      expect(flexContainer).toBeInTheDocument()
    })
  })

  describe('ナビゲーション構造', () => {
    it('正しい順序でリンクが表示される', () => {
      render(<Navigation />)

      const links = screen.getAllByRole('link')
      expect(links[0]).toHaveTextContent('Blog App')
      expect(links[1]).toHaveTextContent('ホーム')
      expect(links[2]).toHaveTextContent('ニュース')
      expect(links[3]).toHaveTextContent('プロフィール')
    })
  })
})
