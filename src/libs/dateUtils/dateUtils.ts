import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import tzPlug from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

// Initialize dayjs.
dayjs.locale('ja')
dayjs.extend(utc)
dayjs.extend(tzPlug)
dayjs.extend(isLeapYear)
dayjs.extend(customParseFormat)
dayjs.tz.setDefault('Asia/Tokyo')

const defaultFormat = 'YYYY.MM.DD'

/**
 * 日付を指定したフォーマットに変換する関数
 * @param date - 日付または日付文字列
 * @param format - フォーマット文字列（デフォルト: 'YYYY.MM.DD'）
 * @returns フォーマットされた日付文字列
 */
export const formatDate = (
  date: Date | string,
  format: string = defaultFormat,
): string => dayjs(date).tz().format(format)

/**
 * 日付に指定した日数を追加する関数
 * @param date - 日付または日付文字列
 * @param days - 追加する日数
 * @returns 追加後の日付文字列
 */
export const addDays = (date: Date | string, days: number): string =>
  dayjs(date).add(days, 'day').tz().format(defaultFormat)

/**
 * 日付に指定した月数を追加する関数
 * @param date - 日付または日付文字列
 * @param months - 追加する月数
 * @returns 追加後の日付文字列
 */
export const addMonths = (date: Date | string, months: number): string =>
  dayjs(date).add(months, 'month').tz().format(defaultFormat)

/**
 * 日付に指定した年数を追加する関数
 * @param date - 日付または日付文字列
 * @param years - 追加する年数
 * @returns 追加後の日付文字列
 */
export const addYears = (date: Date | string, years: number): string =>
  dayjs(date).add(years, 'year').tz().format(defaultFormat)

/**
 * 2つの日付の差を日数で取得する関数
 * @param date1 - 基準日付
 * @param date2 - 比較対象日付
 * @returns 日数の差
 */
export const diffInDays = (
  date1: Date | string,
  date2: Date | string,
): number => dayjs(date1).diff(dayjs(date2), 'day')

/**
 * 2つの日付の差を年数で取得する関数
 * @param date1 - 基準日付
 * @param date2 - 比較対象日付
 * @returns 年数の差
 */
export const diffInYears = (
  date1: Date | string,
  date2: Date | string,
): number =>
  Math.abs(
    Number(formatDate(date1, 'YYYY')) - Number(formatDate(date2, 'YYYY')),
  )

/**
 * 日付が有効かどうかを確認する関数
 * @param date - 検証する日付
 * @returns 有効な日付かどうかの真偽値
 */
export const isValidDate = (date: Date | string): boolean =>
  dayjs(date).isValid()

/**
 * UTC日付をローカルタイムゾーンの日付に変換する関数
 * @param date - UTC日付または日付文字列
 * @returns ローカルタイムゾーンの日付文字列
 */
export const convertToLocalTime = (date: Date | string): string =>
  dayjs(date).tz().format(defaultFormat)

/**
 * 現在の日付を取得する関数
 * @param {Object} options - オプションオブジェクト
 * @param {boolean} [options.onlyYear=false] - 年のみ取得するかどうかを指定するフラグ
 * @param {boolean} [options.format=true] - フォーマットするかどうかを指定するフラグ
 * @returns {string} 現在の日付文字列（引数'format'の値に応じてフォーマットの有無は変わる）
 */
export const getCurrentDate = ({
  onlyYear = false,
  format = true,
}: { onlyYear?: boolean; format?: boolean } = {}): string => {
  if (onlyYear) {
    return dayjs().tz().year().toString()
  }
  return format ? dayjs().tz().format(defaultFormat) : dayjs().tz().format()
}

/**
 * 日付が過去の日付かどうかを確認する関数
 * @param date - 検証する日付
 * @returns 過去の日付かどうかの真偽値
 */
export const isPastDate = (date: Date | string): boolean =>
  dayjs().isAfter(dayjs(date))

/**
 * 日付が未来の日付かどうかを確認する関数
 * @param date - 検証する日付
 * @returns 未来の日付かどうかの真偽値
 */
export const isFutureDate = (date: Date | string): boolean =>
  dayjs().isBefore(dayjs(date))

/**
 * 日付をISOフォーマットに変換する関数
 * @param date - 日付または日付文字列
 * @returns ISOフォーマットされた日付文字列
 */
