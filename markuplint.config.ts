import type { Config } from '@markuplint/ml-config'

/**
 * Markuplintの設定オブジェクト
 */
const config: Config = {
  /** 推奨設定の継承（React向けの推奨ルールセットを使用） */
  extends: ['markuplint:recommended-react'],

  /** ファイルパーサーの設定 */
  parser: {
    /** JSX/TSXファイルに対してJSXパーサーを使用 */
    ['\\.[jt]sx?$']: '@markuplint/jsx-parser',
  },

  /** 解析仕様の設定 */
  specs: {
    /** JSX/TSXファイルに対してReact仕様を使用 */
    ['\\.[jt]sx?$']: '@markuplint/react-spec',
  },

  /** 検証から除外するファイルパターン */
  excludeFiles: ['./**/*.stories.[jt]sx'],

  /** ルール設定 */
  rules: {
    /** 無効な属性のチェック設定 */
    'invalid-attr': {
      /** エラーレベルの設定 */
      severity: 'error',
      /** チェック対象の値 */
      value: ['jsx'],
      /** オプション設定 */
      options: {
        /** jsx接頭辞を持つ属性を無視 */
        ignoreAttrNamePrefix: 'jsx',
      },
    },
    /** 属性の重複チェックを無効化 */
    'attr-duplication': false,
  },

  /** 特定のファイルパターンに対する個別設定 */
  overrides: {
    /** Next.jsのページコンポーネントに対する設定 */
    'src/app/**/page.tsx': {
      rules: {
        /** IDのハードコードを許可 */
        'no-hard-code-id': false,
      },
    },
    /** 全てのTSXファイルに対する設定 */
    '**/*.tsx': {
      rules: {
        /** 連続する改行タグを許可 */
        'no-consecutive-br': false,
      },
    },
  },
}

export default config
