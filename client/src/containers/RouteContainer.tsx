import React, { FunctionComponent, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

import Body from '../components/Body';
import Main from '../components/Main';
import Nav from '../containers/Nav/Nav';

import Login from '../pages/Login';

const RouteContainer: FunctionComponent<any> = (props) => {
  const { state } = useContext(AppContext);
  const { user } = state;

  const navToRender = user ? <Nav/> : null;
  return (
      <Body>
        { navToRender }
        <Main>
          <Login/>
        </Main>
      </Body>

  )
}

export default RouteContainer;