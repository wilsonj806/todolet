import React from 'react'
import { Provider } from 'react-redux'

import { ThemeProvider } from '@material-ui/styles';

import configureStore from '../../store/configureStore';
const store = configureStore()

const Wrapper = props => (
  <ThemeProvider>
    <Provider store={ store }>
      {props.children}
    </Provider>
  </ThemeProvider>
)

export default Wrapper;