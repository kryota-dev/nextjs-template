import Image from 'next/image'
import Link from 'next/link'

import type { ProfileContent } from '@/libs/microcms/types/contents'

type Props = Readonly<{
  profiles: ProfileContent[]
  totalCount: number
}>

/**
 * ProfileListPagePresentation
 * @description プロフィール一覧ページのUI表示を担当するPresentationコンポーネント
 */
export const ProfileListPagePresentation = ({
  profiles,
  totalCount,
}: Props) => {
  if (profiles.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='text-center'>
          <h1 className='mb-4 text-3xl font-bold text-gray-900'>
            プロフィール一覧
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
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>
          プロフィール一覧
        </h1>
        <p className='text-gray-600'>全{totalCount}件のプロフィール</p>
      </div>

      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className='overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg'
          >
            <Link href={`/profiles/${profile.id}`} className='block'>
              <div className='p-6'>
                {profile.photo && (
                  <div className='relative mx-auto mb-4 h-24 w-24'>
                    <Image
                      src={profile.photo.url}
                      alt={profile.name}
                      fill
                      className='rounded-full object-cover'
                      sizes='96px'
                    />
                  </div>
                )}
                <h2 className='mb-3 text-center text-xl font-semibold text-gray-900'>
                  {profile.name}
                </h2>
                {profile.introduce && (
                  <p className='line-clamp-3 text-center text-sm text-gray-600'>
                    {profile.introduce}
                  </p>
                )}
                <div className='mt-4 space-y-2 text-sm text-gray-500'>
                  {profile.birth_place && <p>出身地: {profile.birth_place}</p>}
                  {profile.hobby && <p>趣味: {profile.hobby}</p>}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
