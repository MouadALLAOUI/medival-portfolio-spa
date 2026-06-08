# Flowcharts: Visualizing Logic

Before writing code, it helps to see the logic visually. Flowcharts are diagrams that represent the steps of an algorithm using simple shapes and arrows. They make complex logic easy to understand at a glance.

## What is a Flowchart?

A flowchart is a visual representation of a process or algorithm. Each step is drawn as a shape, and arrows connect them to show the flow of control from one step to the next.

Flowcharts are useful for planning, documenting, and communicating algorithms to people who may not read code.

## The Standard Symbols

Different shapes represent different types of steps:

- **Oval**: Start or End — every flowchart begins and ends with an oval
- **Rectangle**: Process — an action or operation, like calculating a value
- **Diamond**: Decision — a yes/no or true/false question that branches the flow
- **Arrow**: Flow line — shows the direction of movement between steps
- **Parallelogram**: Input/Output — reading data or displaying results

## How to Draw a Flowchart

Start with the first oval labeled "Start." Follow these steps:

1. Write down each step of your algorithm
2. Assign the correct shape to each step
3. Connect the shapes with arrows
4. End with an oval labeled "End"

## Example: Check Even or Odd

Here is a text representation of a simple flowchart:

```
[Start]
   |
   v
[Input number]
   |
   v
<Is number MOD 2 == 0?>
   |              |
  Yes            No
   |              |
   v              v
[Print "Even"]  [Print "Odd"]
   |              |
   +-------+------+
           |
           v
        [End]
```

## Example: Calculate Average

A more complex flowchart might look like this:

```
[Start]
   |
   v
[Set sum = 0, count = 0]
   |
   v
[Input number]
   |
   v
[sum = sum + number, count = count + 1]
   |
   v
<More numbers?>
   |         |
  Yes       No
   |         |
   v         v
[Input      [average = sum / count]
 number]       |
               v
           [Print average]
               |
               v
            [End]
```

## Tips for Good Flowcharts

- Keep shapes consistent throughout
- Use clear, concise labels
- Avoid crossing arrows
- Show decision branches for both outcomes
- Test your flowchart by tracing through it by hand

> 💡 Tip: A flowchart is not just documentation — it is a thinking tool. Drawing one before you code often reveals logic errors you would have missed otherwise.
