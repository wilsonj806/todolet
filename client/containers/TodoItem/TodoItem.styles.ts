import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      '&:not(:last-child)': {
        borderBottom: '1px solid #dbdbdb'
      },
    },
    listItemStrike: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
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
    listItemExpand: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      '&:not(:last-child)': {
        borderBottom: '1px solid #dbdbdb'
      },
    },
    checkBoxWrapper: {
      minWidth: '50%',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    todoWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
    collapse: {
      width: '100%',
      paddingLeft: '2rem',
      paddingBottom: '0.125rem'
    }
  }))

export default useStyles;