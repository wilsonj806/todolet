import React, { FunctionComponent, useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux'

import { AppContext } from '../contexts/AppContext';

import Body from '../components/Body';
import Main from '../components/Main';
import Nav from './Nav/Nav';
import { StoreShape, UserStoreShape } from '../types';

const LayoutWrapper: FunctionComponent<any> = (props) => {
  // const { state } = useContext(AppContext);
  // const { user } = state;
  const dispatch = useDispatch();
  const user : UserStoreShape = useSelector((state : StoreShape) => state["authorizedUser"])
  const userCheck = user.userId && user.username;

  const noPadding = !userCheck ? true : undefined;

  const NavToRender = userCheck ? <Nav/> : null;
  return (
      <Body>
        { NavToRender }
        <Main noPadding={ noPadding }>
          { props.children }
        </Main>
      </Body>

  )
}

export default LayoutWrapper;