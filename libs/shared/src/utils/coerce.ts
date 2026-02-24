import { isNullOrUndefined, isNumber } from './check';

/**
 * Wraps the provided value in an array, unless the provided value is an array.
 * Returns an empty array if the value is `null` or `undefined`.
 */
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : isNullOrUndefined(value) ? [] : [value];
}

export function coerceNumber<T>(value: T): number;
export function coerceNumber<T, D>(value: T, fallback: D): number | D;
export function coerceNumber<T>(value: T, fallback = 0) {
  return isNumber(value) ? Number(value) : fallback;
}
