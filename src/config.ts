/**
 * 環境変数のBarrelファイル
 *
 * @example 環境変数を定義する場合
 * ```ts
 * export const GA_ID = process.env.GA_ID
 * ```
 *
 * @example 環境変数を参照する場合
 * ```ts
 * import { GA_ID as GA_ID_ENV } from '@/config'
 *
 * if (!GA_ID_ENV) {
 *   throw new Error('GA_ID is required')
 * }
 * const GA_ID = GA_ID_ENV
 * ```
 */
