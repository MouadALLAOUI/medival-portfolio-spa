# Google Sheets: Collaboration and Basics

Google Sheets is the free, cloud-based spreadsheet that lives in your browser. It's not as powerful as Excel, but its collaboration features are unmatched.

## What Is Google Sheets?

It's part of Google Workspace (formerly G Suite). You create, edit, and share spreadsheets online — no software installation needed. Everything saves automatically to Google Drive.

If you've used Excel, the interface will feel familiar. The basics work the same way.

## Sharing and Collaboration

This is where Google Sheets shines. Click the **Share** button and enter email addresses to give people access. You can set permissions:

- **Viewer** — can only look
- **Commenter** — can leave comments
- **Editor** — can make changes

Multiple people can edit the same sheet simultaneously. You'll see their cursors moving in real time, each highlighted in a different color.

## Real-Time Collaboration

Changes appear instantly for everyone. No more emailing files back and forth or wondering which version is the latest.

The **Version History** (File → Version History) tracks every change and lets you revert to any previous version.

## Basic Formulas

Google Sheets supports most of the same functions as Excel:

```excel
=SUM(A1:A10)
=AVERAGE(B1:B5)
=COUNT(C1:C20)
=IF(A1>60, "Pass", "Fail")
```

The syntax is identical, so your Excel skills transfer directly.

## Differences from Excel

A few things work differently:
- No pivot tables (though there are workarounds)
- Fewer advanced charting options
- Add-ons replace some built-in Excel features
- Formulas can reference other Sheets tabs using `Sheet1!A1`

Google Sheets is simpler, but for most everyday tasks, it's more than enough.

## Add-ons and Extensions

The Google Workspace Marketplace has add-ons that extend Sheets with features like mail merge, advanced charts, and data cleaning tools. Browse it from the **Extensions** menu.

> 💡 Tip: Use the `IMPORTRANGE` function to pull data from one Google Sheet into another. It's like linking workbooks, but across different files entirely.
