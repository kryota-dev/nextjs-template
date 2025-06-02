import { cn } from '@/libs/stylings'

import { geistMono, geistSans } from '@/styles/fonts'

import type { Preview } from '@storybook/nextjs-vite'

import '@/styles/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    viewport: {
      viewports: {
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1280px',
            height: '800px',
          },
        },
      },
      defaultViewport: 'desktop',
    },

    layout: 'fullscreen',

    chromatic: {
      modes: {
        iphone: {
          viewport: 'iphone14',
        },
        desktop: {
          viewport: 'desktop',
        },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <div
        className={cn(geistSans.variable, geistMono.variable, 'antialiased')}
      >
        <Story />
      </div>
    ),
  ],
}

export default preview
