import React, { FunctionComponent } from 'react';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { useTheme } from '@material-ui/core/styles';

import { appBarStyles as useStyles } from './nav.styles';

// TODO add Menu items
const TodoAppBar: FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar
      position="fixed"
      className={ classes.appBar }
    >
      <Toolbar>
        <Typography variant="h6" className={ classes.title }>
          Another Todo
        </Typography>
        <div className={ classes.menuButton }>
          <IconButton>
            <InfoIcon/>
          </IconButton>
          <IconButton>
            <AccountCircle fontSize='large' color='primary' classes={{
              colorPrimary: classes.accountIcon
            }}/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TodoAppBar;