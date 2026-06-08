# JavaScript: Adding Interactivity to Your Site

HTML gives structure, CSS gives style, and JavaScript gives behavior. JavaScript lets your website respond to users — clicking buttons, submitting forms, updating content, and much more. Let's start writing your first JavaScript code.

## The `<script>` Tag

Add JavaScript to your HTML using the `<script>` tag.

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello!</h1>

    <script>
        alert('Welcome to my page!');
    </script>
</body>
</html>
```

The `alert()` function shows a popup dialog. It's simple but demonstrates that JavaScript is running.

## Console Output

Use `console.log()` to print messages to the browser's developer console. This is your primary debugging tool.

```javascript
console.log('Hello, world!');
console.log('The current time is:', new Date());
```

Open your browser's DevTools (F12 or right-click > Inspect) and go to the Console tab to see the output.

## Variables

Variables store data values. Use `let` for values that change and `const` for values that stay the same.

```javascript
let score = 0;
score = 10;  // This is fine

const maxScore = 100;
// maxScore = 200;  // Error! Can't reassign const
```

## Data Types

JavaScript has several core data types.

```javascript
let name = "Alice";          // String
let age = 25;                // Number
let isStudent = true;        // Boolean
let nothing = null;          // Null
let unknown = undefined;     // Undefined
let scores = [90, 85, 92];  // Array
let person = {               // Object
    name: "Alice",
    age: 25
};
```

## Basic Operations

Perform math, string manipulation, and comparisons.

```javascript
// Math
let sum = 10 + 5;       // 15
let product = 4 * 3;    // 12
let remainder = 10 % 3; // 1

// Strings
let greeting = "Hello" + " " + "World";  // "Hello World"
let length = greeting.length;              // 11
let upper = greeting.toUpperCase();       // "HELLO WORLD"

// Comparisons
let x = 10;
x === 10;   // true (strict equality)
x > 5;      // true
x < 20;     // true
```

## Event Listeners

Event listeners wait for something to happen — a click, a keypress, a form submission — and then run your code.

```javascript
const button = document.querySelector('#myButton');

button.addEventListener('click', function() {
    alert('Button was clicked!');
});
```

## DOM Selection

The DOM (Document Object Model) is how JavaScript accesses and modifies HTML elements.

```javascript
// Select by ID
const title = document.getElementById('title');

// Select by CSS selector (first match)
const card = document.querySelector('.card');

// Select all matches
const items = document.querySelectorAll('.item');
```

## Changing Content

Modify the page content and styles with JavaScript.

```javascript
// Change text
document.querySelector('h1').textContent = 'New Title';

// Change HTML
document.querySelector('.content').innerHTML = '<p>New content</p>';

// Change styles
document.querySelector('.box').style.backgroundColor = 'blue';
```

## A Complete Interactive Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Interactive Page</title>
    <style>
        .btn {
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
        }
        .hidden { display: none; }
    </style>
</head>
<body>
    <h1 id="title">Click the Button</h1>
    <button id="myButton" class="btn">Click Me</button>
    <p id="message" class="hidden">Hello! You clicked the button.</p>

    <script>
        const button = document.querySelector('#myButton');
        const message = document.querySelector('#message');
        const title = document.querySelector('#title');

        button.addEventListener('click', function() {
            message.classList.toggle('hidden');
            title.textContent = 'Button Clicked!';
        });
    </script>
</body>
</html>
```

Click the button and watch the page change. This is the power of JavaScript.

> 💡 **Tip:** Start with `console.log()` to see what's happening in your code. Place it before and after changes to understand the flow. Once you can see the values in the console, debugging becomes much easier.
