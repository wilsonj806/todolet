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

import useStyles from './userUpdate.styles';
import { deleteUser } from '../../actions/userDelete.action';
// import { updateUser } from '../../actions/userUpdate.action';
import { StoreShape } from '../../types';

// TODO update so there's different form id/ name attributes for each thing
const UserSettingsLayout: FC<any> = (props) => {
  const classes = useStyles()
  // ----- React Redux state
  const user = useSelector<StoreShape, any>(state => state.authorizedUser)
  const dispatch = useDispatch()

  // ----- Local State
  const [error, setError] = useState('')
  const [confirmUsername, setConfirmUsername] = useState('')
  const [renderDeleteConfirm, setRenderDeleteConfirm] = useState(false)

  const handleSaveUpdates = async (event: SyntheticEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault()
      console.log('This needs an implementation')
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  const handleDeleteConfirmSubmit = async (event: SyntheticEvent<HTMLButtonElement>) => {
    try {
      event.preventDefault()
      if (user.username !== confirmUsername) throw new Error('Usernames do not match')
      await dispatch(deleteUser())
    } catch (err) {
      console.log(err)
      setError(err.message)
    }
  }

  const RenderConfirmDeleteUser = renderDeleteConfirm ? (
    <form>
      <TextField
        id="confirm-username"
        name="confirm-username"
        label="Confirm Username"
        value={ confirmUsername }
        reactHookFn={ setConfirmUsername }
        classes={{ root: classes.textInput }}
      />
      <Button
        id="btn--confirm-delete-submit"
        name="confirm-delete"
        type="submit"
        color="primary"
        onClick={ handleDeleteConfirmSubmit }
        classes={{ root: classes.dangerButton }}
      >
        Confirm Account Deletion
      </Button>
    </form>
  ) : (
    <Button
    id="btn--user-delete"
    name="user-delete"
    color="primary"
    classes={{ root: classes.dangerButton }}
    onClick={ () => setRenderDeleteConfirm(true) }
    >
      Delete Account
    </Button>
  )
  // TODO make the update user thing a custom hook
  return (
    <Container>
      <Typography component="h1" variant="h3">
        User Settings
      </Typography>
      <div className={ classes.formCtr }>
        <form>
          <TextField
            id="username"
            name="username"
            label="Username"
            value={ confirmUsername }
            reactHookFn={ setConfirmUsername }
            classes={{ root: classes.textInput }}
          />
          <Button
          id="btn--save-updates"
          name="save-updates"
          type="submit"
          color="primary"
          onClick={ handleSaveUpdates }
        >
          Update User
        </Button>
        </form>
      </div>
      <div className={ classes.formCtr }>
        <Typography component="h1" variant="h3">
          Danger: Delete User Account
        </Typography>
        <Typography>Warning this action is irreversible!</Typography>
        { RenderConfirmDeleteUser }
      </div>
    </Container>
  )
}

export default UserSettingsLayout