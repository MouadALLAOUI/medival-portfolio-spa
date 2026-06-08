# Binary and Number Systems Explained

Understanding number systems is fundamental for programmers. While we use decimal (base-10) daily, computers operate using binary (base-2) and other systems.

## The Decimal System (Base-10)

We're familiar with decimal, which uses digits 0-9. Each position represents a power of 10:

```
1234 = 1×10³ + 2×10² + 3×10¹ + 4×10⁰
     = 1000 + 200 + 30 + 4
```

## The Binary System (Base-2)

Binary uses only 0 and 1. Each position represents a power of 2:

```
1011 = 1×2³ + 0×2² + 1×2¹ + 1×2⁰
     = 8 + 0 + 2 + 1
     = 11 in decimal
```

**Why Binary?**
- Electronic circuits have two states: on/off, high/low voltage
- Simple and reliable for hardware implementation
- Foundation of all digital computing

## Converting Decimal to Binary

To convert decimal to binary, repeatedly divide by 2 and record remainders:

```javascript
function decimalToBinary(decimal) {
  let binary = "";
  let num = decimal;
  
  while (num > 0) {
    binary = (num % 2) + binary;
    num = Math.floor(num / 2);
  }
  
  return binary || "0";
}

console.log(decimalToBinary(11)); // "1011"
console.log(decimalToBinary(42)); // "101010"
```

## The Octal System (Base-8)

Octal uses digits 0-7. Each position represents a power of 8:

```
127₈ = 1×8² + 2×8¹ + 7×8⁰
     = 64 + 16 + 7
     = 87 in decimal
```

**Use Cases:**
- Unix file permissions (e.g., chmod 755)
- Simplifying binary (each octal digit = 3 binary digits)

## The Hexadecimal System (Base-16)

Hexadecimal uses digits 0-9 and letters A-F (where A=10, B=11, ..., F=15).

```
1A3F₁₆ = 1×16³ + 10×16² + 3×16¹ + 15×16⁰
        = 4096 + 2560 + 48 + 15
        = 6719 in decimal
```

**Use Cases:**
- Color codes in web design (#FF5733)
- Memory addresses
- MAC addresses and UUIDs

## Practical Conversions

```javascript
// JavaScript conversion functions
const decimal = 255;

// Decimal to binary
console.log(decimal.toString(2));    // "11111111"

// Decimal to octal
console.log(decimal.toString(8));    // "377"

// Decimal to hexadecimal
console.log(decimal.toString(16));   // "ff"

// Back to decimal
console.log(parseInt("11111111", 2));  // 255
console.log(parseInt("377", 8));       // 255
console.log(parseInt("ff", 16));       // 255
```

## Why It Matters for Programmers

- **Bitwise Operations**: Manipulating individual bits for optimization
- **Data Representation**: Understanding how data is stored
- **Network Protocols**: IP addresses, port numbers
- **Cryptography**: Many algorithms work at the bit level
- **Debugging**: Memory dumps often displayed in hexadecimal

> 💡 Tip: Practice converting between number systems manually at first. Once you understand the pattern, use programming tools to automate conversions. This knowledge helps when working with low-level programming or debugging.