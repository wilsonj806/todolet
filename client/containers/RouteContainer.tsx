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

  const RedirectHome = () => <Redirect to='/'/>

  const AuthorizedRoutes = (
    <>
      <Route path={['/']} exact component={ MainPage }/>
      <Route path={['/register', '/login']} exact component={ RedirectHome }/>
      <Route path='/account' exact component={ UserUpdatePage }/>
    </>
  );
  const UnauthorizedRoutes = (
    <>
      <Route path={['/','/login', '/account']} exact component={ LoginPage }/>
      <Route path={['/account']} exact component={ RedirectHome }/>
      <Route path='/logout' exact component={ LogoutPage}/>
      <Route path='/register' exact component={ RegisterPage }/>
    </>
  )

  // const HomeRoute = isNotAuthorized ? LoginPage : MainPage;
  const RoutesToRender = isNotAuthorized ? UnauthorizedRoutes : AuthorizedRoutes;
  return (
    <Switch>
      { RoutesToRender }
      <Route path='/404' exact component={ NotFoundPage }/>
      <Route component={ NotFoundPage }/>
    </Switch>
  )
}

export default RouteContainer;