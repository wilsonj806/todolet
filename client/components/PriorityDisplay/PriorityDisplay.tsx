import React, { FC } from 'react';

// ---- MUI components
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import useStyles from './PriorityDisplay.styles';

import { PriorityDisplayProps } from '../../types';


const PriorityDisplay : FC<PriorityDisplayProps> = (props) => {
  const { priority, handleEditBtnClick } = props;
  const classes = useStyles();
  const bgColor = getBgColor(priority, useStyles);
  return (
    <div className={ classes.rootBox }>
      <div className={ classes.priorityWrap }>
        <Box
          bgcolor={ bgColor }
          className={ bgColor }
          css={{
            width: '1rem',
            height: '1rem',
            borderRadius: '0.5rem',
            marginRight: '1rem'
          }}
        />
        <Typography>{ priority }</Typography>
      </div>
      <Button
        classes={{ root: classes.editButton }}
        onClick={ handleEditBtnClick }
        variant='contained'
        color='primary'
        type='button'
        size='small'
      >
        <EditIcon/>
      </Button>
      <Button
        classes={{ root: classes.deleteButton }}
        variant='contained'
        disabled={ true }
        color='primary'
        type='button'
        size='small'
      >
        <DeleteIcon/>
      </Button>
    </div>
  )
}

function getBgColor(priority: string, jss: any) {
  const classes =jss();
  switch(priority) {
    case 'High':
      return classes.priorityHigh;
    case 'Medium':
      return classes.priorityMed;
    case 'Low':
      return classes.priorityLow;
    default:
      throw new Error('Function expects values of: "High", "Medium", or "Low"');
  }
}

export default PriorityDisplay;
export { getBgColor }