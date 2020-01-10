import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


// NOTE UserProfileMenu styling

const UserProfileMenuStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorPrimary: {
      color: 'lightgrey'
    },
    item: {
      margin: '0',
      padding: '0',
      display: 'flex',
      justifyContent: 'center'
    },
    link: {
      padding: '6px 1rem',
      width: '100%',
      heigth: '100%'
    }
  }))

export default UserProfileMenuStyles