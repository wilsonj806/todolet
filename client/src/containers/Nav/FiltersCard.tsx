import React, { useContext, useState, FunctionComponent } from 'react';

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';


import { filterCardStyles as useStyles } from './styles';
import { useEffect } from 'react';

const FiltersCard: FunctionComponent<any> = (props) => {
  const classes = useStyles();

  /*
   * NOTE
   * If value === 0 then the active tab is Projects
   * If value === 1 then the active tab is Tags
  */
  const [value, setValue] = useState(0);
  // TODO Add an interface/ type alias for this
  const [projects, setProjects] = useState<Array<any>>([]);
  const [tags, setTags] = useState<Array<any>>([]);

  // ----- Side Effect: populate list
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
    (project, i) => (
      <ListItem key={ i }>
        <ListItemText inset>{ project.name }</ListItemText>
      </ListItem>
    )
  ) : value === 1 ?
    tags.map(
      (tag, i) => (
        <ListItem key={ i }>
          <ListItemText inset>{ tag.name }</ListItemText>
        </ListItem>
      )
    ) : null;
  ;

  return (
    <div>
      <Tabs value={value} onChange={ handleChange }  className={ classes.tabFlex } centered={ true }>
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
