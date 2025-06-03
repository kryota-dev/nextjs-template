import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { parse } from './parse'

describe('parse', () => {
  describe('基本的な動作', () => {
    it('HTMLをReactコンポーネントに変換する', () => {
      const html = '<p>テストテキスト</p>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      expect(container.textContent).toBe('テストテキスト')
    })

    it('空文字列を渡すと空配列を返す', () => {
      const result = parse('')
      expect(result).toEqual([])
    })
  })

  describe('h2タグの処理', () => {
    it('h2要素が正しくスタイリングされる', () => {
      const html = '<h2>見出し2</h2>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const h2Element = container.querySelector('h2')

      expect(h2Element).toBeInTheDocument()
      expect(h2Element?.textContent).toBe('見出し2')
      expect(h2Element?.className).toBe('text-lg font-bold xl:py-4 py-3')
    })

    it('h2要素の既存属性が保持される', () => {
      const html = '<h2 id="heading" data-test="value">見出し2</h2>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const h2Element = container.querySelector('h2')

      expect(h2Element?.getAttribute('id')).toBe('heading')
      expect(h2Element?.getAttribute('data-test')).toBe('value')
    })
  })

  describe('h3タグの処理', () => {
    it('h3要素が正しくスタイリングされる', () => {
      const html = '<h3>見出し3</h3>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const h3Element = container.querySelector('h3')

      expect(h3Element).toBeInTheDocument()
      expect(h3Element?.textContent).toBe('見出し3')
      expect(h3Element?.className).toBe('text-base font-bold xl:py-3 py-2')
    })
  })

  describe('hrタグの処理', () => {
    it('hr要素が正しくスタイリングされる', () => {
      const html = '<hr>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const hrElement = container.querySelector('hr')

      expect(hrElement).toBeInTheDocument()
      expect(hrElement?.className).toBe('xl:my-4 my-3')
    })
  })

  describe('aタグの処理', () => {
    it('a要素が正しくスタイリングされる', () => {
      const html = '<a href="https://example.com">リンクテキスト</a>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const aElement = container.querySelector('a')

      expect(aElement).toBeInTheDocument()
      expect(aElement?.textContent).toBe('リンクテキスト')
      expect(aElement?.className).toBe('underline')
      expect(aElement?.getAttribute('href')).toBe('https://example.com')
    })
  })

  describe('olタグの処理', () => {
    it('ol要素が正しくスタイリングされる', () => {
      const html = '<ol><li>項目1</li><li>項目2</li></ol>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const olElement = container.querySelector('ol')

      expect(olElement).toBeInTheDocument()
      expect(olElement?.className).toBe(
        'list-decimal space-y-2 pl-5 xl:py-4 py-3',
      )
      expect(container.querySelectorAll('li')).toHaveLength(2)
    })
  })

  describe('ulタグの処理', () => {
    it('ul要素が正しくスタイリングされる', () => {
      const html = '<ul><li>項目1</li><li>項目2</li></ul>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const ulElement = container.querySelector('ul')

      expect(ulElement).toBeInTheDocument()
      expect(ulElement?.className).toBe('list-disc space-y-2 pl-5 xl:py-4 py-3')
      expect(container.querySelectorAll('li')).toHaveLength(2)
    })
  })

  describe('blockquoteタグの処理', () => {
    it('blockquote要素が正しくスタイリングされる', () => {
      const html = '<blockquote>引用テキスト</blockquote>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const blockquoteElement = container.querySelector('blockquote')

      expect(blockquoteElement).toBeInTheDocument()
      expect(blockquoteElement?.textContent).toBe('引用テキスト')
      expect(blockquoteElement?.className).toBe('border-l-2 pl-4')
    })
  })

  describe('figureタグの処理', () => {
    it('figure要素が正しくスタイリングされる', () => {
      const html = '<figure><img src="test.jpg" alt="テスト画像"></figure>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const figureElement = container.querySelector('figure')

      expect(figureElement).toBeInTheDocument()
      expect(figureElement?.className).toBe('py-2')
    })
  })

  describe('figcaptionタグの処理', () => {
    it('figcaption要素が正しくスタイリングされる', () => {
      const html = '<figcaption>キャプション</figcaption>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const figcaptionElement = container.querySelector('figcaption')

      expect(figcaptionElement).toBeInTheDocument()
      expect(figcaptionElement?.textContent).toBe('キャプション')
      expect(figcaptionElement?.className).toBe('text-sm')
    })
  })

  describe('imgタグの処理', () => {
    it('img要素が正しく変換される', () => {
      const html = '<img src="test.jpg" alt="テスト画像">'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const imgElement = container.querySelector('img')

      expect(imgElement).toBeInTheDocument()
      expect(imgElement?.getAttribute('src')).toBe('test.jpg?fm=webp&w=1200')
      expect(imgElement?.getAttribute('alt')).toBe('テスト画像')
      expect(imgElement?.className).toBe('h-auto w-full')
    })

    it('alt属性がない場合は空文字列が設定される', () => {
      const html = '<img src="test.jpg">'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const imgElement = container.querySelector('img')

      expect(imgElement?.getAttribute('alt')).toBe('')
    })

    it('既存のクエリパラメータがある場合も正しく処理される', () => {
      const html = '<img src="test.jpg?quality=90" alt="テスト画像">'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const imgElement = container.querySelector('img')

      expect(imgElement?.getAttribute('src')).toBe(
        'test.jpg?quality=90?fm=webp&w=1200',
      )
    })
  })

  describe('bタグの処理', () => {
    it('b要素が正しくスタイリングされる', () => {
      const html = '<b>太字テキスト</b>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const bElement = container.querySelector('b')

      expect(bElement).toBeInTheDocument()
      expect(bElement?.textContent).toBe('太字テキスト')
      expect(bElement?.className).toBe('font-bold')
    })
  })

  describe('brタグの処理', () => {
    it('通常のbr要素は変更されない', () => {
      const html = '<br>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const brElement = container.querySelector('br')

      expect(brElement).toBeInTheDocument()
      expect(brElement?.className).toBe('')
    })

    it('only-spクラスのbr要素はSP専用スタイルが適用される', () => {
      const html = '<br class="only-sp">'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const brElement = container.querySelector('br')

      expect(brElement).toBeInTheDocument()
      expect(brElement?.className).toBe('xl:hidden')
    })
  })

  describe('pタグの処理', () => {
    it('p要素の子要素がある場合は通常のp要素として処理される', () => {
      const html = '<p>段落テキスト</p>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const pElement = container.querySelector('p')

      expect(pElement).toBeInTheDocument()
      expect(pElement?.textContent).toBe('段落テキスト')
    })

    it('p要素の子要素がない場合はbr要素に変換される', () => {
      const html = '<p></p>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const brElement = container.querySelector('br')
      const pElement = container.querySelector('p')

      expect(brElement).toBeInTheDocument()
      expect(pElement).not.toBeInTheDocument()
    })
  })

  describe('複合的なHTML構造', () => {
    it('ネストした要素が正しく処理される', () => {
      const html = `
        <div>
          <h2>メインタイトル</h2>
          <p>段落テキスト</p>
          <ul>
            <li>項目1</li>
            <li>項目2</li>
          </ul>
        </div>
      `
      const result = parse(html)

      const { container } = render(<div>{result}</div>)

      expect(container.querySelector('h2')).toBeInTheDocument()
      expect(container.querySelector('p')).toBeInTheDocument()
      expect(container.querySelector('ul')).toBeInTheDocument()
      expect(container.querySelectorAll('li')).toHaveLength(2)
    })

    it('figure + img + figcaptionの組み合わせが正しく処理される', () => {
      const html = `
        <figure>
          <img src="example.jpg" alt="サンプル画像">
          <figcaption>画像のキャプション</figcaption>
        </figure>
      `
      const result = parse(html)

      const { container } = render(<div>{result}</div>)

      const figureElement = container.querySelector('figure')
      const imgElement = container.querySelector('img')
      const figcaptionElement = container.querySelector('figcaption')

      expect(figureElement).toBeInTheDocument()
      expect(figureElement?.className).toBe('py-2')

      expect(imgElement).toBeInTheDocument()
      expect(imgElement?.getAttribute('src')).toBe('example.jpg?fm=webp&w=1200')

      expect(figcaptionElement).toBeInTheDocument()
      expect(figcaptionElement?.className).toBe('text-sm')
    })
  })

  describe('処理されない要素', () => {
    it('対象外の要素は元のまま処理される', () => {
      const html = '<div class="test">DIVテキスト</div>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const divElement = container.querySelector('div.test')

      expect(divElement).toBeInTheDocument()
      expect(divElement?.textContent).toBe('DIVテキスト')
      expect(divElement?.className).toBe('test')
    })

    it('span要素は元のまま処理される', () => {
      const html = '<span class="highlight">強調テキスト</span>'
      const result = parse(html)

      const { container } = render(<div>{result}</div>)
      const spanElement = container.querySelector('span')

      expect(spanElement).toBeInTheDocument()
      expect(spanElement?.textContent).toBe('強調テキスト')
      expect(spanElement?.className).toBe('highlight')
    })
  })

  describe('エラーハンドリング', () => {
    it('無効なHTMLでもエラーが発生しない', () => {
      const html = '<invalid><p>不正なHTML</p></invalid>'

      expect(() => {
        const result = parse(html)
        render(<div>{result}</div>)
      }).not.toThrow()
    })

    it('null値やundefinedを渡してもエラーが発生せず、適切に処理される', () => {
      expect(() => {
        const result = parse(null as unknown as string)
        render(<div>{result}</div>)
      }).not.toThrow()

      expect(() => {
        const result = parse(undefined as unknown as string)
        render(<div>{result}</div>)
      }).not.toThrow()
    })

    it('null値やundefinedを渡すと空の結果を返す', () => {
      const nullResult = parse(null as unknown as string)
      const undefinedResult = parse(undefined as unknown as string)

      // DOMPurifyは不正な値を空文字列として処理するため、空配列が返される
      expect(nullResult).toEqual([])
      expect(undefinedResult).toEqual([])
    })
  })
})
