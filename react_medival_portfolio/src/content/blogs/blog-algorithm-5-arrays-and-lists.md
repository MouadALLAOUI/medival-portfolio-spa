# Algorithm 5: Arrays and Lists

When you have a collection of related data, you do not want to create a separate variable for each piece. Arrays and lists solve this by storing multiple values in a single variable.

## What is an Array?

An array is a collection of elements stored at consecutive memory locations. Each element has an index — a number that tells you its position. Indexing usually starts at 0, meaning the first element is at position 0.

## Declaring Arrays

You can declare an array with a fixed size or initialize it with values:

```
DECLARE scores[10] AS INTEGER

scores[0] <- 85
scores[1] <- 90
scores[2] <- 78
```

Or initialize it directly:

```
scores <- [85, 90, 78, 92, 88]
```

## Accessing Elements

Use the index in square brackets to access a specific element:

```
PRINT scores[0]   // Outputs: 85
PRINT scores[2]   // Outputs: 78
```

## Traversing Arrays

Traversing means visiting every element. This is usually done with a loop:

```
FOR i FROM 0 TO LENGTH(scores) - 1
  PRINT scores[i]
END FOR
```

Or using a for-each style:

```
FOR EACH score IN scores
  PRINT score
END FOR
```

## Searching an Array

To find a value, loop through and check each element:

```
target <- 78
found <- FALSE
FOR i FROM 0 TO LENGTH(scores) - 1
  IF scores[i] == target
    PRINT "Found at index " + i
    found <- TRUE
  END IF
END FOR
IF found == FALSE
  PRINT "Not found"
END IF
```

## Common Operations

Arrays support several standard operations:

- **Add**: Insert an element at a specific position
- **Remove**: Delete an element from a position
- **Sort**: Arrange elements in order
- **Reverse**: Flip the order of elements

## 2D Arrays

A 2D array is an array of arrays — think of it as a table with rows and columns:

```
DECLARE grid[3][3] AS INTEGER

grid[0][0] <- 1
grid[0][1] <- 2
grid[1][0] <- 3
grid[1][1] <- 4
```

You access elements with two indices: `grid[row][column]`.

> 💡 Tip: Remember that array indices start at 0. Trying to access an index that does not exist causes an error called "index out of bounds" — a very common bug for beginners.
