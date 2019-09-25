import React, { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Link } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import useStyles from './UserProfileMenu.styles';
import { postLogout } from '../../actions/userLogout.action';




/**
 *
 * @param props
 *
 * TODO Tests todo
 *  - test clicking the Logout link
 *
 */

const UserProfileMenu: FunctionComponent<any> = (props) => {
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const classes = useStyles(theme);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  // FIXME fix menu links requiring you to click the link not the menu
  return (
    <>
      <IconButton
         aria-controls="avatar-menu" aria-haspopup="true" onClick={handleClick}
         color='primary'
        >
        <AccountCircle fontSize='large' color='primary'
          classes={{
            colorPrimary: classes.colorPrimary
          }}
          />
      </IconButton>
      <Menu
        id="avatar-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/help">Help</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/account">My Account</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/logout" onClick={ () => dispatch(postLogout())}>Logout</Link>
        </MenuItem>
      </Menu>
    </>
  );
}

export default UserProfileMenu;