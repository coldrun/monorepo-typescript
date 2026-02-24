import { objectValues } from './object';

export function isNullOrUndefined<T>(arg: T | null | undefined): arg is null | undefined {
  return arg === null || arg === undefined;
}

export function isNotNullable<T>(arg: T): arg is NonNullable<T> {
  return arg !== undefined && arg !== null;
}

export function isNumber(value: unknown): value is number {
  // parseFloat(value) handles most of the cases we're interested in (it treats null, empty string,
  // and other non-number values as NaN, where Number just uses 0), but it considers the string
  // '123hello' to be a valid number. Therefore, we also check if Number(value) is NaN.
  return !isNaN(parseFloat(String(value))) && !isNaN(Number(value));
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function isCallable(maybeFunc: unknown): maybeFunc is Function {
  return typeof maybeFunc === 'function';
}

export function isEnum<T extends object>(enumObj: T, value: unknown): value is T[keyof T] {
  return objectValues(enumObj).includes(value as T[keyof T]);
}
