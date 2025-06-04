import { describe, expect, it } from 'vitest'

describe('MSW Integration', () => {
  it('should mock API responses correctly', async () => {
    // ハンドラーで定義したAPIエンドポイントをテスト
    const response = await fetch('https://api.example.com/user')
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
      email: 'john.maverick@example.com',
    })
  })

  it('should handle POST requests correctly', async () => {
    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test.user@example.com',
    }

    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })

    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data).toMatchObject({
      id: 'new-user-123',
      ...newUser,
    })
    expect(data.createdAt).toBeDefined()
  })

  it('should handle error responses correctly', async () => {
    const response = await fetch('https://api.example.com/error')
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data).toEqual({
      message: 'Something went wrong',
    })
  })
})
