# Getting Started

## Installation

```bash
pnpm add get-or-throw
```

Or use the equivalent for your package manager:

```bash
npm install get-or-throw
yarn add get-or-throw
```

## Prerequisites

Get-Or-Throw is designed to work with TypeScript's
[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess)
compiler option. While it works without it, the library is most useful when this
option is enabled:

```json
{
  "compilerOptions": {
    "noUncheckedIndexedAccess": true
  }
}
```

With this setting, TypeScript treats every indexed access as potentially
`undefined`, which is correct but can make code verbose. Get-Or-Throw provides a
clean way to handle this.

## Basic Usage

The library exports two identical functions: `getOrThrow` and its shorter alias
`got`.

```ts
import { got } from "get-or-throw";
// or
import { getOrThrow } from "get-or-throw";

const arr = [1, 2, 3];
const value = got(arr, 1); // 2

const obj = { a: 1, b: 2, c: 3 };
const value = got(obj, "b"); // 2
```

Both functions behave identically — use whichever you prefer. The `got` alias is
convenient for keeping code concise.
