# Python 3: Control Flow and Loops

Variables and data types are useless without the ability to make decisions and repeat actions. Control flow is what makes your programs smart — it lets Python choose different paths based on conditions and repeat tasks automatically.

## if / elif / else

The `if` statement lets your program make decisions:

```python
temperature = 75

if temperature > 85:
    print("It's hot outside!")
elif temperature > 65:
    print("Nice weather!")
else:
    print("Grab a jacket.")
```

Python uses **indentation** (4 spaces by default) to define code blocks. No curly braces like other languages. This keeps your code clean and readable.

## The `for` Loop

The `for` loop iterates over a sequence (like a list, string, or range):

```python
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)
```

### Using `range()`

`range()` generates a sequence of numbers — super useful for repeating something a specific number of times:

```python
# Prints 0, 1, 2, 3, 4
for i in range(5):
    print(i)

# Prints 2, 3, 4, 5
for i in range(2, 6):
    print(i)

# Prints 0, 2, 4, 6, 8 (step of 2)
for i in range(0, 10, 2):
    print(i)
```

## The `while` Loop

The `while` loop keeps running as long as its condition is true:

```python
count = 0

while count < 5:
    print(count)
    count += 1
```

Be careful — an infinite loop will freeze your program. Always make sure the condition eventually becomes `False`.

## `break`, `continue`, and `pass`

These three keywords give you fine-grained control inside loops:

- **`break`** — exits the loop immediately
- **`continue`** — skips to the next iteration
- **`pass`** — does nothing (placeholder)

```python
for i in range(10):
    if i == 3:
        continue  # skip 3
    if i == 7:
        break     # stop at 7
    print(i)      # prints 0, 1, 2, 4, 5, 6
```

## Nested Loops

You can put loops inside loops — useful for working with grids or multi-dimensional data:

```python
for row in range(3):
    for col in range(3):
        print(f"({row},{col})", end=" ")
    print()  # new line after each row
```

> **💡 Tip:** If your `while` loop isn't stopping, look for the variable that controls the condition and make sure it's being updated inside the loop. That's the most common bug beginners hit.
