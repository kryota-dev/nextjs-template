import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  addDays,
  addMonths,
  addYears,
  convertToLocalTime,
  diffInDays,
  diffInYears,
  formatDate,
  getCurrentDate,
  getUtcEndOfYearInJst,
  getUtcJustBeforeEndOfYearInJst,
  getUtcJustBeforeStartOfYearInJst,
  getUtcStartOfYearInJst,
  isFutureDate,
  isPastDate,
  isValidDate,
  toISOFormat,
} from './dateUtils'

describe('dateUtils', () => {
  beforeEach(() => {
    // 各テストの前にモックをリセット
    vi.restoreAllMocks()
  })

  describe('formatDate', () => {
    it('Date オブジェクトを指定されたフォーマットで文字列に変換する', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const result = formatDate(date, 'YYYY.MM.DD')
      expect(result).toBe('2024.01.15')
    })

    it('日付文字列を指定されたフォーマットで文字列に変換する', () => {
      const dateString = '2024-01-15'
      const result = formatDate(dateString, 'YYYY/MM/DD')
      expect(result).toBe('2024/01/15')
    })

    it('フォーマットが指定されない場合はデフォルトフォーマット（YYYY.MM.DD）を使用する', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const result = formatDate(date)
      expect(result).toBe('2024.01.15')
    })

    it('カスタムフォーマットを適用する', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const result = formatDate(date, 'YYYY年MM月DD日')
      expect(result).toBe('2024年01月15日')
    })

    it('時刻を含むフォーマットを適用する', () => {
      const date = new Date('2024-01-15T10:30:45Z')
      const result = formatDate(date, 'YYYY.MM.DD HH:mm:ss')
      expect(result).toBe('2024.01.15 19:30:45')
    })
  })

  describe('addDays', () => {
    it('指定した日数を日付に追加する', () => {
      const date = '2024-01-15'
      const result = addDays(date, 10)
      expect(result).toBe('2024.01.25')
    })

    it('負の日数を指定すると過去の日付を取得する', () => {
      const date = '2024-01-15'
      const result = addDays(date, -5)
      expect(result).toBe('2024.01.10')
    })

    it('Date オブジェクトでも正しく動作する', () => {
      const date = new Date('2024-01-15T00:00:00Z')
      const result = addDays(date, 1)
      expect(result).toBe('2024.01.16')
    })

    it('月をまたぐ日付の追加を正しく処理する', () => {
      const date = '2024-01-31'
      const result = addDays(date, 1)
      expect(result).toBe('2024.02.01')
    })

    it('年をまたぐ日付の追加を正しく処理する', () => {
      const date = '2023-12-31'
      const result = addDays(date, 1)
      expect(result).toBe('2024.01.01')
    })
  })

  describe('addMonths', () => {
    it('指定した月数を日付に追加する', () => {
      const date = '2024-01-15'
      const result = addMonths(date, 3)
      expect(result).toBe('2024.04.15')
    })

    it('負の月数を指定すると過去の月を取得する', () => {
      const date = '2024-01-15'
      const result = addMonths(date, -2)
      expect(result).toBe('2023.11.15')
    })

    it('年をまたぐ月の追加を正しく処理する', () => {
      const date = '2023-10-15'
      const result = addMonths(date, 5)
      expect(result).toBe('2024.03.15')
    })

    it('日が存在しない場合は月末日になる', () => {
      const date = '2024-01-31'
      const result = addMonths(date, 1)
      expect(result).toBe('2024.02.29') // 2024年はうるう年
    })
  })

  describe('addYears', () => {
    it('指定した年数を日付に追加する', () => {
      const date = '2024-01-15'
      const result = addYears(date, 2)
      expect(result).toBe('2026.01.15')
    })

    it('負の年数を指定すると過去の年を取得する', () => {
      const date = '2024-01-15'
      const result = addYears(date, -3)
      expect(result).toBe('2021.01.15')
    })

    it('うるう年の2月29日から非うるう年への変換を正しく処理する', () => {
      const date = '2024-02-29'
      const result = addYears(date, 1)
      expect(result).toBe('2025.02.28')
    })
  })

  describe('diffInDays', () => {
    it('2つの日付の差を日数で計算する', () => {
      const date1 = '2024-01-20'
      const date2 = '2024-01-15'
      const result = diffInDays(date1, date2)
      expect(result).toBe(5)
    })

    it('日付の順序が逆でも正しく計算する', () => {
      const date1 = '2024-01-15'
      const date2 = '2024-01-20'
      const result = diffInDays(date1, date2)
      expect(result).toBe(-5)
    })

    it('同じ日付の場合は0を返す', () => {
      const date1 = '2024-01-15'
      const date2 = '2024-01-15'
      const result = diffInDays(date1, date2)
      expect(result).toBe(0)
    })

    it('Date オブジェクトでも正しく動作する', () => {
      const date1 = new Date('2024-01-20T00:00:00Z')
      const date2 = new Date('2024-01-15T00:00:00Z')
      const result = diffInDays(date1, date2)
      expect(result).toBe(5)
    })
  })

  describe('diffInYears', () => {
    it('2つの日付の年の差を計算する', () => {
      const date1 = '2024-01-15'
      const date2 = '2020-01-15'
      const result = diffInYears(date1, date2)
      expect(result).toBe(4)
    })

    it('日付の順序に関係なく絶対値で計算する', () => {
      const date1 = '2020-01-15'
      const date2 = '2024-01-15'
      const result = diffInYears(date1, date2)
      expect(result).toBe(4)
    })

    it('同じ年の場合は0を返す', () => {
      const date1 = '2024-01-15'
      const date2 = '2024-12-31'
      const result = diffInYears(date1, date2)
      expect(result).toBe(0)
    })
  })

  describe('isValidDate', () => {
    it('有効な日付文字列の場合はtrueを返す', () => {
      expect(isValidDate('2024-01-15')).toBe(true)
    })

    it('有効なDate オブジェクトの場合はtrueを返す', () => {
      expect(isValidDate(new Date('2024-01-15'))).toBe(true)
    })

    it('無効な日付文字列の場合はfalseを返す', () => {
      expect(isValidDate('invalid-date')).toBe(false)
    })

    it('無効なDate オブジェクトの場合はfalseを返す', () => {
      expect(isValidDate(new Date('invalid-date'))).toBe(false)
    })

    it('存在しない日付の場合でもdayjsは補正してvalidと判定する', () => {
      // dayjsは2024-02-30を2024-03-01に補正するためvalidとなる
      expect(isValidDate('2024-02-30')).toBe(true)
    })

    it('完全に無効な形式の場合はfalseを返す', () => {
      expect(isValidDate('not-a-date-at-all')).toBe(false)
    })
  })

  describe('convertToLocalTime', () => {
    it('UTC日付をローカルタイムゾーンに変換する', () => {
      const utcDate = '2024-01-15T10:30:00Z'
      const result = convertToLocalTime(utcDate)
      expect(result).toBe('2024.01.15')
    })

    it('Date オブジェクトをローカルタイムゾーンに変換する', () => {
      const date = new Date('2024-01-15T10:30:00Z')
      const result = convertToLocalTime(date)
      expect(result).toBe('2024.01.15')
    })
  })

  describe('getCurrentDate', () => {
    beforeEach(() => {
      // 固定日時でモック
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-15T10:30:00Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('デフォルトでフォーマットされた現在の日付を返す', () => {
      const result = getCurrentDate()
      expect(result).toBe('2024.01.15')
    })

    it('onlyYear=true の場合は年のみを返す', () => {
      const result = getCurrentDate({ onlyYear: true })
      expect(result).toBe('2024')
    })

    it('format=false の場合はフォーマットせずに返す', () => {
      const result = getCurrentDate({ format: false })
      expect(result).toMatch(/2024-01-15T/)
    })

    it('onlyYear=true かつ format=false の場合でも年のみを返す', () => {
      const result = getCurrentDate({ onlyYear: true, format: false })
      expect(result).toBe('2024')
    })
  })

  describe('isPastDate', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-15T10:30:00Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('過去の日付の場合はtrueを返す', () => {
      const pastDate = '2024-01-10'
      expect(isPastDate(pastDate)).toBe(true)
    })

    it('未来の日付の場合はfalseを返す', () => {
      const futureDate = '2024-01-20'
      expect(isPastDate(futureDate)).toBe(false)
    })

    it('現在と同じ日付の場合はfalseを返す', () => {
      const currentDate = '2024-01-15T10:30:00Z'
      expect(isPastDate(currentDate)).toBe(false)
    })
  })

  describe('isFutureDate', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      vi.setSystemTime(new Date('2024-01-15T10:30:00Z'))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('未来の日付の場合はtrueを返す', () => {
      const futureDate = '2024-01-20'
      expect(isFutureDate(futureDate)).toBe(true)
    })

    it('過去の日付の場合はfalseを返す', () => {
      const pastDate = '2024-01-10'
      expect(isFutureDate(pastDate)).toBe(false)
    })

    it('現在と同じ日付の場合はfalseを返す', () => {
      const currentDate = '2024-01-15T10:30:00Z'
      expect(isFutureDate(currentDate)).toBe(false)
    })
  })

  describe('toISOFormat', () => {
    it('日付をISOフォーマットに変換する', () => {
      const date = new Date('2024-01-15T10:30:45.123Z')
      const result = toISOFormat(date)
      expect(result).toBe('2024-01-15T10:30:45.123Z')
    })

    it('日付文字列をISOフォーマットに変換する', () => {
      const dateString = '2024-01-15'
      const result = toISOFormat(dateString)
      // 環境によってタイムゾーンの解釈が異なる可能性があるため、
      // 結果がISO形式の文字列であることを確認する
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
      // 日付部分が2024-01-14または2024-01-15であることを確認
      expect(result).toMatch(/^2024-01-1[45]T/)
    })
  })

  describe('getUtcStartOfYearInJst', () => {
    it('数値の年からJSTの年始をUTC文字列で取得する', () => {
      const result = getUtcStartOfYearInJst(2024)
      expect(result).toBe('2023-12-31T15:00:00.000Z')
    })

    it('文字列の年からJSTの年始をUTC文字列で取得する', () => {
      const result = getUtcStartOfYearInJst('2024')
      expect(result).toBe('2023-12-31T15:00:00.000Z')
    })

    it('別の年でも正しく計算する', () => {
      const result = getUtcStartOfYearInJst(2025)
      expect(result).toBe('2024-12-31T15:00:00.000Z')
    })
  })

  describe('getUtcEndOfYearInJst', () => {
    it('数値の年からJSTの年末をUTC文字列で取得する', () => {
      const result = getUtcEndOfYearInJst(2024)
      expect(result).toBe('2024-12-31T14:59:59.998Z')
    })

    it('文字列の年からJSTの年末をUTC文字列で取得する', () => {
      const result = getUtcEndOfYearInJst('2024')
      expect(result).toBe('2024-12-31T14:59:59.998Z')
    })

    it('別の年でも正しく計算する', () => {
      const result = getUtcEndOfYearInJst(2025)
      expect(result).toBe('2025-12-31T14:59:59.998Z')
    })
  })

  describe('getUtcJustBeforeStartOfYearInJst', () => {
    it('数値の年からJSTの年始直前をUTC文字列で取得する', () => {
      const result = getUtcJustBeforeStartOfYearInJst(2024)
      expect(result).toBe('2023-12-31T14:59:59.999Z')
    })

    it('文字列の年からJSTの年始直前をUTC文字列で取得する', () => {
      const result = getUtcJustBeforeStartOfYearInJst('2024')
      expect(result).toBe('2023-12-31T14:59:59.999Z')
    })

    it('別の年でも正しく計算する', () => {
      const result = getUtcJustBeforeStartOfYearInJst(2025)
      expect(result).toBe('2024-12-31T14:59:59.999Z')
    })
  })

  describe('getUtcJustBeforeEndOfYearInJst', () => {
    it('数値の年からJSTの年末直前をUTC文字列で取得する', () => {
      const result = getUtcJustBeforeEndOfYearInJst(2024)
      expect(result).toBe('2024-12-31T14:59:59.998Z')
    })

    it('文字列の年からJSTの年末直前をUTC文字列で取得する', () => {
      const result = getUtcJustBeforeEndOfYearInJst('2024')
      expect(result).toBe('2024-12-31T14:59:59.998Z')
    })

    it('別の年でも正しく計算する', () => {
      const result = getUtcJustBeforeEndOfYearInJst(2025)
      expect(result).toBe('2025-12-31T14:59:59.998Z')
    })
  })
})
