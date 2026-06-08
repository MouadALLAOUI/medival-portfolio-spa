# C 2: Pointers and Memory Management

Pointers are what make C powerful — and what make it tricky. They let you work directly with memory addresses, which gives you fine-grained control but also the ability to crash your program in creative ways. Understanding pointers is the key to mastering C.

## What is a Pointer?

A pointer is a variable that stores the memory address of another variable. Instead of holding a value, it holds the location where that value lives.

```c
int x = 10;
int *p = &x;  // p stores the address of x

printf("Value of x: %d\n", x);      // 10
printf("Address of x: %p\n", (void*)&x);  // some memory address
printf("Value of p: %p\n", (void*)p);     // same address
printf("Value pointed to by p: %d\n", *p); // 10
```

## The `&` and `*` Operators

- **`&` (address-of)** — gets the memory address of a variable
- **`*` (dereference)** — accesses the value at a pointer's address

```c
int num = 42;
int *ptr = &num;  // ptr now holds num's address

*ptr = 100;  // changes num to 100 through the pointer
printf("%d\n", num);  // 100
```

## Pointer Arithmetic

You can do math with pointers. Adding 1 to an `int*` moves forward by `sizeof(int)` bytes:

```c
int arr[] = {10, 20, 30};
int *p = arr;

printf("%d\n", *p);       // 10
printf("%d\n", *(p + 1)); // 20
printf("%d\n", *(p + 2)); // 30
```

## Dynamic Memory with `malloc` and `free`

C doesn't have garbage collection. You manually allocate and free memory:

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int *arr = malloc(5 * sizeof(int));  // allocate space for 5 ints

    if (arr == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }

    for (int i = 0; i < 5; i++) {
        arr[i] = i * 10;
    }

    for (int i = 0; i < 5; i++) {
        printf("%d ", arr[i]);  // 0 10 20 30 40
    }

    free(arr);  // always free what you malloc
    arr = NULL; // good practice: set pointer to NULL after freeing
    return 0;
}
```

- **`malloc`** — allocates a block of memory
- **`free`** — releases it back to the system

## Memory Leaks

A memory leak happens when you allocate memory but never free it:

```c
void leaky() {
    int *data = malloc(1000 * sizeof(int));
    // forgot to free(data)!
}
// data is lost — memory is leaked
```

Every `malloc` must have a matching `free`. Use tools like `valgrind` to detect leaks.

> **💡 Tip:** Always check if `malloc` returns `NULL` before using the pointer. On systems with limited memory, allocation can fail silently.
