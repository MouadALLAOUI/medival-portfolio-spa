# How to Debug JavaScript Like a Pro

Even expert developers write buggy code. The key is knowing how to **find and fix** issues quickly.

## 1. `console.log()` (The Classic)

```js
console.log("User clicked:", user);
console.log("Current state:", state);
```

👉 Use descriptive labels and log objects/arrays.

## 2. Browser Dev Tools

Open with `F12` or right-click → "Inspect".

### Key Panels:
- **Console**: View logs and errors
- **Sources**: Set breakpoints
- **Network**: Monitor API calls
- **Elements**: Inspect HTML/CSS live

## 3. Breakpoints

Pause code execution:

```js
debugger; // Pauses here when Dev Tools are open
```

Or click line numbers in "Sources" tab.

## 4. Handle Errors Gracefully

```js
try {
  riskyOperation();
} catch (error) {
  console.error("Something went wrong:", error.message);
}
```

## 5. Use `console.table()` for Arrays

```js
const users = [{name: "Alice"}, {name: "Bob"}];
console.table(users);
```

> 🛠️ Pro Tip: Avoid `alert()` for debugging — it blocks the UI.

Debugging isn't a sign of failure — it's part of the process.