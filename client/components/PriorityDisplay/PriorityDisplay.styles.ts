import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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