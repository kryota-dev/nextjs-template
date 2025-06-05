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
    name: 'テクノロジー',
  },
  {
    id: 'business',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
    name: 'ビジネス',
  },
  {
    id: 'design',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
    name: 'デザイン',
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
    title: 'Next.js 15の新機能について',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[0],
    content:
      '<p>Next.js 15では多くの新機能が追加されました。特にApp Routerの改善により、より柔軟なルーティングが可能になっています。</p><p>詳細な内容については、公式ドキュメントをご確認ください。</p>',
  },
  {
    id: 'news2',
    createdAt: '2024-01-10T14:30:00.000Z',
    updatedAt: '2024-01-10T14:30:00.000Z',
    publishedAt: '2024-01-10T14:30:00.000Z',
    revisedAt: '2024-01-10T14:30:00.000Z',
    title: 'リモートワークの効率化について',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[1],
    content:
      '<p>リモートワークを効率化するためのツールや手法について解説します。</p><p>適切なコミュニケーションツールの選択や、タスク管理の重要性について説明しています。</p>',
  },
  {
    id: 'news3',
    createdAt: '2024-01-05T11:15:00.000Z',
    updatedAt: '2024-01-05T11:15:00.000Z',
    publishedAt: '2024-01-05T11:15:00.000Z',
    revisedAt: '2024-01-05T11:15:00.000Z',
    title: 'UIデザインのトレンド2024',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[2],
    content:
      '<p>2024年のUIデザインにおけるトレンドについて分析します。</p><p>ミニマリズムの進化や、アクセシビリティの重要性が高まっています。</p>',
    pdf: {
      url: 'https://www.kansaigaidai.ac.jp/asp/img/pdf/82/7a79c35f7ce0704dec63be82440c8182.pdf',
      fileSize: 1024000,
    },
  },
  {
    id: 'news4',
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z',
    publishedAt: '2024-01-01T10:00:00.000Z',
    revisedAt: '2024-01-01T10:00:00.000Z',
    title: 'TypeScriptの最新アップデート',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[0],
    content:
      '<p>TypeScriptの最新バージョンでは、型システムがさらに強化されています。</p><p>新しい機能により、より安全で効率的な開発が可能になります。</p>',
  },
  {
    id: 'news5',
    createdAt: '2023-12-28T16:45:00.000Z',
    updatedAt: '2023-12-28T16:45:00.000Z',
    publishedAt: '2023-12-28T16:45:00.000Z',
    revisedAt: '2023-12-28T16:45:00.000Z',
    title: 'プロジェクト管理のベストプラクティス',
    thumbnail: {
      url: 'https://picsum.photos/800/600',
      width: 800,
      height: 600,
    },
    category: mockNewsCategories[1],
    content:
      '<p>効果的なプロジェクト管理のための手法とツールについて解説します。</p><p>アジャイル開発やスクラムの活用方法についても触れています。</p>',
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
    name: '田中太郎',
    photo: {
      url: 'https://picsum.photos/400/400',
      width: 400,
      height: 400,
    },
    introduce:
      'フロントエンド開発を専門とするソフトウェアエンジニアです。React、Next.js、TypeScriptを中心とした開発を行っています。',
    birth_date: '1990-05-15',
    birth_place: '東京都',
    career:
      '2015年よりWeb開発に従事。複数のスタートアップでフロントエンド開発をリードしてきました。',
    hobby: 'プログラミング、読書、映画鑑賞',
  },
  {
    id: 'profile2',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
    publishedAt: '2024-01-01T00:00:00.000Z',
    revisedAt: '2024-01-01T00:00:00.000Z',
    name: '佐藤花子',
    photo: {
      url: 'https://picsum.photos/400/400',
      width: 400,
      height: 400,
    },
    introduce:
      'UIデザイナーとして、ユーザーフレンドリーなインターフェースの設計を行っています。',
    birth_date: '1992-08-22',
    birth_place: '大阪府',
    career:
      '2018年からUIデザイナーとして活動。様々な業界のWebサービスのデザインを手がけています。',
    hobby: 'デザイン、カフェ巡り、写真撮影',
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
