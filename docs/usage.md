# Usage

The examples below use the `got` alias, but `getOrThrow` works identically.

## Array Access

```ts
const arr = [1, 2, 3];
const value = got(arr, 1); // 2
```

### Negative Indexing

Negative indices count from the end of the array, similar to `Array.at()`:

```ts
const arr = [1, 2, 3];
got(arr, -1); // 3
got(arr, -2); // 2
```

### Out of Bounds

Accessing an index outside the array bounds throws an error:

```ts
const arr = [1, 2, 3];
got(arr, 3); // throws: "Index 3 is out of bounds."
```

## Object Access

```ts
const obj = { a: 1, b: 2, c: 3 };
const value = got(obj, "b"); // 2
```

### Missing Keys

Accessing a key that doesn't exist throws an error:

```ts
const obj = { a: 1, b: 2, c: 3 };
got(obj, "d"); // throws: 'Key "d" does not exist in the object.'
```

## Null vs Undefined

`null` is treated as a valid value and will not cause an error. Only `undefined`
triggers a throw:

```ts
// null is valid
const arr = [1, null, 3];
got(arr, 1); // null

const obj = { a: 1, b: null, c: 3 };
got(obj, "b"); // null

// undefined throws
const arr2 = [1, undefined, 3];
got(arr2, 1); // throws: "Value at index 1 is undefined."

const obj2 = { a: 1, b: undefined, c: 3 };
got(obj2, "b"); // throws: 'Value at key "b" is undefined.'
```

## Custom Error Messages

You can provide a custom error message as the third argument:

```ts
const obj = { a: 1, b: 2, c: 3 };
const key = "d";
got(obj, key, `Failed to find ${key}`);
// throws: "Failed to find d"
```

This is useful when you want to provide more context about why the value was
expected to exist:

```ts
const users = [{ name: "Alice" }, { name: "Bob" }];
const user = got(users, userIndex, `User at index ${userIndex} not found`);
```
