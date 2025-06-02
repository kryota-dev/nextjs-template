import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import importPlugin from 'eslint-plugin-import'
import storybook from 'eslint-plugin-storybook'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import vitestPlugin from '@vitest/eslint-plugin'

import type { Linter } from 'eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...(compat.extends(
    'next/core-web-vitals',
    'next/typescript',
  ) as Linter.Config[]),
  ...storybook.configs['flat/recommended'],
  {
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImportsPlugin,
      vitest: vitestPlugin,
    },
    rules: {
      // consoleをエラーにする
      'no-console': 'error',
      // default exportを禁止する
      'import/no-default-export': 'error',
      // default exportを強制しない
      'import/prefer-default-export': 'off',
      // react/display-nameを許可する
      'react/display-name': 'off',
      // propsのスプレッドを許可する
      'react/jsx-props-no-spreading': 'off',
      // defaultPropsの指定を強制しない
      'react/require-default-props': 'off',
      // button要素にtype属性を指定する
      'react/button-has-type': 'error',
      // 型importの場合、typeを指定する
      '@typescript-eslint/consistent-type-imports': 'warn',
      // switch文を禁止する
      'no-restricted-syntax': [
        'error',
        {
          selector: 'SwitchStatement',
          message:
            'Switch文を使用しないでください。代わりにts-patternを使用してください。',
        },
      ],
      // importの後に改行を強制する
      'import/newline-after-import': 'error',
      // importはファイルの先頭に配置する
      'import/first': 'error',
      // import順序
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'object',
            'type',
            'index',
          ],
          'newlines-between': 'always',
          pathGroupsExcludedImportTypes: ['builtin'],
          pathGroups: [
            ...[
              '@/components/**',
              '@/config/**',
              '@/constants/**',
              '@/images/**',
              '@/libs/**',
              '@/styles/**',
              '@/utils/**',
            ].map((pattern) => ({
              pattern,
              group: 'internal',
              position: 'before',
            })),
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      // 未使用のimportを警告する
      'unused-imports/no-unused-imports': 'warn',
      // 未使用の変数を警告する
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      // process.envの参照を禁止
      'no-process-env': 'error',
      // ネストしたdescribeの最大深度を3に制限する
      'vitest/max-nested-describe': ['error', { max: 3 }],
      // expectの呼び出しを任意にする
      'vitest/expect-expect': 'off',
      // テストのコメントアウトを許可する
      'vitest/no-commented-out-tests': 'off',
      // テストの関数を`it`に統一する
      'vitest/consistent-test-it': [
        'error',
        {
          fn: 'it',
        },
      ],
      // テストのdisableを禁止
      'vitest/no-disabled-tests': 'error',
    },
  },
  {
    files: [
      'src/app/**/*.{ts,tsx}',
      'src/**/*.stories.{ts,tsx}',
      '.storybook/**/*.{ts,tsx}',
      '**/*.config.{js,ts}',
    ],
    rules: {
      // default exportを許可する
      'import/no-default-export': 'off',
    },
  },
  {
    files: ['src/app/**/*.tsx'],
    ignores: ['src/app/**/_components/**/*.tsx'],
    rules: {
      // Next.jsのページコンポーネントでは、default exportを強制
      'import/prefer-default-export': 'error',
    },
  },
  {
    files: ['src/config.ts'],
    rules: {
      // config.tsでは、process.envの参照を許可
      'no-process-env': 'off',
    },
  },
  eslintConfigPrettier,
] satisfies Linter.Config[]

export default eslintConfig
