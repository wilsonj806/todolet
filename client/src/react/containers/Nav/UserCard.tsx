import React, { useEffect, useContext, useState, FunctionComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { userCardStyles as useStyles } from './styles';

// TODO need to add a thing for when the user isn't actually logged in

const UserCard: FunctionComponent<any> = (props) => {
  /*
   * Grab User from useContext
   * - it should include a userID
   * - with the userId value, call useEffect() on the backend that handles todos and make it fetch project tags and normal tags
  */
  const classes = useStyles();
  const url = undefined;
  const name = 'John Doe';
  const count = 3;
  return (
    <div className={ classes.paper }>
      <div className={ classes.avatarWrapper }>
        <Avatar
          src={ url }
          classes={{
            root: classes.imgRoot
          }}
        >
          { name.charAt(0) }
        </Avatar>
      </div>
      <Typography variant='h2' classes={{ h2: classes.heading }}>{`Hello ${ name }`}</Typography>
      <Typography color='secondary' variant='h3' classes={{ h3: classes.subheading }}>{`# of Todos: ${ count }`}</Typography>
    </div>
  )
}

export default UserCard;