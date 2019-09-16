import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink, Redirect } from 'react-router-dom';

// ----- MUI components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';


import Logo from '../../assets/Logo(512x512).png';
import useStyles from './logout.styles';

import { StoreShape } from '../../types';

const LogoutLayout : FC<any> = (props) => {
  const classes = useStyles()

  return (
    <Container maxWidth="xs" classes={{ root: classes.rootStyle }}>
      <img src={ Logo } alt="Logo" className={ classes.logo }/>
      <div className={ classes.contentWrapper }>
        <Typography variant="h1" classes={{ h1: classes.heading }}>TodoLet</Typography>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>You've been logged out!</Typography>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>Return to the
          <Link component={ RouterLink } to='/'> home page</Link>
        </Typography>
      </div>
    </Container>
  )
}

export default LogoutLayout