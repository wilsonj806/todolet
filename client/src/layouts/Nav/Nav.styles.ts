import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const DRAWER_WIDTH = '18rem';

// NOTE Nav styling
const NavStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
      zIndex: theme.zIndex.drawer - 2
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      paddingTop: '4rem',
      width: DRAWER_WIDTH,
    },
  }),
);


export default NavStyles
export { DRAWER_WIDTH }