import { setupWorker } from 'msw/browser'

import { handlers } from '../../mocks/handlers'

/**
 * Browser環境用のMSWワーカー設定
 * Storybookの環境で使用されます
 */
export const worker = setupWorker(...handlers)
