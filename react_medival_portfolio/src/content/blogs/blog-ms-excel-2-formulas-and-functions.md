# MS Excel 2: Formulas and Functions

Welcome back to our Excel series! Now that you know your way around the spreadsheet, it's time to unlock the real power of Excel — formulas and functions. This is where the magic happens.

## Basic Arithmetic Formulas

At its core, Excel is a giant calculator. You can type formulas directly into cells, always starting with an equals sign `=`.

```excel
=A1+B1
=A1-B1
=A1*B1
=A1/B1
```

You can also use parentheses to control the order of operations, just like in math class.

## Essential Functions

Excel has hundreds of built-in functions. Here are the ones you'll use every day:

- **SUM** — adds up a range of numbers
- **AVERAGE** — calculates the mean
- **COUNT** — counts cells with numbers
- **MIN** — finds the smallest value
- **MAX** — finds the largest value

```excel
=SUM(A1:A10)
=AVERAGE(B1:B5)
=COUNT(C1:C20)
```

## The IF Function

The IF function lets you make decisions in your formulas. It checks a condition and returns one value if true, another if false.

```excel
=IF(A1>60, "Pass", "Fail")
```

You can also nest IF functions to handle multiple conditions, though it gets messy fast. We'll cover cleaner alternatives like VLOOKUP later.

## Cell References: Absolute vs Relative

When you copy a formula down a column, Excel adjusts the cell references automatically. This is called **relative referencing**.

- **Relative** (`A1`) — changes when copied
- **Absolute** (`$A$1`) — stays locked on that cell
- **Mixed** (`$A1` or `A$1`) — locks just the row or column

This is critical when you're working with tax rates, percentages, or any fixed value that should stay the same across rows.

## Tips for Writing Formulas

Always start with `=`. Use your mouse to click cells instead of typing references manually — it's faster and less error-prone. And don't be afraid to use the **Insert Function** dialog (the `fx` button) when you're exploring new functions.

> 💡 Tip: Press F2 to edit a cell and see which cells your formula references highlighted in color. It's the fastest way to debug a broken formula.
