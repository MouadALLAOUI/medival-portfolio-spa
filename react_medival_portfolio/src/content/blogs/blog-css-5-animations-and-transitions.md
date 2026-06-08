# CSS 5: Animations and Transitions

Animations and transitions make your website feel alive. Transitions smoothly change properties when a state changes (like hovering). Animations run sequences of changes over time, like loading spinners or entrance effects.

## CSS Transitions

Transitions animate the change between two states. They require a trigger (like hover or class change) and a duration.

```css
.button {
    background-color: #007bff;
    color: white;
    padding: 12px 24px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #0056b3;
}
```

When you hover over the button, the background color fades smoothly over 0.3 seconds.

## Transition Properties

You can transition multiple properties and customize timing.

```css
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

- `transform` — Moves, scales, or rotates the element.
- `box-shadow` — Adds a shadow on hover.
- `0.3s` — Duration of the transition.
- `ease` — Timing function (starts slow, speeds up, then slows down).

## Transition Timing Functions

Control the speed curve of transitions.

```css
.element {
    transition: all 0.3s linear;      /* Constant speed */
    transition: all 0.3s ease;        /* Slow-fast-slow (default) */
    transition: all 0.3s ease-in;     /* Starts slow */
    transition: all 0.3s ease-out;    /* Ends slow */
    transition: all 0.3s ease-in-out; /* Slow start and end */
}
```

## The transform Property

Transform moves, scales, rotates, and skews elements without affecting layout.

```css
.element {
    transform: translateX(20px);     /* Move right 20px */
    transform: translateY(-10px);    /* Move up 10px */
    transform: scale(1.1);           /* Scale up 10% */
    transform: scale(0.95);          /* Scale down 5% */
    transform: rotate(45deg);        /* Rotate 45 degrees */
    transform: skewX(5deg);          /* Skew horizontally */
}
```

## Keyframe Animations

For more complex sequences, use `@keyframes` to define animation steps.

```css
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.element {
    animation: fadeIn 0.5s ease forwards;
}
```

The `forwards` keyword keeps the element in its final state after the animation ends.

## Animation Properties

Control how animations run.

```css
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.card {
    animation: slideUp 0.6s ease forwards;
    animation-delay: 0.2s;          /* Delay before starting */
    animation-iteration-count: 1;   /* Run once */
    animation-direction: normal;    /* Play forward */
}

/* Shorthand */
.card {
    animation: slideUp 0.6s ease 0.2s 1 normal forwards;
}
```

## Hover Effects

Common hover effects that improve user experience.

```css
.link {
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease;
}

.link:hover {
    color: #0056b3;
    text-decoration: underline;
}

/* Scale on hover */
.image {
    transition: transform 0.3s ease;
}

.image:hover {
    transform: scale(1.05);
}

/* Color shift */
.nav-link {
    position: relative;
    transition: color 0.2s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: #007bff;
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}
```

## Loading Animations

Create a simple spinning loader with CSS.

```css
@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
```

## Pulse Animation

```css
@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    50% {
        transform: scale(1.05);
        opacity: 0.8;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

.button {
    animation: pulse 2s ease-in-out infinite;
}
```

## Respecting User Preferences

Some users prefer reduced motion. Respect this setting.

```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

This is an important accessibility consideration.

> 💡 **Tip:** Keep transitions under 300ms for a snappy feel. Longer animations should feel intentional (like page transitions). Always test with `prefers-reduced-motion` — some users get motion sickness from animations.
