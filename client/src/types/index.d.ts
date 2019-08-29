/**
 * ==============================================
 *
 *       Type Definitions for Another Todo: Client
 *
 * ==============================================
 *
 * TypeScript Version: 3.2.4
 * Definitions by: Wilson Jiang
 *
 */

/// <reference types="react" />

export = AnotherTodoClient;
export as namespace Client;

declare namespace AnotherTodoClient {
  // ----- NOTE Local State
  type FiltersEntry = {
    color : String,
    name  : String
  }

  type FiltersArray = Array<FiltersEntry>

  // ----- NOTE Props
  interface BodyProps {
    children: ReactElement
  }

  interface MainProps {
    children  : ReactNode
    noPadding ?: Boolean
  }

  interface NavProps {
    id            ?: String
    className     ?: String
    [key: String] : any
  }

  interface TextInputWrapperProps {
    id            : string
    type          ?: string
    value         : string
    label         : string
    classes       ?: Object
    margin        ?: PropTypes.Margin
    reactHookFn   : Dispatch<SetStateAction<any>>
    [key: string] : any
  }

  // ----- NOTE Redux Actions
  type SyncUserActions = "POST_FILTER" | "DELETE_FILTER" | "LOGIN_GUEST"

  type SyncTodoActions = "GET_TODOS" | "UPDATE_TODO" | "DELETE_TODO" | "FILTER_TODOS" | "SORT_TODOS"

  type AsyncUserLogin = "POST_LOGIN_INIT" | "POST_LOGIN_FAIL" |"POST_LOGIN_SUCCESS"

  type AsyncUserLogout = "POST_LOGOUT_INIT" |
    "POST_LOGOUT_FAIL" | "POST_LOGOUT_SUCCESS"

  type AsyncUserUpdate = "PATCH_INFO_INIT" | "PATCH_INFO_FAIL" | "PATCH_INFO_SUCCESS"

  type AsyncUserFilter = "POST_FILTER_INIT" | "POST_FILTER_FAIL" | "POST_FILTER_SUCCESS" |
     "DELETE_FILTER_INIT" | "DELETE_FILTER_FAIL" | "DELETE_FILTER_SUCCESS"

  type AsyncTodoRead = "GET_TODOS_INIT" | "GET_TODOS_FAIL" | "GET_TODOS_SUCCESS" | "SEARCH_TODOS_INIT" | "SEARCH_TODOS_FAIL" | "SEARCH_TODOS_SUCCESS"

  type AsyncTodoPost = "POST_TODO_INIT" | "POST_TODO_FAIL" | "POST_TODO_SUCCESS"

  type AsyncTodoPatch = "PATCH_TODO_INIT" | "PATCH_TODO_FAIL" | "PATCH_TODO_SUCCESS"

  type AsyncTodoDelete = "DELTE_TODO_INIT" | "DELETE_TODO_FAIL" | "DELETE_TODO_SUCCESS"


  type UserActionTypes = AsyncUserLogin | AsyncUserLogout | AsyncUserUpdate | AsyncUserFilter | SyncUserActions

  type TodoActionTypes = SyncTodoActions | AsyncTodoRead | AsyncTodoPost | AsyncTodoPatch | AsyncTodoDelete

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
}

declare module 'AnotherTodoClient' {
  export = AnotherTodoClient;
}