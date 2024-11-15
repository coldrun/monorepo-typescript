export function isNullOrUndefined<T>(arg: T | null | undefined): arg is null | undefined {
  return arg === null || arg === void 0;
}
