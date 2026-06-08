# Algorithm 3: Conditional Operations

Conditional operations let your program make decisions. Instead of doing the same thing every time, your program can choose different paths depending on the situation. This is where programs start to feel smart.

## The IF Statement

The simplest conditional checks one condition and runs code only if it is true:

```
IF age >= 18
  PRINT "You are an adult"
END IF
```

If the condition is false, the code inside the block is skipped entirely.

## IF-ELSE

When you want two possible outcomes, add an `ELSE` branch:

```
IF temperature > 30
  PRINT "It is hot outside"
ELSE
  PRINT "It is cool outside"
END IF
```

One of the two blocks will always run.

## ELSE IF

For more than two possibilities, chain multiple conditions:

```
IF grade >= 90
  PRINT "Excellent"
ELSE IF grade >= 70
  PRINT "Good"
ELSE IF grade >= 50
  PRINT "Average"
ELSE
  PRINT "Needs improvement"
END IF
```

The conditions are checked from top to bottom. Once one is true, its block runs and the rest are skipped.

## Comparison Operators

These operators compare two values and return true or false:

- `==` equals
- `!=` not equals
- `>` greater than
- `<` less than
- `>=` greater than or equal to
- `<=` less than or equal to

## Logical Operators

You can combine multiple conditions using logical operators:

- `AND` — both conditions must be true
- `OR` — at least one condition must be true
- `NOT` — reverses the condition

```
IF age >= 18 AND hasTicket
  PRINT "Welcome to the movie"
END IF
```

## Nested Conditions

You can put one conditional inside another for more complex decisions:

```
IF isWeekend
  IF isSunny
    PRINT "Go to the park"
  ELSE
    PRINT "Stay home"
  END IF
ELSE
  PRINT "Go to work"
END IF
```

> 💡 Tip: Keep your conditions simple. If you find yourself nesting more than three levels deep, it is time to rethink the logic or split it into functions.
