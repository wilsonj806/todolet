import React, { FunctionComponent } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Styles } from '@material-ui/styles/withStyles';
import { StylesHook } from '@material-ui/styles/makeStyles';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { BodyProps } from '../../types/index';

// The extra typing is overkill but it's mostly for completness/ exhaustiveness
const useStyles: StylesHook<Styles<any, any, any>> = makeStyles ((theme: Theme) => createStyles({
    root: {
      display: 'flex',
      minWidth: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }
  })
);

const Body: FunctionComponent = (props : BodyProps) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={ classes.root }>
      <CssBaseline>
        { children }
      </CssBaseline>
    </div>
  )
}

export default Body;