# Algorithm 4: Loops

Loops let you repeat code without writing it over and over. Instead of writing ten print statements, you write one loop that runs ten times. Loops are one of the most powerful concepts in programming.

## The FOR Loop

A `FOR` loop is ideal when you know exactly how many times to repeat:

```
FOR i FROM 1 TO 5
  PRINT i
END FOR
```

This prints the numbers 1 through 5. The variable `i` starts at 1 and increases by 1 each time until it reaches 5.

You can also count backwards or step by a different amount:

```
FOR i FROM 10 TO 1 STEP -1
  PRINT i
END FOR
```

## The WHILE Loop

A `WHILE` loop repeats as long as a condition remains true. You do not need to know the number of iterations beforehand:

```
count <- 0
WHILE count < 5
  PRINT count
  count <- count + 1
END WHILE
```

The condition is checked before each iteration. If it is false from the start, the loop body never runs.

## The DO-WHILE Loop

A `DO-WHILE` loop is similar but guarantees the body runs at least once because the condition is checked after each iteration:

```
DO
  PRINT "Enter password:"
  INPUT password
WHILE password != "secret"
```

## Loop Control

The `BREAK` statement exits a loop immediately:

```
FOR i FROM 1 TO 100
  IF i == 5
    BREAK
  END IF
  PRINT i
END FOR
```

The `CONTINUE` statement skips the rest of the current iteration and jumps to the next one:

```
FOR i FROM 1 TO 10
  IF i MOD 2 == 0
    CONTINUE
  END IF
  PRINT i
END FOR
```

This prints only odd numbers.

## Infinite Loops

An infinite loop runs forever because its condition never becomes false. This is usually a mistake:

```
WHILE TRUE
  PRINT "This never stops"
END WHILE
```

Infinite loops crash programs or freeze screens. Always make sure your loop condition can eventually become false.

> 💡 Tip: Before writing a loop, ask yourself two questions: what is the condition, and how does it change? If you cannot answer both, your loop might run forever.
