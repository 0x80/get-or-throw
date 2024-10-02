/**
 * Get a value from an object or array, and throw an error if the key or index
 * does not exist or if the resulting value is undefined or null.
 *
 * @param objOrArr The object or array to get the value from.
 * @param keyOrIndex The key or index to get the value from.
 * @param errorMessage Optional error message to include in the error thrown.
 * @returns The value at the given key or index, guaranteed to be non-null and
 *   non-undefined.
 * @throws An error if the key or index does not exist, or if the resulting
 *   value is undefined or null.
 */
export function getOrThrow<T extends object, K extends keyof T>(
  objOrArr: T,
  keyOrIndex: K,
  errorMessage?: string
): NonNullable<T[K]>;
export function getOrThrow<T>(
  objOrArr: T[],
  keyOrIndex: number,
  errorMessage?: string
): NonNullable<T>;
export function getOrThrow<T extends object, K extends keyof T>(
  objOrArr: T | T[],
  keyOrIndex: K | number,
  errorMessage?: string
): NonNullable<T[K]> | NonNullable<T> {
  if (Array.isArray(objOrArr)) {
    const length = objOrArr.length;
    let index = keyOrIndex as number;

    /** Allow for negative indexing. */
    if (index < 0) {
      index = length + index;
    }

    if (index >= 0 && index < length) {
      const value = objOrArr[index];

      if (value !== undefined && value !== null) {
        return value as NonNullable<T>;
      } else if (value === undefined) {
        throw new Error(
          errorMessage ?? `Value at index ${String(keyOrIndex)} is undefined.`
        );
      } else {
        throw new Error(
          errorMessage ?? `Value at index ${String(keyOrIndex)} is null.`
        );
      }
    } else {
      throw new Error(
        errorMessage ?? `Index ${String(keyOrIndex)} is out of bounds.`
      );
    }
  } else {
    if (keyOrIndex in objOrArr) {
      const value = objOrArr[keyOrIndex as K];

      if (value !== undefined && value !== null) {
        return value as NonNullable<T[K]>;
      } else if (value === undefined) {
        throw new Error(
          errorMessage ?? `Value at key "${String(keyOrIndex)}" is undefined.`
        );
      } else {
        throw new Error(
          errorMessage ?? `Value at key "${String(keyOrIndex)}" is null.`
        );
      }
    } else {
      throw new Error(
        errorMessage ??
          `Key "${String(keyOrIndex)}" does not exist in the object.`
      );
    }
  }
}
