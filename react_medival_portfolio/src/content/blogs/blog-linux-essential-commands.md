# Linux: Essential Commands

Linux powers most servers, all supercomputers, and runs on everything from your router to your phone. Knowing the terminal is a superpower. Here are the commands you need to know.

## Navigating the File System

- **pwd** — prints your current directory
- **ls** — lists files and folders
- **cd** — changes directory

```bash
pwd                    # Where am I?
ls -la                 # List all files (including hidden) with details
cd /home/user          # Go to a specific path
cd ..                  # Go up one level
```

## Creating and Removing

- **mkdir** — create a directory
- **rm** — remove files
- **rmdir** — remove empty directories

```bash
mkdir my_project
rm file.txt
rm -rf old_folder      # Careful! This deletes everything inside
```

The `-r` flag means recursive (for directories), and `-f` means force (skip confirmation). Use `rm -rf` with caution.

## Copying and Moving

- **cp** — copy files or directories
- **mv** — move or rename files

```bash
cp file.txt backup.txt
cp -r folder1 folder2   # Copy a directory recursively
mv oldname.txt newname.txt   # Rename
mv file.txt /other/folder    # Move
```

## Permissions and Ownership

Linux is strict about who can do what. Every file has an owner, a group, and permission bits.

```bash
chmod 755 script.sh    # rwx for owner, rx for others
chmod +x script.sh     # Make executable
chown user:group file  # Change ownership
```

Permission numbers: 4 = read, 2 = write, 1 = execute. Add them up for each category (owner, group, others).

## Reading Files

- **cat** — dump entire file to screen
- **less** — scroll through a file page by page
- **head** / **tail** — first or last lines of a file

```bash
cat config.yml
less large_log.txt
tail -f /var/log/syslog    # Follow log output in real time
```

## Searching

- **grep** — search for text patterns in files

```bash
grep "error" logfile.txt
grep -r "TODO" ./src       # Search recursively
```

## Getting Help

- **man** — read the manual for any command

```bash
man ls
man grep
```

The manual is your best friend. If you're ever unsure what a flag does, check the man page.

> 💡 Tip: Press `Tab` to auto-complete file and command names. Press it twice to see all possibilities. This single habit will make you ten times faster in the terminal.
