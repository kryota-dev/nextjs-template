import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/libs/dateUtils'
import type {
  NewsContent,
  ProfileContent,
} from '@/libs/microcms/types/contents'

type Props = {
  latestNews: NewsContent[]
  featuredProfiles: ProfileContent[]
}

/**
 * HomePagePresentation
 * @description ホームページのUI表示を担当するPresentationコンポーネント
 */
export function HomePagePresentation({ latestNews, featuredProfiles }: Props) {
  return (
    <div className='space-y-12'>
      {/* ヒーローセクション */}
      <div className='text-center'>
        <h1 className='mb-4 text-4xl font-bold text-gray-900'>Blog App</h1>
        <p className='mx-auto max-w-2xl text-lg text-gray-600'>
          最新のニュースやプロフィール情報をお届けします。気になる記事があれば詳細をご覧ください。
        </p>
      </div>

      {/* 最新ニュースセクション */}
      <section className='border-t border-gray-200 pt-8'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-gray-900'>最新ニュース</h2>
          <Link
            href='/news'
            className='font-medium text-blue-600 hover:text-blue-800'
          >
            すべて見る →
          </Link>
        </div>

        {latestNews.length === 0 ? (
          <div className='py-12 text-center text-gray-500'>
            ニュースがありません
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {latestNews.slice(0, 3).map((news) => (
              <article
                key={news.id}
                className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg'
              >
                <Link href={`/news/${news.id}`} className='block'>
                  <div className='relative aspect-video'>
                    <Image
                      src={news.thumbnail.url}
                      alt={news.title}
                      fill
                      className='object-cover'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  </div>
                  <div className='p-4'>
                    <div className='mb-2 flex items-center gap-2'>
                      <span className='inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800'>
                        {news.category.name}
                      </span>
                      {news.publishedAt && (
                        <time className='text-xs text-gray-500'>
                          {formatDate(news.publishedAt)}
                        </time>
                      )}
                    </div>
                    <h3 className='line-clamp-2 text-lg font-semibold text-gray-900'>
                      {news.title}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 注目プロフィールセクション */}
      <section className='border-t border-gray-200 pt-8'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-2xl font-semibold text-gray-900'>プロフィール</h2>
          <Link
            href='/profiles'
            className='font-medium text-blue-600 hover:text-blue-800'
          >
            すべて見る →
          </Link>
        </div>

        {featuredProfiles.length === 0 ? (
          <div className='py-12 text-center text-gray-500'>
            プロフィールがありません
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {featuredProfiles.slice(0, 4).map((profile) => (
              <div
                key={profile.id}
                className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg'
              >
                <Link href={`/profiles/${profile.id}`} className='block'>
                  <div className='p-6 text-center'>
                    {profile.photo && (
                      <div className='relative mx-auto mb-4 h-20 w-20'>
                        <Image
                          src={profile.photo.url}
                          alt={profile.name}
                          fill
                          className='rounded-full object-cover'
                          sizes='80px'
                        />
                      </div>
                    )}
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {profile.name}
                    </h3>
                    {profile.introduce && (
                      <p className='mt-2 line-clamp-2 text-sm text-gray-600'>
                        {profile.introduce}
                      </p>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
