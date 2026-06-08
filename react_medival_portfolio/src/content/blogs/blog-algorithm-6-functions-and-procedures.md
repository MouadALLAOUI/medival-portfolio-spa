# Algorithm 6: Functions and Procedures

As your programs grow larger, you need a way to organize code into reusable pieces. Functions and procedures let you group logic into named blocks that you can call whenever needed.

## What is a Function?

A function is a reusable block of code that performs a specific task. You give it a name, optionally some input, and it does its job. Functions make code shorter, cleaner, and easier to maintain.

## Parameters and Arguments

Parameters are the inputs a function expects. Arguments are the actual values you pass when calling it:

```
FUNCTION add(a, b)
  RETURN a + b
END FUNCTION

result <- add(3, 5)
```

Here `a` and `b` are parameters. When you call `add(3, 5)`, the values 3 and 5 are arguments.

## Return Values

A `RETURN` statement sends a value back to the caller:

```
FUNCTION square(n)
  RETURN n * n
END FUNCTION

PRINT square(4)   // Outputs: 16
```

Without a return statement, the function does not produce a value.

## Void Functions (Procedures)

Some functions do not return anything. They just perform an action. These are often called procedures:

```
PROCEDURE greet(name)
  PRINT "Hello, " + name + "!"
END PROCEDURE

greet("Alice")
```

The difference is simple: functions compute a value, procedures do something.

## Scope

Variables created inside a function exist only within that function. This is called scope:

```
FUNCTION demo()
  x <- 10
  PRINT x
END FUNCTION

demo()
PRINT x   // Error: x is not defined here
```

Scope prevents naming conflicts and keeps functions isolated.

## Calling Functions

You call a function by typing its name followed by arguments in parentheses:

```
PRINT add(2, 3)
greet("World")
```

Functions can call other functions, creating layers of abstraction:

```
FUNCTION calculateArea(length, width)
  RETURN length * width
END FUNCTION

FUNCTION printArea(length, width)
  area <- calculateArea(length, width)
  PRINT "Area: " + area
END PROCEDURE
```

> 💡 Tip: A good function does one thing and does it well. If your function is doing three different things, split it into three smaller functions.
