export type Logger = {
  /** ログレベル */
  level?: 'debug' | 'info' | 'warn' | 'error'
  /** ログメッセージ */
  message: string
  /** ファイル名 */
  __filename: string
  /** 関数名 */
  fnName?: string
}

export type LoggerError = Pick<Logger, '__filename' | 'fnName'> & {
  /** エラーオブジェクト */
  e: unknown
}
