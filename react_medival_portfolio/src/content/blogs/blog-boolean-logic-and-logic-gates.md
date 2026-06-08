# Boolean Logic and Logic Gates

Boolean logic is the foundation of digital circuits and computer programming. It uses simple true/false values to make complex decisions.

## Basic Boolean Operations

Boolean algebra deals with two values: TRUE (1) and FALSE (0).

### AND Gate
Returns TRUE only if both inputs are TRUE.

```
A | B | A AND B
--|---|--------
0 | 0 |    0
0 | 1 |    0
1 | 0 |    0
1 | 1 |    1
```

```javascript
let a = true;
let b = false;
console.log(a && b); // false
```

### OR Gate
Returns TRUE if at least one input is TRUE.

```
A | B | A OR B
--|---|-------
0 | 0 |   0
0 | 1 |   1
1 | 0 |   1
1 | 1 |   1
```

```javascript
console.log(a || b); // true
```

### NOT Gate
Inverts the input value.

```
A | NOT A
--|------
0 |   1
1 |   0
```

```javascript
console.log(!a); // false
```

## Compound Operations

### NAND Gate (NOT AND)
Returns FALSE only if both inputs are TRUE.

```
A | B | A NAND B
--|---|---------
0 | 0 |    1
0 | 1 |    1
1 | 0 |    1
1 | 1 |    0
```

### NOR Gate (NOT OR)
Returns TRUE only if both inputs are FALSE.

```
A | B | A NOR B
--|---|--------
0 | 0 |   1
0 | 1 |   0
1 | 0 |   0
1 | 1 |   0
```

### XOR Gate (Exclusive OR)
Returns TRUE if exactly one input is TRUE.

```
A | B | A XOR B
--|---|--------
0 | 0 |   0
0 | 1 |   1
1 | 0 |   1
1 | 1 |   0
```

```javascript
// XOR implementation
function xor(a, b) {
  return (a || b) && !(a && b);
}
```

## Practical Applications in Programming

### Conditional Logic
```javascript
// Complex conditions using Boolean logic
if (age >= 18 && hasID && !isBanned) {
  allowEntry();
}
```

### Bitwise Operations
```javascript
// Using Boolean operators on bits
let flags = 0b1010;
let mask = 0b1100;

// Bitwise AND
let result = flags & mask; // 0b1000

// Bitwise OR
result = flags | mask; // 0b1110

// Bitwise XOR
result = flags ^ mask; // 0b0110

// Bitwise NOT
result = ~flags; // Inverts all bits
```

### Decision Trees
```javascript
// Complex decision logic
function getDiscount(isMember, purchaseAmount, hasCoupon) {
  let discount = 0;
  
  if (isMember && purchaseAmount > 100) {
    discount += 10;
  }
  
  if (hasCoupon || discount > 0) {
    discount += 5;
  }
  
  return Math.min(discount, 20); // Cap at 20%
}
```

## De Morgan's Laws

These laws help simplify Boolean expressions:

1. NOT (A AND B) = (NOT A) OR (NOT B)
2. NOT (A OR B) = (NOT A) AND (NOT B)

```javascript
// These are equivalent:
!(a && b) === !a || !b
!(a || b) === !a && !b
```

> 💡 Tip: Draw truth tables when working with complex Boolean logic. They help you visualize all possible outcomes and ensure your logic is correct. Practice simplifying expressions using Boolean algebra laws.