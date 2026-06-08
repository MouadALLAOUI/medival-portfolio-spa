# Intro to Responsive Web Design with Media Queries

Over 60% of web traffic comes from mobile devices. Your site **must** look good on all screens.

## Step 1: The Viewport Meta Tag

Add this to your `<head>`:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

This tells mobile browsers to render at actual device width.

## Step 2: Mobile-First Approach

Write styles for small screens first, then enhance for larger ones.

```css
/* Base (mobile) */
.container {
  padding: 10px;
}

/* Tablet */
@media (min-width: 768px) {
  .container {
    padding: 20px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

## Step 3: Flexible Layouts

Use relative units:
- `%`, `rem`, `em`, `vw`, `vh`
- Avoid fixed widths like `width: 300px;`

## Step 4: Test on Real Devices

Use Chrome DevTools' device emulator or test on actual phones.

> 📱 A responsive site isn't optional — it's essential.

Your users will thank you.