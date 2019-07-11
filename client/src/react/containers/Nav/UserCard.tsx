import React, { useContext, useState, FunctionComponent } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import { DRAWER_WIDTH } from './Nav';

// TODO need to add a thing for when the user isn't actually logged in
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '2rem 0 3rem 0',
      width: DRAWER_WIDTH,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    heading: {
      fontWeight: 600,
      fontSize: '1.5rem',
      marginBottom: '0.25rem'
    },
    subheading: {
      fontSize: '1rem'
    },
    avatarWrapper: {
      display: 'flex',
      justifyContent: 'center'
    },
    imgRoot: {
      height: '10vh',
      width: '10vh',
      margin: '1rem 0 2rem 0',
      fontSize: '2rem'
    },
    img: {
      objectFit: 'contain'
    }
  }),
);

const UserCard: FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const url = undefined;
  const name = 'John Doe';
  const count = 3;
  console.log(name.charAt(0));
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