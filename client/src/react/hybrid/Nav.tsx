import React, { useState, useContext, FunctionComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Hidden from '@material-ui/core/Hidden';

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import { NavProps } from '../../types/index';
const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

const Nav : FunctionComponent<any> = (props: NavProps) => {
  const { container } = props;
  // FIXME remove classes.root and similar things that appear on ExampleDrawer but shouldn't appear here

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6">
            Todo again
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
      {/* <Hidden smUp implementation="css"> */}
        <Drawer
          open={ true }
          variant="permanent"
          container={container}
          classes={{ paper: classes.drawerPaper}}
          anchor={ theme.direction === 'rtl' ? 'right' : 'left' }
        >
          <div>
            <div className={classes.toolbar} />
            <Typography paragraph={ true }>
              KONO DIO DAAA
            </Typography>
          </div>
        </Drawer>
        {/* </Hidden> */}
      </nav>
    </div>
  )
}

export default Nav;