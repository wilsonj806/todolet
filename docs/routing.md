# Routing

## General Summary

The bare minimum routing for the app is pretty simple. There's also plenty of room to build on that, and this doc will discuss both.

## Bare Minimum

The app needs to handle routes to the following:
```js
// POST new user

// GET user info and validate it

// GET all todos associated with a user

// POST new todo

// PUT an updated todo(completed, edited)

// GET single user
```

The two three routes deal with users and more specifically the below:
- registration of a new user
- validation of a login request of a particular session of the app

The last three routes deal with todos and are detailed below:
- get all todos that are tied to a user
- post a new todo for that user
- update a todo for a user
- said update may include some of the below:
- is the todo completed
- does the todo message/ body need updating
- is the todo priority level changing

Also reference the [IETF standard](https://tools.ietf.org/html/rfc6570) on proper URI templating.

## Extra Credit

The below routes would be extra:
```js
// PUT updated user info(passwords)

// POST a todo to Google Calendars

// GET all todos based on a filter
```

These are all pretty self-explantory and if we're posting to Google Calendars we can also use Google to authenticate user profiles as well. There's plenty of features or other quality of life type routes to add and this list is nowhere close to comprehensive.


## URIs

URIs for making backend requests will probably look like this:

- `/`                                           : Home
- `/user`                                       : User
  - `/user/:id`                                 : General user lookup(**optional, figure out what to do with it**)
  - `/user/login`                               : Login
  - `/user/logout`                              : Logout
  - `/user/delete`                              : Delete user(**optional**)
  - `/user/register`                            : Register
- `/todos`                                      : Todos
  - `/todos/:userid`                            : GET todos of a certain UserID val
  - `/todos/:userid`                            : POST todos of a certain UserID val
  - `/todos/search/:userid/:tag`                : Search todos for a user and for a tag
  - `/todos/search/:userid/?filter={filterVal}` : Search todos but filter them by a certain value

### Notes for the above
- for the `/todos/search/:userid/?filter={filterVal}` route:
  - search for the todos of a particular user with any filters
      - based off of a form as indicated with the `?` char
- for the `/todos/search/:userid/:tag` route:
    - search for the todos of a particular user with tags
- for the `/todos/:userid` POST route:
  - does what it sounds like it does, should have the following JSON format in the request:
    ```js
      // implementation not exact, but the client code will know the endpoint so it'd handle making it
      const sampleUserId = 'https://wj-anothertodo.herokuapp.com/user/' + userIdString
      const sampleJson = {
        userid: sampleUserId,
        todo_body: "aaaaaaaaaa",
        priority: "high",
        date_added: "",
        tags: []
      }
    ```

Reference some of the below for more:
- [MDN reference on the URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)
  - [MDN reference on `encodeURI()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)
- [Node.js URL module](https://nodejs.org/api/url.html)
- [Quick JSFiddle to demonstrate the URL object](https://jsfiddle.net/wilsonj806/0umh3ey7/)