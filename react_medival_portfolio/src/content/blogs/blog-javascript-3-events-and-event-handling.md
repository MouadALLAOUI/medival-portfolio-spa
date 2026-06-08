# JavaScript 3: Events and Event Handling

Events are how JavaScript responds to user actions — clicks, key presses, form submissions, and more. Understanding events is essential for building interactive websites that respond to user behavior.

## What is an Event?

An event is something that happens in the browser: a user clicks a button, presses a key, submits a form, or moves the mouse. JavaScript can listen for these events and run code in response.

## addEventListener

The modern way to handle events is `addEventListener`. It lets you attach multiple handlers to the same element.

```javascript
const button = document.querySelector('#myButton');

button.addEventListener('click', function() {
    console.log('Button was clicked!');
});
```

The first argument is the event type, the second is the function to run.

## Common Event Types

There are many event types you'll use regularly.

```javascript
// Click
button.addEventListener('click', handleClick);

// Double click
button.addEventListener('dblclick', handleDoubleClick);

// Mouse enter/leave
element.addEventListener('mouseover', handleMouseOver);
element.addEventListener('mouseout', handleMouseOut);

// Keyboard
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Form
form.addEventListener('submit', handleSubmit);

// Page load
window.addEventListener('load', handleLoad);

// Scroll
window.addEventListener('scroll', handleScroll);
```

## The Event Object

Every event handler receives an event object with details about what happened.

```javascript
button.addEventListener('click', function(event) {
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Mouse position:', event.clientX, event.clientY);
});

document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
    console.log('Key code:', event.code);
});
```

## Preventing Default Behavior

Some events have default actions — forms reload the page, links navigate away. You can prevent this with `preventDefault()`.

```javascript
const form = document.querySelector('#myForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    console.log('Form submitted without reloading!');

    // Process form data...
});
```

## Event Delegation

Instead of adding listeners to every child element, add one listener to the parent and check which child triggered the event.

```javascript
const list = document.querySelector('#itemList');

list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        console.log('Clicked:', event.target.textContent);
    }

    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
    }
});
```

This is more efficient and works with dynamically added elements.

## Common Click Handler Patterns

```javascript
// Toggle a class
toggleButton.addEventListener('click', function() {
    element.classList.toggle('active');
});

// Show/hide an element
menuToggle.addEventListener('click', function() {
    menu.classList.toggle('hidden');
});

// Copy text to clipboard
copyButton.addEventListener('click', function() {
    navigator.clipboard.writeText(textToCopy);
    copyButton.textContent = 'Copied!';
    setTimeout(() => {
        copyButton.textContent = 'Copy';
    }, 2000);
});
```

## Form Event Handling

Forms have their own set of useful events.

```javascript
const input = document.querySelector('#emailInput');

// When user types
input.addEventListener('input', function() {
    console.log('Current value:', input.value);
});

// When input loses focus
input.addEventListener('blur', function() {
    validateEmail(input.value);
});

// When input gains focus
input.addEventListener('focus', function() {
    input.style.borderColor = '#007bff';
});
```

## Keyboard Events

```javascript
document.addEventListener('keydown', function(event) {
    // Check for specific keys
    if (event.key === 'Escape') {
        modal.classList.add('hidden');
    }

    // Check for keyboard shortcuts
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        saveDocument();
    }

    // Enter key
    if (event.key === 'Enter') {
        submitForm();
    }
});
```

## Removing Event Listeners

You can remove a listener if you stored the function reference.

```javascript
function handleClick() {
    console.log('Clicked!');
}

button.addEventListener('click', handleClick);
button.removeEventListener('click', handleClick);
```

Anonymous functions can't be removed, so use named functions when you might need to remove them later.

## A Practical Example

```html
<ul id="todoList">
    <li>Buy groceries <button class="delete">X</button></li>
    <li>Walk the dog <button class="delete">X</button></li>
</ul>

<script>
    document.querySelector('#todoList').addEventListener('click', function(e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
        }
    });
</script>
```

> 💡 **Tip:** Use event delegation (one listener on a parent) instead of adding listeners to many child elements. It's more performant and automatically works with elements added after page load.
