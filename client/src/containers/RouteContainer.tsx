import React, { FunctionComponent, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

// ----- Required compoents
import Body from '../components/Body';
import Main from '../components/Main';
import Nav from '../containers/Nav/Nav';

// ----- Pages
import Login from '../pages/Login/Login';

const RouteContainer: FunctionComponent<any> = (props) => {
  const { state } = useContext(AppContext);
  const { user } = state;
  const noPadding = !user ? true : null;
  const NavToRender = user ? <Nav/> : null;
  return (
      <Body>
        { NavToRender }
        <Main noPadding={ noPadding }>
          <Login/>
        </Main>
      </Body>

  )
}

export default RouteContainer;