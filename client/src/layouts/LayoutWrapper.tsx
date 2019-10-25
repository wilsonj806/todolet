import React, { FunctionComponent } from 'react';

import { useSelector, useDispatch } from 'react-redux'

import Body from '../components/Body';
import Main from '../components/Main';
import Nav from './Nav/Nav';
import { StoreShape, UserStoreShape } from '../types';

interface LayoutWrapperProps {
  NO_NAV ?: boolean
}

const LayoutWrapper: FunctionComponent<LayoutWrapperProps> = (props) => {
  const user : UserStoreShape = useSelector((state : StoreShape) => state["authorizedUser"])
  const userCheck = user.userId && user.username;

  const noPadding = !userCheck ? true : undefined;

  const NavToRender = userCheck  && !props.NO_NAV ? <Nav/> : null;
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