import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootStyle: {
      background: 'inherit',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexFlow: 'column nowrap',
    },
    textInput: {
      margin: '5px 0',
      display: 'block',
      width: '65%'
    },
    dangerButton: {
      backgroundColor: 'red',
      color: 'white',
      '&:hover': {
        backgroundColor: 'darkred'
      }
    },
    formCtr: {
      padding: '0.5rem 0'
    }
  })
)

export default useStyles;