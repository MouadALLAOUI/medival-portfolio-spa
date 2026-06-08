# Linux 2: Shell Scripting Basics

You've learned the commands — now it's time to chain them together. Shell scripting lets you automate repetitive tasks and build powerful workflows with just a text file.

## What Is Shell Scripting?

A shell script is a text file containing a sequence of commands. Instead of typing them one by one, you run the script and everything executes in order.

It's programming, but for system tasks. Backing up files, processing data, deploying apps — shell scripts handle it all.

## The Shebang

Every shell script starts with a shebang line that tells the system which interpreter to use:

```bash
#!/bin/bash
```

This tells the system to use Bash, the most common shell. Save your script with a `.sh` extension, like `deploy.sh`.

## Variables

Store values in variables without spaces around the equals sign:

```bash
name="World"
echo "Hello, $name"
```

Use `$variable` to reference a variable's value. There are no data types — everything is a string until proven otherwise.

## Conditionals

Use `if` statements to make decisions:

```bash
if [ "$1" = "" ]; then
    echo "Please provide a filename"
    exit 1
fi

if [ -f "$1" ]; then
    echo "File exists"
else
    echo "File not found"
fi
```

The `[ ]` is the test command. Check `-f` for file existence, `-d` for directory, `-z` for empty string, and `-n` for non-empty.

## Loops

Loop through lists or ranges:

```bash
for file in *.txt; do
    echo "Processing $file"
    # do something with $file
done

for i in {1..10}; do
    echo "Number: $i"
done

while read -r line; do
    echo "$line"
done < input.txt
```

The `for` loop is your go-to for iterating over files or ranges. The `while read` pattern is perfect for processing files line by line.

## Making Scripts Executable

After writing your script, make it executable:

```bash
chmod +x myscript.sh
./myscript.sh
```

Now you can run it like any other command.

## Command Line Arguments

Scripts can accept arguments. `$1` is the first argument, `$2` the second, and so on:

```bash
#!/bin/bash
echo "Script name: $0"
echo "First arg: $1"
echo "Second arg: $2"
echo "All args: $@"
```

> 💡 Tip: Always wrap variables in double quotes (`"$variable"`) to handle filenames with spaces. Unquoted variables can cause surprising behavior and security issues.
