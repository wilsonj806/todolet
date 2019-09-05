import { combineReducers, Reducer } from 'redux'
import { POST_LOGIN_INIT, POST_LOGIN_FAIL, POST_LOGIN_SUCCESS } from '../../actions/userLogin.action';
import { POST_LOGOUT_FAIL, POST_LOGOUT_SUCCESS, POST_LOGOUT_INIT } from '../../actions/userLogout.action';
import { POST_REGISTER_FAIL, POST_REGISTER_INIT, POST_REGISTER_SUCCESS } from '../../actions/userRegistration.action';
import { StoreShape, UserStoreShape, ReduxAction, ClientServerConnectShape } from '../../types';

const INIT_USER_STATE : UserStoreShape = {
  userId: undefined,
  username: undefined
}

// NOTE this is new and won't be found in docs/CLIENTSTATE.md
const INIT_CLIENTSERVER_STATE : ClientServerConnectShape = {
  isFetching: false
}

const authorizedUser = (state : UserStoreShape = INIT_USER_STATE, action : ReduxAction): UserStoreShape => {
  switch (action.type) {
    case POST_LOGIN_SUCCESS:
    case POST_REGISTER_SUCCESS:
      return { ...state, ...action.payload }
    case POST_LOGOUT_SUCCESS:
      return { ...INIT_USER_STATE }
    default:
      return state
  }
}

const globalErrors = (state: any, action : ReduxAction) => {
  switch (action.type) {
    case POST_LOGIN_FAIL:
    case POST_LOGOUT_FAIL:
    case POST_REGISTER_FAIL:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const clientServerConnect = (state: ClientServerConnectShape = INIT_CLIENTSERVER_STATE, action : ReduxAction) : ClientServerConnectShape => {
  switch (action.type) {
    case POST_LOGIN_INIT:
    case POST_LOGOUT_INIT:
    case POST_REGISTER_INIT:
      return { ...state, isFetching: true }
    case POST_LOGIN_SUCCESS:
    case POST_LOGIN_FAIL:
    case POST_REGISTER_SUCCESS:
    case POST_REGISTER_FAIL:
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