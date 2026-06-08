# Algorithm 9: Searching Algorithms

Searching is the process of finding a specific element in a collection of data. There are two main approaches: checking every element, or using the structure of the data to narrow down the search.

## Linear Search

Linear search checks each element one by one from start to finish until it finds the target or reaches the end:

```
FUNCTION linearSearch(array, target)
  FOR i FROM 0 TO LENGTH(array) - 1
    IF array[i] == target
      RETURN i
    END IF
  END FOR
  RETURN -1
END FUNCTION
```

Linear search works on any collection, sorted or not. Its time complexity is O(n) because in the worst case you check every element.

## Binary Search

Binary search works on sorted arrays. It repeatedly divides the search space in half by comparing the target to the middle element:

```
FUNCTION binarySearch(array, target)
  low <- 0
  high <- LENGTH(array) - 1
  WHILE low <= high
    mid <- (low + high) / 2
    IF array[mid] == target
      RETURN mid
    ELSE IF array[mid] < target
      low <- mid + 1
    ELSE
      high <- mid - 1
    END IF
  END WHILE
  RETURN -1
END FUNCTION
```

Binary search is much faster. Its time complexity is O(log n) because it halves the search space with each step.

## When to Use Which

Use linear search when:

- The data is unsorted
- The dataset is small
- You need to find all occurrences

Use binary search when:

- The data is sorted
- The dataset is large
- You need fast repeated lookups

## Time Complexity Comparison

| Algorithm | Best Case | Worst Case | Requirement |
|-----------|-----------|------------|-------------|
| Linear Search | O(1) | O(n) | None |
| Binary Search | O(1) | O(log n) | Sorted data |

For 1,000 elements, linear search may take 1,000 steps. Binary search takes at most 10. For 1,000,000 elements, linear search could take 1,000,000 steps while binary search takes only 20.

> 💡 Tip: Always sort your data first if you plan to search it many times. The cost of sorting once is quickly recovered by the speed of binary search.
