# Object-Oriented Programming: The Four Pillars

Object-Oriented Programming (OOP) is a programming paradigm that organizes code around objects rather than functions. It's based on four fundamental principles that help create modular, reusable, and maintainable code.

## Encapsulation: Hiding Complexity

Encapsulation bundles data and methods that operate on that data into a single unit (class), while restricting direct access to some components.

```javascript
class BankAccount {
  #balance = 0; // Private field
  
  constructor(initialBalance) {
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }
  
  getBalance() {
    return this.#balance;
  }
}
```

**Benefits:**
- Protects internal state from outside interference
- Provides controlled access through public methods
- Makes code easier to maintain and modify

## Abstraction: Simplifying Complexity

Abstraction hides complex implementation details and shows only the essential features of an object.

```javascript
class Car {
  start() {
    this.#initializeEngine();
    this.#checkFuel();
    this.#engageIgnition();
  }
  
  // Complex methods hidden from user
  #initializeEngine() { /* ... */ }
  #checkFuel() { /* ... */ }
  #engageIgnition() { /* ... */ }
}
```

**Benefits:**
- Reduces complexity for users of the class
- Allows focus on what an object does rather than how
- Enables changes in implementation without affecting users

## Inheritance: Reusing Code

Inheritance allows a new class to inherit properties and methods from an existing class.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    return `${this.name} is eating`;
  }
}

class Dog extends Animal {
  bark() {
    return `${this.name} is barking`;
  }
}

const myDog = new Dog("Rex");
console.log(myDog.eat());  // "Rex is eating"
console.log(myDog.bark()); // "Rex is barking"
```

**Benefits:**
- Promotes code reuse and reduces duplication
- Establishes natural relationships between classes
- Makes it easy to extend functionality

## Polymorphism: One Interface, Many Forms

Polymorphism allows objects of different classes to be treated as objects of a common superclass, with each class implementing the same method differently.

```javascript
class Shape {
  area() {
    return 0;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}

function calculateArea(shape) {
  return shape.area(); // Same method, different behavior
}
```

**Benefits:**
- Increases flexibility in code design
- Makes code more extensible and maintainable
- Enables writing generic code that works with different types

> 💡 Tip: Master these four pillars and you'll be able to design clean, maintainable object-oriented systems. Remember that OOP is a tool - use it when it makes your code clearer, not just because you can.