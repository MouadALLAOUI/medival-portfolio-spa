# Design Patterns Every Developer Should Know

Design patterns are reusable solutions to common problems in software design. They're like battle-tested recipes that help you write cleaner, more maintainable code.

## Singleton Pattern

The Singleton pattern ensures a class has only one instance and provides a global point of access to it.

```javascript
class Database {
  static instance = null;
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  connect() {
    console.log("Connected to database");
  }
}
```

**When to Use:**
- Database connections
- Configuration managers
- Logging services

## Factory Pattern

The Factory pattern provides an interface for creating objects without specifying their exact class.

```javascript
class UserFactory {
  static createUser(type) {
    switch (type) {
      case "admin":
        return new AdminUser();
      case "regular":
        return new RegularUser();
      default:
        throw new Error("Unknown user type");
    }
  }
}
```

**When to Use:**
- When object creation is complex
- When you need to create different types of similar objects
- When you want to encapsulate creation logic

## Observer Pattern

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified.

```javascript
class EventEmitter {
  constructor() {
    this.listeners = {};
  }
  
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
}
```

**When to Use:**
- Event handling systems
- UI components that need to update
- Real-time notifications

## Strategy Pattern

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.

```javascript
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  sort(data) {
    return this.strategy(data);
  }
}

// Different strategies
const bubbleSort = (arr) => { /* ... */ };
const quickSort = (arr) => { /* ... */ };

// Usage
const sorter = new Sorter(quickSort);
sorter.sort([3, 1, 2]);
```

**When to Use:**
- When you have multiple algorithms for the same task
- When you need to switch algorithms at runtime
- When you want to avoid conditional statements

## MVC Pattern

Model-View-Controller separates an application into three components:

```javascript
// Model: Data and business logic
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

// View: User interface
class UserView {
  displayUser(user) {
    console.log(`Name: ${user.name}, Email: ${user.email}`);
  }
}

// Controller: Handles input and coordinates
class UserController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  
  addUser(name, email) {
    const user = new User(name, email);
    this.view.displayUser(user);
  }
}
```

**When to Use:**
- Web applications
- Desktop applications
- Any application needing separation of concerns

> 💡 Tip: Don't try to use all patterns in every project. Learn to recognize when a pattern solves a specific problem you're facing. Overusing patterns can make code more complex than necessary.