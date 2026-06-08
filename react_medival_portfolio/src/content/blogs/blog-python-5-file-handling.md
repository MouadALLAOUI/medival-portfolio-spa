# Python 5: File Handling

Programs that only live in memory disappear when they stop running. File handling lets your programs read from and write to files on disk — essential for saving user data, processing logs, or working with CSVs and JSON.

## Opening and Reading Files

Use `open()` to access a file:

```python
file = open("hello.txt", "r")
content = file.read()
print(content)
file.close()
```

But manually calling `close()` is easy to forget. That's where the `with` statement comes in.

## The `with` Statement (Context Manager)

The `with` statement automatically closes the file when you're done, even if an error occurs:

```python
with open("hello.txt", "r") as file:
    content = file.read()
    print(content)
# File is automatically closed here
```

Always prefer `with` — it's safer and cleaner.

## Reading Line by Line

For large files, reading everything at once uses too much memory. Read line by line instead:

```python
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())  # strip() removes trailing newline
```

## Writing to Files

Open a file in write mode (`"w"`) to create or overwrite it:

```python
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("Second line.\n")
```

**Warning:** Write mode erases the existing content. If you want to add to the end, use append mode.

## Appending to Files

Open in append mode (`"a"`) to add content without deleting what's already there:

```python
with open("log.txt", "a") as file:
    file.write("New log entry.\n")
```

## Working with CSV Files

Python has a built-in `csv` module for reading and writing CSV files:

```python
import csv

# Writing a CSV
with open("people.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["Name", "Age"])
    writer.writerow(["Alice", 30])
    writer.writerow(["Bob", 25])

# Reading a CSV
with open("people.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  # ['Name', 'Age'], ['Alice', '30'], ...
```

## File Modes Cheat Sheet

| Mode | Description |
|------|-------------|
| `"r"` | Read (default) |
| `"w"` | Write (overwrites) |
| `"a"` | Append |
| `"r+"` | Read and write |

> **💡 Tip:** Always use the `with` statement when working with files. It prevents resource leaks and is considered best practice in Python.
