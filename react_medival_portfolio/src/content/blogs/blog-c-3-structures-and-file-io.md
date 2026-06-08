# C 3: Structures and File I/O

So far you've worked with basic types and arrays. But real data is complex — a student has a name, age, GPA, and ID number all at once. Structures let you bundle related data together, and file I/O lets you save that data to disk.

## Defining a Structure

Use the `struct` keyword to create a custom data type:

```c
struct Student {
    char name[50];
    int age;
    float gpa;
};
```

Now you can create student variables:

```c
struct Student s1;
strcpy(s1.name, "Alice");
s1.age = 20;
s1.gpa = 3.8;
```

## The `typedef` Keyword

Typing `struct Student` everywhere gets tedious. `typedef` gives it a shorter alias:

```c
typedef struct {
    char name[50];
    int age;
    float gpa;
} Student;

Student s1 = {"Bob", 22, 3.5};
```

## Arrays of Structures

You can store multiple records in an array:

```c
Student class[] = {
    {"Alice", 20, 3.8},
    {"Bob", 22, 3.5},
    {"Charlie", 21, 3.9}
};

for (int i = 0; i < 3; i++) {
    printf("%s: %.1f\n", class[i].name, class[i].gpa);
}
```

## File I/O Basics

C uses `FILE*` pointers to work with files:

### Writing to a File

```c
#include <stdio.h>

int main() {
    FILE *fp = fopen("output.txt", "w");

    if (fp == NULL) {
        printf("Error opening file!\n");
        return 1;
    }

    fprintf(fp, "Name: %s\n", "Alice");
    fprintf(fp, "Age: %d\n", 20);

    fclose(fp);
    return 0;
}
```

### Reading from a File

```c
FILE *fp = fopen("output.txt", "r");

if (fp != NULL) {
    char line[100];
    while (fgets(line, sizeof(line), fp)) {
        printf("%s", line);
    }
    fclose(fp);
}
```

### Binary File I/O

For writing structures directly to files (faster, but not human-readable):

```c
Student s = {"Alice", 20, 3.8};

// Write
FILE *fp = fopen("student.dat", "wb");
fwrite(&s, sizeof(Student), 1, fp);
fclose(fp);

// Read
Student loaded;
fp = fopen("student.dat", "rb");
fread(&loaded, sizeof(Student), 1, fp);
fclose(fp);
```

## File Mode Summary

| Mode | Description |
|------|-------------|
| `"r"` | Read |
| `"w"` | Write (overwrites) |
| `"a"` | Append |
| `"rb"` | Read binary |
| `"wb"` | Write binary |

> **💡 Tip:** Always check if `fopen` returns `NULL` before using the file pointer. File operations can fail due to permissions, missing files, or disk issues.
