// @ts-check

/**
 * prettierのデフォルト設定
 * @type {import("prettier").Config}
 */
const defaultConfig = {
  arrowParens: 'always',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'css',
  printWidth: 80,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
}

/**
 * tailwindの設定
 * @type {import("prettier").Config}
 */
const tailwindConfig = {
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'cn', 'tv', 'twMerge'],
}

/**
 * prettierの設定
 * @type {import("prettier").Config}
 */
const config = {
  ...defaultConfig,
  singleQuote: true,
  semi: false,
  jsxSingleQuote: true,
  overrides: [
    {
      files: ['**/*.json5'],
      options: {
        parser: 'jsonc',
        trailingComma: 'none',
      },
    },
  ],
  ...tailwindConfig,
}

export default config
