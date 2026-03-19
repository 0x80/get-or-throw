# API Reference

## `getOrThrow`

Get a value from an object or array, throwing an error if the key or index does
not exist or if the resulting value is `undefined`.

### Signatures

#### Array Access

```ts
function getOrThrow<T>(array: T[], index: number, errorMessage?: string): T;
```

#### Object Access

```ts
function getOrThrow<T extends object, K extends keyof T>(
  object: T,
  key: K,
  errorMessage?: string,
): NonNullable<T[K]>;
```

### Parameters

| Parameter          | Type          | Description                                            |
| ------------------ | ------------- | ------------------------------------------------------ |
| `array` / `object` | `T[] \| T`    | The array or object to access.                         |
| `index` / `key`    | `number \| K` | The index (for arrays) or key (for objects) to access. |
| `errorMessage`     | `string`      | Optional custom error message.                         |

### Returns

The value at the given key or index, guaranteed to be defined. For objects, the
return type is `NonNullable<T[K]>`.

### Throws

- If the index is out of bounds: `"Index {n} is out of bounds."`
- If the key does not exist: `'Key "{key}" does not exist in the object.'`
- If the value is `undefined`: `"Value at index {n} is undefined."` or
  `'Value at key "{key}" is undefined.'`

When a custom `errorMessage` is provided, it is used instead of the default
messages.

### Behavior

- **Negative indexing**: Negative indices count from the end of the array.
  `got(arr, -1)` returns the last element.
- **Null values**: `null` is treated as a valid value and does not trigger an
  error. Only `undefined` causes a throw.

## `got`

An alias for `getOrThrow`. Both functions are identical — use whichever you
prefer.

```ts
import { got } from "get-or-throw";
// is equivalent to
import { getOrThrow } from "get-or-throw";
```
