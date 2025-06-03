import { LinkButton } from './LinkButton'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  title: 'components/common/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  args: {
    children: 'LinkButton',
    href: 'https://example.com',
  },
} satisfies Meta<typeof LinkButton>

type Story = StoryObj<typeof LinkButton>

export const Default: Story = {}
