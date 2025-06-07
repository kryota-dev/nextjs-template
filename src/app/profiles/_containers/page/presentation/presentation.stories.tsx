import { mockProfiles } from '@/libs/msw/data'

import { ProfileListPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof ProfileListPagePresentation> = {
  title: 'app/profiles/_containers/page/presentation',
  component: ProfileListPagePresentation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProfileListPagePresentation>

export default meta
type Story = StoryObj<typeof ProfileListPagePresentation>

export const Default: Story = {
  args: {
    profiles: mockProfiles,
    totalCount: mockProfiles.length,
  },
}

export const Empty: Story = {
  args: {
    profiles: [],
    totalCount: 0,
  },
}

export const SingleProfile: Story = {
  args: {
    profiles: [mockProfiles[0]],
    totalCount: 1,
  },
}
