import Link from 'next/link'

export function Navigation() {
  return (
    <nav className='border-b bg-white shadow-sm'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 justify-between'>
          <div className='flex'>
            <div className='flex flex-shrink-0 items-center'>
              <Link
                href='/'
                className='text-xl font-bold text-gray-900 transition-colors hover:text-blue-600'
              >
                Blog App
              </Link>
            </div>
            <div className='hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8'>
              <Link
                href='/'
                className='rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600'
              >
                トップ
              </Link>
              <Link
                href='/posts'
                className='rounded-md px-3 py-2 text-sm font-medium text-gray-900 transition-colors hover:text-blue-600'
              >
                記事一覧
              </Link>
              <Link
                href='/posts/new'
                className='rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'
              >
                新規投稿
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
