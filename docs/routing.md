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

## Extra Credit

The below routes would be extra:
```js
// PUT updated user info(passwords)

// POST a todo to Google Calendars

// GET all todos based on a filter
```

These are all pretty self-explantory and if we're posting to Google Calendars we can also use Google to authenticate user profiles as well. There's plenty of features or other quality of life type routes to add and this list is nowhere close to comprehensive.
