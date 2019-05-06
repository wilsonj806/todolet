# Database

## General Summary

We're going to need to employ some kind of database for sure in this project so that's what this doc is discussing. This doc will go through the general shape of the data and how the ORM will come into play.

## NoSQL vs SQL

This project is going to use a NoSQL for storing and fetching our data. The reason for this is that the data has very little need for relational keys. This can be seen in the below section with the proposed keys for our data.

For the most part, there is no relation or minimal relation between the data in our app. The user data will need to be related to the todos data, but we can sidestep that to a certain degree.

## Data Shape

This app will have two collections, a collection of users, and a collection of todos. The following is an example of the data being stored in JavaScript syntax:
  ```js
  const userEntry = {
    "id": Object.id(),
    "username": "jDoe123",
    "password": "adminButEncrypted"
  }

  const todoEntry = {
    "id": Object.id(),
    "todo_body": "Finish this project",
    "user": "localhost:27017/myDbName",
    "priority":"high",
    "date_added": "2/3/18"
    "tags": ["a", "b", "c"]
  }
  ```
Note that in MongoDB, the `"id"` field is automatically generated so we don't have to specify it.

As the app and or backend of the app will be adhering to most REST API standards, so in the todo entry there's a URL to an endpoint instead.

This means we can use that to fetch the user's information at the application side of things, and also serves as an alternate to relational keys that SQL provides.

The above as a Mongoose schema would look like:
  ```js
  const UserSchema = mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  });

  const TodoSchema = mongoose.Schema({
    todo_body: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    priority: {
      type: String,
      required: false
    },
    date_added: {
      type: Date,
      required: true
    },
    tags: {
      type: [String],
      required: true
    },
  });
  ```
- Also worth looking into this [Mongoose plugin](https://www.npmjs.com/package/mongoose-type-url) for adding a URL Schema type, or email Schema types if that happens.
