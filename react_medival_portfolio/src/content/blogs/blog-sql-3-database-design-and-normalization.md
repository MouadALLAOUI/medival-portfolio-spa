# SQL 3: Database Design and Normalization

Writing queries is one thing — designing the database they run against is another. Good database design means less duplication, fewer bugs, and easier maintenance. Normalization is the process of organizing your tables to reduce redundancy and improve data integrity.

## ER Diagrams (Entity-Relationship)

Before writing SQL, sketch out your data model:

- **Entities** — things you store data about (Users, Orders, Products)
- **Attributes** — properties of entities (name, email, price)
- **Relationships** — how entities connect (a User *places* many Orders)

Tools like dbdiagram.io, Lucidchart, or even paper sketches help you visualize this.

## Primary Keys

Every table should have a primary key — a unique identifier for each row:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);
```

Use surrogate keys (like auto-increment IDs) rather than natural keys (like email) — they're more stable.

## Foreign Keys

Foreign keys link tables together:

```sql
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product VARCHAR(100),
    amount DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

This enforces referential integrity — you can't have an order for a user that doesn't exist.

## Normalization

### First Normal Form (1NF)

- Each cell contains a single value (no lists)
- Each row is unique

❌ Bad: `hobbies = "reading, hiking, gaming"` in one cell
✅ Good: Separate rows or a junction table for each hobby

### Second Normal Form (2NF)

- Already in 1NF
- Every non-key column depends on the *entire* primary key

If your table has a composite key (two columns), make sure every column relates to both parts — not just one.

### Third Normal Form (3NF)

- Already in 2NF
- No transitive dependencies (non-key columns don't depend on each other)

❌ Bad: In a users table, storing `city` and `zip_code` where `zip_code` determines `city`
✅ Good: Put zip/city info in a separate table

## Why Normalize?

- **Reduces duplication** — store data once, reference it everywhere
- **Prevents anomalies** — avoids contradictory data from partial updates
- **Makes maintenance easier** — change a value in one place, not fifty

## When to Denormalize

Normalization isn't absolute. Sometimes you *intentionally* duplicate data for performance (e.g., caching counts). The key is to do it deliberately, not by accident.

> **💡 Tip:** Start normalized, denormalize only when you have a measured performance problem. Premature optimization in database design creates maintenance nightmares.
