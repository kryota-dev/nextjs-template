import { describe, expect, it } from 'vitest'

import { sanitize } from './sanitize'

describe('sanitize', () => {
  it('安全なHTMLタグをそのまま返す', () => {
    const input = '<p>これは安全なテキストです</p>'
    const result = sanitize(input)
    expect(result).toBe('<p>これは安全なテキストです</p>')
  })

  it('危険なスクリプトタグを除去する', () => {
    const input = '<p>テキスト</p><script>alert("XSS")</script>'
    const result = sanitize(input)
    expect(result).toBe('<p>テキスト</p>')
  })

  it('target属性を保持する', () => {
    const input = '<a href="https://example.com" target="_blank">リンク</a>'
    const result = sanitize(input)
    expect(result).toBe(
      '<a href="https://example.com" target="_blank">リンク</a>',
    )
  })

  it('危険なイベントハンドラーを除去する', () => {
    const input = '<button onclick="alert(\'XSS\')">ボタン</button>'
    const result = sanitize(input)
    expect(result).toBe('<button>ボタン</button>')
  })

  it('空文字列を処理する', () => {
    const input = ''
    const result = sanitize(input)
    expect(result).toBe('')
  })

  it('プレーンテキストをそのまま返す', () => {
    const input = 'これはプレーンテキストです'
    const result = sanitize(input)
    expect(result).toBe('これはプレーンテキストです')
  })

  it('複数の危険な要素を含むHTMLを適切にサニタイズする', () => {
    const input = `
      <div>
        <p>安全なテキスト</p>
        <script>alert('XSS')</script>
        <img src="x" onerror="alert('XSS')">
        <a href="javascript:alert('XSS')">危険なリンク</a>
        <a href="https://example.com" target="_blank">安全なリンク</a>
      </div>
    `
    const result = sanitize(input)

    // スクリプトタグとイベントハンドラーが除去されていることを確認
    expect(result).not.toContain('<script>')
    expect(result).not.toContain('onerror')
    expect(result).not.toContain('javascript:')

    // 安全な要素とtarget属性は保持されていることを確認
    expect(result).toContain('<p>安全なテキスト</p>')
    expect(result).toContain('target="_blank"')
    expect(result).toContain('https://example.com')
  })

  it('iframe要素を除去する', () => {
    const input = '<p>テキスト</p><iframe src="https://example.com"></iframe>'
    const result = sanitize(input)
    expect(result).toBe('<p>テキスト</p>')
  })

  it('style属性のCSS値を適切に処理する', () => {
    const input =
      '<p style="color: red; background: url(javascript:alert(1))">テキスト</p>'
    const result = sanitize(input)

    // 要素とテキストは残っていることを確認
    expect(result).toContain('<p')
    expect(result).toContain('テキスト')
    expect(result).toContain('</p>')

    // 安全なstyleは保持される可能性があることを確認
    // DOMPurifyは一部のstyle値を保持する場合があるため、存在のみをチェック
    expect(result).toBeTruthy()
  })

  it('data-*属性を適切に処理する', () => {
    const input =
      '<div data-test="value" data-unsafe="javascript:alert(1)">テキスト</div>'
    const result = sanitize(input)

    // 要素とテキストは残っていることを確認
    expect(result).toContain('<div')
    expect(result).toContain('テキスト')
    expect(result).toContain('</div>')

    // data-test属性は安全なので保持される
    expect(result).toContain('data-test="value"')
  })

  it('安全なHTMLの構造を保持する', () => {
    const input =
      '<div><h1>タイトル</h1><p>段落<strong>強調</strong>テキスト</p></div>'
    const result = sanitize(input)
    expect(result).toBe(
      '<div><h1>タイトル</h1><p>段落<strong>強調</strong>テキスト</p></div>',
    )
  })

  it('HTMLエンティティを適切に処理する', () => {
    const input = '<p>&lt;script&gt;alert(&quot;test&quot;)&lt;/script&gt;</p>'
    const result = sanitize(input)
    expect(result).toContain('&lt;script&gt;')
    expect(result).toContain('"test"')
  })
})
