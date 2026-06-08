# Python 2: Data Types and Variables

Now that you've got Python running and printed your first "Hello, World!", it's time to understand the building blocks of every program: data types and variables. Think of variables as labeled boxes that hold different kinds of information.

## Core Data Types

Python has several built-in data types you'll use every day:

- **int** — whole numbers: `42`, `-7`, `0`
- **float** — decimal numbers: `3.14`, `-0.5`
- **str** (string) — text: `"hello"`, `'Python'`
- **bool** (boolean) — True or False

```python
age = 25          # int
price = 19.99     # float
name = "Alice"    # str
is_active = True  # bool
```

## Collection Types

Python also has built-in collections for grouping data together:

- **list** — ordered, mutable: `[1, 2, 3]`
- **tuple** — ordered, immutable: `(1, 2, 3)`
- **dict** — key-value pairs: `{"name": "Alice", "age": 25}`

```python
colors = ["red", "green", "blue"]    # list
point = (10, 20)                     # tuple
person = {"name": "Bob", "age": 30}  # dict
```

## Checking Types with `type()`

Not sure what type a variable is? Use the `type()` function:

```python
x = 42
print(type(x))  # <class 'int'>

y = "hello"
print(type(y))  # <class 'str'>
```

## Type Conversion (Casting)

You can convert between types when needed:

```python
num_str = "100"
num_int = int(num_str)     # string to int: 100
num_float = float(num_str) # string to float: 100.0
back_to_str = str(num_int) # int to string: "100"
```

Be careful — converting something that isn't a number into an `int` will cause an error:

```python
int("hello")  # ValueError!
```

## Variable Naming Conventions

Good naming makes your code readable. Follow these Python conventions:

- Use **snake_case** for variables and functions: `my_variable`, `calculate_total`
- Start with a letter or underscore, not a number: `_count` ✅, `2fast` ❌
- Avoid reserved words like `if`, `for`, `class`
- Be descriptive: `user_age` is better than `x`

```python
# Good names
total_price = 99.99
is_logged_in = True

# Bad names
tp = 99.99
x = True
```

> **💡 Tip:** Python is dynamically typed, meaning you don't declare types upfront. This makes prototyping fast, but be mindful of type mismatches when your programs grow larger.
