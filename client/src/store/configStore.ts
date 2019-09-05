import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose  } from 'redux'

import rootReducer from './reducers/root.reducer';
/*
  ESLint/ TSLint will yell at you for this but this is for the Redux DevTools, should be safe and the fix is to add it as a property to window
*/
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(preloadedState : any = undefined) {
  return createStore(
    rootReducer,
    preloadedState,
    process.env.NODE_ENV === 'production' ? applyMiddleware(thunkMiddleware) : compose(applyMiddleware(thunkMiddleware)), // let's use use async reducers/ actions
  )
}