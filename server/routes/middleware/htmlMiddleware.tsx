import { RequestHandler, Request } from 'express';

import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { renderToString } from 'react-dom/server'
import { SnackbarProvider } from 'notistack'
import { ServerStyleSheets, StylesProvider, createGenerateClassName } from '@material-ui/styles'

import {
  uri, dbName, sessConfig, corsOptions, NodeENV
} from '../../config';
import { staticLocation } from '../../expressApp';

import App from '../../../client/App'
import { checkSessionAndUrl } from './../routes.client';
import configureStore from '../../../client/store/configureStore';
import { StoreShape } from '../../../client/types';
import { INIT_APP_STATE } from '../../../client/store/reducers/root.reducer';
import { PREFETCHED_TODOS_KEY } from './todoMiddleware';
import { storeInResLocals } from './commonMiddleware';
import User from '../../models/user';
// import User from '../../models/user';

// TODO do proper server side routing for requests
// TODO add more tests to handle different status pages
const htmlTemplate = (reactDom: string, css: string, reduxState: StoreShape = INIT_APP_STATE, title: string = 'Todolet'): string =>
  (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>${ title }</title>
      <link rel="icon" href="/static/favicon.ico" type="image/x-icon"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <style id="jss-server-side">${ css }</style>
    </head>

    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

      <div id="app">${ reactDom }</div>
      <script id="redux-data">
        window.__REDUX_DATA__ = ${ JSON.stringify( reduxState) }
      </script>
      <script src="/dist/vendor.bundle.js" defer></script>
      <script src="/dist/app.bundle.js" defer></script>
    </body>
    </html>
`)
const STATE_KEY = '__STATE__';

const gatherState : RequestHandler = async (req, res, next) => {
  if (!req.user) {
    // NOTE If there's no prefetched_todos then keep going
    next();
  } else {
    // @ts-ignore
    // FIXME This needs updating for session ALSO req.user only gives an ID value
    const todosList = req.user[PREFETCHED_TODOS_KEY] ? [ ...res.locals[PREFETCHED_TODOS_KEY] ] : [];
    try {
      const fetchedUser = await User.findOne({where: {id: req.user}})
      const fetchedTodos = await fetchedUser.getTodos()
      const authorizedUser = Object.assign({}, {
        username: fetchedUser.username,
        userId: fetchedUser.id,
        todos: [],
      });

      const state = {
        ...INIT_APP_STATE,
        authorizedUser,
        todosList,
      }
      storeInResLocals(res, STATE_KEY, state);
      next();
    } catch(e) {
      console.log(e)
      res.status(500).json({msg:'ded'})
      next(e)
    }
  }
}


const returnHtml: RequestHandler = (req: any, res: any, next: any) => {
  const initState = { ...res.locals[STATE_KEY] }
  // console.log(initState);
  const sheets = new ServerStyleSheets({
    serverGenerateClassName: createGenerateClassName({
      productionPrefix: 'jss',
    })
  });
  // console.log(initState);
  const store = configureStore(
    initState
  );
  // console.log('this is store state', store.getState())
  const context = {};
  const status = checkSessionAndUrl(req);
  const finalUrl = status === 200 ? req.url :
    status === 300 ? '/' :
      '/404';

  const jsx = (
    <StaticRouter context={ context } location={ finalUrl }>
      <Provider store={ store }>
        <SnackbarProvider maxSnack={ 4 }>
          <App/>
        </SnackbarProvider>
      </Provider>
    </StaticRouter>
  );
  const reactDom = renderToString(sheets.collect(jsx));
  // console.log(reactDom);
  const css = sheets.toString();
  // console.log('this is state', store.getState())
  const finalState = store.getState();
  const html = htmlTemplate(
    reactDom,
    css,
    finalState
  );
  // if (context.url) {
  //   return res.redirect(301, context.url)
  // }

  res
    .status(status)
    .set({ "Content-Type": "text/html" })
    // FIXME
    .send(html);

  next();
};



export {
  gatherState,
  returnHtml,
  htmlTemplate,
  STATE_KEY
}