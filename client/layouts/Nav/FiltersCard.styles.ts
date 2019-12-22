import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { DRAWER_WIDTH } from './Nav.styles'

// NOTE FilterCard styling
const FilterCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    filterCardRoot: {
      width: DRAWER_WIDTH,
    },
    tabChildRoot: {
      minWidth: '50%'
    },
    list: {
      width: '100%'
    },
    listItem: {
      width: '100%'
    },
  })
);
export default FilterCardStyles