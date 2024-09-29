/**
 * Get a value from an object or array, or throw an error if the key or index
 * does not exist.
 *
 * @param objOrArr The object or array to get the value from.
 * @param keyOrIndex The key or index to get the value from.
 * @param errorMessage Optional error message to include in the error thrown.
 * @returns The value at the given key or index.
 * @throws An error if the key or index does not exist.
 */
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
      return objOrArr[index]!;
    } else {
      throw new Error(
        errorMessage ?? `Index ${String(keyOrIndex)} is out of bounds.`
      );
    }
  } else {
    if (keyOrIndex in objOrArr) {
      return objOrArr[keyOrIndex as K];
    } else {
      throw new Error(
        errorMessage ??
          `Key "${String(keyOrIndex)}" does not exist in the object.`
      );
    }
  }
}
