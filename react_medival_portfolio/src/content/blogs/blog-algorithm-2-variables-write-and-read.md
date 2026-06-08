# Algorithm 2: Variables — Write and Read

Variables are the building blocks of any program. They are like labeled boxes where you store information that your program can use later. Understanding how to create, write to, and read from variables is essential.

## What is a Variable?

A variable is a named container that holds a value. The value can change during program execution — that is why it is called a variable. You give it a name and assign it a value.

## Naming Rules

Variable names should be meaningful and follow basic rules:

- Start with a letter or underscore
- Contain only letters, numbers, and underscores
- No spaces or special characters
- Avoid reserved words like `IF` or `FOR`

Good names: `score`, `player_name`, `totalScore`
Bad names: `2ndPlace`, `my-score`, `for`

## Declaring Variables

Declaring a variable means telling the program it exists and what type of data it holds:

```
DECLARE name AS STRING
DECLARE age AS INTEGER
DECLARE height AS FLOAT
DECLARE isStudent AS BOOLEAN
```

Some languages do not require explicit declaration, but understanding the concept matters.

## Writing to Variables

Writing means assigning a value to a variable:

```
name <- "Alice"
age <- 21
height <- 1.75
isStudent <- TRUE
```

The `<-` symbol represents assignment. The value on the right goes into the variable on the left.

## Reading from Variables

Reading means using the value stored in a variable:

```
PRINT name
PRINT "Your age is: " + age
```

When you read a variable, the program replaces the variable name with its current value.

## Input and Output

A program that interacts with the user reads input and writes output:

```
PRINT "Enter your name:"
INPUT name
PRINT "Hello, " + name + "!"
```

This pattern — prompt, read, process, output — is the foundation of interactive programs.

> 💡 Tip: Use descriptive variable names. `score` is better than `s`, and `totalScore` is better than `ts`. Your future self will thank you.
