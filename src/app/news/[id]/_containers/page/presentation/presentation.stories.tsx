import { mockNews } from '@/libs/msw/data'

import { NewsDetailPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof NewsDetailPagePresentation> = {
  title: 'app/news/[id]/_containers/page/presentation',
  component: NewsDetailPagePresentation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof NewsDetailPagePresentation>

export default meta
type Story = StoryObj<typeof NewsDetailPagePresentation>

export const Default: Story = {
  args: {
    news: mockNews[0],
  },
}

export const WithPDF: Story = {
  args: {
    news: mockNews[2], // PDFが含まれているニュース
  },
}

export const NotFound: Story = {
  args: {
    news: null,
  },
}
