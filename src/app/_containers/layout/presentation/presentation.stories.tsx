import { RootLayoutPresentation } from './presentation'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof RootLayoutPresentation> = {
  title: 'app/_containers/layout/presentation',
  component: RootLayoutPresentation,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    storybook: true,
    children: (
      <div className='p-8'>
        <h1>Sample Page Content</h1>
        <p>This is a sample content to demonstrate the root layout.</p>
      </div>
    ),
  },
} satisfies Meta<typeof RootLayoutPresentation>

export default meta
type Story = StoryObj<typeof RootLayoutPresentation>

export const Default: Story = {}

export const WithLongContent: Story = {
  args: {
    children: (
      <div className='space-y-4 p-8'>
        <h1>Long Content Page</h1>
        <p>
          This is a sample page with longer content to test the layout behavior.
        </p>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    ),
  },
}
