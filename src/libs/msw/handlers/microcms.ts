import { http, HttpResponse } from 'msw'

import { NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN } from '@/config'

import { mockNews, mockNewsCategories, mockProfiles } from '../data/microcms'

// 環境変数からサービスドメインを取得（フォールバック付き）
const MICROCMS_SERVICE_DOMAIN =
  NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN || 'service-domain'
const BASE_URL = `https://${MICROCMS_SERVICE_DOMAIN}.microcms.io/api/v1`

/**
 * microCMS APIのモックハンドラー
 */
export const microCMSHandlers = [
  // ニュース一覧取得
  http.get(`${BASE_URL}/news`, ({ request }) => {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')
    const filters = url.searchParams.get('filters')
    const orders = url.searchParams.get('orders')
    const fields = url.searchParams.get('fields')

    const filteredNews = [...mockNews]

    // getAllContentIds用のfields=idリクエストの場合
    if (fields === 'id') {
      // MicroCMS SDK v3のgetAllContentIdsが期待する形式に修正
      // SDKはレスポンスを内部的に処理して文字列配列を返す
      const response = {
        contents: filteredNews.map((news) => ({ id: news.id })),
        totalCount: filteredNews.length,
        offset: 0,
        limit: Math.min(
          parseInt(url.searchParams.get('limit') || '9999'),
          9999,
        ),
      }
      return HttpResponse.json(response)
    }

    // ソート対応
    if (orders) {
      if (orders === '-publishedAt') {
        filteredNews.sort(
          (a, b) =>
            new Date(b.publishedAt || 0).getTime() -
            new Date(a.publishedAt || 0).getTime(),
        )
      }
    }

    // フィルター対応
    if (filters) {
      // 簡単なフィルター実装（必要に応じて拡張）
    }

    const paginatedNews = filteredNews.slice(offset, offset + limit)
    const response = {
      contents: paginatedNews,
      totalCount: filteredNews.length,
      offset,
      limit,
    }

    return HttpResponse.json(response)
  }),

  // ニュース詳細取得
  http.get(`${BASE_URL}/news/:id`, ({ params }) => {
    const { id } = params
    const news = mockNews.find((item) => item.id === id)

    if (!news) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(news)
  }),

  // ニュースカテゴリ一覧取得
  http.get(`${BASE_URL}/news_categories`, ({ request }) => {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')

    const paginatedCategories = mockNewsCategories.slice(offset, offset + limit)

    return HttpResponse.json({
      contents: paginatedCategories,
      totalCount: mockNewsCategories.length,
      offset,
      limit,
    })
  }),

  // ニュースカテゴリ詳細取得
  http.get(`${BASE_URL}/news_categories/:id`, ({ params }) => {
    const { id } = params
    const category = mockNewsCategories.find((item) => item.id === id)

    if (!category) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(category)
  }),

  // プロフィール一覧取得
  http.get(`${BASE_URL}/profiles`, ({ request }) => {
    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get('limit') || '10')
    const offset = parseInt(url.searchParams.get('offset') || '0')
    const orders = url.searchParams.get('orders')
    const fields = url.searchParams.get('fields')

    const filteredProfiles = [...mockProfiles]

    // getAllContentIds用のfields=idリクエストの場合
    if (fields === 'id') {
      // MicroCMS SDK v3のgetAllContentIdsが期待する形式に修正
      const response = {
        contents: filteredProfiles.map((profile) => ({ id: profile.id })),
        totalCount: filteredProfiles.length,
        offset: 0,
        limit: Math.min(
          parseInt(url.searchParams.get('limit') || '9999'),
          9999,
        ),
      }
      return HttpResponse.json(response)
    }

    // ソート対応
    if (orders) {
      if (orders === '-publishedAt') {
        filteredProfiles.sort(
          (a, b) =>
            new Date(b.publishedAt || 0).getTime() -
            new Date(a.publishedAt || 0).getTime(),
        )
      }
    }

    const paginatedProfiles = filteredProfiles.slice(offset, offset + limit)
    const response = {
      contents: paginatedProfiles,
      totalCount: filteredProfiles.length,
      offset,
      limit,
    }

    return HttpResponse.json(response)
  }),

  // プロフィール詳細取得
  http.get(`${BASE_URL}/profiles/:id`, ({ params }) => {
    const { id } = params
    const profile = mockProfiles.find((item) => item.id === id)

    if (!profile) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(profile)
  }),
]
