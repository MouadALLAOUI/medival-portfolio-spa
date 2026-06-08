# JavaScript 4: Fetch API and Async Programming

JavaScript is single-threaded, meaning it can only do one thing at a time. Asynchronous programming lets JavaScript start a task, move on to other work, and come back when the task is done. This is essential for fetching data from APIs, loading files, and handling user interactions without freezing the page.

## What is Asynchronous?

Synchronous code runs line by line, waiting for each line to finish. Asynchronous code starts a task and continues running, handling the result when it's ready.

```javascript
// Synchronous - waits
console.log('First');
console.log('Second');
console.log('Third');

// Asynchronous - doesn't wait
console.log('First');
setTimeout(() => console.log('Second'), 1000);
console.log('Third');

// Output: First, Third, Second
```

## Callbacks

The original way to handle async operations. A callback is a function you pass to another function, to be called later.

```javascript
function fetchData(callback) {
    setTimeout(() => {
        const data = { name: 'Alice', age: 25 };
        callback(data);
    }, 1000);
}

fetchData(function(data) {
    console.log(data); // { name: 'Alice', age: 25 }
});
```

Callbacks work but can get messy when you chain multiple async operations (callback hell).

## Promises

Promises represent a value that will be available in the future. A promise can be pending, resolved, or rejected.

```javascript
const myPromise = new Promise((resolve, reject) => {
    const success = true;
    if (success) {
        resolve('Data loaded!');
    } else {
        reject('Something went wrong');
    }
});

myPromise
    .then(data => console.log(data))
    .catch(error => console.error(error));
```

Chaining promises is cleaner than nested callbacks.

```javascript
fetchData()
    .then(data => processData(data))
    .then(result => displayData(result))
    .catch(error => handleError(error));
```

## async/await

`async/await` is syntactic sugar over promises that makes async code look synchronous.

```javascript
async function loadData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
```

- `async` before a function makes it return a promise.
- `await` pauses execution until the promise resolves.
- `try/catch` handles errors.

## The Fetch API

`fetch()` is the modern way to make HTTP requests. It returns a promise that resolves to a Response object.

```javascript
// GET request
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// POST request
fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'Alice',
        email: 'alice@example.com'
    })
})
.then(response => response.json())
.then(data => console.log('Created:', data));
```

## Handling Errors

Always handle errors when making network requests.

```javascript
async function fetchUser(id) {
    try {
        const response = await fetch(`/api/users/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
}
```

## JSON Parsing

APIs usually return data as JSON strings. Use `response.json()` to parse it.

```javascript
async function getProducts() {
    const response = await fetch('/api/products');
    const products = await response.json(); // Parses JSON automatically
    console.log(products);
}
```

## Practical Example: Load and Display Data

```javascript
async function loadPosts() {
    const container = document.getElementById('posts');

    try {
        container.textContent = 'Loading...';

        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();

        container.innerHTML = posts.slice(0, 5).map(post => `
            <article>
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </article>
        `).join('');

    } catch (error) {
        container.textContent = 'Failed to load posts.';
        console.error(error);
    }
}

loadPosts();
```

## Parallel Requests

Run multiple fetches at the same time with `Promise.all`.

```javascript
async function loadDashboard() {
    const [users, posts, comments] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/comments').then(r => r.json())
    ]);

    console.log({ users, posts, comments });
}
```

> 💡 **Tip:** Always use `try/catch` with async/await to handle errors gracefully. Show the user a friendly message when something goes wrong instead of leaving the page in a broken state.
