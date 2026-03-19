# Get-Or-Throw

A convenience function for safely accessing values in dynamic objects and
arrays. It gets the value at a specified key or index, and throws an error if
the resulting value is `undefined`.

## Features

- TypeScript assertions for type narrowing
- Works with both objects and arrays
- Supports negative indexing for arrays
- Allows for custom error messages
- Zero dependencies
- Provides `got` as alias for `getOrThrow`

## Quick Start

```bash
pnpm add get-or-throw
```

```ts
import { got } from "get-or-throw";

const arr = [1, 2, 3];
got(arr, 1); // 2

const obj = { a: 1, b: 2, c: 3 };
got(obj, "b"); // 2
```

## Documentation

For full documentation visit
[get-or-throw.codecompose.dev](https://get-or-throw.codecompose.dev/).

## License

MIT
