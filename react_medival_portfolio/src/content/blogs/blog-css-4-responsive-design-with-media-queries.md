# CSS 4: Responsive Design with Media Queries

Responsive design ensures your website looks great on every device — phones, tablets, laptops, and desktops. Media queries let you apply different styles based on screen size, orientation, or other conditions.

## The Viewport Meta Tag

Before anything else, add this to your HTML `<head>`. Without it, media queries won't work properly on mobile devices.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This tells the browser to match the viewport width to the device width and start at 100% zoom.

## Basic Media Query Syntax

Media queries use the `@media` rule to apply styles conditionally.

```css
/* Styles for screens 768px or wider */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
        margin: 0 auto;
    }
}

/* Styles for screens 480px or narrower */
@media (max-width: 480px) {
    .container {
        padding: 1rem;
    }
}
```

## min-width vs max-width

- `min-width` — Styles apply when the screen is at least this wide (desktop-first approach).
- `max-width` — Styles apply when the screen is at most this wide (mobile-first approach).

```css
/* Desktop-first */
@media (min-width: 1024px) { ... }

/* Mobile-first */
@media (max-width: 768px) { ... }
```

## Common Breakpoints

These are the breakpoints most developers use as reference points.

```css
/* Small phones */
@media (max-width: 480px) { }

/* Large phones / small tablets */
@media (max-width: 768px) { }

/* Tablets / small laptops */
@media (max-width: 1024px) { }

/* Desktops */
@media (max-width: 1200px) { }

/* Large screens */
@media (min-width: 1201px) { }
```

## The Mobile-First Approach

Start with styles for mobile devices, then add media queries for larger screens. This keeps your base CSS lean and ensures good performance on mobile.

```css
/* Base styles (mobile) */
.container {
    padding: 1rem;
    font-size: 14px;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
        padding: 2rem;
        font-size: 16px;
    }
}

/* Desktop and up */
@media (min-width: 1024px) {
    .container {
        max-width: 960px;
        font-size: 18px;
    }
}
```

## Hiding and Showing Elements

Media queries let you show or hide elements based on screen size.

```css
/* Show hamburger menu only on mobile */
.mobile-menu {
    display: block;
}

@media (min-width: 768px) {
    .mobile-menu {
        display: none;
    }

    .desktop-menu {
        display: block;
    }
}
```

## Changing Layouts

Switch between layouts based on screen size.

```css
/* Mobile: stack elements vertically */
.grid {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Desktop: side by side */
@media (min-width: 768px) {
    .grid {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .grid-item {
        flex: 1 1 45%;
    }
}
```

## Responsive Typography

Scale your fonts using media queries or modern CSS.

```css
/* With media queries */
body {
    font-size: 14px;
}

@media (min-width: 768px) {
    body {
        font-size: 16px;
    }
}

@media (min-width: 1024px) {
    body {
        font-size: 18px;
    }
}
```

## Orientation

You can also query for device orientation.

```css
@media (orientation: landscape) {
    .hero {
        height: 50vh;
    }
}

@media (orientation: portrait) {
    .hero {
        height: 80vh;
    }
}
```

## A Complete Responsive Example

```css
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
}

.container {
    width: 100%;
    padding: 1rem;
}

/* Two columns on tablet */
@media (min-width: 768px) {
    .container {
        max-width: 720px;
        margin: 0 auto;
    }

    .columns {
        display: flex;
        gap: 2rem;
    }

    .sidebar {
        width: 30%;
    }

    .content {
        width: 70%;
    }
}

/* Three columns on desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 960px;
    }

    .sidebar {
        width: 25%;
    }

    .content {
        width: 50%;
    }
}
```

> 💡 **Tip:** Always design mobile-first. Write your base styles for the smallest screen, then progressively enhance with media queries for larger screens. This approach is easier to maintain and performs better on mobile devices.
