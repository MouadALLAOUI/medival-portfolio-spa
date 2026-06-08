# Data Structures: Arrays, Linked Lists, Stacks, Queues

Data structures are ways to organize and store data efficiently. Choosing the right structure can make your programs faster and more memory-efficient.

## Arrays: Simple and Fast Access

Arrays store elements in contiguous memory locations, allowing direct access by index.

```javascript
// Creating and using an array
let fruits = ["apple", "banana", "cherry"];
console.log(fruits[0]); // "apple"
fruits.push("date"); // Add to end
```

**Operations:**
- Access by index: O(1) - Very fast
- Search: O(n) - May need to check all elements
- Insertion/Deletion at end: O(1)
- Insertion/Deletion at beginning: O(n) - Need to shift elements

**Use Cases:** When you need fast access to elements by position and know the size in advance.

## Linked Lists: Dynamic and Flexible

Linked lists store elements in nodes where each node points to the next one.

```javascript
// Conceptual linked list node
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
```

**Operations:**
- Access by index: O(n) - Must traverse from start
- Search: O(n)
- Insertion/Deletion at beginning: O(1)
- Insertion/Deletion at end: O(n) without tail pointer

**Use Cases:** When you need frequent insertions/deletions and don't need random access.

## Stacks: Last In, First Out (LIFO)

Stacks follow the LIFO principle - the last element added is the first one removed.

```javascript
// Stack implementation
class Stack {
  constructor() {
    this.items = [];
  }
  push(element) {
    this.items.push(element);
  }
  pop() {
    return this.items.pop();
  }
}
```

**Operations:**
- Push (add): O(1)
- Pop (remove): O(1)
- Peek (view top): O(1)

**Use Cases:** Function call management, undo operations, expression evaluation, backtracking algorithms.

## Queues: First In, First Out (FIFO)

Queues follow the FIFO principle - the first element added is the first one removed.

```javascript
// Queue implementation
class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(element) {
    this.items.push(element);
  }
  dequeue() {
    return this.items.shift();
  }
}
```

**Operations:**
- Enqueue (add): O(1)
- Dequeue (remove): O(1) with proper implementation
- Front (view first): O(1)

**Use Cases:** Task scheduling, breadth-first search, print job management, handling requests in order.

> 💡 Tip: Master these basic data structures first - they form the foundation for more complex structures like trees, graphs, and hash tables. Understanding time complexity helps you choose the right structure for your needs.