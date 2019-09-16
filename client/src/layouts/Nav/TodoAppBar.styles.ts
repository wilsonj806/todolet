import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// NOTE AppBar styling
const TodoAppBarStyles = makeStyles((theme : Theme) =>
  createStyles({
    title: {
      flexGrow: 1
    },
    menuButton: {
      width: 'auto',
      display: 'flex',
      alignItems: 'center',
      marginRight: theme.spacing(2),

    },
    toolbar: theme.mixins.toolbar,
  })
);

export default TodoAppBarStyles