import pino from 'pino'
import pretty from 'pino-pretty'

import type { Logger, LoggerError } from './types'
import type { LoggerOptions } from 'pino'

const stream = pretty({
  colorize: true,
})

/**
 * ロガー
 * @description ログを出力する
 */
export const logger = (args: Logger): void => {
  const { level = 'info', message, __filename, fnName } = args

  const loggerOptions: LoggerOptions = {
    level,
    timestamp: pino.stdTimeFunctions.isoTime,
  }

  const internalLogger = pino(loggerOptions, stream).child({
    __filename,
    fnName,
  })

  internalLogger[level](message)
}

/**
 * エラーロガー
 * @description エラーを出力する
 */
export const loggerError = (args: LoggerError): void => {
  const { e, __filename, fnName } = args

  if (!(e instanceof Error)) return

  logger({
    level: 'error',
    message: e.message,
    __filename,
    fnName,
  })
}
