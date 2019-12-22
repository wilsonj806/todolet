import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    priorityWrap: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '6rem'
    },
    priorityHigh: {
      backgroundColor: 'red'
    },
    priorityMed: {
      backgroundColor: 'orange'
    },
    priorityLow: {
      backgroundColor: 'green'
    }
  })
)

export default useStyles;