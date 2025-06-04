import { expect, within } from 'storybook/test'

import { Header } from './Header'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  title: 'components/layouts/Header',
  component: Header,
} satisfies Meta<typeof Header>

type Story = StoryObj<typeof Header>

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
  },
}
