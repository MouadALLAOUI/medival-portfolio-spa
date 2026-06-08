# Python 4: Functions and Modules

So far you've been writing code top-to-bottom. That works for small scripts, but as programs grow, you need a way to organize logic into reusable chunks. That's exactly what functions and modules are for.

## Defining a Function

Use the `def` keyword to create a function:

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
greet("Bob")    # Hello, Bob!
```

Functions let you write logic once and use it anywhere — no copying and pasting.

## Parameters and Return Values

Functions can accept input (parameters) and give output (return values):

```python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8
```

You can return multiple values using tuples:

```python
def get_min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = get_min_max([3, 1, 7, 2])
print(lo, hi)  # 1 7
```

## Default Arguments

You can give parameters default values so callers can optionally skip them:

```python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Hey")         # Hey, Bob!
```

## *args and **kwargs

When you're not sure how many arguments a function will receive, use `*args` and `**kwargs`:

```python
def total(*args):
    return sum(args)

print(total(1, 2, 3, 4))  # 10

def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30)
```

## Importing Modules

Modules are Python files that contain functions, classes, or variables you can reuse:

```python
import math

print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.14159...
```

You can also import specific items:

```python
from random import choice

colors = ["red", "green", "blue"]
print(choice(colors))  # picks one randomly
```

## Creating Your Own Modules

Any `.py` file is a module. If you have `utils.py`:

```python
# utils.py
def say_hello():
    print("Hello from utils!")
```

You can import it from another file:

```python
# main.py
import utils
utils.say_hello()
```

No special syntax needed — just having the file in the same directory makes it importable.

> **💡 Tip:** Keep functions short and focused. If a function does too many things, break it into smaller functions. Your future self will thank you.
