import React, { useEffect, useState, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import useStyles from './UserCard.styles';
import { StoreShape } from '../../types';

// TODO need to add a thing for when the user isn't actually logged in

const UserCard: FunctionComponent<any> = () => {
  /*
   * Grab User from useContext
   * - it should include a userID
   * - with the userId value, call useEffect() on the backend that handles todos and make it fetch project tags and normal tags
  */
  const user = useSelector((state: StoreShape) => state.authorizedUser) || '';
  const username = user.username || '';
  const todos = user.todos || [];
  const avatar = user.avatar || '';

  const classes = useStyles();

  const todosCount = todos.length;

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
      <Typography color='secondary' variant='h3' classes={{ h3: classes.subheading }}>{`# of Todos: ${ todosCount }`}</Typography>
    </div>
  )
}

export default UserCard;