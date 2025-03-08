# Get-Or-Throw / Got

A convenience function for safely accessing values in dynamic objects and
arrays. It gets the value at a specified key or index, and throws an error if
the resulting value is `undefined`. Optionally, you can set a custom error
message.

This was created to make it easy to adhere to Typescript's
[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess)
setting, which is recommended for strict type checking.

## Features

- Typescript assertions for type narrowing.
- Works with both objects and arrays.
- Supports negative indexing for arrays.
- Allows for custom error messages.
- Zero dependencies.
- Provides `got` as alias for `getOrThrow`

## Installation

```bash
pnpm add get-or-throw
```

...or use the equivalent for your package manager.

## Usage

The example code below uses the `got` alias but `getOrThrow` is also available
if you want to be more explicit.

```ts
const arr = [1, 2, 3];
const value = got(arr, 1); // Output: 2

/** Support for negative indexing */
const arr = [1, 2, 3];
const value = got(arr, -1); // Output: 3

/** This will throw an error: "Index 3 is out of bounds." */
const value = got(arr, 3);

const obj = { a: 1, b: 2, c: 3 };
const value = got(obj, "b"); // Output: 2

/** This will throw an error: "Key "d" does not exist in the object." */
const value = got(obj, "d");

/** This will throw an error: "Failed to find d" */
const key = "d";
const value = got(obj, key, `Failed to find ${key}`);

/** Null is a valid value */
const arr = [1, null, 3];
const value = got(arr, 1); // Output: null

/** This will throw an error: "Value at index 1 is undefined." */
const arr = [1, undefined, 3];
const value = got(arr, 1);

/** Null is a valid value */
const obj = { a: 1, b: null, c: 3 };
const value = got(obj, "b"); // Output: null

/** This will throw an error: "Value at key 'b' is undefined." */
const obj = { a: 1, b: undefined, c: 3 };
const value = got(obj, "b");
```

And here's the updated test file:

```typescript:src/get-or-throw.test.ts
import { describe, it, expect } from 'vitest';
import { got, getOrThrow } from './get-or-throw';

describe('get-or-throw', () => {
  describe('array access', () => {
    it('should get value at positive index', () => {
      const arr = [1, 2, 3];
      expect(got(arr, 1)).toBe(2);
      expect(getOrThrow(arr, 1)).toBe(2);
    });

    it('should support negative indexing', () => {
      const arr = [1, 2, 3];
      expect(got(arr, -1)).toBe(3);
      expect(got(arr, -2)).toBe(2);
    });

    it('should throw on out of bounds index', () => {
      const arr = [1, 2, 3];
      expect(() => got(arr, 3)).toThrow('Index 3 is out of bounds.');
    });

    it('should allow null values', () => {
      const arr = [1, null, 3];
      expect(got(arr, 1)).toBeNull();
    });

    it('should throw on undefined values', () => {
      const arr = [1, undefined, 3];
      expect(() => got(arr, 1)).toThrow('Value at index 1 is undefined.');
    });
  });

  describe('object access', () => {
    it('should get value at existing key', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(got(obj, 'b')).toBe(2);
      expect(getOrThrow(obj, 'b')).toBe(2);
    });

    it('should throw on non-existent key', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(() => got(obj, 'd' as keyof typeof obj)).toThrow(
        'Key "d" does not exist in the object.'
      );
    });

    it('should allow null values', () => {
      const obj = { a: 1, b: null, c: 3 };
      expect(got(obj, 'b')).toBeNull();
    });

    it('should throw on undefined values', () => {
      const obj = { a: 1, b: undefined, c: 3 };
      expect(() => got(obj, 'b')).toThrow('Value at key "b" is undefined.');
    });
  });

  describe('custom error messages', () => {
    it('should use custom error message when provided', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const key = 'd';
      expect(() => got(obj, key as keyof typeof obj, `Failed to find ${key}`)).toThrow(
        'Failed to find d'
      );
    });
  });
});
```

The key changes:

1. Updated documentation to clarify that only `undefined` values throw
2. Added examples showing that `null` is now a valid value
3. Updated tests to verify `null` values are allowed
4. Renamed test cases to reflect the new behavior
