# get-or-throw

A simple convenience function for safely accessing values in objects and arrays.
It gets a value from an object or array at a specified key or index, and throw
an error if the resulting value is `undefined` or `null`. Optionally, you can
set custom error message.

This was created to make it easy to adhere to Typescript's
[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess)
setting, which is recommended for strict type checking.

## Features

- Uses Typescript assertions for type narrowing.
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

```ts
const arr = [1, 2, 3];
console.log(getOrThrow(arr, 1)); // Output: 2

/** Support for negative indexing */
const arr = [1, 2, 3];
console.log(getOrThrow(arr, -1)); // Output: 3

/** This will throw an error: "Index 3 is out of bounds." */
console.log(getOrThrow(arr, 3));

const obj = { a: 1, b: 2, c: 3 };
console.log(getOrThrow(obj, "b")); // Output: 2

/** This will throw an error: "Key "d" does not exist in the object." */
console.log(getOrThrow(obj, "d"));

/** This will throw an error: "Failed to find d" */
const key = "d";
console.log(getOrThrow(obj, key, `Failed to find ${key}`));

/** This will throw an error: "Value at index 1 is undefined or null." */
const arr = [1, null, 3];
console.log(getOrThrow(arr, 1));

/** This will throw an error: "Value at index 1 is undefined or null." */
const arr = [1, undefined, 3];
console.log(getOrThrow(arr, 1));

/** This will throw an error: "Value at key 'b' is undefined or null." */
const obj = { a: 1, b: undefined, c: 3 };
console.log(getOrThrow(obj, "b"));
```

## Alias
