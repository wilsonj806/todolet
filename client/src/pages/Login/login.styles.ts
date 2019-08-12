import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootStyle: {
      background: 'inherit',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      flexFlow: 'column nowrap',
      paddingTop: '-4rem',
    },
    heading: {
      fontSize: '2.75rem',
      textAlign: 'center',
      marginBottom: '2rem',
    },
    logo: {
      maxWidth: '220px',
      height: 'auto'
    },
    form: {
      width: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    formField: {
      display: 'block',
      width: '100%',
      marginTop: '0.25rem',
      marginBottom: '1.5rem',
    },
    submitButton: {
      width: '75%'
    },
  })
)

export default useStyles;