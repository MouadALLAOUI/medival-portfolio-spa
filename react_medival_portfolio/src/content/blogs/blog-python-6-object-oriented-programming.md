# Python 6: Object-Oriented Programming (OOP)

You've been writing procedural code so far — functions and variables floating around independently. Object-Oriented Programming (OOP) takes a different approach: it bundles data and behavior into neat packages called **objects**. It's the backbone of most large Python applications.

## What is a Class?

A class is a blueprint for creating objects. Think of it like a cookie cutter — the class defines the shape, and each object is a cookie made from it.

```python
class Dog:
    def bark(self):
        print("Woof!")
```

## Creating Objects

Instantiate a class by calling it like a function:

```python
my_dog = Dog()
my_dog.bark()  # Woof!
```

## The `__init__` Method

The `__init__` method runs automatically when you create a new object. It sets up the initial state:

```python
class Dog:
    def __init__(self, name, breed):
        self.name = name
        self.breed = breed

    def bark(self):
        print(f"{self.name} says Woof!")

my_dog = Dog("Rex", "Labrador")
my_dog.bark()  # Rex says Woof!
```

The `self` parameter refers to the current instance of the class. It's always the first parameter in methods.

## Methods

Methods are functions that belong to a class. They operate on the object's data:

```python
class Calculator:
    def __init__(self):
        self.result = 0

    def add(self, value):
        self.result += value
        return self

    def get_result(self):
        return self.result

calc = Calculator()
calc.add(5).add(3)
print(calc.get_result())  # 8
```

## Inheritance

Inheritance lets you create new classes based on existing ones. The child class inherits all the parent's behavior:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print("Some sound")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} says Meow!")

cat = Cat("Whiskers")
cat.speak()  # Whiskers says Meow!
```

## Polymorphism

Different classes can have the same method name, and Python figures out which one to call:

```python
for animal in [Cat("Tom"), Dog("Rex")]:
    animal.speak()
```

Each animal responds in its own way — that's polymorphism in action.

## Encapsulation

Encapsulation means keeping internal details hidden. Python uses naming conventions (not strict enforcement) for this:

```python
class BankAccount:
    def __init__(self, balance):
        self._balance = balance  # "protected" — convention only

    def get_balance(self):
        return self._balance
```

> **💡 Tip:** Don't overthink OOP at first. Start with simple classes and grow from there. You'll naturally see when you need classes vs. plain functions.
