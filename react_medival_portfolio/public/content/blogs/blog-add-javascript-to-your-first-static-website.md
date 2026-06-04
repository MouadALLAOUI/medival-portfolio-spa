# Add JavaScript to Your First Static Website

HTML builds structure. CSS adds style. Now, **JavaScript** brings behavior and interactivity.

## What Can JavaScript Do?

- Respond to user clicks
- Update content dynamically
- Validate forms
- Fetch data from servers

## How to Include JavaScript

### Option 1: Inline Script

```html
<button onclick="alert('Hello!')">Click Me</button>
```

### Option 2: Internal Script

Inside `<head>` or before `</body>`:

```html
<script>
  function greet() {
    alert("Welcome to my site!");
  }
</script>
```

### Option 3: External Script (Recommended)

Create `script.js` and link it:

```html
<script src="script.js"></script>
```

In `script.js`:
```js
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button");
  btn.addEventListener("click", () => {
    console.log("Button clicked!");
  });
});
```

## Where to Place Scripts?

Always place the `<script>` tag **before the closing `</body>`** tag to ensure the DOM is loaded.

> ⚠️ Never block page rendering with heavy scripts in the head.

You've now made a fully interactive webpage!