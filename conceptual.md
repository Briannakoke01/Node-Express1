### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript? Callsbacks, promises, async/await, event listeners and observables

- What is a Promise? an object that represents the eventual completion or failure of a asynchronous operation

- What are the differences between an async function and a regular function? async is defined with the async keyword and allows the use of await to pause execution unti a promise is resolved. A regular function does not have the async keyword and does not support the use of await.

- What is the difference between Node.js and Express.js? Node- A runtime environment that allows JavaScript to run on the server side. It provides built-in modules for file handling, networking, and operating system operations.
Express.js- A lightweight framework built on top of Node.js specifically for building web applications and APIs. It simplifies handling HTTP requests, routing, middleware, and response management, making it easier to build robust web servers.

- What is the error-first callback pattern? It's a standard in Node.js where call backs expect the first argument to be an error object and the subsequent arguments contain any resulting data. This pattern allows errors to be easily handled before accessing data, providing a straightforward way to manage asynchronous error handling.

- What is middleware? is a function in express.js that processes requests before they reach the final route handler. It can manipulate the request and response objects, log requests, handle erroers, authenticate users, or apply any other processing needed across multiple routes. 

- What does the `next` function do? it is used to pass control from one iddleware function to the next in the request-response cycle. 

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

The code could be improved by using Promise.all to make the requests concurrently rather than sequentially, which would significantly boost performance. Additionally, the return order should match the request order to enhance readability and consistency. Error handling is missing, so wrapping the function in a try-catch block would make it more robust, allowing for graceful handling of failures. The variable names elie, joel, and matt are specific, which limits scalability; using an array or more generic names would make it adaptable to more users. Finally, the usernames are hardcoded, making the function less reusable; instead, it would be better to pass usernames as parameters to generalize the function for different inputs.
