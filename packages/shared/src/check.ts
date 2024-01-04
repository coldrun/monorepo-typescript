export const isNullOrUndefined = (arg: unknown): boolean => {
  return arg === null || arg === void 0;
};

export const isCallable = <T>(maybeFunc: T | unknown): maybeFunc is T =>
  typeof maybeFunc === 'function';

export const isNumber = (value: unknown) => !isNaN(Number(value));
