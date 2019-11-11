import React, { useEffect, useState, FunctionComponent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiltersArray, FiltersEntry, StoreShape } from '../../types';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';


import useStyles from './FiltersCard.styles';

/**
 *
 * @param props
 *
 * TODO Tests todo
 *  - Tests handling clicking a filter
 */
const FiltersCard: FunctionComponent<any> = (props) => {
  const projectFilters = useSelector((state: StoreShape) => state.authorizedUser.projectFilters) || [];
  const tagFilters = useSelector((state: StoreShape) => state.authorizedUser.tagFilters) || [];

  const classes = useStyles();

  // ----- UI state
  /*
   * NOTE
   * If value === 0 then the active tab is Projects
   * If value === 1 then the active tab is Tags
  */
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

  const toMap = value === 0 ? projectFilters.map(
    (project: FiltersEntry, i: Number) => (
      <ListItem button key={ i.toString() } classes={{ root: classes.listItem }}>
        <Box
            css={{
              bgcolor: project.color,
              width: '1rem',
              height: '1rem',
              borderRadius: '0.5rem'
            }}
          />
        <ListItemText inset>{ project.name }</ListItemText>
      </ListItem>
    )
  ) : value === 1 ?
    tagFilters.map(
      (tag: FiltersEntry, i: Number) => (
        <ListItem button key={ i.toString() } classes={{ root: classes.listItem }}>
          <Box
            css={{
              bgcolor: tag.color,
              width: '1rem',
              height: '1rem',
              borderRadius: '0.5rem'
            }}
          />
          <ListItemText inset>{ tag.name }</ListItemText>
        </ListItem>
      )
    ) : null;
  ;

  return (
    <div className={classes.filterCardRoot}>
      <Tabs value={value} onChange={ handleChange }  centered={ true }>
        <Tab label="Projects" classes={{ root: classes.tabChildRoot }}/>
        <Tab label="Tags" classes={{ root: classes.tabChildRoot }}/>
      </Tabs>
      <div id={ value === 0 ? 'tab--projects' : value === 1 ? 'tab--tags' : '' }>
        <List component='ul'>
          { toMap }
        </List>
      </div>
    </div>
  )
};

export default FiltersCard;
