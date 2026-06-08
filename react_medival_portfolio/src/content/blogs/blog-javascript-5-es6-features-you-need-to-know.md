# JavaScript 5: ES6+ Features You Need to Know

ES6 (ECMAScript 2015) introduced features that modernized JavaScript. These features make code cleaner, more readable, and more powerful. If you're writing JavaScript today, these are essential tools in your toolkit.

## let and const

Replace `var` with `let` and `const` for better scoping.

```javascript
// var - function scoped, can be redeclared
var name = 'Alice';
var name = 'Bob'; // No error

// let - block scoped, can be reassigned
let age = 25;
age = 26; // Fine

// const - block scoped, cannot be reassigned
const PI = 3.14159;
// PI = 3; // Error!
```

Use `const` by default. Only use `let` when you need to reassign. Avoid `var` entirely.

## Arrow Functions

A shorter syntax for writing functions.

```javascript
// Traditional
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Single parameter - no parentheses needed
const double = x => x * 2;

// No parameters
const greet = () => 'Hello!';

// Multi-line body
const processUser = (user) => {
    const name = user.name.toUpperCase();
    return { ...user, name };
};
```

Arrow functions also don't have their own `this` binding, which makes them ideal for callbacks.

## Template Literals

Embed expressions in strings using backticks.

```javascript
const name = 'Alice';
const age = 25;

// String concatenation (old way)
const greeting1 = 'Hello, my name is ' + name + ' and I am ' + age + ' years old.';

// Template literal (new way)
const greeting2 = `Hello, my name is ${name} and I am ${age} years old.`;

// Expressions inside ${}
const price = 10;
const quantity = 3;
const total = `Total: $${price * quantity}`;

// Multi-line strings
const html = `
    <div>
        <h1>${name}</h1>
        <p>Age: ${age}</p>
    </div>
`;
```

## Destructuring

Extract values from arrays and objects into variables.

```javascript
// Object destructuring
const user = { name: 'Alice', age: 25, city: 'Paris' };

const { name, age } = user;
console.log(name); // 'Alice'

// Rename variables
const { name: userName, age: userAge } = user;

// Default values
const { role = 'user' } = user;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second, third] = colors;
console.log(first); // 'red'

// Skip elements
const [, , last] = colors;
console.log(last); // 'blue'

// Function parameter destructuring
function greetUser({ name, age }) {
    return `Hello ${name}, you are ${age} years old!`;
}
```

## Spread and Rest Operators

The `...` operator works differently depending on context.

```javascript
// Spread - expands an array or object
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Copy arrays/objects
const copy = [...arr1];
const objCopy = { ...obj1 };

// Rest - collects remaining elements into an array
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4); // 10

const [firstItem, ...rest] = [1, 2, 3, 4];
console.log(rest); // [2, 3, 4]
```

## Modules (import/export)

Organize code into separate files with import and export.

```javascript
// math.js - Exporting
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export default function multiply(a, b) {
    return a * b;
}

// app.js - Importing
import multiply, { PI, add } from './math.js';

console.log(PI);       // 3.14159
console.log(add(2, 3)); // 5
console.log(multiply(4, 5)); // 20
```

Default exports can be imported with any name. Named exports must be imported with the exact name.

## Optional Chaining

Safely access nested properties that might not exist.

```javascript
const user = {
    address: {
        city: 'Paris'
    }
};

// Old way
const city = user && user.address && user.address.city;

// New way
const city = user?.address?.city; // 'Paris'

// Works with functions
const result = user?.getAddress?.();

// Works with arrays
const first = arr?.[0];
```

## Nullish Coalescing

Provide a default value for null or undefined.

```javascript
const value = null;
const result = value ?? 'default'; // 'default'

// Unlike ||, it only triggers for null/undefined
const count = 0;
const result1 = count || 10; // 10 (0 is falsy)
const result2 = count ?? 10;  // 0 (0 is not null/undefined)
```

> 💡 **Tip:** Make `const` your default, use `let` only when reassignment is needed, and never use `var`. Arrow functions are great for callbacks, but use regular functions for object methods and constructors.
