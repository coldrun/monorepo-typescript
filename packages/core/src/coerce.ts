import { isNullOrUndefined } from './assert';

/**
 * Wraps the provided value in an array, unless the provided value is an array.
 * Returns empty array if value is `null` or `undefined`.
 */
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : isNullOrUndefined(value) ? [] : [value];
}

export function coerceNumber<T>(value: T): number;
export function coerceNumber<T, D>(value: T, fallback: D): number | D;
export function coerceNumber<T>(value: T, fallback = 0) {
  return isNumber(value) ? Number(value) : fallback;
}

export function isNumber(value: unknown): value is number {
  // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
  // and other non-number values as NaN, where Number just uses 0) but it considers the string
  // '123hello' to be a valid number. Therefore, we also check if Number(value) is NaN.
  return !isNaN(parseFloat(String(value))) && !isNaN(Number(value));
}
