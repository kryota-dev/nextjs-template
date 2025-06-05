import { mockNews, mockProfiles } from '@/libs/msw/data'

import { HomePagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof HomePagePresentation> = {
  title: 'app/_containers/page/presentation',
  component: HomePagePresentation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HomePagePresentation>

export default meta
type Story = StoryObj<typeof HomePagePresentation>

export const Default: Story = {
  args: {
    latestNews: mockNews.slice(0, 3),
    featuredProfiles: mockProfiles,
  },
}

export const EmptyContent: Story = {
  args: {
    latestNews: [],
    featuredProfiles: [],
  },
}

export const OnlyNews: Story = {
  args: {
    latestNews: mockNews.slice(0, 3),
    featuredProfiles: [],
  },
}

export const OnlyProfiles: Story = {
  args: {
    latestNews: [],
    featuredProfiles: mockProfiles,
  },
}
