import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoRounded';
import HomeIcon from '@material-ui/icons/Home';

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
      <Toolbar classes={{ root: classes.toolbar }}>
          <div className={ classes.titleWrap }>
            <Link to='/'>
              <HomeIcon classes={{ root: classes.homeIcon }}/>
            </Link>
            {/* <img src={ '/static/logos/logosm.png' } alt="Logo" className={ classes.logo }/> */}
            <Typography variant="h6" component="h1"  classes={{ root: classes.heading }}>
              TodoLet
            </Typography>
          </div>
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