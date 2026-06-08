# PHP 2: Working with MySQL

PHP and MySQL are a classic combo — together they form the "M" and "P" in the LAMP stack (Linux, Apache, MySQL, PHP). Almost every dynamic website needs a database, and MySQL is the most popular choice for PHP projects.

## Connecting to MySQL

Use `mysqli_connect` to establish a database connection:

```php
$conn = mysqli_connect("localhost", "username", "password", "database_name");

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
```

Always handle connection failures — never assume the database is always available.

## Querying Data

Use `mysqli_query` to run SQL commands:

```php
$result = mysqli_query($conn, "SELECT * FROM users");

while ($row = mysqli_fetch_assoc($result)) {
    echo $row["name"] . " - " . $row["email"] . "<br>";
}
```

`mysqli_fetch_assoc` returns each row as an associative array.

## The Danger of SQL Injection

Never put user input directly into a SQL query:

```php
// DANGEROUS — never do this!
$name = $_GET["name"];
$query = "SELECT * FROM users WHERE name = '$name'";
```

A malicious user could type `' OR '1'='1` and dump your entire database.

## Prepared Statements

Use prepared statements to keep queries safe:

```php
$stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE email = ?");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

while ($row = mysqli_fetch_assoc($result)) {
    echo $row["name"];
}
```

The `?` is a placeholder. The database treats it as data, not executable code.

## CRUD Operations

### Create (INSERT)

```php
$stmt = mysqli_prepare($conn, "INSERT INTO users (name, email) VALUES (?, ?)");
mysqli_stmt_bind_param($stmt, "ss", $name, $email);
mysqli_stmt_execute($stmt);
```

### Read (SELECT)

```php
$result = mysqli_query($conn, "SELECT * FROM users WHERE id = 1");
$user = mysqli_fetch_assoc($result);
```

### Update (UPDATE)

```php
$stmt = mysqli_prepare($conn, "UPDATE users SET email = ? WHERE id = ?");
mysqli_stmt_bind_param($stmt, "si", $newEmail, $userId);
mysqli_stmt_execute($stmt);
```

### Delete (DELETE)

```php
$stmt = mysqli_prepare($conn, "DELETE FROM users WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $userId);
mysqli_stmt_execute($stmt);
```

## Closing the Connection

```php
mysqli_close($conn);
```

Always close your connection when done. With `mysqli`, connections are usually closed automatically at script end, but it's good practice.

> **💡 Tip:** Use prepared statements for every query that includes user input. Even if you think it's safe, habits matter — one slip can expose your entire database.
