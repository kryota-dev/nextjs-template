import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/libs/dateUtils'
import type { ProfileContent } from '@/libs/microcms/types/contents'

type Props = Readonly<{
  profile: ProfileContent | null
}>

/**
 * ProfileDetailPagePresentation
 * @description プロフィール詳細ページのUI表示を担当するPresentationコンポーネント
 */
export const ProfileDetailPagePresentation = ({ profile }: Props) => {
  if (!profile) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='mb-4 text-3xl font-bold text-gray-900'>
            プロフィール詳細
          </h1>
          <div className='mb-6 rounded-lg border border-red-200 bg-red-50 p-4'>
            <p className='text-red-600'>プロフィールが見つかりませんでした</p>
          </div>
          <Link
            href='/profiles'
            className='inline-flex items-center text-blue-600 hover:text-blue-800'
          >
            ← プロフィール一覧に戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-6'>
        <Link
          href='/profiles'
          className='mb-4 inline-flex items-center text-blue-600 hover:text-blue-800'
        >
          ← プロフィール一覧に戻る
        </Link>
      </div>

      <div className='overflow-hidden rounded-lg bg-white shadow-lg'>
        <div className='p-8'>
          <div className='flex flex-col gap-8 md:flex-row'>
            {profile.photo && (
              <div className='flex-shrink-0'>
                <div className='relative mx-auto h-48 w-48 md:mx-0'>
                  <Image
                    src={profile.photo.url}
                    alt={profile.name}
                    fill
                    className='rounded-lg object-cover'
                    priority
                  />
                </div>
              </div>
            )}

            <div className='flex-1'>
              <h1 className='mb-4 text-3xl font-bold text-gray-900'>
                {profile.name}
              </h1>

              {profile.introduce && (
                <div className='mb-6'>
                  <h2 className='mb-2 text-lg font-semibold text-gray-900'>
                    自己紹介
                  </h2>
                  <p className='leading-relaxed text-gray-700'>
                    {profile.introduce}
                  </p>
                </div>
              )}

              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                {profile.birth_date && (
                  <div>
                    <h3 className='mb-1 text-sm font-semibold text-gray-900'>
                      生年月日
                    </h3>
                    <p className='text-gray-700'>
                      {formatDate(profile.birth_date)}
                    </p>
                  </div>
                )}

                {profile.birth_place && (
                  <div>
                    <h3 className='mb-1 text-sm font-semibold text-gray-900'>
                      出身地
                    </h3>
                    <p className='text-gray-700'>{profile.birth_place}</p>
                  </div>
                )}

                {profile.hobby && (
                  <div>
                    <h3 className='mb-1 text-sm font-semibold text-gray-900'>
                      趣味
                    </h3>
                    <p className='text-gray-700'>{profile.hobby}</p>
                  </div>
                )}
              </div>

              {profile.career && (
                <div className='mt-6'>
                  <h3 className='mb-2 text-lg font-semibold text-gray-900'>
                    経歴
                  </h3>
                  <p className='leading-relaxed text-gray-700'>
                    {profile.career}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
