# C Language: Basics and Setup

C is the grandfather of modern programming languages. Created in 1972 by Dennis Ritchie at Bell Labs, it's the foundation that languages like C++, Java, Python, and JavaScript were built on top of. Learning C gives you a deep understanding of how computers actually work.

## What is C?

C is a low-level, procedural programming language that gives you direct access to memory. It's fast, efficient, and used in operating systems, embedded systems, game engines, and performance-critical applications. Linux, Windows, and macOS all have large portions written in C.

## Setting Up Your Environment

You need a C compiler. On most systems:

- **Windows:** Install MinGW or use WSL with `gcc`
- **Mac:** Install Xcode Command Line Tools (`xcode-select --install`)
- **Linux:** `sudo apt install gcc` (usually pre-installed)

```bash
# Verify gcc is installed
gcc --version
```

Alternatively, use an IDE like Code::Blocks, CLion, or VS Code with C extensions.

## Your First C Program

Create a file called `hello.c`:

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

Compile and run:

```bash
gcc hello.c -o hello
./hello
```

## Understanding the Basics

- **`#include <stdio.h>`** — imports the Standard Input/Output library
- **`int main()`** — the entry point of every C program
- **`printf()`** — prints formatted output to the screen
- **`\n`** — newline character

## Variables in C

C is statically typed — you must declare the type of every variable:

```c
int age = 25;
float price = 19.99f;
char grade = 'A';
```

Unlike Python, you can't change a variable's type after declaration.

## Reading Input with `scanf`

```c
#include <stdio.h>

int main() {
    int age;
    printf("Enter your age: ");
    scanf("%d", &age);
    printf("You are %d years old.\n", age);
    return 0;
}
```

`scanf` reads input from the keyboard. The `&` gets the memory address of the variable — we'll understand why when we cover pointers.

> **💡 Tip:** C will let you do dangerous things like accessing memory you don't own. Always compile with warnings enabled: `gcc -Wall -Wextra yourfile.c` — it catches many common mistakes.
