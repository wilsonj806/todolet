import React, { FunctionComponent } from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Link } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import { userProfileMenuStyles as useStyles } from './nav.styles';


const UserProfileMenu: FunctionComponent<any> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
         aria-controls="avatar-menu" aria-haspopup="true" onClick={handleClick}
      >
        <AccountCircle fontSize='large' color='primary' classes={{
          colorPrimary: classes.accountIcon
        }}/>
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/profile">Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/account">My Account</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/logout">Logout</Link>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserProfileMenu;