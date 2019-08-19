import React, { FunctionComponent, useContext } from 'react';

import { AppContext } from '../contexts/AppContext';

import Body from '../components/Body';
import Main from '../components/Main';
import Nav from './Nav/Nav';

const LayoutWrapper: FunctionComponent<any> = (props) => {
  const { state } = useContext(AppContext);
  const { user } = state;
  const noPadding = !user ? true : null;
  const NavToRender = user ? <Nav/> : null;
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