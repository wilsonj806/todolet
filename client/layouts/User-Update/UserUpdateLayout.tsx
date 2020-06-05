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

import useStyles from './userUpdate.styles';
import { deleteUser } from '../../actions/userDelete.action';
import { putUser } from '../../actions/userUpdate.action';
import { StoreShape } from '../../types';

// FIXME if the user update form gets bigger, extract the state to a custom hook

const UserUpdateLayout: FC<any> = (props) => {
  const classes = useStyles()
  // ----- React Redux state
  const user = useSelector<StoreShape, any>(state => state.authorizedUser)
  const dispatch = useDispatch()

  // ----- Local State
  const [username, setUsername] = useState('')
  const [confirmUsername, setConfirmUsername] = useState('')
  const [renderDeleteConfirm, setRenderDeleteConfirm] = useState(false)

  useEffect(() => {
    setUsername('')
  }, [user])

  const wrapHookFn = (hookFn: SetStateAction<any> = undefined) => (str = '') => hookFn(str);

  const handleSaveUpdates = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()
    dispatch(putUser({ username }, user.userId))
  }

  const handleDeleteConfirmSubmit = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()

    if (user.username !== confirmUsername) throw new Error('Usernames do not match')
    dispatch(deleteUser())
  }

  const RenderConfirmDeleteUser = renderDeleteConfirm ? (
    <form name="user-delete">
      <TextField
        id="confirm-username"
        name="confirm-username"
        label="Confirm Username"
        value={ confirmUsername }
        reactHookFn={ wrapHookFn(setConfirmUsername) }
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
  ) : user.username === 'MyAppGuest' ? (
    <Button
      id="btn--user-delete"
      name="user-delete"
      color="primary"
      disabled={true}
    >
      Action Not Permitted
    </Button>
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
        <form name="user-update">
          <TextField
            id="username"
            name="username"
            label="Username"
            value={ username }
            reactHookFn={ wrapHookFn(setUsername) }
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

export default UserUpdateLayout