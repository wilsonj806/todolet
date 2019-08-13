import React, { FunctionComponent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import Logo from '../../assets/Logo(512x512).png';
import useStyles from './login.styles';

const Login: FunctionComponent<any> = (props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="xs" classes={{ root: classes.rootStyle }}>
      <img src={ Logo } alt="Logo" className={ classes.logo }/>
      <div className={ classes.formWrapper }>
        <Typography variant="h1" classes={{ h1: classes.heading }}>Todo-let</Typography>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>Login to the app here!</Typography>
        <form className={ classes.form }>
          <TextField
            id="username"
            label="Username"
            margin="normal"
            value=""
            fullWidth
            inputProps={ { width: '100%' } }
            classes={{ root: classes.formField }}
          />
          <TextField
            id="username"
            label="Password"
            type="password"
            margin="normal"
            value=""
            fullWidth
            classes={{ root: classes.formField }}

          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            classes={{ root: classes.submitButton }}
          >
            Login
          </Button>
        </form>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>
          New here? <Link component={ RouterLink } to='/register'>Create an account!</Link>
        </Typography>
      </div>
    </Container>
  )
}

export default Login;