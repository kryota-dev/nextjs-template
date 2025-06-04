import { RootLayoutPresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

export default {
  title: 'app/_containers/layout/presentation',
  component: RootLayoutPresentation,
  args: {
    children: <div>Hello World</div>,
    jsonld: null,
    storybook: true,
  },
} satisfies Meta<typeof RootLayoutPresentation>

type Story = StoryObj<typeof RootLayoutPresentation>

export const Default: Story = {}
