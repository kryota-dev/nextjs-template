import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/libs/dateUtils'
import type { NewsContent } from '@/libs/microcms/types/contents'
import { parse } from '@/libs/parse'

type Props = Readonly<{
  news: NewsContent | null
}>

/**
 * NewsDetailPagePresentation
 * @description ニュース詳細ページのUI表示を担当するPresentationコンポーネント
 */
export const NewsDetailPagePresentation = ({ news }: Props) => {
  if (!news) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='mb-4 text-3xl font-bold text-gray-900'>
            ニュース詳細
          </h1>
          <div className='mb-6 rounded-lg border border-red-200 bg-red-50 p-4'>
            <p className='text-red-600'>ニュースが見つかりませんでした</p>
          </div>
          <Link
            href='/news'
            className='inline-flex items-center text-blue-600 hover:text-blue-800'
          >
            ← ニュース一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <Link
          href='/news'
          className='mb-4 inline-flex items-center text-blue-600 hover:text-blue-800'
        >
          ← ニュース一覧に戻る
        </Link>
      </div>

      <article className='overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='relative aspect-video'>
          <Image
            src={news.thumbnail.url}
            alt={news.title}
            fill
            className='object-cover'
            priority
          />
        </div>

        <div className='p-8'>
          <div className='mb-4 flex items-center gap-3'>
            <span className='inline-block rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800'>
              {news.category.name}
            </span>
            <time className='text-gray-500'>
              {news.publishedAt && formatDate(news.publishedAt)}
            </time>
          </div>

          <h1 className='mb-6 text-3xl font-bold text-gray-900'>
            {news.title}
          </h1>

          <div className='prose prose-lg max-w-none'>{parse(news.content)}</div>

          {news.pdf && (
            <div className='mt-8 rounded-lg bg-gray-50 p-4'>
              <h3 className='mb-2 text-lg font-semibold'>関連資料</h3>
              <a
                href={news.pdf.url}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center text-blue-600 hover:text-blue-800'
              >
                📄 PDFファイルをダウンロード
                <span className='ml-2 text-sm text-gray-500'>
                  ({Math.round(news.pdf.fileSize / 1024)}KB)
                </span>
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  )
}
