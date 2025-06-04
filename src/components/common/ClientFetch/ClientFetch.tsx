'use client'

import { useEffect, useState } from 'react'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
}

/**
 * クライアントサイドでフェッチするコンポーネント
 * @description Example Component
 */
export const ClientFetch = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch('https://api.example.com/user')

        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const userData = await response.json()
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  if (loading) {
    return (
      <div className='p-4'>
        <div className='text-center'>Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='p-4'>
        <div className='text-red-500'>Error: {error}</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className='p-4'>
        <div className='text-gray-500'>No user data</div>
      </div>
    )
  }

  return (
    <div className='max-w-md rounded-lg border p-4'>
      <h2 className='mb-2 text-xl font-bold'>User Information</h2>
      <div className='space-y-2'>
        <p>
          <span className='font-semibold'>ID:</span> {user.id}
        </p>
        <p>
          <span className='font-semibold'>Name:</span> {user.firstName}{' '}
          {user.lastName}
        </p>
        <p>
          <span className='font-semibold'>Email:</span> {user.email}
        </p>
      </div>
    </div>
  )
}
