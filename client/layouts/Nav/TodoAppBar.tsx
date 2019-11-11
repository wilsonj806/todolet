import React, { FunctionComponent } from 'react';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoRounded';

import UserProfileMenu from './UserProfileMenu';

import { useTheme } from '@material-ui/core/styles';

import useStyles from './TodoAppBar.styles';

// TODO add Menu items
const TodoAppBar: FunctionComponent<any> = (props) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <AppBar
      position="fixed"
    >
      <Toolbar>
        <Typography variant="h6" component="h1"  className={ classes.title }>
          TodoLet
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