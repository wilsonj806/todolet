import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&:not(:last-child)': {
        borderBottom: '1px solid #dbdbdb'
      }
    }
  })
)

export default useStyles;