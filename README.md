# get-or-throw

A convenience function for adhering to Typescript's `noUncheckedIndexedAccess`
setting.

## Installation

```bash
pnpm add get-or-throw
```

...or use the equivalent for your package manager.

## Usage

```ts
const arr = [1, 2, 3];
console.log(getOrThrow(arr, 1)); // Output: 2

/** This will throw an error: "Index 3 is out of bounds." */
console.log(getOrThrow(arr, 3));

const obj = { a: 1, b: 2, c: 3 };
console.log(getOrThrow(obj, "b")); // Output: 2

/** This will throw an error: "Key "d" does not exist in the object." */
console.log(getOrThrow(obj, "d"));

/** This will throw an error: "Failed to find d" */
const key = "d";
console.log(getOrThrow(obj, key, `Failed to find ${key}`));
```
