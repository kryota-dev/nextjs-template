import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { JsonLD } from './JsonLD'

import type { Article, WebPage, WithContext } from 'schema-dts'

// Next.js の Script コンポーネントをモック
vi.mock('next/script', () => ({
  default: ({
    id,
    type,
    dangerouslySetInnerHTML,
  }: {
    id: string
    type: string
    dangerouslySetInnerHTML: { __html: string }
  }) => (
    <script
      id={id}
      type={type}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  ),
}))

describe('JsonLD', () => {
  it('Script要素が正しい属性でレンダリングされる', () => {
    const mockJsonLD = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'テスト記事のタイトル',
      author: {
        '@type': 'Person',
        name: 'テスト太郎',
      },
    } as const satisfies WithContext<Article>

    const { container } = render(<JsonLD jsonld={mockJsonLD} />)

    const scriptElement = container.querySelector(
      'script[type="application/ld+json"]',
    )
    expect(scriptElement).toBeInTheDocument()
  })

  it('JSON-LDデータが正しくJSONとして埋め込まれる', () => {
    const mockJsonLD = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'テスト記事のタイトル',
      author: {
        '@type': 'Person',
        name: 'テスト太郎',
      },
    } as const satisfies WithContext<Article>

    const { container } = render(<JsonLD jsonld={mockJsonLD} />)

    const scriptElement = container.querySelector(
      'script[type="application/ld+json"]',
    )
    expect(scriptElement).toHaveTextContent(JSON.stringify(mockJsonLD))
  })

  it('useIdで生成されたIDがScript要素に設定される', () => {
    const mockJsonLD = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'テストページ',
      url: 'https://example.com/test',
    } as const satisfies WithContext<WebPage>

    const { container } = render(<JsonLD jsonld={mockJsonLD} />)

    const scriptElement = container.querySelector(
      'script[type="application/ld+json"]',
    )
    const idAttribute = scriptElement?.getAttribute('id')

    expect(idAttribute).toBeDefined()
    expect(idAttribute).toMatch(/^jsonld-«r\d+»$/)
  })

  it('複数のJsonLDコンポーネントがそれぞれ異なるIDを持つ', () => {
    const mockJsonLD1 = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: '記事1',
    } as const satisfies WithContext<Article>

    const mockJsonLD2 = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: '記事2',
    } as const satisfies WithContext<Article>

    const { container } = render(
      <>
        <JsonLD jsonld={mockJsonLD1} />
        <JsonLD jsonld={mockJsonLD2} />
      </>,
    )

    const scriptElements = container.querySelectorAll(
      'script[type="application/ld+json"]',
    )
    expect(scriptElements).toHaveLength(2)

    const id1 = scriptElements[0]?.getAttribute('id')
    const id2 = scriptElements[1]?.getAttribute('id')

    expect(id1).toBeDefined()
    expect(id2).toBeDefined()
    expect(id1).not.toBe(id2)
  })

  it('ネストされたオブジェクトを含むJSON-LDが正しく処理される', () => {
    const complexJsonLD = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: '複雑なテスト記事',
      author: {
        '@type': 'Person',
        name: 'テスト太郎',
        url: 'https://example.com/author',
      },
      publisher: {
        '@type': 'Organization',
        name: 'テスト出版社',
        logo: {
          '@type': 'ImageObject',
          url: 'https://example.com/logo.jpg',
        },
      },
      datePublished: '2024-01-01',
      dateModified: '2024-01-02',
    } as const satisfies WithContext<Article>

    const { container } = render(<JsonLD jsonld={complexJsonLD} />)

    const scriptElement = container.querySelector(
      'script[type="application/ld+json"]',
    )
    const content = scriptElement?.textContent

    expect(content).toBeDefined()

    // JSON.parseでパースできることを確認
    const parsedContent = JSON.parse(content!)
    expect(parsedContent).toEqual(complexJsonLD)
  })

  it('配列を含むJSON-LDが正しく処理される', () => {
    const jsonLDWithArray = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: '配列を含むテスト記事',
      keywords: ['テスト', 'JSON-LD', 'SEO'],
      author: [
        {
          '@type': 'Person',
          name: '著者1',
        },
        {
          '@type': 'Person',
          name: '著者2',
        },
      ],
    } as const satisfies WithContext<Article>

    const { container } = render(<JsonLD jsonld={jsonLDWithArray} />)

    const scriptElement = container.querySelector(
      'script[type="application/ld+json"]',
    )
    const content = scriptElement?.textContent

    expect(content).toBeDefined()

    const parsedContent = JSON.parse(content!)
    expect(parsedContent.keywords).toEqual(['テスト', 'JSON-LD', 'SEO'])
    expect(parsedContent.author).toHaveLength(2)
  })

  it('type属性がapplication/ld+jsonに設定される', () => {
    const mockJsonLD = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'テスト記事',
    } as const satisfies WithContext<Article>

    const { container } = render(<JsonLD jsonld={mockJsonLD} />)

    const scriptElement = container.querySelector('script')
    expect(scriptElement).toHaveAttribute('type', 'application/ld+json')
  })

  it('空のJSON-LDオブジェクトでも正常に動作する', () => {
    const emptyJsonLD = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
    } as const satisfies WithContext<WebPage>

    const { container } = render(<JsonLD jsonld={emptyJsonLD} />)

    const scriptElement = container.querySelector(
      'script[type="application/ld+json"]',
    )
    expect(scriptElement).toBeInTheDocument()
    expect(scriptElement).toHaveTextContent(JSON.stringify(emptyJsonLD))
  })
})
