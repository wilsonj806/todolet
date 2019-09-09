import React, { FunctionComponent } from 'react';

import { useSelector, useDispatch } from 'react-redux'

import Body from '../components/Body';
import Main from '../components/Main';
import Nav from './Nav/Nav';
import { StoreShape, UserStoreShape } from '../types';

const LayoutWrapper: FunctionComponent<any> = (props) => {
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