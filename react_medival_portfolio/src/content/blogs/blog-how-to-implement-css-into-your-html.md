# How to Implement CSS Into Your HTML

Now that you've built a basic HTML page, it's time to make it look good! CSS (Cascading Style Sheets) controls layout, colors, fonts, and animations.

## Three Ways to Add CSS

### 1. Inline CSS (Not Recommended for Large Projects)

Apply styles directly to an element using the `style` attribute.

```html
<p style="color: blue; font-size: 18px;">This text is styled!</p>
```

### 2. Internal CSS (Good for Single Pages)

Use the `<style>` tag inside the `<head>`.

```html
<head>
  <style>
    body { background-color: #f0f0f0; }
    h1 { color: purple; }
  </style>
</head>
```

### 3. External CSS (Best Practice)

Create a separate file (e.g., `styles.css`) and link it:

```html
<link rel="stylesheet" href="styles.css">
```

And in `styles.css`:
```css
h1 {
  color: teal;
  font-family: 'Arial', sans-serif;
}
```

## Why External CSS?

- Reusable across multiple pages
- Cleaner separation of concerns
- Easier maintenance

> 🛠️ Pro Tip: Always use external CSS in real projects.

Now your site isn't just structured — it's beautiful!