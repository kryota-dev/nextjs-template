import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

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

export default defineConfig({
  plugins: [react(), stubNextAssetImport()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
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
        'src/mocks/browser.ts',
        'src/mocks/node.ts',
      ],
    },
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
