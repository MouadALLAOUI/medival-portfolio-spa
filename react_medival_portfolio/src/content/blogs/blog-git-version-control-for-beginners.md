# Git: Version Control for Beginners

Git is a version control system that tracks changes to your code over time. It lets you save snapshots of your project, go back to previous versions, and collaborate with others. If you write code, you need Git.

## What is Version Control?

Version control keeps a history of every change made to your project. Instead of saving files as `project_v1.py`, `project_v2_final.py`, `project_v2_final_REALLY.py`, Git manages all versions for you in a hidden `.git` folder.

With Git, you can:
- See what changed, when, and by whom
- Revert to any previous version
- Work on features without affecting the main code
- Merge changes from multiple people

## Installing Git

Download Git from [git-scm.com](https://git-scm.com). After installation, verify it's working.

```bash
git --version
```

You should see something like `git version 2.43.0`.

## Setting Up Git

Configure your identity — this information is attached to every commit you make.

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Initializing a Repository

Turn any folder into a Git repository.

```bash
cd my-project
git init
```

This creates a `.git` directory. Your folder is now tracked by Git.

## Checking Status

See what's changed in your project.

```bash
git status
```

This shows you which files are modified, which are new, and which are ready to be committed.

## Staging Files

Before committing, you tell Git which changes to include.

```bash
git add filename.txt        # Stage a specific file
git add .                   # Stage all changes
git add *.js                # Stage all JS files
```

Staging lets you commit only related changes together, keeping your history clean.

## Committing Changes

Save a snapshot of your staged changes.

```bash
git commit -m "Add user authentication"
```

The `-m` flag lets you write a commit message directly. Good commit messages describe what changed and why.

## Viewing History

See the commit history of your project.

```bash
git log                    # Full log
git log --oneline          # Compact one-line log
git log --oneline -10      # Last 10 commits
```

Each commit shows a unique hash, author, date, and message.

## The .gitignore File

Tell Git to ignore files it shouldn't track.

```
# .gitignore
node_modules/
.env
*.log
dist/
.DS_Store
```

Create this file in your project root. Common things to ignore:
- `node_modules/` (dependencies)
- `.env` (secrets)
- Build output (`dist/`, `build/`)
- OS files (`.DS_Store`, `Thumbs.db`)

## A Basic Workflow

Here's the standard Git workflow.

```bash
# 1. Make changes to your files
# 2. Check what changed
git status

# 3. Stage the changes
git add .

# 4. Commit with a message
git commit -m "Add new feature"

# 5. Repeat
```

## Viewing Differences

See what changed in your files.

```bash
git diff                  # Changes not yet staged
git diff --staged         # Changes staged for commit
git diff HEAD             # All changes since last commit
```

## Undoing Changes

Mistakes happen. Git lets you undo them.

```bash
git checkout -- filename.txt    # Discard changes to a file
git reset HEAD filename.txt     # Unstage a file
git commit --amend              # Change the last commit message
```

## A Complete First Project

```bash
# Create project and initialize Git
mkdir my-website
cd my-website
git init

# Create files
echo "# My Website" > README.md

# Stage and commit
git add .
git commit -m "Initial commit: add README"

# Make more changes
echo "<h1>Hello</h1>" > index.html

# Stage and commit
git add .
git commit -m "Add homepage HTML"

# Check history
git log --oneline
```

> 💡 **Tip:** Commit early and often. Small, focused commits with clear messages are easier to understand and revert than large ones. Write commit messages like "Add login form" or "Fix navigation bug" — not "update" or "changes."
