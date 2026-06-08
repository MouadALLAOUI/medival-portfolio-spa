# Terminal/Command Line: Basic Commands Every Developer Should Know

The terminal (or command line) is where developers spend a lot of time. While you can do most things through a graphical interface, the terminal is faster, more powerful, and essential for running scripts, managing servers, and using tools like Git.

## Opening the Terminal

- **Windows:** Search for "PowerShell" or "Command Prompt" in the Start menu.
- **Mac:** Search for "Terminal" in Spotlight.
- **Linux:** Ctrl+Alt+T (on most distributions).

In VS Code, press Ctrl+` to open the integrated terminal.

## Navigating the File System

Move between directories using `cd` (change directory).

```bash
cd foldername          # Enter a folder
cd ..                  # Go up one level
cd ../..               # Go up two levels
cd ~                   # Go to home directory
cd /                   # Go to root directory
cd C:/Users/name       # Go to an absolute path
```

## Listing Files

See what's in the current directory.

```bash
ls                     # List files (Mac/Linux)
dir                    # List files (Windows)
ls -la                 # List all files including hidden ones
```

## Creating Files and Directories

```bash
mkdir my-folder        # Create a new directory
touch index.html       # Create a new empty file (Mac/Linux)
New-Item -ItemType File -Name index.html  # Windows PowerShell
```

## Copying and Moving

```bash
cp file.txt backup.txt           # Copy a file (Mac/Linux)
Copy-Item file.txt backup.txt    # Copy (Windows PowerShell)

mv old.txt new.txt               # Rename a file (Mac/Linux)
Move-Item old.txt new.txt        # Rename (Windows)

mv file.txt ../backup/           # Move a file (Mac/Linux)
Move-Item file.txt ../backup/    # Move (Windows)
```

## Deleting Files and Directories

```bash
rm file.txt                      # Delete a file (Mac/Linux)
Remove-Item file.txt             # Delete (Windows)

rm -rf folder-name               # Delete folder and contents (Mac/Linux)
Remove-Item -Recurse folder-name # Delete folder (Windows)
```

**Be careful with delete commands** — there's no undo. Double-check before running.

## Viewing File Contents

```bash
cat file.txt                     # Display file contents (Mac/Linux)
Get-Content file.txt             # Display (Windows)
type file.txt                    # Display (Windows Command Prompt)

cat file.txt | head -10          # First 10 lines
cat file.txt | tail -10          # Last 10 lines
cat file.txt | less              # Paginated view
```

## Searching in Files

```bash
grep "search term" file.txt      # Search for text in a file
grep -r "search term" .          # Search recursively in all files
Select-String "search" file.txt  # Windows PowerShell
```

## Environment and System Info

```bash
pwd                              # Print working directory (Mac/Linux)
echo %CD%                        # Current directory (Windows CMD)
$PWD                             # Current directory (Windows PowerShell)

whoami                           # Current user
echo $PATH                       # Show PATH variable
```

## Running Programs

```bash
node script.js                   # Run a JavaScript file
python app.py                    # Run a Python file
npm start                        # Start an npm project
git status                       # Run a Git command
```

## Command Chaining

```bash
cmd1 && cmd2                     # Run cmd2 only if cmd1 succeeds
cmd1 ; cmd2                      # Run both regardless of success
cmd1 | cmd2                      # Pipe output of cmd1 into cmd2
```

## Clearing the Screen

```bash
clear                            # Clear terminal (Mac/Linux)
cls                              # Clear terminal (Windows)
```

## Windows PowerShell Specifics

PowerShell uses different commands than Unix-based systems.

```bash
# Directory listing
Get-ChildItem                    # List files
Get-ChildItem -Force             # Include hidden files

# File operations
New-Item -ItemType Directory -Name "new-folder"
Copy-Item -Path "source" -Destination "dest"
Remove-Item -Path "file.txt" -Force

# Reading files
Get-Content "file.txt"
Get-Content "file.txt" | Select-Object -First 5

# Finding files
Get-ChildItem -Recurse -Filter "*.js"
```

## Essential Commands Cheat Sheet

| Task | Mac/Linux | Windows |
|------|-----------|---------|
| List files | `ls` | `dir` |
| Change directory | `cd` | `cd` |
| Make directory | `mkdir` | `mkdir` |
| Create file | `touch` | `New-Item` |
| Copy file | `cp` | `Copy-Item` |
| Move/rename | `mv` | `Move-Item` |
| Delete file | `rm` | `Remove-Item` |
| View file | `cat` | `Get-Content` |
| Search text | `grep` | `Select-String` |
| Clear screen | `clear` | `cls` |

> 💡 **Tip:** You don't need to memorize every command. Learn the basics: `cd`, `ls`/`dir`, `mkdir`, `touch`/`New-Item`, and `git`. As you need more commands, look them up. The terminal gets easier with practice.
