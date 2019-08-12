import React, { FunctionComponent, useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootStyle: {
      background: 'inherit',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexFlow: 'column nowrap',
      paddingTop: '-4rem',
    },
    heading: {
      fontSize: '3rem',
      width: '50%',
      textAlign: 'center',
    }
  })
)

const Login: FunctionComponent<any> = (props) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" classes={{ root: classes.rootStyle }}>
      <Typography variant="h1" classes={{ h1: classes.heading }}>Login here!</Typography>
      <TextField
        id="username"
        label="Required"
        margin="normal"
        value=""
      />
      <TextField
        id="username"
        label="Password"
        margin="normal"
        value=""
      />
      <Button  variant="contained" color="primary">
        Login
      </Button>
    </Container>
  )
}

export default Login;