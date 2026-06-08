# HTML: Your First Web Page from Scratch

HTML is the backbone of every website. It's the markup language that structures content, tells the browser what's a heading, a paragraph, a link, or an image. In this post, we'll build a complete minimal HTML page from scratch, understanding every tag along the way.

## The DOCTYPE Declaration

Every HTML document starts with a DOCTYPE declaration. It tells the browser which version of HTML to use. For modern web pages, you'll use HTML5.

```html
<!DOCTYPE html>
```

This line must be the very first thing in your document. It's not an HTML tag — it's an instruction to the browser about what version of HTML the page is written in.

## The Root `<html>` Element

Everything else in your document goes inside the `<html>` element. It's the root element that wraps all the content on the page.

```html
<!DOCTYPE html>
<html lang="en">
</html>
```

The `lang` attribute specifies the language of the content. This is important for accessibility — screen readers use it to pronounce content correctly.

## The `<head>` Section

The `<head>` contains metadata about the page — information that isn't displayed directly on the page but is crucial for the browser and search engines.

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
```

- `<meta charset="UTF-8">` — Sets the character encoding. UTF-8 supports almost all characters and symbols.
- `<meta name="viewport" content="width=device-width, initial-scale=1.0">` — Makes your page responsive on mobile devices.
- `<title>` — Sets the text that appears in the browser tab.

## The `<body>` Section

The `<body>` contains everything visible on the page — headings, paragraphs, images, links, and more.

```html
<body>
    <h1>Welcome to My Website</h1>
    <p>This is my first web page, built completely from scratch!</p>
</body>
```

## Building the Complete Page

Let's put it all together into a complete, working HTML file.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A simple web page built from scratch with HTML">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>I just built my first web page using only HTML.</p>
    <a href="https://example.com">Visit Example</a>
</body>
</html>
```

Save this as `index.html` and open it in your browser. You'll see your very first web page. It's simple, but it's the foundation for everything else in web development.

## Common HTML Elements

Here's a quick reference of elements you'll use often:

| Element | Purpose |
|---------|---------|
| `<h1>` to `<h6>` | Headings (h1 is the largest) |
| `<p>` | Paragraph |
| `<a>` | Hyperlink |
| `<img>` | Image |
| `<ul>`, `<ol>`, `<li>` | Lists |
| `<div>` | Generic container |
| `<span>` | Inline container |

> 💡 **Tip:** Every HTML document needs a DOCTYPE, html, head, and body tag. Get this structure memorized — you'll write it dozens of times a day. Save a snippet in your editor so you never have to type it manually.
