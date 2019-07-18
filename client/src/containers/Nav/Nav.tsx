import React, { useState, useContext, FunctionComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

import { useTheme } from '@material-ui/core/styles';
import { navStyles as useStyles } from './styles';
import UserCard from './UserCard';
import { NavProps } from '../../types/index';
import FiltersCard from './FiltersCard';


// TODO add a thing to the Toolbar stating current user and stuff
const Nav : FunctionComponent<NavProps> = props => {

  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="fixed"
        className={ classes.appBar }
      >
        <Toolbar>
          <Typography variant="h6">
            Todo again
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={ classes.drawer }>
        <Drawer
          open={ true }
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
          anchor={ theme.direction === 'rtl' ? 'right' : 'left' }
          >
          <UserCard/>
          <FiltersCard/>
          <div>
            <div className={ classes.toolbar } />
            <Typography paragraph={ true }>
              KONO DIO DAAA
            </Typography>
          </div>
        </Drawer>
      </nav>
    </>
  )
}

export default Nav;
