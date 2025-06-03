import { Header } from './Header'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  title: 'components/layouts/Header',
  component: Header,
  tags: ['autodocs'],
} satisfies Meta<typeof Header>

type Story = StoryObj<typeof Header>

export const Default: Story = {}
