# Algorithm 8: Sorting Algorithms

Sorting is one of the most fundamental problems in computer science. You have a list of items in random order and need to arrange them — usually from smallest to largest. Several algorithms solve this, each with trade-offs.

## Bubble Sort

Bubble sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest unsorted element "bubbles up" to its correct position in each pass.

```
FOR i FROM 0 TO n-1
  FOR j FROM 0 TO n-i-2
    IF array[j] > array[j+1]
      SWAP(array[j], array[j+1])
    END IF
  END FOR
END FOR
```

Bubble sort is simple but slow. Its time complexity is O(n²).

## Selection Sort

Selection sort finds the smallest element in the unsorted portion and places it at the beginning. It repeats this process, shrinking the unsorted portion each time.

```
FOR i FROM 0 TO n-1
  minIndex <- i
  FOR j FROM i+1 TO n-1
    IF array[j] < array[minIndex]
      minIndex <- j
    END IF
  END FOR
  SWAP(array[i], array[minIndex])
END FOR
```

Selection sort also has O(n²) time complexity but performs fewer swaps than bubble sort.

## Insertion Sort

Insertion sort builds the sorted list one element at a time. It takes each element and inserts it into its correct position among the already-sorted elements.

```
FOR i FROM 1 TO n-1
  key <- array[i]
  j <- i - 1
  WHILE j >= 0 AND array[j] > key
    array[j+1] <- array[j]
    j <- j - 1
  END WHILE
  array[j+1] <- key
END FOR
```

Insertion sort is efficient for small or nearly sorted datasets. Its time complexity is O(n²) in the worst case.

## Comparison

| Algorithm | Best Case | Worst Case | Space |
|-----------|-----------|------------|-------|
| Bubble Sort | O(n) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(1) |

All three are simple but inefficient for large datasets. For real-world applications, algorithms like merge sort or quicksort are preferred.

> 💡 Tip: If you are just learning, implement all three. Understanding how they work will make advanced algorithms much easier to grasp later.
