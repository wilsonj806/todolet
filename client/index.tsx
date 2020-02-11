import React from 'react';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import ReactDOM from 'react-dom';
// @ts-ignore
import window from 'window-or-global'


import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './store/configureStore'
import App from './App';

import { INIT_APP_STATE } from './store/reducers/root.reducer';

const stateToUse = window.__REDUX_DATA__ || INIT_APP_STATE;
const store = configureStore(
  stateToUse
)

const jsx = (
  <Router>
    <Provider store={ store }>
      <SnackbarProvider maxSnack={ 4 }>
        <App/>
      </SnackbarProvider>
    </Provider>
  </Router>
);

(() => {
  const ssrData = document.querySelector('script#redux-data');
  ssrData!.textContent = ""
})()
ReactDOM.hydrate(jsx, document.getElementById('app'));
