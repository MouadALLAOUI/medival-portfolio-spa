# MS Excel 5: Advanced Functions

You've mastered the basics — now it's time for the functions that separate power users from everyone else. These advanced functions handle lookups, conditional sums, and complex logic.

## VLOOKUP

VLOOKUP searches for a value in the first column of a table and returns a value from another column. It's the most-used lookup function in Excel.

```excel
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

```excel
=VLOOKUP("Alice", A2:C10, 3, FALSE)
```

The last argument is crucial: `FALSE` means exact match, `TRUE` means approximate match (requires sorted data).

## HLOOKUP

HLOOKUP works the same way as VLOOKUP but searches horizontally across rows instead of vertically down columns.

```excel
=HLOOKUP("January", A1:M2, 2, FALSE)
```

It's less common than VLOOKUP, but useful when your data is organized horizontally.

## INDEX/MATCH — The Better VLOOKUP

INDEX/MATCH is more flexible and powerful than VLOOKUP. It can look left, right, or anywhere.

```excel
=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
```

```excel
=INDEX(C2:C10, MATCH("Alice", A2:A10, 0))
```

MATCH finds the row position, INDEX retrieves the value. Once you get comfortable with this combo, you'll rarely need VLOOKUP again.

## Nested IF

When you need multiple conditions, nest IF functions:

```excel
=IF(A1>=90, "A", IF(A1>=80, "B", IF(A1>=70, "C", "F")))
```

It works, but gets messy fast. For complex conditions, consider SWITCH (Excel 2019+) or combining IF with AND/OR.

## COUNTIF and COUNTIFS

Count cells that meet a condition:

```excel
=COUNTIF(A1:A10, ">50")
=COUNTIFS(A1:A10, ">50", B1:B10, "Yes")
```

COUNTIFS lets you add multiple criteria across different ranges. It's perfect for filtering summaries.

## SUMIF and SUMIFS

Add up values based on conditions:

```excel
=SUMIF(A1:A10, "East", B1:B10)
=SUMIFS(C1:C10, A1:A10, "East", B1:B10, ">100")
```

SUMIFS is more flexible — the sum range comes first, followed by criteria range and criteria pairs.

## Data Validation

Data validation restricts what users can enter in a cell. Go to **Data** → **Data Validation** to set rules:

- Whole numbers within a range
- List of allowed values
- Date ranges
- Custom formulas

This prevents bad data from entering your spreadsheet in the first place.

> 💡 Tip: Use INDEX/MATCH instead of VLOOKUP whenever possible. It's faster on large datasets, more flexible, and won't break when you insert or delete columns.
