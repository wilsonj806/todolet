import { combineReducers, Reducer } from 'redux'
import { POST_LOGIN_INIT, POST_LOGIN_FAIL, POST_LOGIN_SUCCESS } from '../../actions/userLogin.action';
import { POST_LOGOUT_FAIL, POST_LOGOUT_SUCCESS, POST_LOGOUT_INIT } from '../../actions/userLogout.action';
import { POST_REGISTER_FAIL, POST_REGISTER_INIT, POST_REGISTER_SUCCESS } from '../../actions/userRegistration.action';
import { PUT_USER_INIT, PUT_USER_FAIL, PUT_USER_SUCCESS } from '../../actions/userUpdate.action';
import { DELETE_USER_SUCCESS, DELETE_USER_INIT, DELETE_USER_FAIL } from '../../actions/userDelete.action';
import { StoreShape, UserStoreShape, ReduxAction, ClientServerConnectShape } from '../../types';

// FIXME something's really weird with some of the key names and how it aligns with other stuff
const INIT_USER_STATE : UserStoreShape = {
  userId: undefined,
  email: undefined,
  username: undefined,
  projectFilters: [],
  tagFilters: [],
}

// NOTE this is new and won't be found in docs/CLIENTSTATE.md
const INIT_CLIENTSERVER_STATE : ClientServerConnectShape = {
  isFetching: false
}

const INIT_APP_STATE : StoreShape = {
  authorizedUser: INIT_USER_STATE,
  clientServerConnect: INIT_CLIENTSERVER_STATE
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
      return {... INIT_USER_STATE }
    default:
      return state
  }
}

const globalErrors = (state: any, action : ReduxAction) => {
  switch (action.type) {
    case POST_LOGIN_FAIL:
    case POST_LOGOUT_FAIL:
    case POST_REGISTER_FAIL:
    case PUT_USER_FAIL:
      return { ...state, ...action.payload }
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
      return { ...state, isFetching: true }
    case POST_LOGIN_SUCCESS:
    case POST_LOGIN_FAIL:
    case POST_REGISTER_SUCCESS:
    case POST_REGISTER_FAIL:
    case PUT_USER_SUCCESS:
    case PUT_USER_FAIL:
    case DELETE_USER_SUCCESS:
    case DELETE_USER_FAIL:
      return { ...state, isFetching: false }
    default:
      return state
  }
}


const rootReducer : Reducer<StoreShape> = combineReducers({
  authorizedUser,
  clientServerConnect,
})

export default rootReducer
export { INIT_APP_STATE, INIT_CLIENTSERVER_STATE, INIT_USER_STATE }