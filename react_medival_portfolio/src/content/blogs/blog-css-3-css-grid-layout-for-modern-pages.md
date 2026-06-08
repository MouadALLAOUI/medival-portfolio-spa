# CSS 3: CSS Grid Layout for Modern Pages

CSS Grid is a two-dimensional layout system that lets you control both rows and columns simultaneously. While Flexbox handles one dimension at a time, Grid is perfect for building complex page layouts, dashboards, and anything that needs precise row-and-column control.

## Enabling Grid

To use Grid, set `display: grid` on a container element.

```css
.container {
    display: grid;
}
```

Direct children become grid items, but nothing changes yet until you define columns or rows.

## Defining Columns and Rows

Use `grid-template-columns` and `grid-template-rows` to create your grid structure.

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: auto 1fr auto;
}
```

This creates a three-column layout where the first column is 200 pixels wide, and the remaining two share available space equally. The rows are sized by content, fill available space, and auto-size at the bottom.

## The fr Unit

The `fr` unit distributes available space proportionally.

```css
.container {
    grid-template-columns: 1fr 2fr;  /* Second column gets twice as much space */
    grid-template-columns: 1fr 1fr 1fr; /* Three equal columns */
}
```

## The repeat() Function

Avoid repeating the same value by using `repeat()`.

```css
.container {
    grid-template-columns: repeat(3, 1fr);  /* Three equal columns */
    grid-template-columns: repeat(4, 1fr);  /* Four equal columns */
}
```

## Gap

Just like Flexbox, Grid has a `gap` property for spacing between items.

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;           /* Space between rows and columns */
    row-gap: 16px;       /* Space between rows only */
    column-gap: 24px;    /* Space between columns only */
}
```

## Grid Areas

You can name areas of your grid and place items into named sections. This makes layouts readable and easy to modify.

```css
.container {
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    gap: 16px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }
```

The layout pattern is visual in the CSS itself — you can see the page structure at a glance.

## Spanning Multiple Cells

Items can span multiple columns or rows using `grid-column` and `grid-row`.

```css
.hero {
    grid-column: 1 / 3;    /* Spans from column line 1 to line 3 (2 columns) */
    grid-row: 1 / 2;
}

.sidebar {
    grid-column: 1 / 2;
    grid-row: 2 / 4;      /* Spans 2 rows */
}
```

## Responsive Grids with auto-fill and auto-fit

Create responsive grids that adapt to screen size without media queries.

```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
}
```

- `auto-fill` creates as many columns as fit.
- `auto-fit` does the same but collapses empty tracks.
- `minmax(250px, 1fr)` ensures columns are at least 250px wide.

## Common Page Layout with Grid

Here's a complete responsive page layout.

```css
body {
    margin: 0;
    font-family: Arial, sans-serif;
}

.page {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav    main   aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

header    { grid-area: header; }
nav       { grid-area: nav; }
main      { grid-area: main; }
aside     { grid-area: aside; }
footer    { grid-area: footer; }
```

## Grid vs Flexbox

| Feature | Grid | Flexbox |
|---------|------|---------|
| Dimensions | 2D (rows + columns) | 1D (row OR column) |
| Best for | Page layouts, dashboards | Component layouts, navbars |
| Alignment | Complex multi-axis | Simple main/cross axis |

Use Grid for the page, Flexbox for the components inside it.

> 💡 **Tip:** Use CSS Grid for page-level layouts and Flexbox for individual component layouts. They work great together — a Grid-based page with Flexbox-based navigation and cards is a winning combination.
