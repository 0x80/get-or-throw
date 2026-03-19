# Why Get-Or-Throw?

## The Core Question

When you access an array element or object property by a dynamic key, the value
might not be there. TypeScript's `noUncheckedIndexedAccess` makes this explicit
by adding `| undefined` to every indexed access. But how should you handle that
`undefined`?

There are two fundamental approaches:

1. **Defensive programming** — check for `undefined` and handle the absence
   gracefully
2. **Fail-fast** — assert the value exists and throw immediately if it doesn't

Get-Or-Throw is for the second case: when absence is a bug, not a valid state.

## When to Use `got()`

Use `got()` when a missing value means something has gone wrong — a business
invariant has been violated, data is corrupt, or an earlier operation failed
silently:

```ts
// The config must have a "database" section
const dbConfig = got(config, "database");

// There must be at least one item after filtering
const first = got(filtered, 0, "Filter returned no results");

// Parallel arrays must have the same length
const label = got(labels, index);
```

In these cases, continuing with `undefined` would cause confusing downstream
errors. Failing immediately with a clear message is better.

## When NOT to Use `got()`

When absence is a legitimate possibility, use native patterns instead:

```ts
// User might not exist — that's fine
const user = users.find((u) => u.id === id);
if (!user) {
  return notFound();
}

// Optional configuration
const timeout = config.timeout ?? 5000;

// Array might be empty
const first = items[0];
if (first === undefined) {
  showEmptyState();
}
```

If the code after the access handles the `undefined` case meaningfully, you
don't need `got()`.

## When to Use Tuple Types Instead

If the length of an array is statically known, TypeScript can track individual
element types without `| undefined`. In those cases, prefer a tuple type over
`got()`:

```ts
// TypeScript knows this has exactly 3 elements
const rgb: [number, number, number] = [255, 128, 0];
const red = rgb[0]; // number, not number | undefined
```

## Problems with Defensive Patterns

### Silent Failures

The most dangerous pattern is silently swallowing `undefined`:

```ts
// Bug: if arr[i] is undefined, localeCompare is called on undefined
arr.sort((a, b) => {
  const valA = mapping[a]; // possibly undefined
  const valB = mapping[b]; // possibly undefined
  return valA.localeCompare(valB); // runtime crash, no clear message
});
```

With `got()`, the failure is immediate and descriptive:

```ts
arr.sort((a, b) => {
  const valA = got(mapping, a);
  const valB = got(mapping, b);
  return valA.localeCompare(valB); // safe — both are guaranteed strings
});
```

### Verbose Guard Clauses

Without `got()`, you end up with repetitive null checks:

```ts
const value = obj[key];
if (value === undefined) {
  throw new Error(`Expected key "${key}" to exist`);
}
// now use value
```

This pattern repeated across a codebase adds significant noise. `got()` reduces
it to a single expression:

```ts
const value = got(obj, key);
```

### Inconsistency

Different developers write different error messages, check in different ways
(`=== undefined`, `!= null`, `in` operator), or sometimes forget to check at
all. `got()` provides a single consistent pattern.

## Addressing Objections

### "It's a dependency for something trivial"

Get-Or-Throw has zero dependencies and is only a few lines of code. The value
isn't in the implementation complexity — it's in the consistency and
expressiveness it brings to a codebase. A shared convention is worth more than
any individual helper function.

### "Throwing crashes the app"

That's the point. If a business invariant is violated, you _want_ to know
immediately. The alternative — continuing with `undefined` — leads to corrupted
data, confusing errors far from the source, and bugs that are hard to reproduce.

### "I can just use the non-null assertion (`!`)"

The non-null assertion (`value!`) tells TypeScript to trust you, but provides no
runtime safety. If you're wrong, you get a confusing `undefined` error
somewhere downstream. `got()` gives you both the type narrowing _and_ a clear
runtime error at the point of access.
