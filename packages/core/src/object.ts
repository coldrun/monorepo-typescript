export function hasOwn<T extends object>(object: T, key: keyof T): boolean {
  return Object.prototype.hasOwnProperty.call(object, key);
}

export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
