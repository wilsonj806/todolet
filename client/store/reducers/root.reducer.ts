import { combineReducers, Reducer } from 'redux'
import { POST_LOGIN_INIT, POST_LOGIN_FAIL, POST_LOGIN_SUCCESS } from '../../actions/userLogin.action';
import { POST_LOGOUT_FAIL, POST_LOGOUT_SUCCESS, POST_LOGOUT_INIT } from '../../actions/userLogout.action';
import { POST_REGISTER_FAIL, POST_REGISTER_INIT, POST_REGISTER_SUCCESS } from '../../actions/userRegistration.action';
import { PUT_USER_INIT, PUT_USER_FAIL, PUT_USER_SUCCESS } from '../../actions/userUpdate.action';
import { DELETE_USER_SUCCESS, DELETE_USER_INIT, DELETE_USER_FAIL } from '../../actions/userDelete.action';
import { GET_TODOS_SUCCESS, GET_TODOS_INIT, GET_TODOS_FAIL } from '../../actions/todoGetAll.action';
import { POST_TODO_SUCCESS, POST_TODO_INIT, POST_TODO_FAIL } from '../../actions/todoAdd.action';
import { PUT_TODO_SUCCESS, PUT_TODO_INIT, PUT_TODO_FAIL } from '../../actions/todoUpdate.action';
import { DELETE_TODO_SUCCESS, DELETE_TODO_INIT, DELETE_TODO_FAIL } from '../../actions/todoDelete.action';
import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from '../../actions/notifications.action';
import {
  StoreShape,
  UserStoreShape,
  ReduxAction,
  ClientServerConnectShape,
  TodoShape,
  Notifications,
  NotificationAction
} from '../../types';



// FIXME something's really weird with some of the key names and how it aligns with other stuff
const INIT_USER_STATE : UserStoreShape = {
  userId: undefined,
  username: undefined,
  projectFilters: [],
  tagFilters: [],
  todos: [],
}

// NOTE this is new and won't be found in docs/CLIENTSTATE.md
const INIT_CLIENTSERVER_STATE : ClientServerConnectShape = {
  isFetching: false
}

const INIT_APP_STATE : StoreShape = {
  authorizedUser: INIT_USER_STATE,
  clientServerConnect: INIT_CLIENTSERVER_STATE,
  todosList: [],
  notifications: []
}

const todosList = (state: TodoShape[] = [], action: ReduxAction) : TodoShape[] => {
  switch(action.type) {
    case POST_TODO_SUCCESS:
    case GET_TODOS_SUCCESS:
    case DELETE_TODO_SUCCESS:
      return [...action.payload]
    case PUT_TODO_SUCCESS:
      const { id } = action.payload;
      const index = state.findIndex(ele => ele.id === id)
      const copyOfState = [...state];
      copyOfState[index] = action.payload
      return copyOfState
    default:
      return state
  }
}

const authorizedUser = (state : UserStoreShape = INIT_USER_STATE, action : ReduxAction): UserStoreShape => {
  switch (action.type) {
    case POST_LOGIN_SUCCESS:
    case POST_REGISTER_SUCCESS:
    case PUT_USER_SUCCESS:
      return { ...state, ...action.payload }
    case POST_LOGOUT_SUCCESS:
      return { ...INIT_USER_STATE }
    case DELETE_USER_SUCCESS:
      return {...INIT_USER_STATE }
    default:
      return state
  }
}

const clientServerConnect = (state: ClientServerConnectShape = INIT_CLIENTSERVER_STATE, action : ReduxAction) : ClientServerConnectShape => {
  switch (action.type) {
    case POST_LOGIN_INIT:
    case POST_LOGOUT_INIT:
    case PUT_USER_INIT:
    case POST_REGISTER_INIT:
    case DELETE_USER_INIT:
    case POST_TODO_INIT:
    case GET_TODOS_INIT:
    case PUT_TODO_INIT:
      return { ...state, isFetching: true }
    case POST_LOGIN_SUCCESS:
    case POST_LOGIN_FAIL:
    case POST_LOGOUT_SUCCESS:
    case POST_LOGOUT_FAIL:
    case POST_REGISTER_SUCCESS:
    case POST_REGISTER_FAIL:
    case PUT_USER_SUCCESS:
    case PUT_USER_FAIL:
    case DELETE_USER_SUCCESS:
    case DELETE_USER_FAIL:
    case POST_TODO_FAIL:
    case GET_TODOS_FAIL:
    case PUT_TODO_SUCCESS:
    case PUT_TODO_FAIL:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

const notifications = (state: Notifications[] = [], action: NotificationAction) : Notifications[] => {
  const { type, payload } = action;
  switch(type) {
    case ENQUEUE_SNACKBAR:
      return [
        ...state,
        {
          key: payload.key,
          ...payload.notification
        }
      ];
    case CLOSE_SNACKBAR:
      return state.map(notification =>
        (payload.dismissAll || notification.key === payload.key)
          ? { ...notification, dismissed: true }
          : { ...notification })
    case REMOVE_SNACKBAR:
      return state.filter(notification => notification.key !== payload.key)
    default:
      return state
  }
}


const rootReducer : Reducer<StoreShape> = combineReducers({
  authorizedUser,
  clientServerConnect,
  todosList,
  notifications
})

export default rootReducer
export { INIT_APP_STATE, INIT_CLIENTSERVER_STATE, INIT_USER_STATE }