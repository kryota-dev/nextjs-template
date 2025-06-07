import pino from 'pino'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { logger, loggerError } from './logger'

import type { Logger, LoggerError } from './types'

// pinoのモック
vi.mock('pino')
vi.mock('pino-pretty', () => ({
  default: vi.fn(() => 'mocked-stream'),
}))

const mockLogger = {
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  child: vi.fn(),
}

const mockPino = vi.mocked(pino)

describe('logger', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // pinoのモックを設定
    mockLogger.child.mockReturnValue(mockLogger)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockPino.mockReturnValue(mockLogger as any)
  })

  describe('logger関数', () => {
    it('デフォルトレベル(info)でログが出力される', () => {
      // Arrange
      const args: Logger = {
        message: 'テストメッセージ',
        __filename: 'test.ts',
        fnName: 'testFunction',
      }

      // Act
      logger(args)

      // Assert
      expect(mockPino).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'info',
          timestamp: pino.stdTimeFunctions.isoTime,
        }),
        'mocked-stream',
      )
      expect(mockLogger.child).toHaveBeenCalledWith({
        __filename: 'test.ts',
        fnName: 'testFunction',
      })
      expect(mockLogger.info).toHaveBeenCalledWith('テストメッセージ')
    })

    it('指定されたレベル(debug)でログが出力される', () => {
      // Arrange
      const args: Logger = {
        level: 'debug',
        message: 'デバッグメッセージ',
        __filename: 'debug.ts',
        fnName: 'debugFunction',
      }

      // Act
      logger(args)

      // Assert
      expect(mockPino).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'debug',
          timestamp: pino.stdTimeFunctions.isoTime,
        }),
        'mocked-stream',
      )
      expect(mockLogger.child).toHaveBeenCalledWith({
        __filename: 'debug.ts',
        fnName: 'debugFunction',
      })
      expect(mockLogger.debug).toHaveBeenCalledWith('デバッグメッセージ')
    })

    it('指定されたレベル(warn)でログが出力される', () => {
      // Arrange
      const args: Logger = {
        level: 'warn',
        message: '警告メッセージ',
        __filename: 'warn.ts',
        fnName: 'warnFunction',
      }

      // Act
      logger(args)

      // Assert
      expect(mockPino).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'warn',
          timestamp: pino.stdTimeFunctions.isoTime,
        }),
        'mocked-stream',
      )
      expect(mockLogger.child).toHaveBeenCalledWith({
        __filename: 'warn.ts',
        fnName: 'warnFunction',
      })
      expect(mockLogger.warn).toHaveBeenCalledWith('警告メッセージ')
    })

    it('指定されたレベル(error)でログが出力される', () => {
      // Arrange
      const args: Logger = {
        level: 'error',
        message: 'エラーメッセージ',
        __filename: 'error.ts',
        fnName: 'errorFunction',
      }

      // Act
      logger(args)

      // Assert
      expect(mockPino).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'error',
          timestamp: pino.stdTimeFunctions.isoTime,
        }),
        'mocked-stream',
      )
      expect(mockLogger.child).toHaveBeenCalledWith({
        __filename: 'error.ts',
        fnName: 'errorFunction',
      })
      expect(mockLogger.error).toHaveBeenCalledWith('エラーメッセージ')
    })

    it('fnNameが省略された場合でも正常に動作する', () => {
      // Arrange
      const args: Logger = {
        level: 'info',
        message: 'fnName省略メッセージ',
        __filename: 'test.ts',
      }

      // Act
      logger(args)

      // Assert
      expect(mockLogger.child).toHaveBeenCalledWith({
        __filename: 'test.ts',
        fnName: undefined,
      })
      expect(mockLogger.info).toHaveBeenCalledWith('fnName省略メッセージ')
    })
  })

  describe('loggerError関数', () => {
    it('Errorオブジェクトが正しくログ出力される', () => {
      // Arrange
      const error = new Error('テストエラー')
      const args: LoggerError = {
        e: error,
        __filename: 'error.ts',
        fnName: 'errorFunction',
      }

      // Act
      loggerError(args)

      // Assert
      expect(mockPino).toHaveBeenCalledWith(
        expect.objectContaining({
          level: 'error',
          timestamp: pino.stdTimeFunctions.isoTime,
        }),
        'mocked-stream',
      )
      expect(mockLogger.child).toHaveBeenCalledWith({
        __filename: 'error.ts',
        fnName: 'errorFunction',
      })
      expect(mockLogger.error).toHaveBeenCalledWith('テストエラー')
    })

    it('fnNameが省略された場合でも正常に動作する', () => {
      // Arrange
      const error = new Error('fnName省略エラー')
      const args: LoggerError = {
        e: error,
        __filename: 'error.ts',
      }

      // Act
      loggerError(args)

      // Assert
      expect(mockLogger.child).toHaveBeenCalledWith({
        __filename: 'error.ts',
        fnName: undefined,
      })
      expect(mockLogger.error).toHaveBeenCalledWith('fnName省略エラー')
    })

    it('Error以外のオブジェクトが渡された場合はログ出力されない', () => {
      // Arrange
      const args: LoggerError = {
        e: 'エラーではない文字列',
        __filename: 'error.ts',
        fnName: 'errorFunction',
      }

      // Act
      loggerError(args)

      // Assert
      expect(mockPino).not.toHaveBeenCalled()
      expect(mockLogger.child).not.toHaveBeenCalled()
      expect(mockLogger.error).not.toHaveBeenCalled()
    })

    it('nullが渡された場合はログ出力されない', () => {
      // Arrange
      const args: LoggerError = {
        e: null,
        __filename: 'error.ts',
        fnName: 'errorFunction',
      }

      // Act
      loggerError(args)

      // Assert
      expect(mockPino).not.toHaveBeenCalled()
      expect(mockLogger.child).not.toHaveBeenCalled()
      expect(mockLogger.error).not.toHaveBeenCalled()
    })

    it('undefinedが渡された場合はログ出力されない', () => {
      // Arrange
      const args: LoggerError = {
        e: undefined,
        __filename: 'error.ts',
        fnName: 'errorFunction',
      }

      // Act
      loggerError(args)

      // Assert
      expect(mockPino).not.toHaveBeenCalled()
      expect(mockLogger.child).not.toHaveBeenCalled()
      expect(mockLogger.error).not.toHaveBeenCalled()
    })

    it('数値が渡された場合はログ出力されない', () => {
      // Arrange
      const args: LoggerError = {
        e: 500,
        __filename: 'error.ts',
        fnName: 'errorFunction',
      }

      // Act
      loggerError(args)

      // Assert
      expect(mockPino).not.toHaveBeenCalled()
      expect(mockLogger.child).not.toHaveBeenCalled()
      expect(mockLogger.error).not.toHaveBeenCalled()
    })
  })
})
