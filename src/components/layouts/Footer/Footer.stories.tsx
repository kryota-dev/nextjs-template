import { expect, within } from 'storybook/test'

import { Footer } from './Footer'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  title: 'components/layouts/Footer',
  component: Footer,
  args: {
    children: (
      <a
        className='text-sm'
        href='https://github.com/kryota-dev/nextjs-static-export-template/blob/main/LICENSE'
        target='_blank'
        rel='noopener noreferrer'
      >
        Copyright (c) 2025 Ryota Kaneko
      </a>
    ),
  },
} satisfies Meta<typeof Footer>

type Story = StoryObj<typeof Footer>

export const Default: Story = {
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)

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
