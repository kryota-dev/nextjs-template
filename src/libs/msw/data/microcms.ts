import type {
  NewsContent,
  NewsCategoriesContent,
  ProfileContent,
} from '@/libs/microcms/types/contents'

import type { MicroCMSListResponse } from 'microcms-js-sdk'

/** ニュースカテゴリのモックデータ */
export const mockNewsCategories: NewsCategoriesContent[] = [
  {
    id: 'tech',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
    name: 'カテゴリA',
  },
  {
    id: 'business',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
    name: 'カテゴリB',
  },
  {
    id: 'design',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
    name: 'カテゴリC',
  },
]

/** ニュースのモックデータ */
export const mockNews: NewsContent[] = [
  {
    id: 'news1',
    createdAt: '2024-01-15T09:00:00.000Z',
    updatedAt: '2024-01-15T09:00:00.000Z',
    publishedAt: '2024-01-15T09:00:00.000Z',
    revisedAt: '2024-01-15T09:00:00.000Z',
    title: 'テストニュース1のタイトル',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[0],
    content:
      '<p>これはテストデータのニュース記事です。実際の内容ではありません。</p><p>モックデータとして作成されたサンプルコンテンツになります。</p>',
  },
  {
    id: 'news2',
    createdAt: '2024-01-10T14:30:00.000Z',
    updatedAt: '2024-01-10T14:30:00.000Z',
    publishedAt: '2024-01-10T14:30:00.000Z',
    revisedAt: '2024-01-10T14:30:00.000Z',
    title: 'サンプル記事2のテストタイトル',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[1],
    content:
      '<p>サンプルニュース記事のコンテンツです。テスト用のダミーデータとなっています。</p><p>実際の記事内容ではなく、開発・テスト目的で作成されています。</p>',
  },
  {
    id: 'news3',
    createdAt: '2024-01-05T11:15:00.000Z',
    updatedAt: '2024-01-05T11:15:00.000Z',
    publishedAt: '2024-01-05T11:15:00.000Z',
    revisedAt: '2024-01-05T11:15:00.000Z',
    title: 'ダミーデータ記事3',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[2],
    content:
      '<p>これはモックデータのサンプル記事です。テスト用のコンテンツとなります。</p><p>開発環境での動作確認に使用されるダミーコンテンツです。</p>',
    pdf: {
      url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      fileSize: 1024000,
    },
  },
  {
    id: 'news4',
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z',
    publishedAt: '2024-01-01T10:00:00.000Z',
    revisedAt: '2024-01-01T10:00:00.000Z',
    title: 'テスト記事4 - サンプルタイトル',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[0],
    content:
      '<p>テスト用のニュース記事コンテンツです。実際の記事ではありません。</p><p>MSWによるモックAPI用のサンプルデータとして使用されます。</p>',
  },
  {
    id: 'news5',
    createdAt: '2023-12-28T16:45:00.000Z',
    updatedAt: '2023-12-28T16:45:00.000Z',
    publishedAt: '2023-12-28T16:45:00.000Z',
    revisedAt: '2023-12-28T16:45:00.000Z',
    title: 'ダミー記事5のテストタイトル',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[1],
    content:
      '<p>モックデータのサンプル記事です。テスト環境での動作確認用です。</p><p>実際のコンテンツではなく、開発用のダミーデータとなります。</p>',
  },
]

/** プロフィールのモックデータ */
export const mockProfiles: ProfileContent[] = [
  {
    id: 'profile1',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
    name: 'テスト太郎',
    photo: {
      url: 'https://picsum.photos/400/400',
      width: 400,
      height: 400,
    },
    introduce:
      'これはテスト用のプロフィールです。実在の人物ではありません。モックデータとして作成されたサンプル情報です。',
    birth_date: '1990-01-01',
    birth_place: 'テスト県',
    career:
      'サンプルキャリア情報です。実際の経歴ではなく、テスト用のダミーデータとなります。',
    hobby: 'テスト、サンプル作成、ダミーデータ生成',
  },
  {
    id: 'profile2',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
    name: 'サンプル花子',
    photo: {
      url: 'https://picsum.photos/400/400',
      width: 400,
      height: 400,
    },
    introduce:
      'モックデータ用のプロフィールです。テスト環境での動作確認に使用されるダミー情報となります。',
    birth_date: '1995-12-31',
    birth_place: 'ダミー市',
    career:
      'テスト用のキャリア情報です。開発環境での確認用に作成されたサンプルデータです。',
    hobby: 'モック作成、ダミーデータ管理、テスト実行',
  },
]

/** ニュース一覧レスポンス */
export const mockNewsListResponse: MicroCMSListResponse<NewsContent> = {
  contents: mockNews,
  totalCount: mockNews.length,
  offset: 0,
  limit: 10,
}

/** ニュースカテゴリ一覧レスポンス */
export const mockNewsCategoriesListResponse: MicroCMSListResponse<NewsCategoriesContent> =
  {
    contents: mockNewsCategories,
    totalCount: mockNewsCategories.length,
    offset: 0,
    limit: 10,
  }

/** プロフィール一覧レスポンス */
export const mockProfilesListResponse: MicroCMSListResponse<ProfileContent> = {
  contents: mockProfiles,
  totalCount: mockProfiles.length,
  offset: 0,
  limit: 10,
}
