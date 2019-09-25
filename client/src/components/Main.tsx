import React, { FunctionComponent } from 'react';
import { Styles } from '@material-ui/styles/withStyles';
import { StylesHook } from '@material-ui/styles/makeStyles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { MainProps } from '../types';


const useStyles: StylesHook<Styles<any, any, any>> = makeStyles ((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100%',
      flexGrow: 1,
      margin: '0 1rem',
    }
  })
);

const Main : FunctionComponent<MainProps> = (props) => {
  const { children, noPadding } = props;
  const padding = noPadding ? 0 : '6rem';
  const classes = useStyles();
  return (
    <main className={ classes.root } style={{ paddingTop: padding }}>
      { children }
    </main>
  )
}

export default Main;