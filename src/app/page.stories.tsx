import { expect, userEvent, within } from 'storybook/test'

import { Footer } from '@/components/layouts/Footer'
import { Header } from '@/components/layouts/Header'

import { cn } from '@/libs/stylings'

import { geistMono, geistSans } from '@/styles/fonts'

import Home from './page'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  title: 'app/page',
  component: Home,
  decorators: [
    (Story) => (
      <div
        className={cn(
          geistSans.variable,
          geistMono.variable,
          'flex min-h-screen flex-col antialiased',
        )}
      >
        <Header />
        <Story />
        <Footer>
          <a
            className='text-sm'
            href='https://github.com/kryota-dev/nextjs-static-export-template/blob/main/LICENSE'
            target='_blank'
            rel='noopener noreferrer'
          >
            Copyright (c) 2025 Ryota Kaneko
          </a>
        </Footer>
      </div>
    ),
  ],
} satisfies Meta<typeof Home>

type Story = StoryObj<typeof Home>

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('ヘッダータイトルの確認', async () => {
      const headerTitle = canvas.getByRole('heading', { level: 1 })
      await expect(headerTitle).toBeInTheDocument()
      await expect(headerTitle).toHaveTextContent(
        'Next.js Static Export Boilerplate',
      )
    })

    await step('ページタイトルの確認', async () => {
      const heading = canvas.getByRole('heading', { level: 2 })
      await expect(heading).toBeInTheDocument()
      await expect(heading).toHaveTextContent('Hello World')
    })

    await step('説明文の確認', async () => {
      const description = canvas.getByText(
        'This is a boilerplate for Next.js static export.',
      )
      await expect(description).toBeInTheDocument()
    })

    await step('GitHubリンクの確認', async () => {
      const gitHubLink = canvas.getByRole('link', { name: 'GitHub' })
      await expect(gitHubLink).toBeInTheDocument()
      await expect(gitHubLink).toHaveAttribute(
        'href',
        'https://github.com/kryota-dev/nextjs-static-export-template',
      )
    })

    await step('DeepWikiリンクの確認', async () => {
      const deepWikiLink = canvas.getByRole('link', { name: 'Ask DeepWiki' })
      await expect(deepWikiLink).toBeInTheDocument()
      await expect(deepWikiLink).toHaveAttribute(
        'href',
        'https://deepwiki.com/kryota-dev/nextjs-static-export-template',
      )
    })

    await step('フッターリンクの確認', async () => {
      const copyrightLink = canvas.getByRole('link', {
        name: 'Copyright (c) 2025 Ryota Kaneko',
      })
      await expect(copyrightLink).toBeInTheDocument()
      await expect(copyrightLink).toHaveAttribute(
        'href',
        'https://github.com/kryota-dev/nextjs-static-export-template/blob/main/LICENSE',
      )
      await expect(copyrightLink).toHaveAttribute('target', '_blank')
      await expect(copyrightLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  },
}

export const InteractionTest: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('キーボードナビゲーション確認', async () => {
      // Tab キーで最初のリンク（GitHub）にフォーカス
      await userEvent.tab()
      const gitHubLink = canvas.getByRole('link', { name: 'GitHub' })
      await expect(gitHubLink).toHaveFocus()

      // 次のリンク（DeepWiki）にフォーカス
      await userEvent.tab()
      const deepWikiLink = canvas.getByRole('link', { name: 'Ask DeepWiki' })
      await expect(deepWikiLink).toHaveFocus()

      // フッターのリンク（Copyright）にフォーカス
      await userEvent.tab()
      const copyrightLink = canvas.getByRole('link', {
        name: 'Copyright (c) 2025 Ryota Kaneko',
      })
      await expect(copyrightLink).toHaveFocus()
    })
  },
}

export const AccessibilityTest: Story = {
  parameters: {
    a11y: {
      test: 'error', // アクセシビリティ違反でCIを失敗させる
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('セマンティック構造の確認', async () => {
      // ヘッダー要素の存在確認
      const header = canvas.getByRole('banner')
      await expect(header).toBeInTheDocument()

      // メイン要素の存在確認
      const main = canvas.getByRole('main')
      await expect(main).toBeInTheDocument()

      // フッター要素の存在確認
      const footer = canvas.getByRole('contentinfo')
      await expect(footer).toBeInTheDocument()
    })

    await step('見出し階層の確認', async () => {
      // h1（ヘッダータイトル）の確認
      const h1 = canvas.getByRole('heading', { level: 1 })
      await expect(h1).toBeInTheDocument()
      await expect(h1).toHaveTextContent('Next.js Static Export Boilerplate')

      // h2（ページタイトル）の確認
      const h2 = canvas.getByRole('heading', { level: 2 })
      await expect(h2).toBeInTheDocument()
      await expect(h2).toHaveTextContent('Hello World')
    })

    await step('リンクのアクセシビリティ確認', async () => {
      // すべてのリンクに適切なテキストがあることを確認
      const links = canvas.getAllByRole('link')
      await expect(links).toHaveLength(3) // GitHub, DeepWiki, Copyright

      for (const link of links) {
        await expect(link).toHaveAccessibleName()
      }

      // 外部リンクの適切な属性確認
      const externalLinks = links.filter(
        (link) => link.getAttribute('target') === '_blank',
      )
      for (const link of externalLinks) {
        await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  },
}

export const ResponsiveTest: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
      },
    },
    chromatic: {
      modes: {
        mobile: {
          viewport: 'mobile',
        },
        tablet: {
          viewport: 'tablet',
        },
        desktop: {
          viewport: 'desktop',
        },
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

    await step('レスポンシブレイアウトの確認', async () => {
      // 全体のレイアウト構造の確認
      const header = canvas.getByRole('banner')
      const main = canvas.getByRole('main')
      const footer = canvas.getByRole('contentinfo')

      await expect(header).toBeInTheDocument()
      await expect(main).toBeInTheDocument()
      await expect(footer).toBeInTheDocument()

      // メインコンテンツ内のボタンコンテナが存在することを確認
      const buttonContainer = main.querySelector(
        'div[class*="flex"][class*="items-center"]',
      )
      await expect(buttonContainer).toBeInTheDocument()
    })
  },
}
