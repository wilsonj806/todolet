import React, { useEffect, useState, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './UserCard.styles';
import { StoreShape } from '../../types';

// TODO need to add a thing for when the user isn't actually logged in

const UserCard: FunctionComponent<any> = (props) => {
  /*
   * Grab User from useContext
   * - it should include a userID
   * - with the userId value, call useEffect() on the backend that handles todos and make it fetch project tags and normal tags
  */
  const username = useSelector((state: StoreShape) => state.authorizedUser.username) || '';
  const avatar = useSelector((state: StoreShape) => state.authorizedUser.avatar) || '';

  const classes = useStyles();
  const count = 3;
  return (
    <div className={ classes.paper }>
      <div className={ classes.avatarWrapper }>
        <Avatar
          src={ avatar }
          classes={{
            root: classes.imgRoot
          }}
        >
          { username.charAt(0) }
        </Avatar>
      </div>
      <Typography variant='h2' classes={{ h2: classes.heading }}>{`Hello ${ username }`}</Typography>
      <Typography color='secondary' variant='h3' classes={{ h3: classes.subheading }}>{`# of Todos: ${ count }`}</Typography>
    </div>
  )
}

export default UserCard;