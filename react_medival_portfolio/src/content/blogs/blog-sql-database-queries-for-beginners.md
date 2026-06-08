# SQL: Database Queries for Beginners

SQL (Structured Query Language) is how you talk to databases. Whether you're building a website, analyzing data, or managing an application's backend, SQL is the language that retrieves, inserts, updates, and deletes information. It's been around since the 1970s and isn't going anywhere.

## What is SQL?

SQL is a declarative language — you describe *what* data you want, not *how* to get it. The database engine figures out the most efficient way to execute your request.

## SELECT — Reading Data

The most fundamental SQL command:

```sql
SELECT * FROM users;
```

This retrieves all columns from the `users` table. To pick specific columns:

```sql
SELECT name, email FROM users;
```

## WHERE — Filtering Results

Add conditions to narrow down results:

```sql
SELECT name, age FROM users WHERE age > 25;
SELECT * FROM orders WHERE status = 'shipped';
SELECT * FROM products WHERE price BETWEEN 10 AND 50;
```

Common comparison operators: `=`, `!=`, `<`, `>`, `<=`, `>=`, `LIKE`, `IN`, `BETWEEN`.

## INSERT — Adding Data

```sql
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@example.com', 30);
```

You only need to specify columns you're providing values for (others use defaults).

## UPDATE — Modifying Data

```sql
UPDATE users
SET age = 31
WHERE name = 'Alice';
```

**Always use a `WHERE` clause** with UPDATE — without it, every row in the table gets updated.

## DELETE — Removing Data

```sql
DELETE FROM users WHERE name = 'Alice';
```

Same warning: no `WHERE` means deleting everything.

## ORDER BY — Sorting Results

```sql
SELECT * FROM users ORDER BY name ASC;    -- A to Z
SELECT * FROM users ORDER BY age DESC;    -- oldest first
```

## LIMIT — Restricting Output

```sql
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;
```

Returns only the 10 most recent users — essential for pagination.

## Creating a Table

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

- **PRIMARY KEY** — uniquely identifies each row
- **NOT NULL** — column cannot be empty
- **UNIQUE** — no duplicate values allowed

## Data Types You'll Use

| Type | Use For |
|------|---------|
| INT | Whole numbers |
| VARCHAR(n) | Text up to n characters |
| TEXT | Long text |
| DECIMAL | Precise numbers (money) |
| DATE | Calendar dates |
| BOOLEAN | True/False values |

> **💡 Tip:** Always test your queries with SELECT before running UPDATE or DELETE. Seeing what will be affected saves you from accidental data disasters.
