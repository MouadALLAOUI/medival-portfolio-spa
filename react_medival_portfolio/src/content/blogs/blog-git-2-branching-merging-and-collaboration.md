# Git 2: Branching, Merging, and Collaboration

Branches let you work on different features or fixes independently without affecting the main code. They're the backbone of collaborative development — everyone can work on their own branch and merge changes together.

## What is a Branch?

A branch is a separate line of development. The default branch is usually called `main` (or `master`). When you create a branch, you get a copy of the project that you can modify independently.

```
main:    A --- B --- C
                   \
feature:            D --- E
```

Changes on the feature branch don't affect main until you merge them.

## Creating and Switching Branches

```bash
git branch feature-login    # Create a new branch
git checkout feature-login  # Switch to it
git checkout -b feature-login  # Create and switch in one command
```

On newer Git versions, you can also use:

```bash
git switch feature-login      # Switch
git switch -c feature-login   # Create and switch
```

## Viewing Branches

```bash
git branch              # List local branches
git branch -a           # List all branches (local + remote)
git branch -v           # Show branches with last commit
```

The current branch has an asterisk next to it.

## Working on a Branch

Work exactly the same way — make changes, stage, and commit.

```bash
# While on feature-login
echo "login form code" > login.html
git add .
git commit -m "Add login form"
```

These commits only exist on the `feature-login` branch. Main stays unchanged.

## Merging Branches

When your feature is complete, merge it back into main.

```bash
git checkout main        # Switch to the branch you want to merge into
git merge feature-login  # Merge the feature branch
```

This combines the changes from `feature-login` into `main`.

## Fast-Forward Merge

If main hasn't changed since you created the branch, Git performs a fast-forward merge — it simply moves the main pointer forward.

```
Before:  main: A --- B
                      \
feature:               C --- D

After:   main: A --- B --- C --- D
```

## Three-Way Merge

If both branches have new commits, Git creates a merge commit that combines both histories.

```
Before:  main:    A --- B --- C
                          \
feature:           D --- E

After:   main:    A --- B --- C --- F (merge commit)
                          \       /
feature:           D --- E
```

## Merge Conflicts

Sometimes Git can't automatically merge changes — when two branches modify the same line in the same file.

```bash
git merge feature-login
# Auto-merging index.html
# CONFLICT (content): Merge conflict in index.html
# Automatic merge failed; fix conflicts and then commit the result.
```

Git marks the conflicting sections in the file.

```
<<<<<<< HEAD
<p>Welcome back!</p>
=======
<p>Hello, visitor!</p>
>>>>>>> feature-login
```

- Everything between `<<<<<<< HEAD` and `=======` is your current branch.
- Everything between `=======` and `>>>>>>> feature-login` is the incoming branch.

Fix the conflict, remove the markers, and commit.

```bash
# After fixing conflicts
git add .
git commit -m "Resolve merge conflict in index.html"
```

## Pushing to a Remote Repository

Share your code by pushing to a remote repository like GitHub.

```bash
git remote add origin https://github.com/user/repo.git
git push -u origin main
git push origin feature-login
```

The `-u` flag sets the upstream branch, so future pushes are just `git push`.

## Pulling from a Remote

Get the latest changes from the remote repository.

```bash
git pull origin main
```

This fetches and merges remote changes into your current branch.

## Collaborative Workflow

A typical team workflow:

```bash
# 1. Start with latest main
git checkout main
git pull origin main

# 2. Create a feature branch
git checkout -b feature-dashboard

# 3. Work on your feature
# ... make changes ...
git add .
git commit -m "Add dashboard component"

# 4. Push your branch
git push origin feature-dashboard

# 5. Create a Pull Request on GitHub

# 6. After review, merge on GitHub or locally

# 7. Switch back to main and pull
git checkout main
git pull origin main

# 8. Delete the merged branch
git branch -d feature-dashboard
```

## Deleting Branches

```bash
git branch -d feature-login    # Delete local branch (safe)
git branch -D feature-login    # Force delete local branch
git push origin --delete feature-login  # Delete remote branch
```

> 💡 **Tip:** Always pull the latest changes before starting work on a branch. Create feature branches from `main` to keep your work isolated. Delete branches after merging to keep your repository tidy.
