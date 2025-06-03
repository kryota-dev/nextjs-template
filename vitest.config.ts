import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url))

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

const storybookConfig = defineConfig({
  plugins: [
    // The plugin will run tests for the stories defined in your Storybook config
    // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
    storybookTest({ configDir: path.join(dirname, '.storybook') }),
  ],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [{ browser: 'chromium' }],
    },
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

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
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
        'src/**/*.stories.ts?(x)',
        'src/**/index.ts',
        'src/**/*.d.ts',
        'src/**/*.{spec,test}.ts?(x)',
        'src/**/?(_)constants/**/*.ts',
        'src/**/?(_)types/**/*.ts',
        'src/**/?(_)data/**/*.ts',
        'src/app/robots.ts',
        'src/app/sitemap.ts',
        'src/app/**/layout.tsx',
      ],
    },
    projects: [unitConfig, storybookConfig],
  },
})
