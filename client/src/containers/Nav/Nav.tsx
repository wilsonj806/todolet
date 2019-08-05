import React, { useState, useContext, FunctionComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { useTheme } from '@material-ui/core/styles';
import { navStyles as useStyles } from './nav.styles';

import AppBar from './TodoAppBar';
import UserCard from './UserCard';
import FiltersCard from './FiltersCard';
import { NavProps } from '../../types/client';


// TODO add a thing to the Toolbar stating current user and stuff
const Nav : FunctionComponent<NavProps> = props => {

  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <AppBar/>
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
