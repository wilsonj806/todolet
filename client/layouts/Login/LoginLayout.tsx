import React, { FC, SetStateAction, SyntheticEvent, useState, useEffect } from 'react';
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
import useStyles from './login.styles';
import { postLogin, postGuestLogin } from '../../actions/userLogin.action';
import { StoreShape } from '../../types';


const Login: FC = () => {
  const userState = useSelector<StoreShape, any>(state=>state.authorizedUser);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  useEffect(() => {
    const { userId, username } = userState

    if (userId || username) setShouldRedirect(true)
  }, [userState])

  const wrapHookFn = (hookFn: SetStateAction<any> = undefined) => (str = '') => hookFn(str);

  const handleFormSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const obj = { username, password };
    dispatch(postLogin(obj))
  }
  const RenderRedirect = shouldRedirect ? <Redirect to='/'/> : null;

  const handleGuestClick = () => {
    dispatch(postGuestLogin())
  }

  return (
    <Container maxWidth="xs" classes={{ root: classes.rootStyle }}>
      { RenderRedirect }
      <img src={ '/static/logos/logolg.png' } alt="Logo" className={ classes.logo }/>
      <div className={ classes.formWrapper }>
        <Typography variant="h1" classes={{ h1: classes.heading }}>TodoLet</Typography>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>Login to the app here!</Typography>
        <form className={ classes.form }>
          <TextField
            fullWidth
            id="username"
            name="username"
            margin="normal"
            label="Username"
            value={ username }
            reactHookFn={ wrapHookFn(setUsername) }
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
            reactHookFn={ wrapHookFn(setPassword) }
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
            Login
          </Button>
          <Button
            size="large"
            type="button"
            color="primary"
            variant="contained"
            classes={{ root: classes.submitButton }}
            onClick={ handleGuestClick }
          >
            Login As Guest!
          </Button>
        </form>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>
          New here? <Link component={ RouterLink } to='/register'>Create an account!</Link>
        </Typography>
        <Typography paragraph classes={{ paragraph: classes.paragraph }}>
        </Typography>
      </div>
    </Container>
  )
}

export default Login;