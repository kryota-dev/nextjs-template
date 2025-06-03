import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

/**
 * サニタイズ処理
 * @param source サニタイズ対象
 * @returns サニタイズ後の文字列
 */
export const sanitize = (source: string | Node): string => {
  const { window } = new JSDOM()
  const purify = DOMPurify(window)

  // target属性を許可する設定を追加
  purify.setConfig({
    ADD_ATTR: ['target'],
  })

  const sanitized = purify.sanitize(source)
  return sanitized
}
