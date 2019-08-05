import React, { FunctionComponent } from 'react';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoRounded';

import UserProfileMenu from './UserProfileMenu';

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
          <UserProfileMenu/>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default TodoAppBar;