# HTML 3: Semantic HTML and Accessibility

Semantic HTML means using elements that describe the meaning of content, not just how it looks. Instead of wrapping everything in `<div>` tags, you use `<header>`, `<nav>`, `<main>`, and others that tell the browser and assistive technologies what each section represents.

## Why Semantics Matter

When a screen reader encounters a `<header>` element, it knows that's the page header. When it sees a `<nav>`, it announces "navigation." Without semantic elements, everything is just a generic `<div>` — and assistive technologies can't distinguish between a header and a paragraph.

```html
<!-- Non-semantic -->
<div class="header">...</div>
<div class="nav">...</div>

<!-- Semantic -->
<header>...</header>
<nav>...</nav>
```

Semantic HTML also helps search engines understand your content structure, which improves SEO.

## The `<header>` Element

The `<header>` represents introductory content or navigation aids. It's typically used at the top of a page or section.

```html
<header>
    <h1>My Website</h1>
    <p>Welcome to my corner of the internet</p>
</header>
```

## The `<nav>` Element

The `<nav>` element contains major navigation links. Not every group of links needs a `<nav>` — use it for primary navigation sections.

```html
<nav>
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
    </ul>
</nav>
```

## The `<main>` Element

The `<main>` element wraps the dominant content of the `<body>`. There should only be one `<main>` per page, and it should not be nested inside other semantic elements.

```html
<main>
    <article>
        <h2>Article Title</h2>
        <p>Article content goes here...</p>
    </article>
</main>
```

## The `<article>` Element

Use `<article>` for self-contained content that could be distributed independently — blog posts, news articles, forum posts, or comments.

```html
<article>
    <h2>Understanding Semantic HTML</h2>
    <p>Semantic HTML makes your pages more accessible...</p>
</article>
```

## The `<section>` Element

A `<section>` groups related content with a thematic purpose. It's more generic than `<article>` and is used to divide content into meaningful groups.

```html
<section>
    <h2>Our Services</h2>
    <p>We offer web design, development, and consulting.</p>
</section>
```

## The `<aside>` Element

The `<aside>` is for tangentially related content — sidebars, pull quotes, or advertising. Content that's related but not essential to the main flow.

```html
<aside>
    <h3>Related Articles</h3>
    <ul>
        <li><a href="#">CSS Basics</a></li>
        <li><a href="#">JavaScript 101</a></li>
    </ul>
</aside>
```

## The `<footer>` Element

The `<footer>` represents the footer of a section or page. It typically contains copyright information, contact details, or related links.

```html
<footer>
    <p>&copy; 2026 My Website. All rights reserved.</p>
</footer>
```

## ARIA Attributes

ARIA (Accessible Rich Internet Applications) attributes enhance accessibility when semantic HTML alone isn't enough. They provide additional information to assistive technologies.

```html
<button aria-label="Close menu">X</button>

<div role="alert">Your form has been submitted!</div>

<nav aria-label="Main navigation">
    <!-- navigation links -->
</nav>
```

Common ARIA attributes include `aria-label`, `aria-hidden`, `aria-describedby`, and `role`.

## Complete Semantic Page Layout

Here's how a full page looks with semantic structure.

```html
<body>
    <header>
        <h1>My Website</h1>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/blog">Blog</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Post Title</h2>
            <p>Post content...</p>
        </article>

        <aside>
            <h3>Related</h3>
            <ul>
                <li><a href="#">Other Post</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 My Website</p>
    </footer>
</body>
```

> 💡 **Tip:** Start with semantic HTML and only reach for `<div>` when no other element fits. Screen readers, search engines, and future developers (including yourself) will thank you. Run your page through an accessibility checker like Lighthouse to see if you're using semantics correctly.
