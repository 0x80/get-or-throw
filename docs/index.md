---
layout: home

hero:
  name: Get-Or-Throw
  tagline: Safe indexed access for TypeScript with noUncheckedIndexedAccess
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started
    - theme: alt
      text: Why Get-Or-Throw?
      link: /reasoning

features:
  - title: Type-Safe Access
    details: TypeScript assertions for type narrowing — the returned value is guaranteed to be defined.
  - title: Arrays & Objects
    details: Works with both objects and arrays, including support for negative indexing.
  - title: Zero Dependencies
    details: Tiny footprint with no external dependencies. Just the utility you need, nothing more.
---

## What is Get-Or-Throw?

Get-Or-Throw provides a convenience function for safely accessing values in
dynamic objects and arrays. It gets the value at a specified key or index, and
throws an error if the resulting value is `undefined`.

This was created to make it easy to adhere to TypeScript's
[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/#noUncheckedIndexedAccess)
setting, which is recommended for strict type checking.

```ts
import { got } from "get-or-throw";

const arr = [1, 2, 3];
const value = got(arr, 1); // 2 — type is `number`, not `number | undefined`

const obj = { a: 1, b: 2, c: 3 };
const value = got(obj, "b"); // 2
```

Instead of writing repetitive guard clauses or non-null assertions throughout
your code, `got()` gives you a single, expressive call that either returns a
defined value or throws a descriptive error.
