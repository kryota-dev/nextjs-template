import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/libs/dateUtils'
import type { NewsContent } from '@/libs/microcms/types/contents'
import { parse } from '@/libs/parse'

type Props = Readonly<{
  news: NewsContent[]
  totalCount: number
}>

/**
 * NewsListPagePresentation
 * @description ニュース一覧ページのUI表示を担当するPresentationコンポーネント
 */
export const NewsListPagePresentation = ({ news, totalCount }: Props) => {
  if (news.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='mb-4 text-3xl font-bold text-gray-900'>
            ニュース一覧
          </h1>
          <div className='rounded-lg border border-red-200 bg-red-50 p-4'>
            <p className='text-red-600'>データがありません</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>ニュース一覧</h1>
        <p className='text-gray-600'>全{totalCount}件のニュース</p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {news.map((article) => (
          <article
            key={article.id}
            className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg'
          >
            <Link href={`/news/${article.id}`} className='block'>
              <div className='relative aspect-video'>
                <Image
                  src={article.thumbnail.url}
                  alt={article.title}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              <div className='p-6'>
                <div className='mb-3 flex items-center gap-2'>
                  <span className='inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800'>
                    {article.category.name}
                  </span>
                  {article.publishedAt && (
                    <time className='text-sm text-gray-500'>
                      {formatDate(article.publishedAt)}
                    </time>
                  )}
                </div>
                <h2 className='mb-2 line-clamp-2 text-lg font-semibold text-gray-900'>
                  {article.title}
                </h2>
                <div className='line-clamp-3 text-sm text-gray-600'>
                  {parse(article.content)}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
