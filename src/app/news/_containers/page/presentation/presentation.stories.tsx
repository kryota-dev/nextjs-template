import { mockNews } from '@/libs/msw/data'

import { NewsListPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof NewsListPagePresentation> = {
  title: 'app/news/_containers/page/presentation',
  component: NewsListPagePresentation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NewsListPagePresentation>

export default meta
type Story = StoryObj<typeof NewsListPagePresentation>

export const Default: Story = {
  args: {
    news: mockNews,
    totalCount: mockNews.length,
  },
}

export const Empty: Story = {
  args: {
    news: [],
    totalCount: 0,
  },
}

export const SingleNews: Story = {
  args: {
    news: [mockNews[0]],
    totalCount: 1,
  },
}
