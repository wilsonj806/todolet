import React, { FC, useEffect } from 'react';
import { ThemeProvider } from '@material-ui/styles';
// import { Switch } from 'react-router-dom';

import RouteContainer from './containers/RouteContainer';
import Notifier from './containers/Notifier'
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

const App: FC<any> = () => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles != null) {
      jssStyles.parentNode!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={ theme }>
      <Notifier/>
      <RouteContainer/>
    </ThemeProvider>
  );
}

export default App;