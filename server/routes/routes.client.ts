import { Store } from 'redux';
import LoginPage from '../../client/pages/LoginPage';
import LogoutPage from '../../client/pages/LogoutPage';
import RegisterPage from '../../client/pages/RegisterPage';
import MainPage from '../../client/pages/MainPage';
import UserUpdatePage from '../../client/pages/UserUpdatePage';
import { StoreShape } from '../../client/types';

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

// TODO add tests
const checkSessionAndUrl = (req: Request) => {
  const commonRoutes = [
    'favicon.ico',
    'logout',
    'home',
  ]
  const authenticatedRoutes = [
    'account',
    ...commonRoutes
  ];
  const unauthenticatedRoutes = [
    'register',
    'login',
    ...commonRoutes
  ];
  /**
   * Conditions To Check:
   * - matches with authRoutes && has a session
   * - matches with unauthRoutes && doesn't have a session
   * - matches with unauthRoutes && has a session
   * - matches with authRoutes && doesn't have a session
   * - doesn't match with anything known
   */
  const url = req.url === '/' ? 'home' : req.url.slice(1);
  const hasMatchingAuthRoute = authenticatedRoutes.some((route) => {
    const checkRouteStr = route === '' ? 'home' : route;
    const regex = new RegExp(checkRouteStr);
    return regex.test(url);
  })
  const hasMatchingUnauthRoute = unauthenticatedRoutes.some((route) => {
    const regex = new RegExp(route);
    return regex.test(url);
  })
  // checks if routes match as expected
  if ((hasMatchingAuthRoute && req.user) || (hasMatchingUnauthRoute && !req.user)) {
    return req.url
  } else if (hasMatchingAuthRoute && !req.user) {
    return '/'
  } else if (hasMatchingUnauthRoute && req.user) {
    return '/'
  } else {
    return '/404'
  }
}
// const routes = (store : Store<StoreShape>): any[] => {
//   const state = store.getState()
//   const { authorizedUser } = state;
//   // FIXME this is basically what RouterContainer is doing but more wrong due to SSR
//   // NOTE the format of each is very similar to how Route renders stuff
//   const isAuthenticated = authorizedUser.userId != undefined;

//   return isAuthenticated ? [
//     {
//       path: '/',
//       component: authorizedUser.userId ? MainPage : LoginPage
//     },
//     {
//       path: '/login',
//       redirect: '/',
//       component: LoginPage
//     },
//     {
//       path: '/logout',
//       component: LogoutPage
//     },
//     {
//       path: '/register',
//       redirect: '/',
//       component: RegisterPage
//     },
//     {
//       path: '/account',
//       component: UserUpdatePage
//     },
//   ] : [
//     {
//       path: '/',
//       component: authorizedUser.userId ? MainPage : LoginPage
//     },
//     {
//       path: '/login',
//       component: LoginPage
//     },
//     {
//       path: '/logout',
//       component: LogoutPage
//     },
//     {
//       path: '/register',
//       component: RegisterPage
//     },
//     {
//       path: '/account',
//       redirect: '/',
//       component: UserUpdatePage
//     },
//   ]
// }


export { checkSessionAndUrl }
