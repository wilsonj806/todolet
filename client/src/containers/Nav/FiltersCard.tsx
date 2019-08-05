import React, { useContext, useEffect, useState, FunctionComponent } from 'react';
import { FiltersArray, FiltersEntry } from '../../types/index';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';


import { filterCardStyles as useStyles } from './nav.styles';

const FiltersCard: FunctionComponent<any> = (props) => {
  const classes = useStyles();

  // ----- UI state
  /*
   * NOTE
   * If value === 0 then the active tab is Projects
   * If value === 1 then the active tab is Tags
  */
  const [value, setValue] = useState(0);

  // ----- API related state
  const [projects, setProjects] = useState<FiltersArray>([]);
  const [tags, setTags] = useState<FiltersArray>([]);

  // ----- Side Effect: populate lists
  useEffect(() => {
    const arr = [
      { color: 'pink', name: 'Another Todo'},
      { color: 'orange', name: 'Picture Analyzer'},
      { color: 'red', name: 'Personal Finances'},
    ];
    setProjects(arr);
    const tags = [
      { color: 'pink', name: 'Self-learning'},
      { color: 'orange', name: 'Chores'},
      { color: 'red', name: 'Career'},
    ];
    setTags(tags);
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => setValue(newValue);

  const toMap = value === 0 ? projects.map(
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
    tags.map(
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
      <div>
        <List component='ul'>
          { toMap }
        </List>
      </div>
    </div>
  )
};

export default FiltersCard;
