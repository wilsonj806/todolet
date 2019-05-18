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