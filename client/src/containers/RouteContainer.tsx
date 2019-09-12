import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom';

// ----- Pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import MainPage from '../pages/MainPage';
import { StoreShape } from '../types';

const RouteContainer: FunctionComponent<any> = (props) => {
  const authorizedUser = useSelector((state: StoreShape) => state.authorizedUser);
  const { username, userId } = authorizedUser;
  const isNotAuthorized: boolean = username === undefined || userId === undefined;

  return (
    <>
      <Route path='/' exact component={ isNotAuthorized ? LoginPage : MainPage }/>
      <Route path='/login' exact component={ LoginPage }/>
      <Route path='/register' exact component={ RegisterPage }/>
    </>
  )
}

export default RouteContainer;