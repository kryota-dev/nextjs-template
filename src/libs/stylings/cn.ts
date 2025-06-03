import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * クラス名をマージする関数
 * @param inputs - クラス名の配列
 * @returns マージされたクラス名
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
