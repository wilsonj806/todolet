# Client State
## Overview
This doc overviews how client-side state management will be setup/ done. Chances are it's going to be done with Redux, which, in my understanding of it, requires some level of planning.

## Global State
### What's stored
Global state is only going to include two general things:
- User state
- Todos state

User state only really needs to store:
- current session user
  - includes user ID, username, and probably the session ID
  - includes an avatar if that's included
- Filters for the todos(tags, projects, etc)

Todos state only needs to handle todos, but that's actually more complex than the User state

### What needs updates
For the most part User state only really needs updating if:
- the user updates their information, but this is done via the backend
- the user logs out

Todo state on the other hand, needs to handle the below updates:
- add a new todo
- search for a todo
- delete a todo
- update a todo
- sort todos

## Async State
As some of the state we handle is asynchronous in nature, we'll need a way to handle it all. Redux doesn't natively handle it, but there are other libraries/ frameworks that help handle it.

Redux Saga, and Redux Thunk are probably the two choices for it right now.

Redux Thunk has the advantage of being one of the libraries mentioned in the Redux docs. It's covered in the Advanced Tutorials section and seems straightforwards to use especially with `async/await`.

Redux Saga does the same job as Redux Thunk, but uses ES6 generators instead to handle side-effects. Part of the big thing for Redux Saga is the ability to easily test your side-effects and for the ability to keep your actions pure(i.e not mixing functions and objects).

Both are worth looking at but for this project, Reduxis probably going to be the choice for simplicity/ learnability.

## Store shape
So this is probably what the store will look like in the form of a TypeScript interface. Pretty straight forwards but data is sorted like it's database data.

```ts
interface UserStoreShape {
  userID: String | undefined
  username: String | undefined
  sessionID: String | undefined
  sortTodoBy: String | undefined
  projectFilters: Array<String>
  tagFilters: Array<String>
}

interface TodoStoreShape {
  id: Number
  userID: String
  priority: "HIGH" | "MEDIUM" | "LOW"
  todoText: String
  projectFilter: String | undefined
  tagFilter: String | undefined
}

interface StoreShape {
  currentUser: UserStoreShape
  todosList: TodoStoreShape
}


```

## Actions
As mentioned briefly above, there are several types of actions we can dispatch.
- note these don't account for async
```ts
type UserActions = "POST_LOGIN" | "POST_LOGOUT" | "PATCH_INFO" |
  "POST_FILTER" | "DELETE_FILTER" | "LOGIN_GUEST" | "POST_NEW_USER"

type TodoActions = "GET_TODOS" | "PATCH_TODO" | "DELETE_TODO" | "FILTER_TODOS" | "SORT_TODOS"

```

Note that a lot of these actions are going to end up being asynchronous, so we'll need to have `INIT`, `FAIL`, `SUCCESS` modifiers for all of them.

So accounting for async these are the user actions:
```ts
type SyncUserActions = "POST_FILTER" | "DELETE_FILTER" | "LOGIN_GUEST"

type AsyncUserLogin = "POST_LOGIN_INIT" | "POST_LOGIN_FAIL" |"POST_LOGIN_SUCCESS"

type AsyncUserLogout = "POST_LOGOUT_INIT" |
  "POST_LOGOUT_FAIL" | "POST_LOGOUT_SUCCESS"

type AsyncUserUpdate = "PATCH_INFO_INIT" | "PATCH_INFO_FAIL" | "PATCH_INFO_SUCCESS"

type AsyncUserFilter = "POST_FILTER_INIT" | "POST_FILTER_FAIL" | "POST_FILTER_SUCCESS" | "DELETE_FILTER_INIT" | "DELETE_FILTER_FAIL" | "DELETE_FILTER_SUCCESS"

type UserActions = AsyncUserLogin | AsyncUserLogout | AsyncUserUpdate | AsyncUserFilter | SyncUserActions

```

And accounting for async, thse are the todo actions:
```ts
type SyncTodoActions = "GET_TODOS" | "UPDATE_TODO" | "DELETE_TODO" | "FILTER_TODOS" | "SORT_TODOS"

type AsyncTodoRead = "GET_TODOS_INIT" | "GET_TODOS_FAIL" | "GET_TODOS_SUCCESS" | "SEARCH_TODOS_INIT" | "SEARCH_TODOS_FAIL" | "SEARCH_TODOS_SUCCESS"

type AsyncTodoPost = "POST_TODO_INIT" | "POST_TODO_FAIL" | "POST_TODO_SUCCESS"

type AsyncTodoPatch = "PATCH_TODO_INIT" | "PATCH_TODO_FAIL" | "PATCH_TODO_SUCCESS"

type AsyncTodoDelete = "DELTE_TODO_INIT" | "DELETE_TODO_FAIL" | "DELETE_TODO_SUCCESS"

type TodoActions = SyncTodoActions | AsyncTodoRead | AsyncTodoPost | AsyncTodoPatch | AsyncTodoDelete
```