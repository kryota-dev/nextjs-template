import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { SITE_NAME } from '@/constants'

import { Header } from './Header'

// usePathnameをモック
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}))

describe('Header', () => {
  beforeEach(async () => {
    // デフォルトでルートパスをモック
    const { usePathname } = vi.mocked(await import('next/navigation'))
    vi.mocked(usePathname).mockReturnValue('/')
  })

  describe('レンダリング', () => {
    it('すべてのナビゲーションリンクが表示される', () => {
      render(<Header />)

      expect(
        screen.getByRole('link', { name: `${SITE_NAME} - ホームページへ移動` }),
      ).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'ホーム' })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: 'ニュース' })).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'プロフィール' }),
      ).toBeInTheDocument()
    })

    it('ヘッダーが適切なセマンティクスを持つ', () => {
      render(<Header />)
      const header = screen.getByRole('banner')
      expect(header).toBeInTheDocument()
    })

    it('ナビゲーションが適切なセマンティクスを持つ', () => {
      render(<Header />)

      const nav = screen.getByRole('navigation', {
        name: 'メインナビゲーション',
      })
      expect(nav).toBeInTheDocument()
      expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション')
    })
  })

  describe('リンク属性', () => {
    it('サイト名リンクが正しいhrefを持つ', () => {
      render(<Header />)

      const blogAppLink = screen.getByRole('link', {
        name: `${SITE_NAME} - ホームページへ移動`,
      })
      expect(blogAppLink).toHaveAttribute('href', '/')
    })

    it('ホームページリンクが正しいhrefを持つ', () => {
      render(<Header />)

      const homeLink = screen.getByRole('link', { name: 'ホーム' })
      expect(homeLink).toHaveAttribute('href', '/')
    })

    it('ニュースリンクが正しいhrefを持つ', () => {
      render(<Header />)

      const newsLink = screen.getByRole('link', { name: 'ニュース' })
      expect(newsLink).toHaveAttribute('href', '/news')
    })

    it('プロフィールリンクが正しいhrefを持つ', () => {
      render(<Header />)

      const profilesLink = screen.getByRole('link', { name: 'プロフィール' })
      expect(profilesLink).toHaveAttribute('href', '/profiles')
    })
  })

  describe('スタイリング', () => {
    it('ナビゲーションコンテナが適切なクラスを持つ', () => {
      const { container } = render(<Header />)
      const header = container.firstChild
      expect(header).toHaveClass('border-b', 'bg-white', 'shadow-sm')
    })

    it('通常のリンクが適切なスタイルを持つ', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue('/some-other-page')

      render(<Header />)

      const homeLink = screen.getByRole('link', { name: 'ホーム' })
      expect(homeLink).toHaveClass('text-gray-900', 'hover:text-blue-600')
    })

    it('ニュースリンクが適切なスタイルを持つ', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue('/some-other-page')

      render(<Header />)

      const newsLink = screen.getByRole('link', { name: 'ニュース' })
      expect(newsLink).toHaveClass('text-gray-900', 'hover:text-blue-600')
    })

    it('プロフィールリンクが適切なスタイルを持つ', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue('/some-other-page')

      render(<Header />)

      const profilesLink = screen.getByRole('link', { name: 'プロフィール' })
      expect(profilesLink).toHaveClass('text-gray-900', 'hover:text-blue-600')
    })
  })

  describe('アクセシビリティ', () => {
    it('すべてのリンクがアクセス可能', () => {
      render(<Header />)

      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(4)

      links.forEach((link) => {
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href')
      })
    })

    it('ナビゲーション要素が適切なaria-labelを持つ', () => {
      render(<Header />)

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション')
    })

    it('フォーカス管理が適切に設定されている', () => {
      render(<Header />)

      const siteNameLink = screen.getByRole('link', {
        name: `${SITE_NAME} - ホームページへ移動`,
      })
      expect(siteNameLink).toHaveClass('focus:ring-2', 'focus:ring-blue-500')

      const navLinks = [
        screen.getByRole('link', { name: 'ホーム' }),
        screen.getByRole('link', { name: 'ニュース' }),
        screen.getByRole('link', { name: 'プロフィール' }),
      ]

      navLinks.forEach((link) => {
        expect(link).toHaveClass('focus:ring-2', 'focus:ring-blue-500')
      })
    })
  })

  describe('現在ページの表示', () => {
    it('ホームページが現在ページの場合、適切にマークされる', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue('/')

      render(<Header />)

      const homeLink = screen.getByRole('link', { name: 'ホーム' })
      expect(homeLink).toHaveAttribute('aria-current', 'page')
      expect(homeLink).toHaveClass('bg-blue-100', 'text-blue-900')
    })

    it('ニュースページが現在ページの場合、適切にマークされる', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue('/news')

      render(<Header />)

      const newsLink = screen.getByRole('link', { name: 'ニュース' })
      expect(newsLink).toHaveAttribute('aria-current', 'page')
      expect(newsLink).toHaveClass('bg-blue-100', 'text-blue-900')
    })

    it('プロフィールページが現在ページの場合、適切にマークされる', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue('/profiles')

      render(<Header />)

      const profilesLink = screen.getByRole('link', { name: 'プロフィール' })
      expect(profilesLink).toHaveAttribute('aria-current', 'page')
      expect(profilesLink).toHaveClass('bg-blue-100', 'text-blue-900')
    })

    it('ニュース詳細ページでもニュースリンクが現在ページとしてマークされる', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue('/news/some-article')

      render(<Header />)

      const newsLink = screen.getByRole('link', { name: 'ニュース' })
      expect(newsLink).toHaveAttribute('aria-current', 'page')
    })

    it('プロフィール詳細ページでもプロフィールリンクが現在ページとしてマークされる', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue('/profiles/some-profile')

      render(<Header />)

      const profilesLink = screen.getByRole('link', { name: 'プロフィール' })
      expect(profilesLink).toHaveAttribute('aria-current', 'page')
    })
  })

  describe('レスポンシブ対応', () => {
    it('最大幅が設定されている', () => {
      const { container } = render(<Header />)

      const maxWidthContainer = container.querySelector('.max-w-7xl')
      expect(maxWidthContainer).toBeInTheDocument()
    })

    it('適切なパディングが設定されている', () => {
      const { container } = render(<Header />)

      const paddingContainer = container.querySelector('.px-4')
      expect(paddingContainer).toBeInTheDocument()
    })

    it('フレックスレイアウトが適用されている', () => {
      const { container } = render(<Header />)

      const flexContainer = container.querySelector('.flex')
      expect(flexContainer).toBeInTheDocument()
    })

    it('スモールスクリーン以上でナビゲーションが表示される', () => {
      render(<Header />)

      const navContainer = screen
        .getByRole('navigation')
        .querySelector('.sm\\:flex')
      expect(navContainer).toBeInTheDocument()
      expect(navContainer).toHaveClass('hidden', 'sm:flex')
    })
  })

  describe('ナビゲーション構造', () => {
    it('正しい順序でリンクが表示される', () => {
      render(<Header />)

      const links = screen.getAllByRole('link')
      expect(links[0]).toHaveTextContent(SITE_NAME)
      expect(links[1]).toHaveTextContent('ホーム')
      expect(links[2]).toHaveTextContent('ニュース')
      expect(links[3]).toHaveTextContent('プロフィール')
    })

    it('見出し構造が適切', () => {
      render(<Header />)

      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toContainElement(
        screen.getByRole('link', { name: `${SITE_NAME} - ホームページへ移動` }),
      )
    })

    it('ナビゲーションのrole属性が設定されている', () => {
      render(<Header />)

      const nav = screen.getByRole('navigation')
      expect(nav).toHaveAttribute('role', 'navigation')
    })
  })

  describe('エラーハンドリング', () => {
    it('pathnameがnullの場合でもエラーが発生しない', async () => {
      const { usePathname } = vi.mocked(await import('next/navigation'))
      vi.mocked(usePathname).mockReturnValue(null as unknown as string)

      expect(() => render(<Header />)).not.toThrow()
    })
  })
})
