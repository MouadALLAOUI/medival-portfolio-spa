# JavaScript DOM Manipulation for Beginners

The **Document Object Model (DOM)** is a tree-like representation of your HTML. With JavaScript, you can **read and modify** it in real time.

## Selecting Elements

```js
document.getElementById("title");
document.querySelector(".btn");
document.querySelectorAll("li");
```

## Changing Content

```js
const heading = document.getElementById("title");
heading.textContent = "Updated Title!";
heading.innerHTML = "<em>New italic title</em>";
```

## Modifying Styles

```js
heading.style.color = "red";
heading.style.fontSize = "2rem";
```

## Adding/Removing Classes

```js
const box = document.querySelector(".box");
box.classList.add("highlight");
box.classList.remove("old-style");
box.classList.toggle("visible");
```

## Creating New Elements

```js
const newLi = document.createElement("li");
newLi.textContent = "New item";
document.querySelector("ul").appendChild(newLi);
```

## Event Listeners

```js
button.addEventListener("click", () => {
  alert("Button clicked!");
});
```

> 🧪 Try building a todo list that adds and removes items.

DOM manipulation turns static sites into dynamic apps.