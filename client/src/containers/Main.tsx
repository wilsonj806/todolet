import React, { FunctionComponent } from 'react';
import { Styles } from '@material-ui/styles/withStyles';
import { StylesHook } from '@material-ui/styles/makeStyles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { MainProps } from '../types/index';


const useStyles: StylesHook<Styles<any, any, any>> = makeStyles ((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100%',
      paddingTop: '4rem',
      flexGrow: 1,
      margin: '0 1rem',
    }
  })
);

const Main : FunctionComponent = (props : MainProps) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <main className={ classes.root }>
      { children }
    </main>
  )
}

export default Main;