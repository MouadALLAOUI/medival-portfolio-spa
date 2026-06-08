# Java 3: Collections Framework

Arrays in Java are fixed-size — once you create one, its length never changes. That's limiting for real-world programs. The Collections Framework gives you flexible, powerful data structures that grow and shrink as needed.

## ArrayList

`ArrayList` is like a dynamic array — it resizes automatically:

```java
import java.util.ArrayList;

ArrayList<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Charlie");

System.out.println(names.get(0));  // Alice
System.out.println(names.size());  // 3

names.remove("Bob");
```

Elements are accessed by index (starting at 0), just like arrays.

## HashMap

`HashMap` stores key-value pairs — perfect for looking things up quickly:

```java
import java.util.HashMap;

HashMap<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

System.out.println(scores.get("Alice"));  // 95
System.out.println(scores.containsKey("Bob"));  // true
```

Keys must be unique. If you put a duplicate key, it overwrites the old value.

## HashSet

`HashSet` stores unique elements with no defined order:

```java
import java.util.HashSet;

HashSet<String> colors = new HashSet<>();
colors.add("red");
colors.add("green");
colors.add("red");  // ignored — duplicate

System.out.println(colors.size());  // 2
```

Use sets when you need to check if something exists without duplicates.

## Iterating with for-each

The for-each loop makes iterating over collections clean:

```java
ArrayList<String> fruits = new ArrayList<>();
fruits.add("apple");
fruits.add("banana");
fruits.add("cherry");

for (String fruit : fruits) {
    System.out.println(fruit);
}
```

## The Iterator

For more control (like removing elements during iteration), use an `Iterator`:

```java
import java.util.Iterator;

Iterator<String> it = fruits.iterator();
while (it.hasNext()) {
    String fruit = it.next();
    if (fruit.equals("banana")) {
        it.remove();  // safe removal
    }
}
```

## When to Use Which?

| Collection | Use When |
|------------|----------|
| ArrayList | You need ordered, indexed access |
| HashMap | You need fast lookups by key |
| HashSet | You need unique values, no order |
| LinkedList | You do lots of insertions/removals |

> **💡 Tip:** Always program to the interface (`List`, `Map`, `Set`) not the implementation. Declare `List<String>` instead of `ArrayList<String>` — it makes swapping implementations painless.
