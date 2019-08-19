import React, { FunctionComponent } from 'react';

import { HashRouter as Router } from 'react-router-dom';

import RouteContainer from './containers/RouteContainer';


import AppProvider from './contexts/AppContext';
import Login from './layouts/Login/Login';

const App: FunctionComponent<any> = (props) => {
  return (
    <Router>
      <AppProvider>
        <RouteContainer/>
      </AppProvider>
    </Router>
  );
}

export default App;