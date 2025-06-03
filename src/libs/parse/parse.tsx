import parseHtml, { domToReact } from 'html-react-parser'
import { match } from 'ts-pattern'

import { sanitize } from '../sanitize'
import { cn } from '../stylings'

import type {
  HTMLReactParserOptions,
  DOMNode,
  Element,
} from 'html-react-parser'

/**
 * HTMLパーサーのオプション設定
 *
 * HTML要素をReactコンポーネントに変換する際の処理を定義します。
 * 各HTML要素に対してカスタムスタイリングとレスポンシブデザインを適用し、
 * WCAG 2.2のアクセシビリティガイドラインに準拠した構造を維持します。
 *
 * @remarks
 * - セマンティックHTMLを維持しながらTailwindCSSでスタイリング
 * - PC（xl:）とSP用のレスポンシブ対応
 * - 画像の最適化（WebP形式、幅1200px指定）
 * - アクセシビリティを考慮した適切な代替テキスト処理
 *
 * @example
 * ```tsx
 * // h2要素の処理例
 * <h2 className="text-lg font-bold xl:py-4 py-3">
 *   見出しテキスト
 * </h2>
 * ```
 */
const options: HTMLReactParserOptions = {
  replace: (domNode) =>
    match(domNode)
      // h2タグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'h2',
        (node) => {
          const element = node as Element
          return (
            <h2
              {...element.attribs}
              className={cn(
                // base
                'text-lg font-bold',
                // PC
                'xl:py-4',
                // SP
                'py-3',
              )}
            >
              {domToReact(element.children as DOMNode[], options)}
            </h2>
          )
        },
      )
      // h3タグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'h3',
        (node) => {
          const element = node as Element
          return (
            <h3
              {...element.attribs}
              className={cn(
                // base
                'text-base font-bold',
                // PC
                'xl:py-3',
                // SP
                'py-2',
              )}
            >
              {domToReact(element.children as DOMNode[], options)}
            </h3>
          )
        },
      )
      // hrタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'hr',
        () => {
          return (
            <hr
              className={cn(
                // PC
                'xl:my-4',
                // SP
                'my-3',
              )}
            />
          )
        },
      )
      // aタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'a',
        (node) => {
          const element = node as Element
          return (
            <a {...element.attribs} className='underline'>
              {domToReact(element.children as DOMNode[], options)}
            </a>
          )
        },
      )
      // olタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'ol',
        (node) => {
          const element = node as Element
          return (
            <ol
              className={cn(
                // base
                'list-decimal space-y-2 pl-5',
                // PC
                'xl:py-4',
                // SP
                'py-3',
              )}
            >
              {domToReact(element.children as DOMNode[], options)}
            </ol>
          )
        },
      )
      // ulタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'ul',
        (node) => {
          const element = node as Element
          return (
            <ul
              className={cn(
                // base
                'list-disc space-y-2 pl-5',
                // PC
                'xl:py-4',
                // SP
                'py-3',
              )}
            >
              {domToReact(element.children as DOMNode[], options)}
            </ul>
          )
        },
      )
      // blockquoteタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'blockquote',
        (node) => {
          const element = node as Element
          return (
            <blockquote className='border-l-2 pl-4'>
              {domToReact(element.children as DOMNode[], options)}
            </blockquote>
          )
        },
      )
      // figureタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'figure',
        (node) => {
          const element = node as Element
          return (
            <figure className='py-2'>
              {domToReact(element.children as DOMNode[], options)}
            </figure>
          )
        },
      )
      // figcaptionタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'figcaption',
        (node) => {
          const element = node as Element
          return (
            <figcaption className='text-sm'>
              {domToReact(element.children as DOMNode[], options)}
            </figcaption>
          )
        },
      )
      // imgタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'img',
        (node) => {
          const element = node as Element
          return (
            <img
              {...element.attribs}
              className='h-auto w-full'
              src={`${element.attribs.src}?fm=webp&w=1200`}
              alt={element.attribs.alt ?? ''}
            />
          )
        },
      )
      // bタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'b',
        (node) => {
          const element = node as Element
          return (
            <b className='font-bold'>
              {domToReact(element.children as DOMNode[], options)}
            </b>
          )
        },
      )
      // brタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'br',
        (node) => {
          const element = node as Element
          // <br class="only-sp">の場合、SPのみ表示する
          if (element.attribs?.class === 'only-sp') {
            return <br className='xl:hidden' />
          }
          // undefinedを返す（元のノードがそのまま使用される）
          return undefined
        },
      )
      // pタグの処理
      .when(
        (node) => node.type === 'tag' && node.name === 'p',
        (node) => {
          const element = node as Element
          // 子要素がない場合は、br要素を返す
          if (element.children.length === 0) {
            return <br />
          }
          return (
            <p {...element.attribs}>
              {domToReact(element.children as DOMNode[], options)}
            </p>
          )
        },
      )
      // その他の要素はundefinedを返す（元のノードがそのまま使用される）
      .otherwise(() => undefined),
}

/**
 * HTMLコンテンツをサニタイズし、Reactコンポーネントに変換する
 *
 * 生のHTMLコンテンツを受け取り、セキュリティリスクを取り除いた後、
 * カスタムスタイリングを適用したReactコンポーネントに変換します。
 *
 * @param html - 変換対象のHTML文字列
 * @returns パース・変換されたReactコンポーネント
 *
 * @remarks
 * 処理フロー:
 * 1. `sanitize()`関数でHTMLをサニタイズ（XSS攻撃対策）
 * 2. `parseHtml()`でHTMLをパースし、カスタムオプションを適用
 * 3. 各HTML要素に応じたスタイリングとレスポンシブ対応を実施
 *
 * @example
 * ```tsx
 * const htmlContent = '<h2>見出し</h2><p>段落テキスト</p>'
 * const ReactComponent = parse(htmlContent)
 *
 * // 使用例
 * return <div>{ReactComponent}</div>
 * ```
 *
 * @see {@link sanitize} HTMLサニタイズ処理
 * @see {@link options} パーサーオプション設定
 */
export const parse = (html: string) => {
  const sanitized = sanitize(html)
  const parsed = parseHtml(sanitized, options)
  return parsed
}
