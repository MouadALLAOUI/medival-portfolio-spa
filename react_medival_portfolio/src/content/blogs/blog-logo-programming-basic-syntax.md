# Logo Programming: Basic Syntax

Logo is one of the simplest programming languages ever created, designed specifically to teach kids and beginners how to think like a programmer. At its heart, Logo controls a little turtle that moves around the screen and draws lines as it goes.

## What is Logo?

Logo was invented in the 1960s by Wally Feurzeig, Seymour Papert, and Cynthia Solomon. The idea was to make programming feel more like a conversation with a robot rather than writing complex code. The "turtle" is your avatar — a small triangle that follows your commands and leaves a trail behind it.

## The Turtle and Basic Movement

The core commands are dead simple. You tell the turtle where to go, and it draws a path along the way:

```
FD 50    ; Forward 50 steps
BK 30    ; Back 30 steps
LT 90    ; Left turn 90 degrees
RT 90    ; Right turn 90 degrees
```

`FD` (Forward) moves the turtle forward by the number of steps you specify. `BK` (Back) moves it backward. `LT` and `RT` rotate the turtle left or right by a given angle in degrees.

## Drawing with Pen Up and Pen Down

By default, the turtle has its pen down, meaning it draws as it moves. You can lift the pen to move without leaving a trace:

```
PENUP
FD 100
PENDOWN
FD 50
```

This creates a gap in the drawing. The turtle moves forward 100 steps with no line, then puts the pen back down and draws for 50 more steps.

## Putting It Together

A simple square looks like this:

```
FD 100
RT 90
FD 100
RT 90
FD 100
RT 90
FD 100
RT 90
```

Notice the pattern — move forward, turn right, repeat four times. This is actually the beginning of understanding loops, which we will cover later.

## Custom Procedures

You can create your own commands by wrapping a set of instructions in a named procedure:

```
TO SQUARE
  FD 100
  RT 90
  FD 100
  RT 90
  FD 100
  RT 90
  FD 100
  RT 90
END

SQUARE
```

Now you can type `SQUARE` and the turtle draws the whole shape. This is the ancestor of the modern function.

> 💡 Tip: Logo is a great way to understand procedural thinking without getting bogged down by syntax. If you can command a turtle, you can program a computer.
