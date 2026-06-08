# MS Excel 4: Pivot Tables

If formulas are Excel's engine, pivot tables are its turbo boost. They let you summarize thousands of rows of data in seconds — no formulas required.

## What Is a Pivot Table?

A pivot table takes a big, messy dataset and reorganizes it into a summary. Instead of manually counting, sorting, or totaling, you just drag fields around and Excel does the heavy lifting.

Think of it as a dynamic report that you can rearrange on the fly.

## Creating Your First Pivot Table

1. Make sure your data has headers and no empty rows
2. Click anywhere in the data
3. Go to **Insert** → **PivotTable**
4. Confirm the data range and choose where to place it (new sheet is fine)
5. Click OK

You'll see the PivotTable Fields pane on the right — this is your control center.

## Rows, Columns, Values, and Filters

The four areas in the Fields pane each do something different:

- **Rows** — what you're grouping by (e.g., product names)
- **Columns** — another dimension to split by (e.g., months)
- **Values** — the numbers you're summing, counting, or averaging
- **Filters** — quick ways to narrow down the data

Drag a field into any area and watch the table update instantly.

## Filtering and Sorting

Click the dropdown arrows on row or column labels to filter. You can also use the **Filter** area to create global filters that apply to the whole pivot table.

Sorting is built in — just right-click any value and choose Sort.

## Grouping Data

Got dates? Right-click a date field and select **Group** to collapse them into months, quarters, or years. Got numbers? Group them into ranges like 0-10, 11-20, and so on.

This turns raw granular data into meaningful chunks.

## Refreshing Your Pivot Table

If your source data changes, your pivot table won't update automatically. Right-click the pivot table and select **Refresh** to pull in the latest numbers.

> 💡 Tip: Always format your source data as an Excel Table (Ctrl+T) before creating a pivot table. That way, new data added to the table is automatically included when you refresh.
