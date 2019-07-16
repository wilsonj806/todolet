import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const DRAWER_WIDTH = 240;

const navStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      paddingTop: '4rem',
      width: DRAWER_WIDTH,
    },
  }),
);

const userCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: '2rem 0 3rem 0',
      width: DRAWER_WIDTH,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
    heading: {
      fontWeight: 600,
      fontSize: '1.5rem',
      marginBottom: '0.25rem'
    },
    subheading: {
      fontSize: '1rem'
    },
    avatarWrapper: {
      display: 'flex',
      justifyContent: 'center'
    },
    imgRoot: {
      height: '10vh',
      width: '10vh',
      margin: '1rem 0 2rem 0',
      fontSize: '2rem'
    },
    img: {
      objectFit: 'contain'
    }
  }),
);

const filterCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabFlex: {
      width: DRAWER_WIDTH
    },
    tabChildRoot: {
      minWidth: '50%'
    }
  })
);

export { navStyles, userCardStyles, filterCardStyles };