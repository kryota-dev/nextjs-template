import Home from './page'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  component: Home,
  title: 'Pages/Home',
} satisfies Meta<typeof Home>

type Story = StoryObj<typeof Home>

export const Default: Story = {}
