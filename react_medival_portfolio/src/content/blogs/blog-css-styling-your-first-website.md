# CSS: Styling Your First Website

HTML gives your website structure. CSS gives it style. With CSS, you can control colors, fonts, spacing, layouts, and visual effects. Let's start from the ground up and learn how to make your web pages look great.

## What is CSS?

CSS (Cascading Style Sheets) is a language that describes how HTML elements are displayed. You write rules that target HTML elements and apply styles to them.

```css
p {
    color: blue;
    font-size: 16px;
}
```

This rule targets every `<p>` element and makes the text blue at 16 pixels.

## Linking CSS to HTML

You can add CSS in three ways, but external stylesheets are the most common.

```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

Create a file called `styles.css` in the same folder as your HTML and start writing your styles there.

## Selectors

Selectors determine which elements your rules apply to.

```css
h1 { }          /* Type selector - targets all h1 elements */
.intro { }      /* Class selector - targets elements with class="intro" */
#hero { }       /* ID selector - targets the element with id="hero" */
div p { }       /* Descendant selector - targets p inside a div */
a:hover { }     /* Pseudo-class - targets links on hover */
```

Classes are reusable and are the most common selector. IDs should be used sparingly.

## Colors

CSS gives you many ways to set colors.

```css
h1 {
    color: red;                    /* Named color */
    color: #ff0000;                /* Hex code */
    color: rgb(255, 0, 0);         /* RGB */
    color: rgba(255, 0, 0, 0.5);   /* RGBA with transparency */
    color: hsl(0, 100%, 50%);      /* HSL */
}
```

## Fonts and Typography

Control how text looks with font properties.

```css
body {
    font-family: 'Arial', sans-serif;
    font-size: 16px;
    line-height: 1.6;
}

h1 {
    font-size: 2.5rem;
    font-weight: bold;
}
```

Always provide a font stack — a list of fonts to fall back on if the first one isn't available.

## The Box Model

Every HTML element is a box with four layers: content, padding, border, and margin.

```css
.card {
    width: 300px;
    padding: 20px;      /* Space inside the border */
    border: 1px solid #ccc;
    margin: 16px;       /* Space outside the border */
}
```

The total width = content + padding + border + margin.

## Margins and Padding

Margin is space outside an element. Padding is space inside.

```css
.container {
    margin: 0 auto;     /* Centers the element horizontally */
    padding: 2rem;
}

.box {
    margin-top: 10px;
    margin-bottom: 20px;
    padding-left: 15px;
}
```

You can set margins and padding on individual sides or use shorthand for all four.

## Backgrounds

Style element backgrounds with color, images, or gradients.

```css
body {
    background-color: #f5f5f5;
    background-image: url('background.jpg');
    background-size: cover;
    background-position: center;
}

.hero {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Borders and Border Radius

Add borders and rounded corners to elements.

```css
.card {
    border: 2px solid #333;
    border-radius: 8px;
}

.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
```

## A Complete Styled Page

Here's a simple page with everything we've covered.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Styled Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Hello, CSS!</h1>
        <p>This page is styled with CSS.</p>
        <button class="btn">Click Me</button>
    </div>
</body>
</html>
```

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    margin-top: 40px;
}

.btn {
    padding: 10px 24px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.btn:hover {
    background-color: #0056b3;
}
```

> 💡 **Tip:** Learn the box model first — it affects everything else in CSS. Use your browser's DevTools (right-click > Inspect) to see how padding, margin, and borders affect element sizes in real time.
