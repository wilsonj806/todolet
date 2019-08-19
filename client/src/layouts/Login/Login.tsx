import React, { FunctionComponent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// ----- MUI components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

// ----- App specific components
import TextField from '../../containers/TextInputWrapper';

import Logo from '../../assets/Logo(512x512).png';
import useStyles from './login.styles';

const Login: FunctionComponent<any> = (props) => {
  const classes = useStyles();

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  return (
    <Container maxWidth="xs" classes={{ root: classes.rootStyle }}>
      <img src={ Logo } alt="Logo" className={ classes.logo }/>
      <div className={ classes.formWrapper }>
        <Typography variant="h1" classes={{ h1: classes.heading }}>TodoLet</Typography>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>Login to the app here!</Typography>
        <form className={ classes.form }>
          <TextField
            fullWidth
            id="username"
            margin="normal"
            label="Username"
            value={ username }
            reactHookFn={ setUsername }
            inputProps={ { width: '100%' } }
            classes={{ root: classes.formField }}
          />
          <TextField
            fullWidth
            id="password"
            margin="normal"
            type="password"
            label="Password"
            value={ password }
            reactHookFn={ setPassword }
            classes={{ root: classes.formField }}
          />
          <Button
            size="large"
            color="primary"
            variant="contained"
            classes={{ root: classes.submitButton }}
          >
            Login
          </Button>
        </form>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>
          New here? <Link component={ RouterLink } to='/register'>Create an account!</Link>
        </Typography>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>
          <Link component={ RouterLink } to='/auth-reset'>Forgot your password?</Link>
        </Typography>
      </div>
    </Container>
  )
}

export default Login;