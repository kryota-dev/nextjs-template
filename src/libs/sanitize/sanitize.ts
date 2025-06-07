import DOMPurify from 'dompurify'

import type { Config } from 'dompurify'

const cfg: Config = {
  ADD_ATTR: ['target'],
}

/**
 * サニタイズ処理
 * @param source サニタイズ対象
 * @returns サニタイズ後の文字列
 */
export const sanitize = (source: string | Node): string => {
  // ブラウザ環境の場合
  if (typeof window !== 'undefined') {
    const purify = DOMPurify(window)

    // target属性を許可する設定を追加
    purify.setConfig({
      ...cfg,
    })

    return purify.sanitize(source)
  }

  // サーバー環境の場合（Node.js）
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { JSDOM } = require('jsdom')
    const { window } = new JSDOM()
    const purify = DOMPurify(window)

    // target属性を許可する設定を追加
    purify.setConfig({
      ...cfg,
    })

    return purify.sanitize(source)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn('JSDOM not available, returning source as-is:', error)
    return typeof source === 'string' ? source : ''
  }
}
