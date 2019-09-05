import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configStore'

import { HashRouter as Router } from 'react-router-dom';

import RouteContainer from './containers/RouteContainer';


import AppProvider from './contexts/AppContext';
import Login from './layouts/Login/Login';

const store = configureStore()

const App: FunctionComponent<any> = () => {
  return (
    <Router>
      <Provider store={ store }>
        <AppProvider>
          <RouteContainer/>
        </AppProvider>
      </Provider>
    </Router>
  );
}

export default App;