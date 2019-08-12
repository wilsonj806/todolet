import React, { FunctionComponent } from 'react';

import Body from './components/Body';
import Main from './components/Main';
import Nav from './containers/Nav/Nav';

import RouteContainer from './containers/RouteContainer';


import AppProvider from './contexts/AppContext';
import Login from './pages/Login';

const App: FunctionComponent<any> = (props) => {
  return (
    <AppProvider>
      <RouteContainer/>
    </AppProvider>
  );
}

export default App;