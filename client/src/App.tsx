import { Provider } from 'react-redux';
import React, { FC, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';


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

const App: FC<any> = () => {
  const history = createMemoryHistory();
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles != null) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }, []);

  return (
    <Router history={ history }>
      <ThemeProvider theme={ theme }>
        <Provider store={ store }>
          <RouteContainer/>
        </Provider>
      </ThemeProvider>
    </Router>
  );
}

export default App;