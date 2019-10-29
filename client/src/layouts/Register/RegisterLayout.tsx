import React, { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link as RouterLink, Redirect } from 'react-router-dom';

// ----- MUI components
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

// ----- App specific components
import TextField from '../../containers/TextInputWrapper';

// import Logo from '../../assets/Logo(512x512).png';
import useStyles from './register.styles';
import { postNewUser } from '../../actions/userRegistration.action';
import { StoreShape } from '../../types';

const Register: FC<any> = (props) => {
  const userState = useSelector<StoreShape, any>(state=>state.authorizedUser);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ password2, setPassword2 ] = useState('');
  // FIXME replace the below with a proper toast
  const [ error, setError] = useState('');


  useEffect(() => {
    const { userId, username } = userState

    if (userId || username) setShouldRedirect(true)
  }, [userState])

  const handleFormSubmit = async (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const obj = { username, password, password2, email };

    try {
      await dispatch(postNewUser(obj))
    } catch (err) {
      console.log('hi');
      setError(err);
    }
  }

  return (
    <Container maxWidth="xs" classes={{ root: classes.rootStyle }}>
      <img src={ '/static/logos/logolg.png' } alt="Logo" className={ classes.logo }/>
      <div className={ classes.formWrapper }>
        <Typography variant="h1" classes={{ h1: classes.heading }}>TodoLet</Typography>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>Register for the app here!</Typography>
        <form className={ classes.form }>
          <TextField
            fullWidth
            id="username"
            name="username"
            margin="normal"
            label="Username"
            value={ username }
            reactHookFn={ setUsername }
            inputProps={ { width: '100%' } }
            classes={{ root: classes.formField }}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            margin="normal"
            label="Email"
            value={ email }
            reactHookFn={ setEmail }
            inputProps={ { width: '100%' } }
            classes={{ root: classes.formField }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            margin="normal"
            type="password"
            label="Password"
            value={ password }
            reactHookFn={ setPassword }
            classes={{ root: classes.formField }}
          />
          <TextField
            fullWidth
            id="password2"
            name="password2"
            margin="normal"
            type="password"
            label="Confirm Password"
            value={ password2 }
            reactHookFn={ setPassword2 }
            classes={{ root: classes.formField }}
          />
          <Button
            size="large"
            type="submit"
            color="primary"
            variant="contained"
            classes={{ root: classes.submitButton }}
            onClick={ handleFormSubmit }
          >
            Register
          </Button>
        </form>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>
          Already registered? <Link component={ RouterLink } to='/login'>Login!</Link>
        </Typography>
      </div>
    </Container>
  )
}

export default Register;