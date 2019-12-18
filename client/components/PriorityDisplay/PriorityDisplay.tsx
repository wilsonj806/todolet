import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


import useStyles from './PriorityDisplay.styles';

const PriorityDisplay : FC<any> = (props) => {
  const { priority } = props;
  const bgColor = getBgColor(priority, useStyles);
  return (
    <div>
      <Box
        bgcolor={ bgColor }
        className={ bgColor }
        css={{
          width: '1rem',
          height: '1rem',
          borderRadius: '0.5rem'
        }}
      />
    <Typography>{ priority }</Typography>
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