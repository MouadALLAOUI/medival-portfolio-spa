# VS Code: Essential Extensions and Shortcuts

Visual Studio Code is the most popular code editor among web developers. It's free, fast, and packed with features. With the right extensions and shortcuts, you can write code much faster and more efficiently.

## Why VS Code?

VS Code is a lightweight but powerful source code editor. It supports hundreds of programming languages, has an integrated terminal, built-in Git support, and a massive extension marketplace.

## Essential Extensions

Install extensions from the Extensions panel (Ctrl+Shift+X).

### Live Server

Launch a local development server with live reload.

```bash
# Install via command palette
ext install ritwickdey.LiveServer
```

Right-click an HTML file and select **Open with Live Server**. Changes reload automatically.

### Prettier

Auto-format your code to keep it consistent.

```bash
ext install esbenp.prettier-vscode
```

Enable "Format on Save" in settings for automatic formatting.

### ESLint

Catch errors and enforce code quality in JavaScript.

```bash
ext install dbaeumer.vscode-eslint
```

### GitLens

See who last modified each line, view commit history inline, and more.

```bash
ext install eamodio.gitlens
```

### Auto Rename Tag

When you rename an HTML tag, it automatically renames the closing tag.

```bash
ext install formulahendry.auto-rename-tag
```

### Path Intellisense

Auto-completes file paths when you type imports or links.

```bash
ext install christian-kohler.path-intellisense
```

### Color Highlight

Highlights color values in your CSS and HTML.

```bash
ext install naumovs.color-highlight
```

### HTML CSS Support

Auto-completes CSS class names from your stylesheets.

```bash
ext install ecmel.vscode-html-css
```

## Essential Keyboard Shortcuts

Master these shortcuts to speed up your workflow.

### Navigation

| Shortcut | Action |
|----------|--------|
| Ctrl+P | Quick file open |
| Ctrl+Shift+P | Command palette |
| Ctrl+G | Go to line number |
| Ctrl+Tab | Switch between open files |
| Ctrl+B | Toggle sidebar |
| Ctrl+\\ | Split editor |

### Editing

| Shortcut | Action |
|----------|--------|
| Ctrl+D | Select next occurrence |
| Ctrl+Shift+K | Delete line |
| Alt+Up/Down | Move line up/down |
| Shift+Alt+Up/Down | Copy line up/down |
| Ctrl+/ | Toggle line comment |
| Shift+Alt+F | Format document |

### Search and Replace

| Shortcut | Action |
|----------|--------|
| Ctrl+F | Find in file |
| Ctrl+H | Find and replace |
| Ctrl+Shift+F | Find in all files |

### Multi-Cursor

Hold Alt and click to add multiple cursors. Edit multiple lines at once.

| Shortcut | Action |
|----------|--------|
| Alt+Click | Add cursor |
| Ctrl+Alt+Up/Down | Add cursor above/below |
| Ctrl+Shift+L | Select all occurrences |

## Useful Settings

Open settings with Ctrl+, and customize these:

```json
{
    "editor.fontSize": 14,
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
    "editor.minimap.enabled": false,
    "editor.wordWrap": "on",
    "editor.bracketPairColorization.enabled": true,
    "editor.guides.bracketPairs": true,
    "workbench.colorTheme": "One Dark Pro",
    "emmet.includeLanguages": {
        "javascript": "javascriptreact"
    }
}
```

## Integrated Terminal

Open a terminal with Ctrl+`.

```bash
# Run commands without leaving VS Code
npm install
git status
node server.js
```

You can split terminals and have multiple running at once.

## Emmet Shortcuts

VS Code has built-in Emmet support for HTML and CSS.

```html
# Type and press Tab:
div.card>h2+p        → <div class="card"><h2></h2><p></p></div>
ul>li*5              → <ul><li></li></ul> (5 items)
#header              → <div id="header"></div>
.box                 → <div class="box"></div>
```

## Snippets

Create custom snippets for repeated code.

```json
// settings.json - User Snippets
{
    "html.fragment": {
        "prefix": "html5",
        "body": [
            "<!DOCTYPE html>",
            "<html lang=\"en\">",
            "<head>",
            "    <meta charset=\"UTF-8\">",
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
            "    <title>$1</title>",
            "</head>",
            "<body>",
            "    $0",
            "</body>",
            "</html>"
        ]
    }
}
```

Type `html5` and press Tab to expand the snippet.

## Tips for Productivity

- Use Ctrl+P to quickly find files instead of browsing the sidebar.
- The Command Palette (Ctrl+Shift+P) has every command — search for what you need.
- Split your editor (Ctrl+\\) to view files side by side.
- Use Zen Mode (Ctrl+K Z) for distraction-free coding.

> 💡 **Tip:** Learn 3-5 shortcuts this week and use them until they're muscle memory. Start with Ctrl+P (quick open), Ctrl+Shift+P (command palette), and Ctrl+D (select next occurrence). These three alone will save you hours.
