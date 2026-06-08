# SQL 2: JOINs, Subqueries, and Indexes

You know the basics —SELECT, INSERT, UPDATE, DELETE. But real databases have *multiple* tables that relate to each other. JOINs let you combine data from different tables, subqueries let you nest queries inside each other, and indexes make everything faster.

## Why JOINs?

Imagine two tables: `users` and `orders`. Each order has a `user_id` linking back to a user. To see who placed which order, you need to join them:

```sql
SELECT users.name, orders.product
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

## Types of JOINs

### INNER JOIN

Returns only rows that match in **both** tables:

```sql
SELECT users.name, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;
```

Users with no orders (and orders with no valid user) are excluded.

### LEFT JOIN

Returns all rows from the left table, and matching rows from the right:

```sql
SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
```

Users without orders show `NULL` for order columns.

### RIGHT JOIN

The opposite of LEFT JOIN — all rows from the right table:

```sql
SELECT users.name, orders.amount
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
```

### FULL JOIN (simulated in MySQL)

Returns all rows from both tables:

```sql
SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id
UNION
SELECT users.name, orders.amount
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;
```

## Subqueries

A subquery is a query inside another query:

```sql
SELECT name FROM users
WHERE id IN (SELECT user_id FROM orders WHERE amount > 100);
```

This finds all users who placed orders over $100.

## GROUP BY and HAVING

`GROUP BY` aggregates rows into groups:

```sql
SELECT user_id, COUNT(*) as order_count
FROM orders
GROUP BY user_id;
```

`HAVING` filters groups (like WHERE, but for aggregated data):

```sql
SELECT user_id, COUNT(*) as order_count
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 3;
```

## Indexes

An index is like a book's index — it helps the database find rows faster:

```sql
CREATE INDEX idx_email ON users(email);
```

Without an index, the database scans every row (full table scan). With an index, it jumps straight to matching rows.

### When to Add Indexes

- Columns used in `WHERE` clauses
- Columns used in `JOIN` conditions
- Columns you frequently sort or filter by

### When NOT to Overdo It

Indexes speed up reads but slow down writes (INSERT, UPDATE, DELETE) because the index must be updated too. Don't index everything — be strategic.

> **💡 Tip:** Use `EXPLAIN` before your query to see how the database plans to execute it. It shows whether indexes are being used or if you're doing a full table scan.
