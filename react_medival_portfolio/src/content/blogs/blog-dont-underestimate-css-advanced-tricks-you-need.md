# Don't Underestimate CSS: Advanced Tricks You Need

CSS is often underestimated, but modern CSS is incredibly powerful. Let's explore advanced features that make layouts a breeze.

## 1. CSS Flexbox

Perfect for one-dimensional layouts (rows or columns).

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
```

Useful for navigation bars, cards, and responsive alignment.

## 2. CSS Grid

For two-dimensional layouts (rows and columns):

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 20px;
}
```

Ideal for dashboards, image galleries, and complex UIs.

## 3. CSS Variables (Custom Properties)

Define reusable values:

```css
:root {
  --primary-color: #3498db;
  --font-main: 'Segoe UI', sans-serif;
}

button {
  background: var(--primary-color);
  font-family: var(--font-main);
}
```

## 4. Responsive Design with Media Queries

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```

## 5. Hover & Transitions

Add smooth effects:

```css
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}
```

> 🎯 Master these, and you'll write cleaner, more maintainable CSS.

CSS isn't just decoration — it's architecture.