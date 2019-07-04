import React, { useState, useContext, FunctionComponent } from 'react';
// import Drawer from '@material-ui/core/Drawer';
// import Typography from '@material-ui/core/Typography';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import { makeStyles,  useTheme } from '@material-ui/styles';

// import { Theme, createStyles } from '@material-ui/core/styles';

import { NavProps } from '../../../types/index';

// const drawerWidth = 240;
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       display: 'flex',
//     },
//     drawer: {
//       [theme.breakpoints.up('sm')]: {
//         width: drawerWidth,
//         flexShrink: 0,
//       },
//     },
//     appBar: {
//       marginLeft: drawerWidth,
//       [theme.breakpoints.up('sm')]: {
//         width: `calc(100% - ${drawerWidth}px)`,
//       },
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//       [theme.breakpoints.up('sm')]: {
//         display: 'none',
//       },
//     },
//     toolbar: theme.mixins.toolbar,
//     drawerPaper: {
//       width: drawerWidth,
//     },
//     content: {
//       flexGrow: 1,
//       padding: theme.spacing(3),
//     },
//   }),
// );

const Nav : FunctionComponent<any> = (props: NavProps) => {
  // const classes = useStyles();
  return (
    // <>
    //   <AppBar position="fixed">
    //     <Toolbar>
    //       <Typography variant="h6">
    //         Todo again
    //       </Typography>
    //     </Toolbar>
    //   </AppBar>
    //   <nav className=''>
    //     <Drawer
    //       anchor='left'
    //       open={ true }
    //     >
    //       <Typography paragraph={ true }>
    //         KONO DIO DAAA
    //       </Typography>
    //     </Drawer>
    //   </nav>
    // </>
    <h1>Hello World!</h1>
  )
}

export default Nav;