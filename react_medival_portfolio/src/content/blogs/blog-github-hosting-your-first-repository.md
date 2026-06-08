# GitHub: Hosting Your First Repository

GitHub is a platform for hosting Git repositories online. It adds collaboration features like pull requests, issues, and project management on top of Git. This post walks you through creating a repository, pushing code, and deploying with GitHub Pages.

## Creating a GitHub Account

Go to [github.com](https://github.com) and sign up for a free account. Choose the free tier — it gives you everything you need for personal projects.

## Creating a New Repository

1. Click the **+** icon in the top right corner.
2. Select **New repository**.
3. Choose a name (e.g., `my-portfolio`).
4. Add a description (optional).
5. Select **Public** or **Private**.
6. Check **Add a README file**.
7. Click **Create repository**.

Your repository is now live on GitHub.

## Connecting a Local Repository to GitHub

If you already have a local Git repository, link it to GitHub.

```bash
# Add the remote
git remote add origin https://github.com/yourusername/my-portfolio.git

# Push your code
git push -u origin main
```

The `-u` flag sets `origin main` as the default, so you can just run `git push` next time.

## Cloning a Repository

Download a repository from GitHub to your computer.

```bash
git clone https://github.com/yourusername/my-portfolio.git
```

This creates a folder with the project and its full Git history.

## Writing a Good README

Your README.md is the first thing people see. Include:

- Project name and description
- How to install and run it
- Features
- How to contribute
- License

```markdown
# My Portfolio

A responsive portfolio website built with HTML, CSS, and JavaScript.

## Features
- Mobile-first design
- Dark mode support
- Contact form

## Getting Started
```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
open index.html
```

## License
MIT
```

## Pushing Changes

After making changes, push them to GitHub.

```bash
git add .
git commit -m "Update portfolio design"
git push
```

## Pull Requests

Pull requests are how you propose changes. They're used for code review and collaboration.

**Creating a pull request:**
1. Create a new branch.
2. Make changes and push.
3. Go to your repository on GitHub.
4. Click **Compare & pull request**.
5. Add a title and description.
6. Click **Create pull request**.

**Reviewing a pull request:**
- Review the changes in the diff view.
- Leave comments on specific lines.
- Approve or request changes.
- Merge when ready.

```bash
# After PR is approved and merged
git checkout main
git pull origin main
git branch -d feature-branch
```

## GitHub Pages

GitHub Pages hosts static websites for free directly from your repository.

**Setup:**
1. Go to your repository settings.
2. Scroll to **Pages**.
3. Select the branch (usually `main`) and folder (`/root` or `/docs`).
4. Click **Save**.

Your site will be live at `https://yourusername.github.io/my-portfolio`.

**Using a custom domain:**
1. Add a `CNAME` file with your domain name.
2. Configure DNS with your domain provider.
3. Enable HTTPS in repository settings.

## Issues and Project Management

Use GitHub Issues to track bugs and feature requests.

```markdown
**Bug Report**
- **Description:** Contact form doesn't submit
- **Steps to reproduce:** Fill form, click submit
- **Expected:** Form submits successfully
- **Actual:** Nothing happens
```

## Common Git Commands for GitHub

```bash
git remote -v                 # View remote repositories
git remote add origin URL     # Add a remote
git push origin branch-name   # Push to remote
git pull origin branch-name   # Pull from remote
git fetch origin              # Download remote changes
```

> 💡 **Tip:** Always write a clear README with setup instructions. Use meaningful branch names like `feature-contact-form` or `fix-navigation-bug`. Create a new branch for every feature or fix — never commit directly to main.
