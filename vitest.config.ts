import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { storybookNextJsPlugin } from '@storybook/nextjs-vite/vite-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

/**
 * Next.jsの画像インポートをスタブ化するプラグイン
 */
const stubNextAssetImport = () => ({
  name: 'stub-next-asset-import',
  transform(_code: string, id: string) {
    if (/(jpg|jpeg|png|webp|gif|svg)$/.test(id)) {
      const imgSrc = path.relative(process.cwd(), id)
      return {
        code: `export default { src '/${imgSrc}', height: 1, width: 1 }`,
      }
    }
    return undefined
  },
})

/**
 * Storybookのテスト設定
 * @see More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
 */
const storybookConfig = defineConfig({
  plugins: [
    // The plugin will run tests for the stories defined in your Storybook config
    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    storybookTest({
      configDir: path.join(dirname, '.storybook'),
      tags: { exclude: ['skip'] },
    }),
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
    include: ['src/**/*.mdx', 'src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    setupFiles: ['.storybook/vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})

/**
 * ユニットテスト設定
 */
const unitConfig = defineConfig({
  plugins: [react(), stubNextAssetImport()],
  test: {
    name: 'unit',
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{spec,test}.ts?(x)'],
    exclude: [
      'src/app/**/*.{e2e,vrt}.{spec,test}.ts?(x)',
      'src/**/_*.{spec,test}.ts?(x)',
    ],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})

/**
 * テスト設定
 */
export default defineConfig({
  plugins: [storybookNextJsPlugin()],
  test: {
    coverage: {
      enabled: true,
      reportsDirectory: '.vitest',
      reporter: [
        'text',
        ['html', { subdir: 'coverage' }],
        'json-summary',
        'json',
      ],
      include: ['src/**/*.ts?(x)'],
      exclude: [
        'src/config.ts',
        'src/styles/',
        'src/**/*.stories.ts?(x)',
        'src/**/index.ts',
        'src/**/*.d.ts',
        'src/**/*.{spec,test}.ts?(x)',
        'src/**/?(_)constants/**/*.ts',
        'src/**/?(_)types/**/*.ts',
        'src/**/?(_)data/**/*.ts',
        'src/app/robots.ts',
        'src/app/sitemap.ts',
        'src/app/**/{page,layout,default}.tsx',
        'src/libs/msw/{browser,node,nextjs}.ts',
        'src/instrumentation.ts',
      ],
    },
    projects: [unitConfig, storybookConfig],
  },
})
