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
    contentWrapper: {
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
  })
)

export default useStyles;