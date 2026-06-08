# CSS 6: CSS Variables and Custom Properties

CSS variables (also called custom properties) let you store reusable values in your stylesheet. Instead of repeating the same color or size in dozens of places, define it once and reference it everywhere. This makes your CSS easier to maintain and update.

## Basic Syntax

Define a variable with `--` and use it with `var()`.

```css
:root {
    --primary-color: #007bff;
    --text-color: #333;
    --spacing-lg: 2rem;
}

.button {
    background-color: var(--primary-color);
    color: white;
    padding: var(--spacing-lg);
}
```

The `:root` selector targets the highest-level element (the `<html>` tag), making variables available everywhere on the page.

## Fallback Values

Provide a fallback value in case the variable isn't defined.

```css
.element {
    color: var(--text-color, #333);
}
```

If `--text-color` doesn't exist, the browser uses `#333` instead.

## Scoped Variables

Variables can be scoped to specific elements, not just globally.

```css
:root {
    --color: blue;
}

.card {
    --color: green;
    color: var(--color); /* This element uses green */
}

.button {
    color: var(--color); /* This element uses blue from :root */
}
```

Child elements inherit variables from their parents, so you can override them at any level.

## Theming with CSS Variables

CSS variables make theming straightforward. Define different values for each theme and swap them with a class.

```css
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --card-bg: #f5f5f5;
    --border-color: #dddddd;
}

.dark-theme {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
    --card-bg: #2d2d2d;
    --border-color: #444444;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}

.card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
}
```

Toggle the theme by adding or removing the `dark-theme` class on the body.

## Dark Mode Example

Here's a complete dark mode implementation using CSS variables.

```css
:root {
    --bg: #ffffff;
    --text: #1a1a1a;
    --primary: #0066cc;
    --surface: #f0f0f0;
    --border: #cccccc;
    --shadow: rgba(0, 0, 0, 0.1);
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg: #121212;
        --text: #e0e0e0;
        --primary: #4da3ff;
        --surface: #1e1e1e;
        --border: #333333;
        --shadow: rgba(0, 0, 0, 0.3);
    }
}

body {
    background-color: var(--bg);
    color: var(--text);
    font-family: sans-serif;
}

.card {
    background-color: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px var(--shadow);
}

a {
    color: var(--primary);
}
```

This automatically switches to dark mode based on the user's system preference.

## Dynamic Variables with JavaScript

CSS variables can be changed with JavaScript, enabling dynamic theming.

```javascript
document.documentElement.style.setProperty('--primary-color', '#ff6600');
```

This updates the variable globally. You can also set variables on specific elements.

## Using Variables for Spacing Systems

Create a consistent spacing scale with variables.

```css
:root {
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 1rem;
    --space-lg: 1.5rem;
    --space-xl: 2rem;
    --space-2xl: 3rem;
}

.container {
    padding: var(--space-lg);
    margin-bottom: var(--space-xl);
}

.card {
    padding: var(--space-md);
    margin-bottom: var(--space-sm);
}
```

## Variables for Typography

Define your typography system with variables.

```css
:root {
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.25rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 2rem;

    --font-weight-normal: 400;
    --font-weight-bold: 700;

    --line-height-tight: 1.2;
    --line-height-normal: 1.5;
}

body {
    font-size: var(--font-size-base);
    line-height: var(--line-height-normal);
    font-weight: var(--font-weight-normal);
}

h1 {
    font-size: var(--font-size-2xl);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-tight);
}
```

## Combining Variables

You can use one variable inside another.

```css
:root {
    --spacing-unit: 8px;
    --spacing-sm: calc(var(--spacing-unit) * 2);
    --spacing-md: calc(var(--spacing-unit) * 3);
    --spacing-lg: calc(var(--spacing-unit) * 4);
}
```

> 💡 **Tip:** Define all your design tokens (colors, spacing, typography) as CSS variables in `:root`. This gives you a single source of truth. When you need to change a color, you change it once and every element using that variable updates automatically.
