/**
 * @fileoverview microCMSクライアントの設定と初期化
 *
 * このファイルでは、microCMS APIとの通信に使用するクライアントを作成します。
 * 環境変数から取得したサービスドメインとAPIキーを使用してクライアントを初期化し、
 * アプリケーション全体で使用できるよう単一のインスタンスとしてエクスポートします。
 */

import { createClient } from 'microcms-js-sdk'

import {
  NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN,
  NEXT_PUBLIC_MICROCMS_API_KEY,
  SERVER_ONLY_MICROCMS_API_KEY,
} from '@/config'

/**
 * microCMS APIクライアントインスタンス
 *
 * サーバーサイドとクライアントサイドの両方で使用可能なmicroCMSクライアントです。
 * APIキーの優先順位は以下の通りです：
 * 1. SERVER_ONLY_MICROCMS_API_KEY (サーバーサイド用)
 * 2. NEXT_PUBLIC_MICROCMS_API_KEY (クライアントサイド用)
 *
 * @throws {Error} NEXT_PUBLIC_MICROCMS_SERVICE_DOMAINが設定されていない場合
 * @throws {Error} APIキー（NEXT_PUBLIC_MICROCMS_API_KEY または SERVER_ONLY_MICROCMS_API_KEY）が設定されていない場合
 */
export const client = (() => {
  // サービスドメインの検証
  if (!NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
    throw new Error('NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN is not set')
  }
  const serviceDomain = NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN

  // APIキーの優先順位に基づく選択
  let apiKey: string | undefined
  if (SERVER_ONLY_MICROCMS_API_KEY) {
    // サーバーサイド専用のAPIキーを優先
    apiKey = SERVER_ONLY_MICROCMS_API_KEY
  } else if (NEXT_PUBLIC_MICROCMS_API_KEY) {
    // クライアントサイドでも利用可能なAPIキーを使用
    apiKey = NEXT_PUBLIC_MICROCMS_API_KEY
  } else {
    throw new Error(
      'NEXT_PUBLIC_MICROCMS_API_KEY or SERVER_ONLY_MICROCMS_API_KEY is not set',
    )
  }

  // microCMSクライアントの作成と返却
  return createClient({
    serviceDomain,
    apiKey,
  })
})()
