# Understanding Variables, Data Types & Operators in JS

Before diving into complex logic, master the building blocks of JavaScript.

## Variables: `let`, `const`, and `var`

```js
let age = 25;           // can be reassigned
const name = "Alex";    // cannot be changed
var oldStyle = true;    // avoid (legacy)
```

👉 Always prefer `const` unless you need reassignment.

## Primitive Data Types

- `String`: "Hello"
- `Number`: 42 or 3.14
- `Boolean`: true / false
- `null`: intentional empty value
- `undefined`: variable declared but not assigned
- `Symbol`: unique identifiers
- `BigInt`: very large numbers

## Operators

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Comparison: `==`, `===`, `!=`, `<`, `>`
- Logical: `&&` (and), `||` (or), `!` (not)

## Type Checking

```js
typeof "hello"  // "string"
typeof 42       // "number"
```

> 📌 Use `===` (strict equality) to avoid type coercion bugs.

These concepts are the foundation of all JavaScript programs.