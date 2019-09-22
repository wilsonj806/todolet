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

import Logo from '../../assets/Logo(512x512).png';
// import useStyles from './userUpdate.styles';
import { deleteUser } from '../../actions/userDelete.action';
// import { updateUser } from '../../actions/userUpdate.action';
import { StoreShape } from '../../types';

const UserSettingsLayout: FC<any> = (props) => {
  // ----- React Redux state
  const user = useSelector<StoreShape, any>(state => state.authorizedUser)
  const dispatch = useDispatch()

  // ----- Local State
  const [error, setError] = useState('')
  const [confirmUsername, setConfirmUsername] = useState('')
  const [renderDeleteConfirm, setRenderDeleteConfirm] = useState(false)

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

  const RenderInitUserDeleteBtn = !renderDeleteConfirm ? (
    <Button
    id="btn--user-delete"
    name="user-delete"
    color="secondary"
    onClick={ () => setRenderDeleteConfirm(true) }
    >
      Delete Account
    </Button>
  ) : null;

  const RenderConfirmDeleteUser = renderDeleteConfirm ? (
    <form>
      <TextField
        id="confirm-username"
        name="confirm-username"
        label="Confirm Username"
        value={ confirmUsername }
        reactHookFn={ setConfirmUsername }
        classes={{ root: '' }}
      />
      <Button
        id="btn--confirm-delete-submit"
        name="confirm-delete"
        type="submit"
        color="primary"
        onClick={ handleDeleteConfirmSubmit }
      >
        Confirm Account Deletion
      </Button>
    </form>
  ) : null

  return (
    <Container>
      <Typography component="h1" variant="h2">
        User Settings
      </Typography>
      <Typography component="h1" variant="h2">
        Danger: Delete User Account
      </Typography>
      <Typography>Warning this action is irreversible!</Typography>
      { RenderInitUserDeleteBtn }
      { RenderConfirmDeleteUser }
    </Container>
  )
}

export default UserSettingsLayout