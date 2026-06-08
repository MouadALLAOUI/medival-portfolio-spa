# Algorithm 10: Time and Space Complexity (Big O)

Not all solutions are created equal. Some algorithms are faster than others, and some use less memory. Big O notation lets you describe how an algorithm performs as the input grows.

## What is Big O?

Big O notation describes the upper bound of an algorithm's growth rate. It tells you how the time or space requirements increase as the input size increases. You drop constants and focus on the dominant term.

## Common Big O Classes

### O(1) — Constant Time

The operation takes the same amount of time regardless of input size:

```
x <- array[5]
```

Accessing an element by index is always one step.

### O(n) — Linear Time

The time grows proportionally with the input size:

```
FOR i FROM 0 TO n-1
  PRINT array[i]
END FOR
```

If the input doubles, the time doubles.

### O(n²) — Quadratic Time

The time grows with the square of the input:

```
FOR i FROM 0 TO n-1
  FOR j FROM 0 TO n-1
    PRINT array[i], array[j]
  END FOR
END FOR
```

If the input doubles, the time quadruples.

### O(log n) — Logarithmic Time

The time grows slowly as the input increases. This is typical of divide-and-conquer algorithms:

```
WHILE n > 1
  n <- n / 2
END WHILE
```

Doubling the input adds only one more step.

### O(n log n) — Linearithmic Time

This sits between linear and quadratic. Efficient sorting algorithms like merge sort achieve this:

```
// Conceptual structure of merge sort
mergeSort(array)
  split array in half
  mergeSort(left half)
  mergeSort(right half)
  merge results
```

## Comparing Algorithms

| Big O | 10 items | 100 items | 1000 items |
|-------|----------|-----------|------------|
| O(1) | 1 | 1 | 1 |
| O(log n) | 3 | 7 | 10 |
| O(n) | 10 | 100 | 1,000 |
| O(n log n) | 33 | 664 | 9,966 |
| O(n²) | 100 | 10,000 | 1,000,000 |

## Space Complexity

Space complexity measures how much memory an algorithm uses. An algorithm that creates a new array uses O(n) space. One that only uses a few variables uses O(1) space.

## Why It Matters

Big O helps you predict how your program behaves as data grows. An O(n²) algorithm might be fine for 100 items but completely unusable for 1,000,000 items.

> 💡 Tip: When someone says their algorithm is "efficient," ask them for the Big O. It is the standard way to compare algorithms without running them.
