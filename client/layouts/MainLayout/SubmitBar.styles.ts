import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const SubmitBarStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
    },
    select: {
      width: '8rem',
      display: 'flex',
    },
    textInput: {
      width: '69%',
      marginRight: '0.5rem',
    },
    button: {
      margin: '0 0.75rem',
    }

  }),
);

export default SubmitBarStyles