export const toISOFormat = (date: Date | string): string =>
  dayjs(date).toISOString()

/**
 * 年の開始日時をISO8601形式のUTC文字列で取得する関数
 * - ex. 2024年の開始日時は'2023-12-31T15:00:00.000Z'
 * @param year - 年
 * @returns 年の開始日時のUTC文字列
 */
export const getUtcStartOfYearInJst = (year: number | string): string => {
  const yearNum = typeof year === 'string' ? Number(year) : year
  return `${yearNum - 1}-12-31T15:00:00.000Z`
}

/**
 * 年の終了日時をISO8601形式のUTC文字列で取得する関数
 * - ex. 2024年の終了日時は'2024-12-31T14:59:59.999Z'
 * @param year - 年
 * @returns 年の終了日時のUTC文字列
 */
export const getUtcEndOfYearInJst = (year: number | string): string => {
  const yearNum = typeof year === 'string' ? Number(year) : year
  return `${yearNum}-12-31T14:59:59.998Z`
}

/**
 * 年の開始日時の1ミリ秒前をISO8601形式のUTC文字列で取得する関数
 * - ex. 2024年の開始日時は'2023-12-31T15:00:00.000Z'、その1ミリ秒前は'2023-12-31T14:59:59.999Z'
 * @param year - 年
 * @returns 年の開始日時の直前（1ミリ秒前）を表すUTC文字列
 */
export const getUtcJustBeforeStartOfYearInJst = (
  year: number | string,
): string => {
  const yearNum = typeof year === 'string' ? Number(year) : year
  return `${yearNum - 1}-12-31T14:59:59.999Z`
}

/**
 * 年の終了日時の1ミリ秒前をISO8601形式のUTC文字列で取得する関数
 * - ex. 2024年の終了日時は'2024-12-31T14:59:59.999Z'、その1ミリ秒前は'2024-12-31T14:59:59.998Z'
 * @param year - 年
 * @returns 年の終了日時の直前（1ミリ秒前）を表すUTC文字列
 */
export const getUtcJustBeforeEndOfYearInJst = (
  year: number | string,
): string => {
  const yearNum = typeof year === 'string' ? Number(year) : year
  return `${yearNum}-12-31T14:59:59.998Z`
}

/**
 * 2つの日付を比較してより新しい日付を返す関数
 * @param date1 - 比較対象の日付1
 * @param date2 - 比較対象の日付2
 * @returns より新しい日付の文字列
 */
export const getNewerDate = (
  date1: Date | string,
  date2: Date | string,
): string => {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  return d1.isAfter(d2)
    ? d1.tz().format(defaultFormat)
    : d2.tz().format(defaultFormat)
}

/**
 * 2つの日付を比較してより古い日付を返す関数
 * @param date1 - 比較対象の日付1
 * @param date2 - 比較対象の日付2
 * @returns より古い日付の文字列
 */
export const getOlderDate = (
  date1: Date | string,
  date2: Date | string,
): string => {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  return d1.isBefore(d2)
    ? d1.tz().format(defaultFormat)
    : d2.tz().format(defaultFormat)
}

/**
 * 2つの日付の中間点を返す関数
 * @param date1 - 基準日付1
 * @param date2 - 基準日付2
 * @returns 2つの日付の中間点の日付文字列
 */
export const getMiddleDate = (
  date1: Date | string,
  date2: Date | string,
): string => {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  const diffInMs = d2.diff(d1) / 2
  return d1.add(diffInMs, 'millisecond').tz().format(defaultFormat)
}

/**
 * 2つの日付の差分を使って調整された日付を返す関数
 * @param date1 - 基準日付
 * @param date2 - 差分計算用の日付
 * @param adjustment - 差分の適用方法（'add': 追加、'subtract': 減算）
 * @returns 調整された日付の文字列
 */
export const getAdjustedDate = (
  date1: Date | string,
  date2: Date | string,
  adjustment: 'add' | 'subtract',
): string => {
  const d1 = dayjs(date1)
  const d2 = dayjs(date2)
  const diffInDays = Math.abs(d1.diff(d2, 'day'))

  if (adjustment === 'add') {
    return d1.add(diffInDays, 'day').tz().format(defaultFormat)
  } else {
    return d1.subtract(diffInDays, 'day').tz().format(defaultFormat)
  }
}
