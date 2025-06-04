import { expect, userEvent, within } from 'storybook/test'

import { HomePagePresentation } from './presentation'
import { RootLayoutPresentation } from '../../layout/presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  title: 'app/_containers/page/presentation',
  component: HomePagePresentation,
} satisfies Meta<typeof HomePagePresentation>

type Story = StoryObj<typeof HomePagePresentation>

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

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

    await step('キーボードナビゲーション確認', async () => {
      // Tab キーで最初のリンク（GitHub）にフォーカス
      await userEvent.tab()
      const gitHubLink = canvas.getByRole('link', { name: 'GitHub' })
      await expect(gitHubLink).toHaveFocus()

      // 次のリンク（DeepWiki）にフォーカス
      await userEvent.tab()
      const deepWikiLink = canvas.getByRole('link', { name: 'Ask DeepWiki' })
      await expect(deepWikiLink).toHaveFocus()
    })
  },
}

export const WithLayout: Story = {
  decorators: [
    (Story) => (
      <RootLayoutPresentation jsonld={null} storybook>
        <Story />
      </RootLayoutPresentation>
    ),
  ],
}
