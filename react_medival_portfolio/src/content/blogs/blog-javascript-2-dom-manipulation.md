# JavaScript 2: DOM Manipulation

The DOM (Document Object Model) is a tree-like representation of your HTML page. JavaScript can read, modify, add, and remove elements from this tree. DOM manipulation is how you make pages dynamic — showing messages, updating content, building interfaces on the fly.

## What is the DOM?

When the browser loads an HTML page, it creates a DOM — a structured object that represents every element as a node. JavaScript interacts with this tree to change what the user sees.

```
Document
└── html
    ├── head
    │   └── title
    └── body
        ├── h1
        ├── p
        └── div
            └── span
```

## Selecting Elements

Before you can change an element, you need to find it.

```javascript
// By ID - returns single element
const header = document.getElementById('header');

// By CSS selector - returns first match
const firstCard = document.querySelector('.card');

// By CSS selector - returns all matches
const allCards = document.querySelectorAll('.card');

// By class name - returns live HTMLCollection
const items = document.getElementsByClassName('item');

// By tag name - returns live HTMLCollection
const paragraphs = document.getElementsByTagName('p');
```

`querySelector` and `querySelectorAll` are the most versatile — they accept any valid CSS selector.

## Reading Content

Extract information from elements.

```javascript
const element = document.querySelector('#myElement');

element.textContent;    // Text content (ignores HTML)
element.innerHTML;      // HTML content (includes tags)
element.innerText;      // Visible text (respects CSS)
element.value;          // Value of input/textarea/select
element.getAttribute('href');  // Any HTML attribute
element.classList;      // List of CSS classes
```

## Modifying Content

Change what's displayed in an element.

```javascript
// Change text (safe, no HTML parsing)
element.textContent = 'Hello World';

// Change HTML (parses tags)
element.innerHTML = '<strong>Bold text</strong>';

// Change an attribute
element.setAttribute('href', 'https://example.com');
element.href = 'https://example.com';
```

Using `textContent` is safer than `innerHTML` because it doesn't parse HTML. Use `innerHTML` only when you need to insert actual HTML markup.

## Creating Elements

Build new elements and add them to the page.

```javascript
// Create a new element
const newDiv = document.createElement('div');
newDiv.textContent = 'I was created with JavaScript!';
newDiv.classList.add('card');

// Add it to the page
document.body.appendChild(newDiv);

// Insert before a specific element
const reference = document.querySelector('#existing');
document.body.insertBefore(newDiv, reference);
```

## Removing Elements

Remove elements from the DOM.

```javascript
const element = document.querySelector('#toRemove');
element.remove();

// Alternative: remove from parent
const parent = element.parentNode;
parent.removeChild(element);
```

## Modifying Styles

Change element styles directly or toggle classes.

```javascript
// Direct style changes
element.style.color = 'red';
element.style.fontSize = '20px';
element.style.display = 'none';

// Toggle a class (preferred approach)
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');
element.classList.contains('active');  // Check if class exists
```

Modifying classes is better than changing styles directly because it keeps presentation logic in CSS.

## Working with Attributes

```javascript
// Get an attribute
const src = document.querySelector('img').getAttribute('src');

// Set an attribute
document.querySelector('a').setAttribute('target', '_blank');

// Check if attribute exists
document.querySelector('a').hasAttribute('disabled');

// Remove an attribute
document.querySelector('input').removeAttribute('disabled');
```

## Building a Dynamic List

Here's a practical example — adding items to a list dynamically.

```html
<input type="text" id="itemInput" placeholder="Add an item">
<button id="addBtn">Add</button>
<ul id="itemList"></ul>

<script>
    const input = document.getElementById('itemInput');
    const addBtn = document.getElementById('addBtn');
    const list = document.getElementById('itemList');

    addBtn.addEventListener('click', function() {
        const text = input.value.trim();
        if (text === '') return;

        const li = document.createElement('li');
        li.textContent = text;
        list.appendChild(li);

        input.value = '';
        input.focus();
    });
</script>
```

## Traversing the DOM

Navigate the tree structure to find related elements.

```javascript
const element = document.querySelector('.child');

element.parentNode;       // Parent element
element.parentElement;    // Parent element (same as above)
element.children;         // All child elements
element.firstElementChild;  // First child
element.lastElementChild;   // Last child
element.nextElementSibling; // Next sibling
element.previousElementSibling; // Previous sibling
```

> 💡 **Tip:** Prefer `querySelector` and `querySelectorAll` for selecting elements. They're consistent and use the same CSS selectors you already know. Always add event listeners after the DOM is loaded — place your script at the bottom of the body or use `DOMContentLoaded`.
