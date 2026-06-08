# CSS 2: Flexbox — The Complete Guide

Flexbox is a one-dimensional layout system that makes it easy to align and distribute space among items in a container. Whether you need to center content, build a navigation bar, or create a card grid, Flexbox is the tool for the job.

## Enabling Flexbox

To use Flexbox, set `display: flex` on a container element.

```css
.container {
    display: flex;
}
```

All direct children of this container become flex items and will lay out according to Flexbox rules.

## The Main Axis vs Cross Axis

Flexbox works on two axes:
- **Main axis** — The primary direction of layout (horizontal by default).
- **Cross axis** — Perpendicular to the main axis (vertical by default).

The `flex-direction` property controls which axis is the main axis.

## flex-direction

```css
.container {
    display: flex;
    flex-direction: row;           /* Left to right (default) */
    flex-direction: row-reverse;   /* Right to left */
    flex-direction: column;        /* Top to bottom */
    flex-direction: column-reverse; /* Bottom to top */
}
```

Changing `flex-direction` swaps the main and cross axes, so `justify-content` and `align-items` work differently based on this setting.

## justify-content

This property aligns items along the main axis.

```css
.container {
    display: flex;
    justify-content: flex-start;      /* Items at the start */
    justify-content: flex-end;        /* Items at the end */
    justify-content: center;          /* Items centered */
    justify-content: space-between;   /* Equal space between items */
    justify-content: space-around;    /* Equal space around items */
    justify-content: space-evenly;    /* Truly equal spacing */
}
```

## align-items

This property aligns items along the cross axis.

```css
.container {
    display: flex;
    align-items: flex-start;   /* Items align to top */
    align-items: flex-end;     /* Items align to bottom */
    align-items: center;       /* Items centered vertically */
    align-items: stretch;      /* Items stretch to fill (default) */
    align-items: baseline;     /* Items align by text baseline */
}
```

## Centering with Flexbox

The classic centering problem is solved in two lines.

```css
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

This centers the child both horizontally and vertically. No more wrestling with margins and floats.

## flex-wrap

By default, flex items try to fit on one line. Use `flex-wrap` to allow wrapping.

```css
.container {
    display: flex;
    flex-wrap: wrap;    /* Items wrap to the next line */
}
```

This is essential for responsive layouts where items need to reflow on smaller screens.

## gap

The `gap` property adds space between flex items without needing margins.

```css
.container {
    display: flex;
    gap: 16px;          /* 16px space between all items */
    gap: 16px 24px;     /* 16px row gap, 24px column gap */
}
```

Gap is cleaner than margins because it doesn't add extra space at the edges.

## flex Property on Items

Individual flex items can grow, shrink, and set their own basis.

```css
.item {
    flex-grow: 1;    /* Item grows to fill available space */
    flex-shrink: 0;  /* Item won't shrink */
    flex-basis: 200px; /* Starting size before growing/shrinking */
}

/* Shorthand */
.item {
    flex: 1;        /* Grow equally with siblings */
    flex: 0 0 200px; /* Fixed size, no growing or shrinking */
}
```

## Practical Examples

**Navigation Bar**

```css
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.nav-links {
    display: flex;
    gap: 24px;
}
```

**Card Grid**

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}

.card {
    flex: 1 1 300px;
}
```

**Footer Layout**

```css
.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

> 💡 **Tip:** Start with `display: flex` and `justify-content: center` + `align-items: center` when you need to center something. For most layouts, Flexbox is all you need. Only reach for CSS Grid when you need two-dimensional control.
