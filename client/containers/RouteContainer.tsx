import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom';

// ----- Pages
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import RegisterPage from '../pages/RegisterPage';
import MainPage from '../pages/MainPage';
import UserUpdatePage from '../pages/UserUpdatePage';
import NotFoundPage from '../pages/404Page';
import { StoreShape } from '../types';

const RouteContainer: FunctionComponent<any> = (props) => {
  // TODO handle 404 and 500 errors
  const authorizedUser = useSelector((state: StoreShape) => state.authorizedUser);
  const { username, userId } = authorizedUser;
  const isNotAuthorized: boolean = username === undefined || userId === undefined;

  const HomeRoute = isNotAuthorized ? LoginPage : MainPage
  // const RoutesToRender = isNotAuthorized ? UnauthorizedRoutes : AuthorizedRoutes;
  // console.dir(RoutesToRender);

  // FIXME Not scalable but it works
  const AccountRoute = isNotAuthorized ? <Redirect exact to='/'/> : <UserUpdatePage/>;

  const RegisterRoute = !isNotAuthorized ? <Redirect exact to='/'/> : <RegisterPage/>;
  const LogoutRoute = !isNotAuthorized ? <Redirect exact to='/'/> : <LogoutPage/>;
  const LoginRoute = !isNotAuthorized ? <Redirect exact to='/'/> : <LogoutPage/>;
  // NOTE RENDER CONDITIONAL ROUTES LAST, REACT ROUTER RENDERS REACT FRAGMENTS WEIRD
  // FIXME Monkeypatched the register route
  return (
    <Switch>
      <Route path='/' exact component={ HomeRoute }/>
      <Route path='/404' exact component={ NotFoundPage }/>
      <Route path='/account' exact render={ () => AccountRoute }/>
      <Route path='/logout' exact render={ () => LogoutRoute }/>
      <Route path='/login' exact render={ () => LoginRoute }/>
      <Route path='/register' exact render={ () => RegisterRoute }/>
      <Route component={ NotFoundPage }/>
    </Switch>
  )
}

export default RouteContainer;