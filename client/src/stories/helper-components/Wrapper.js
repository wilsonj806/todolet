import React from 'react'
import { ThemeProvider } from '@material-ui/styles';

const Wrapper = props => <ThemeProvider>{props.children}</ThemeProvider>

export default Wrapper;