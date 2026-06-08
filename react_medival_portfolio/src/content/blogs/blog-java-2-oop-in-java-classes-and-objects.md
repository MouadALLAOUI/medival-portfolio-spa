# Java 2: OOP in Java — Classes and Objects

Java is built from the ground up around Object-Oriented Programming. Unlike Python where you can write procedural code freely, Java practically forces you to think in terms of classes and objects. Let's break it down.

## Defining a Class

Use the `class` keyword to define a blueprint:

```java
public class Car {
    String make;
    String model;
    int year;

    void drive() {
        System.out.println(model + " is driving!");
    }
}
```

## The Constructor

A constructor initializes an object when it's created. It has the same name as the class and no return type:

```java
public class Car {
    String make;
    String model;
    int year;

    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
}
```

The `this` keyword refers to the current object — it disambiguates between instance variables and parameters with the same name.

## Creating Objects

```java
Car myCar = new Car("Toyota", "Camry", 2022);
myCar.drive();  // Camry is driving!
```

The `new` keyword allocates memory and calls the constructor.

## Methods

Methods define what an object can do:

```java
public class Calculator {
    private double result = 0;

    public void add(double value) {
        result += value;
    }

    public double getResult() {
        return result;
    }
}
```

## Access Modifiers

Java uses access modifiers to control visibility:

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| public | ✅ | ✅ | ✅ | ✅ |
| protected | ✅ | ✅ | ✅ | ❌ |
| (default) | ✅ | ✅ | ❌ | ❌ |
| private | ✅ | ❌ | ❌ | ❌ |

Use **private** for data you want to protect, and **public** methods to control access.

## Getters and Setters

The standard pattern for accessing private fields:

```java
public class Person {
    private String name;
    private int age;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        if (age >= 0) {
            this.age = age;
        }
    }
}
```

Getters and setters let you add validation logic later without breaking existing code.

> **💡 Tip:** Always make fields private and expose them through getters/setters. It feels like extra work now, but it protects your data and makes future changes much easier.
