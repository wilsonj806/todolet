import React, { useContext, useState, FunctionComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import { DRAWER_WIDTH } from './Nav';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: DRAWER_WIDTH,
      background: 'orange'
    },
  }),
);

const UserCard: FunctionComponent<any> = (props) => {
  const classes = useStyles();

  const name = 'John Doe';
  const count = 3;
  return (
    <div className={ classes.paper }>
      <Avatar src=''/>
      <Typography component='h3'>{`Hello ${ name }`}</Typography>
      <Typography component='h3'>{`Incomplete todos: ${ count }`}</Typography>
    </div>
  )
}

export default UserCard;