import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@chromatic-com/storybook',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
}
export default config
