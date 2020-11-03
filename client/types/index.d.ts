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
import { userDataResponse, responseObj, postUserReq, postLoginReq, errorResponse } from "../../server/types";
import { AnyAction } from 'redux'


export = AnotherTodoClient;
export as namespace Client;

declare global {
  interface Window {
    __REDUX_DATA__?: StoreShape
  }
}
declare namespace AnotherTodoClient {
  // ----- NOTE Service types and interfaces
  type ServiceStatus = 'FAILURE' | 'SUCCESS'
  interface AsyncServiceReturn extends {} {
    status : ServiceStatus
    msg ?: string
    payload ?: any
  }

  interface ServiceSuccessObject extends AsyncServiceReturn {
    status : 'SUCCESS'
    payload ?: any
  }

  interface ServiceFailObject extends AsyncServiceReturn {
    status : 'FAILURE'
    msg    : string
  }
  // ----- NOTE Local State
  type FiltersEntry = {
    color : string,
    name  : string
  }

  type FiltersArray = Array<FiltersEntry>

  // ----- NOTE THIRD PARTY NOTIFICATION STATE
  interface NotificationOptions {
    variant ?: string
    key ?: string | number | undefined
    [key: string] : any
  }
  interface Notifications {
    key ?: string | number | undefined
    message ?: string
    options ?: NotificationOptions
  }

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
    name            : string
    type          ?: string
    value         : string
    label         : string
    classes       ?: Object
    margin        ?: PropTypes.Margin
    reactHookFn   : Dispatch<SetStateAction<any>>
    [key: string] : any
  }

  interface SubmitBarProps {
    isUpdateBar     : boolean
    todo            ?: TodoShape
    reduxUpdateTodo ?: <T extends { [key in keyof TodoShape] ?: any }>(updatedValue: T) => (dispatch: any) => Promise<void>
  }

  type PriorityTypes = 'Low' | 'Medium' | 'High'
  interface TodoItemProps {
    todo  : TodoShape
    index  : number
  }

  interface PriorityDisplayProps {
    priority: PriorityTypes
    handleEditBtnClick : () => void
    handleDeleteBtnClick : () => void
  }

  interface TodoCheckboxProps {
    isCompleted : boolean
    reduxUpdateTodo : <T extends { [key in keyof TodoShape] ?: any }>(updatedValue: T) => (dispatch: any) => Promise<void>
  }

  // ----- NOTE Redux Action Types

  type SyncNotificationActions = "ENQUEUE_SNACKBAR" | "CLOSE_SNACKBAR" | "REMOVE_SNACKBAR"

  type SyncUserActions = "POST_FILTER" | "DELETE_FILTER" | "LOGIN_GUEST"

  type AsyncUserRegister = "POST_REGISTER_INIT" | "POST_REGISTER_FAIL" |"POST_REGISTER_SUCCESS"

  type AsyncUserLogin = "POST_LOGIN_INIT" | "POST_LOGIN_FAIL" |"POST_LOGIN_SUCCESS"

  type AsyncUserLogout = "POST_LOGOUT_INIT" |
    "POST_LOGOUT_FAIL" | "POST_LOGOUT_SUCCESS"

  type AsyncUserUpdate = "PUT_USER_INIT" | "PUT_USER_FAIL" | "PUT_USER_SUCCESS"

  type AsyncUserDelete = "DELETE_USER_INIT" | "DELETE_USER_FAIL" | "DELETE_USER_SUCCESS"

  type AsyncUserFilter = "POST_FILTER_INIT" | "POST_FILTER_FAIL" | "POST_FILTER_SUCCESS"

  type AsyncUserDeleteFilter = "DELETE_FILTER_INIT" | "DELETE_FILTER_FAIL" | "DELETE_FILTER_SUCCESS"


  type SyncTodoActions = "GET_TODOS" | "UPDATE_TODO" | "DELETE_TODO" | "FILTER_TODOS" | "SORT_TODOS"

  type AsyncTodoRead = "GET_TODOS_INIT" | "GET_TODOS_FAIL" | "GET_TODOS_SUCCESS" | "SEARCH_TODOS_INIT" | "SEARCH_TODOS_FAIL" | "SEARCH_TODOS_SUCCESS"

  type AsyncTodoPost = "POST_TODO_INIT" | "POST_TODO_FAIL" | "POST_TODO_SUCCESS"

  type AsyncTodoPatch = "PUT_TODO_INIT" | "PUT_TODO_FAIL" | "PUT_TODO_SUCCESS"

  type AsyncTodoDelete = "DELETE_TODO_INIT" | "DELETE_TODO_FAIL" | "DELETE_TODO_SUCCESS"


  type UserActionTypes = AsyncUserRegister | AsyncUserLogin | AsyncUserLogout | AsyncUserUpdate | AsyncUserDelete |
    AsyncUserFilter | AsyncUserDeleteFilter | SyncUserActions

  type TodoActionTypes = SyncTodoActions | AsyncTodoRead | AsyncTodoPost | AsyncTodoPatch | AsyncTodoDelete


  // ----- NOTE Redux Actions
  interface ReduxAction extends AnyAction{
    type          : UserActionTypes | TodoActionTypes | SyncNotificationActions
    [key: string] : any
  }

  interface SyncUserAction implements ReduxAction {
    type    : SyncUserActions
    payload ?: any
  }

  interface AsyncRegisterAction implements ReduxAction {
    type    : AsyncUserRegister
    payload ?: postUserReq | userDataResponse | errorResponse
  }

  interface AsyncLoginAction implements ReduxAction {
    type    : AsyncUserLogin
    payload ?: userDataResponse | postLoginReq | errorResponse
  }

  interface AsyncUserUpdateAction implements ReduxAction {
    type    : AsyncUserUpdate
    payload ?: UserStoreShape | UserDataOptional | errorResponse
  }

  interface AsyncLogOutAction implements ReduxAction {
    type    : AsyncUserLogout
    payload ?: responseObj
  }

  interface NotificationActionPayload {
    key ?: string | number | undefined
    notification ?: Notifications
    dismissAll ?: any
  }
  interface NotificationAction implements ReduxAction {
    type: SyncNotificationActions
    payload : NotificationActionPayload
  }

  interface UserDataOptional {
    avatar         ?: string | undefined
    sessionId      ?: string | undefined
    sortTodoBy     ?: string | undefined
    projectFilters ?: Array<any>
    tagFilters     ?: Array<any>
  }

  interface ClientServerConnectShape {
    isFetching : boolean
    staleDataFrom ?: string | undefined
  }
  interface UserStoreShape extends UserDataOptional {
    userId         : string | undefined
    username       : string | undefined
    todos          : Array<any> | undefined
  }

  interface TodoShape {
    _id           ?: string
    isCompleted   : boolean
    priority      : PriorityTypes
    todo          : string
    userIndex     : number
    projectFilter ?: string | undefined
    tagFilter     ?: string | undefined
  }

  interface StoreShape {
    clientServerConnect : ClientServerConnectShape
    authorizedUser : UserStoreShape
    todosList : Array<TodoShape>
    notifications : Array<Notifications>
  }

  // ----- NOTE Test Helpers
  interface RouterTestProps {
    startingPath ?: string
    targetPath   : string
    history      : History<any>
  }
  interface renderRouterFixtureConfig {
    startingPath ?: string
    targetPath : string
  }
}

declare module 'AnotherTodoClient' {
  export = AnotherTodoClient;
}