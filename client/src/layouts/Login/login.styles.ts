import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootStyle: {
      background: 'inherit',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexFlow: 'column nowrap',
    },
    formWrapper: {
      width: '100%',
      marginTop: '1.5rem',
      padding: '0 1.5rem',
    },
    heading: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '0.75rem',
    },
    paragraph: {
      width: '100%',
      fontSize: '1.125rem',
      textAlign: 'center',
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
      width: '100%',
      marginBottom: '1rem',
    },
  })
)

export default useStyles;