/**
 * Get a value from an object or array, and throw an error if the key or index
 * does not exist or if the resulting value is undefined.
 *
 * @param objOrArr The object or array to get the value from.
 * @param keyOrIndex The key or index to get the value from.
 * @param errorMessage Optional error message to include in the error thrown.
 * @returns The value at the given key or index.
 * @throws An error if the key or index does not exist, or if the resulting
 *   value is undefined.
 */
export function getOrThrow<T extends object, K extends keyof T>(
  obj: T,
  key: K,
  errorMessage?: string
): T[K];
export function getOrThrow<T>(
  arr: T[],
  index: number,
  errorMessage?: string
): T;
export function getOrThrow<T extends object, K extends keyof T>(
  objOrArr: T | T[],
  keyOrIndex: K | number,
  errorMessage?: string
): T[K] | T {
  if (Array.isArray(objOrArr)) {
    const length = objOrArr.length;
    let index = keyOrIndex as number;

    // Handle negative indexing
    if (index < 0) {
      index = length + index;
    }

    if (index >= 0 && index < length) {
      const value = objOrArr[index];

      if (value === undefined) {
        throw new Error(
          errorMessage ?? `Value at index ${String(keyOrIndex)} is undefined.`
        );
      } else {
        return value;
      }
    } else {
      throw new Error(
        errorMessage ?? `Index ${String(keyOrIndex)} is out of bounds.`
      );
    }
  } else {
    if (keyOrIndex in objOrArr) {
      const value = objOrArr[keyOrIndex as K];

      if (value === undefined) {
        throw new Error(
          errorMessage ?? `Value at key "${String(keyOrIndex)}" is undefined.`
        );
      } else {
        return value;
      }
    } else {
      throw new Error(
        errorMessage ??
          `Key "${String(keyOrIndex)}" does not exist in the object.`
      );
    }
  }
}
