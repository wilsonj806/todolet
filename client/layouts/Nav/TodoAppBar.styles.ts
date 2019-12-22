import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// NOTE AppBar styling
const TodoAppBarStyles = makeStyles((theme : Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      maxHeight: '4rem',
      display: 'flex',
      justifyContent: 'space-between'
    },
    title: {
      height: '3.5rem',
      flexGrow: 1,
      color: 'white',
      textDecoration: 'none',
      '& :hover': {
        backgroundColor: 'darkblue',
        borderRadius: '5px'
      }
    },
    titleWrap: {
      height: 'inherit',
      width: '5rem',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    heading: {
      lineHeight: '3.5rem',
      paddingRight: '0.75rem'
    },
    homeIcon: {
      color: 'white',
      marginRight: '0.5rem'
    },
    menuButton: {
      width: 'auto',
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(2),

    },
  })
);

export default TodoAppBarStyles