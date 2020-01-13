import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&:not(:last-child)': {
        borderBottom: '1px solid #dbdbdb'
      },
    },
    listItemStrike: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&:not(:last-child)': {
        borderBottom: '1px solid #dbdbdb'
      },
      '&::before': {
        content : '" "',
        position : 'absolute',
        top : '50%',
        left : '0px',
        borderBottom : '1px solid #111',
        width : '100%',
        zIndex: 100,
      }
    },
    leftWrapper: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
  }))

export default useStyles;