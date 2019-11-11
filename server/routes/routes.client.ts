import { Store } from 'redux';
import LoginPage from '../../client/src/pages/LoginPage';
import LogoutPage from '../../client/src/pages/LogoutPage';
import RegisterPage from '../../client/src/pages/RegisterPage';
import MainPage from '../../client/src/pages/MainPage';
import UserUpdatePage from '../../client/src/pages/UserUpdatePage';
import { StoreShape } from '../../client/src/types';

/**
 * React Router's matchPatch() looks like this:
 *  matchPath(pathToMatch, matchOptions)
 *
 * matchOptions looks like:
 * const matchOptions = {
 *   path: "<your-path-here>",
 *   exact: true,
 *   strict: true,
 * }
 * And returns an object
 *
 * This more or less looks like how the <Route/> component
 *   matches paths
 *
 */
const routes = (store : Store<StoreShape>): any[] => {
  const state = store.getState()
  const { authorizedUser } = state;
  // FIXME this is basically what RouterContainer is doing but more wrong due to SSR
  // NOTE the format of each is very similar to how Route renders stuff
  return [
    {
      path: '/',
      component: authorizedUser.userId ? MainPage : LoginPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/logout',
      component: LogoutPage
    },
    {
      path: '/register',
      component: RegisterPage
    },
    {
      path: '/account',
      component: UserUpdatePage
    },
  ]
}

export default routes;
