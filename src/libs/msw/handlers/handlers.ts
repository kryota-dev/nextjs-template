import { jsonplaceholderHandlers } from './jsonplaceholder'

/**
 * MSW リクエストハンドラー
 * テストやStorybook環境でAPIリクエストをモックするためのハンドラー定義
 */

// すべてのハンドラーをエクスポート
export const handlers = [...jsonplaceholderHandlers]
