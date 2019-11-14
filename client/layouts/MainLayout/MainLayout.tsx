import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Typography from '@material-ui/core/Typography';

import SubmitBar from './SubmitBar';
/**
 * Need:
 * - A SubmitBar
 * - a list entry with the ability to see todos
 *  - later: ability to update todo
 *
 */

const MainLayout : FC<any> = (props) => {
  return (
    <div>
      <SubmitBar/>
      <Typography variant='h1'>Work In Progress</Typography>
    </div>
  )
}

export default MainLayout