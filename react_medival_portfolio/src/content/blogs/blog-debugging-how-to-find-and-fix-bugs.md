# Debugging: How to Find and Fix Bugs

Every programmer writes code that breaks. Bugs are not a sign of failure — they are a normal part of the process. Debugging is the skill of finding and fixing those bugs efficiently.

## What is Debugging?

Debugging is the process of identifying, analyzing, and removing errors from a program. The term famously comes from an actual moth found in a computer in 1947, but the concept applies to every software bug.

## Common Types of Bugs

### Syntax Errors

These happen when you break the rules of the programming language. The compiler or interpreter catches them before the program runs:

```
PRINT "Hello"   // Missing closing parenthesis
```

Syntax errors are the easiest to fix — the error message tells you exactly where to look.

### Runtime Errors

These occur while the program is running. The code looks correct but fails under certain conditions:

```
result <- 10 / 0    // Division by zero
result <- array[100] // Index out of bounds
```

Runtime errors crash your program. You need to handle edge cases or add checks.

### Logic Errors

These are the hardest to find. The program runs without crashing but produces wrong results:

```
// Bug: calculating average with wrong formula
average <- sum / count - 1   // Should be sum / count
```

Logic errors require careful analysis of what the code is actually doing versus what you intended.

## Debugging Strategies

### Print Debugging

The simplest approach: add print statements to see what values variables hold at different points:

```
PRINT "Step 1: x = " + x
x <- x + 1
PRINT "Step 2: x = " + x
```

This shows you exactly where things go wrong.

### Rubber Duck Debugging

Explain your code line by line to someone else — or even an inanimate object like a rubber duck. The act of verbalizing often reveals the mistake.

### Binary Search Debugging

If you cannot find the bug, split the code in half. Check if the first half works. If it does, the bug is in the second half. Repeat until you isolate it.

### Read Error Messages Carefully

Error messages contain line numbers and descriptions. Read them fully before assuming what the problem is. Most beginners skip this step and waste time.

## Using Debugger Tools

Modern development environments include debuggers that let you:

- **Set breakpoints**: Pause execution at a specific line
- **Step through code**: Run one line at a time
- **Inspect variables**: See the current value of any variable
- **Watch expressions**: Monitor values as they change

Using a debugger is faster than print debugging for complex problems.

> 💡 Tip: When you find a bug, fix the root cause, not just the symptom. If your code crashes because a variable is null, ask why it is null — not just how to avoid the crash.
