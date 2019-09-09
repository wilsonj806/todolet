import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DRAWER_WIDTH } from './Nav.styles'
// NOTE UserCard styling
const UserCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '2rem 0 3rem 0',
      width: DRAWER_WIDTH,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    heading: {
      fontWeight: 600,
      fontSize: '1.5rem',
      marginBottom: '0.25rem'
    },
    subheading: {
      fontSize: '1rem'
    },
    avatarWrapper: {
      display: 'flex',
      justifyContent: 'center'
    },
    imgRoot: {
      height: '10vh',
      width: '10vh',
      margin: '1rem 0 2rem 0',
      fontSize: '2rem'
    },
    img: {
      objectFit: 'contain'
    }
  }),
);

export default UserCardStyles