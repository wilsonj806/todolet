# Assorted notes

## Async Notes

- You don't need to provide a callback function for a lot of async methods that return a `Promise<T>` if you're using async/ await
  - see below:
  ```ts
  try {
    const result = await User.find({username: username});
    if (result.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(password, salt);
      const user = await User.create({ username: username, password: newPass });
      console.log('I am sending a response');
    } else {
      const resJson: responseObj = {
        msg: `Error, user with username: ${username} exists already`
      }
      res.status(400).json(resJson);
    }
  }
  ```
  - basically don't mix both callback functions AND async/ await expressions because something is going to probably break

## Express Session Notes

### References

- [Express session repo](https://github.com/expressjs/session)
- [Connect MongoDB Session repo](https://github.com/mongodb-js/connect-mongodb-session#readme)

To configure an `express-session` you'll need the following at the very least:
  ```ts
    type exampleSess = {
      secret            : string
      resave            : boolean
      saveUninitialized : boolean
      store             : session.Store
      cookies           : express.CookieOption
    }
  ```
- "store" is a type of Node `EventEmitter` that handles CRUD operations on sessions
  - this means a database is invovled
- The "secret" key is a unique string that should be imported from your `.env` file
- "resave" forces the session to be saved back to the store even if nothing changed
  - this might end up creating race conditions, where a client might make two parallel requests, with one getting overwritten even if nothing changed
- "saveUninitialized" forces a session that is "uninitialized" to be saved to the store. A session is uninitialized when it is new but not modified.
  - `false` is recommended to prevent race conditions, **comply with data privacy laws**, implementing login sessions, or reducing server storage usage

In terms of the `CookieOption`, it should include some of the below:
  ```ts
    type exampleCookie = {
      maxAge  : number | null // in milliseconds
      secure : boolean
    }
  ```
- "maxAge" sets an expiration time for sessions
- "secure" when set to `true` basically restricts websites that can access cookies to HTTPS-enabled sites

## IIFE breakdown

Note the below might not be technically correct, but it's the way I mentally work it out.

IIFEs are immediately invoked function expressions and look like the below(without using arrrow functions):
  ```js
    (function(args) {
      doStuff(args)
    })(args)
  ```
The same IIFE but as an arrow function for clarity purposes:
  ```js
    ((args) => {
      doStuff(args)
    })(args)
  ```
There are two parts to this, there's the function declaration in the grouping operator, and there's the extra parentheses after that with function arguments passed in.

Several things happen:
1. first the function is temporarily stored in the JS engine's memory(i.e not Global memory)
2. then it's immediately invoked with the args passed in
  - note that this looks about the same as doing the below:
    ```js
      const storedInMemFn = (args) => {
        doStuff(args)
      };
      storedInMemFn(args)
    ```
  - where `storedInMemFn` is a variable stored in global memory whose value is a function
  - same principle as the below:
    ```js
      import express from 'express';
      const app = express();
    ```
  - where express is invoked as a function after import
3. finally, the function is cleared from memory as the engine was told not to save it

See below for some extra reading on how the JS engine executes code:
- [medium article 1](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)
- [blog article](https://www.valentinog.com/blog/context/)