# Data Structures 2: Trees and Graphs

Trees and graphs are hierarchical and networked data structures that model real-world relationships. They're essential for solving complex problems efficiently.

## Binary Trees

A binary tree is a hierarchical structure where each node has at most two children (left and right).

```javascript
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
```

**Key Properties:**
- Root: Top node with no parent
- Leaf: Node with no children
- Height: Longest path from root to leaf
- Depth: Distance from root to a specific node

## Binary Search Trees (BST)

BSTs are special binary trees where left children are smaller and right children are larger than their parent.

```javascript
// BST property: left < parent < right
function insert(root, value) {
  if (!root) return new TreeNode(value);
  if (value < root.value) {
    root.left = insert(root.left, value);
  } else {
    root.right = insert(root.right, value);
  }
  return root;
}
```

**Operations:**
- Search: O(log n) average, O(n) worst case
- Insert: O(log n) average
- Delete: O(log n) average

## Tree Traversals

How you visit every node in a tree:

```javascript
// In-order traversal (Left, Root, Right)
function inOrder(node) {
  if (node) {
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
  }
}
```

**Types:**
- **In-order**: Left subtree → Root → Right subtree (gives sorted order for BST)
- **Pre-order**: Root → Left subtree → Right subtree (useful for copying trees)
- **Post-order**: Left subtree → Right subtree → Root (useful for deletion)
- **Level-order**: Visit nodes level by level (uses queue)

## Graphs

Graphs model relationships between objects. They consist of vertices (nodes) and edges (connections).

```javascript
// Graph using adjacency list
const graph = {
  A: ["B", "C"],
  B: ["A", "D"],
  C: ["A", "D"],
  D: ["B", "C"]
};
```

**Types:**
- **Directed vs Undirected**: One-way or two-way connections
- **Weighted vs Unweighted**: Edges with or without values
- **Cyclic vs Acyclic**: Contains cycles or not

## BFS and DFS

Two fundamental graph traversal algorithms:

```javascript
// Breadth-First Search
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}
```

**BFS (Breadth-First Search):**
- Explores all neighbors at current depth before moving deeper
- Uses queue data structure
- Finds shortest path in unweighted graphs

**DFS (Depth-First Search):**
- Explores as far as possible along each branch before backtracking
- Uses stack data structure (or recursion)
- Useful for topological sorting, cycle detection

## Real-World Applications

- **File Systems**: Trees represent directory structures
- **DOM (Document Object Model)**: Trees represent HTML structure
- **Social Networks**: Graphs model friendships and connections
- **GPS Navigation**: Graphs find shortest routes between locations
- **Recommendation Systems**: Graphs suggest connections based on relationships

> 💡 Tip: Practice implementing trees and graphs from scratch. Understanding these structures deeply will help you solve many algorithmic problems efficiently.