# Java: Introduction and Setup

Java has been one of the most widely used programming languages for over two decades. It powers Android apps, enterprise systems, web backends, and more. If you've ever seen "Write Once, Run Anywhere," that's Java's whole philosophy.

## What is Java?

Java is a statically-typed, object-oriented language created by Sun Microsystems (now Oracle) in 1995. Java code compiles to bytecode, which runs on the Java Virtual Machine (JVM) — meaning the same code works on Windows, Mac, or Linux without recompilation.

## Installing the JDK

Download the Java Development Kit (JDK) from [oracle.com](https://www.oracle.com/java/technologies/downloads/) or use OpenJDK. After installation, verify it:

```bash
java --version
javac --version
```

`java` runs compiled programs. `javac` compiles source code.

## Your First Java Program

Create a file called `HelloWorld.java`:

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

Every Java file must have a class matching its filename. The `main` method is the entry point — Java always starts here.

## The `main` Method Explained

```java
public static void main(String[] args)
```

- **public** — accessible from anywhere
- **static** — doesn't need an object to run
- **void** — returns nothing
- **String[] args** — command-line arguments

You'll write this exact line in every Java program you make. It's just how Java works.

## Compiling and Running

```bash
# Compile
javac HelloWorld.java

# Run
java HelloWorld
```

The compiler creates a `.class` file. The JVM executes it.

## Java vs JavaScript

Despite the similar names, Java and JavaScript are completely different languages:

| Feature | Java | JavaScript |
|---------|------|------------|
| Type System | Static | Dynamic |
| Runtime | JVM | Browser/Node.js |
| Syntax | More verbose | More flexible |
| Primary Use | Enterprise/Android | Web Development |

Don't confuse them — knowing one doesn't mean you know the other.

> **💡 Tip:** Set up your code editor (VS Code, IntelliJ, or Eclipse) with Java support before diving deep. Auto-complete and error highlighting save a ton of time.
