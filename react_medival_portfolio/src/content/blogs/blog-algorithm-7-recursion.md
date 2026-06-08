# Algorithm 7: Recursion

Recursion is a technique where a function calls itself to solve a problem. It breaks a large problem into smaller, identical sub-problems until it reaches a simple case it can solve directly.

## What is Recursion?

A recursive function solves a problem by calling itself with a smaller or simpler input. Each call reduces the problem until it hits a stopping condition.

## Base Case vs Recursive Case

Every recursive function needs two parts:

- **Base case**: The simplest version of the problem that can be solved directly without another call
- **Recursive case**: The part that breaks the problem down and calls itself

Without a base case, the function calls itself forever and crashes with a stack overflow.

## Factorial

The factorial of a number `n` (written `n!`) is the product of all integers from 1 to `n`. The recursive definition is:

- `0! = 1` (base case)
- `n! = n * (n-1)!` (recursive case)

```
FUNCTION factorial(n)
  IF n == 0
    RETURN 1
  END IF
  RETURN n * factorial(n - 1)
END FUNCTION

PRINT factorial(5)   // Outputs: 120
```

## Fibonacci Sequence

Each number in the Fibonacci sequence is the sum of the two before it:

```
FUNCTION fibonacci(n)
  IF n <= 1
    RETURN n
  END IF
  RETURN fibonacci(n - 1) + fibonacci(n - 2)
END FUNCTION

PRINT fibonacci(6)   // Outputs: 8
```

The first six Fibonacci numbers are 0, 1, 1, 2, 3, 5, 8.

## Stack Frames

Each recursive call adds a new frame to the call stack. The stack stores the state of each call until it returns. Too many calls exhaust the stack.

You can visualize it like stacking plates — each call adds a plate, and each return removes one. If the stack gets too tall, it collapses.

## When to Use Recursion

Recursion works well for:

- Tree traversal
- Divide and conquer algorithms
- Problems that naturally have recursive structure (like Factorial or Fibonacci)

For simple loops, iteration is usually faster and safer. Use recursion when the problem genuinely benefits from it.

> 💡 Tip: Always check your base case first. If your recursive function is not terminating, trace through it by hand to see if the base case is ever reached.
