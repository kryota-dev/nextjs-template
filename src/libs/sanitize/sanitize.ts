import DOMPurify from 'dompurify'

import { NEXT_RUNTIME } from '@/config'

let purify: typeof DOMPurify | undefined

// ブラウザ環境の場合
if (typeof window !== 'undefined') {
  const { default: DOMPurify } = await import('dompurify')
  purify = DOMPurify(window)
}
// サーバー環境の場合（Node.js）
else if (NEXT_RUNTIME === 'nodejs') {
  const { JSDOM } = await import('jsdom')
  const { window } = new JSDOM()
  purify = DOMPurify(window)
}

if (purify) {
  purify.setConfig({
    ADD_ATTR: ['target'],
  })
}

/**
 * サニタイズ処理
 * @param source サニタイズ対象
 * @returns サニタイズ後の文字列
 */
export const sanitize = (source: string | Node): string => {
  if (!purify) {
    // フォールバック: JSDOMが利用できない場合
    // eslint-disable-next-line no-console
    console.warn('Runtime is not support JSDOM')
    return typeof source === 'string' ? source : ''
  }
  return purify.sanitize(source)
}
