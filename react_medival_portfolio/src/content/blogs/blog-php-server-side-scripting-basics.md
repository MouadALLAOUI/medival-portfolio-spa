# PHP: Server-Side Scripting Basics

PHP powers over 70% of websites on the internet — including WordPress, Facebook, and Wikipedia. It's a server-side language, meaning it runs on the web server before sending HTML to the user's browser. If you want to build dynamic websites, PHP is a practical starting point.

## What is PHP?

PHP (Hypertext Preprocessor) is a scripting language designed for web development. Unlike HTML which is static, PHP can process forms, connect to databases, handle sessions, and generate dynamic content on every page load.

## The PHP Tags

PHP code lives inside special tags:

```php
<?php
echo "Hello, World!";
?>
```

Everything between `<?php` and `?>` is processed by the PHP engine. The rest is treated as plain HTML.

## Variables in PHP

Variables start with `$` and don't need a declared type:

```php
$name = "Alice";
$age = 30;
$is_student = true;
$price = 19.99;
```

PHP is loosely typed — a variable can change its type freely.

## Output with `echo`

`echo` sends content to the browser:

```php
<?php
echo "<h1>Welcome!</h1>";
echo "<p>Your name is: " . $name . "</p>";
// The . concatenates strings
?>
```

## Arrays

PHP has three types of arrays:

```php
// Indexed array
$colors = ["red", "green", "blue"];

// Associative array (like a dictionary)
$person = ["name" => "Alice", "age" => 30];

// Multidimensional
$students = [
    ["name" => "Bob", "gpa" => 3.5],
    ["name" => "Carol", "gpa" => 3.8]
];
```

## Conditionals

```php
<?php
$score = 85;

if ($score >= 90) {
    echo "Grade: A";
} elseif ($score >= 80) {
    echo "Grade: B";
} else {
    echo "Grade: C";
}
?>
```

## Loops

```php
<?php
// for loop
for ($i = 0; $i < 5; $i++) {
    echo $i . " ";
}

// foreach for arrays
$fruits = ["apple", "banana", "cherry"];
foreach ($fruits as $fruit) {
    echo $fruit . "<br>";
}
?>
```

## Embedding PHP in HTML

The real power of PHP is mixing it with HTML:

```php
<?php for ($i = 1; $i <= 5; $i++): ?>
    <div class="card">
        <h2>Item #<?= $i ?></h2>
        <p>This is item <?= $i ?> of 5.</p>
    </div>
<?php endfor; ?>
```

> **💡 Tip:** Always use `htmlspecialchars()` when echoing user input to prevent XSS attacks: `echo htmlspecialchars($user_input);`. Security should be habit from day one.
