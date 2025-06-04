import { setupServer } from 'msw/node'

import { handlers } from './handlers'

/**
 * Node.js環境用のMSWサーバー設定
 * Vitestのテスト環境で使用されます
 */
export const server = setupServer(...handlers)
