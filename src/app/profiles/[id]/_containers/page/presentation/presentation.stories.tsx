import { mockProfiles } from '@/libs/msw/data'

import { ProfileDetailPagePresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof ProfileDetailPagePresentation> = {
  title: 'app/profiles/[id]/_containers/page/presentation',
  component: ProfileDetailPagePresentation,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ProfileDetailPagePresentation>

export default meta
type Story = StoryObj<typeof ProfileDetailPagePresentation>

export const Default: Story = {
  args: {
    profile: mockProfiles[0],
  },
}

export const WithoutPhoto: Story = {
  args: {
    profile: {
      ...mockProfiles[1],
      photo: undefined,
    },
  },
}

export const NotFound: Story = {
  args: {
    profile: null,
  },
}
