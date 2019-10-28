import { Provider } from 'react-redux';
import React, { FC, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { Switch } from 'react-router-dom';
import window from 'window-or-global'

import configureStore from './store/configureStore'


import RouteContainer from './containers/RouteContainer';
import { createMuiTheme } from '@material-ui/core';
import { INIT_APP_STATE } from './store/reducers/root.reducer';

const theme = createMuiTheme({
  // zIndex: {
  //   appBar: 1200,
  //   drawer: 1100
  // }
});

const store = configureStore(
  window.__REDUX_DATA__ || INIT_APP_STATE
)

const App: FC<any> = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles != null) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={ theme }>
      <Provider store={ store }>
        <Switch>
          <RouteContainer/>
        </Switch>
      </Provider>
    </ThemeProvider>
  );
}

export default App;