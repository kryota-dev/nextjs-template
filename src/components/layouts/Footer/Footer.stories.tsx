import { Footer } from './Footer'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  title: 'components/layouts/Footer',
  component: Footer,
  tags: ['autodocs'],
  args: {
    children: 'Copyright (c) 2025 Ryota Kaneko',
  },
} satisfies Meta<typeof Footer>

type Story = StoryObj<typeof Footer>

export const Default: Story = {}
