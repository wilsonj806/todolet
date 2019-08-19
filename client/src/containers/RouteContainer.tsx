import React, { FunctionComponent } from 'react';
import { Route } from 'react-router-dom';

// ----- Pages
import LoginPage from '../pages/LoginPage';

const RouteContainer: FunctionComponent<any> = (props) => {

  return (
    <>
      <Route path='/' exact component={ LoginPage }/>
      <Route path='/login' exact component={ LoginPage }/>
    </>
  )
}

export default RouteContainer;