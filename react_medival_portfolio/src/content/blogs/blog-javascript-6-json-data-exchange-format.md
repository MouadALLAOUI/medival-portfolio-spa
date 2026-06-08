# JavaScript 6: JSON — Data Exchange Format

JSON (JavaScript Object Notation) is the standard format for exchanging data between a server and a client. It's lightweight, human-readable, and easy for machines to parse. Almost every API you'll work with uses JSON.

## What is JSON?

JSON is a text-based data format that looks like JavaScript objects. Despite the name, it's language-independent — every programming language can parse and generate JSON.

```json
{
    "name": "Alice",
    "age": 25,
    "isStudent": false,
    "courses": ["Math", "Science", "History"],
    "address": {
        "city": "Paris",
        "country": "France"
    }
}
```

## JSON Syntax Rules

JSON has strict syntax rules:

- Keys must be in **double quotes** (`"key"`).
- String values must use **double quotes** (`"value"`).
- Numbers, booleans, and null don't need quotes.
- No trailing commas allowed.
- No comments allowed.

```json
// INVALID
{
    'name': 'Alice',   // Single quotes - wrong
    'age': 25,          // Trailing comma - wrong
}

// VALID
{
    "name": "Alice",
    "age": 25
}
```

## JSON Data Types

JSON supports these data types:

| Type | Example |
|------|---------|
| String | `"hello"` |
| Number | `42` or `3.14` |
| Boolean | `true` or `false` |
| Null | `null` |
| Array | `[1, 2, 3]` |
| Object | `{"key": "value"}` |

## JSON Objects

JSON objects store key-value pairs.

```json
{
    "id": 1,
    "title": "First Post",
    "author": {
        "name": "Alice",
        "email": "alice@example.com"
    },
    "published": true
}
```

## JSON Arrays

JSON arrays hold ordered lists of values.

```json
{
    "users": [
        {"name": "Alice", "age": 25},
        {"name": "Bob", "age": 30},
        {"name": "Charlie", "age": 35}
    ]
}
```

## JSON.parse() — String to Object

Convert a JSON string into a JavaScript object.

```javascript
const jsonString = '{"name": "Alice", "age": 25}';

const user = JSON.parse(jsonString);
console.log(user.name); // 'Alice'
console.log(user.age);  // 25
```

Always wrap `JSON.parse()` in a try/catch block for safety.

```javascript
try {
    const data = JSON.parse(jsonString);
} catch (error) {
    console.error('Invalid JSON:', error.message);
}
```

## JSON.stringify() — Object to String

Convert a JavaScript object into a JSON string.

```javascript
const user = {
    name: 'Alice',
    age: 25,
    courses: ['Math', 'Science']
};

const jsonString = JSON.stringify(user);
// '{"name":"Alice","age":25,"courses":["Math","Science"]}'

// Pretty-printed with indentation
const pretty = JSON.stringify(user, null, 2);
```

## Using JSON with APIs

When fetching data from an API, you typically parse the JSON response.

```javascript
async function getUsers() {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json(); // Automatically parses JSON
    return data;
}

async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    const newUser = await response.json();
    return newUser;
}
```

## Storing Data in localStorage

localStorage only stores strings, so use JSON to store complex data.

```javascript
// Save
const settings = { theme: 'dark', language: 'en' };
localStorage.setItem('settings', JSON.stringify(settings));

// Load
const saved = localStorage.getItem('settings');
const settings = JSON.parse(saved);
console.log(settings.theme); // 'dark'
```

## Practical Example: Display JSON Data

```javascript
const products = [
    {"id": 1, "name": "Laptop", "price": 999},
    {"id": 2, "name": "Phone", "price": 699},
    {"id": 3, "name": "Tablet", "price": 449}
];

const container = document.getElementById('products');

container.innerHTML = products.map(product => `
    <div class="product">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
    </div>
`).join('');
```

## Common Mistakes

```javascript
// Wrong: JSON keys need double quotes
const invalid = { name: 'Alice' };  // JS object, not JSON string

// Correct JSON string
const valid = '{"name": "Alice"}';

// Wrong: Trailing commas in JSON strings
const bad = '{"name": "Alice",}'; // Syntax error

// Right: No trailing commas
const good = '{"name": "Alice"}';
```

> 💡 **Tip:** Use `JSON.stringify(data, null, 2)` to pretty-print JSON when debugging. It makes large objects readable. When working with APIs, always wrap `JSON.parse()` in try/catch to handle malformed responses gracefully.
