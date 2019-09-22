import { Provider } from 'react-redux';
import React, { FunctionComponent } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter as Router } from 'react-router-dom';

import configureStore from './store/configureStore'


import RouteContainer from './containers/RouteContainer';
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  // zIndex: {
  //   appBar: 1200,
  //   drawer: 1100
  // }
});

const store = configureStore({
  // authorizedUser: {
  //   userId: '111',
  //   username: 'guest'
  // }
})

const App: FunctionComponent<any> = () => {
  return (
    <Router>
      <ThemeProvider theme={ theme }>
        <Provider store={ store }>
          <RouteContainer/>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;