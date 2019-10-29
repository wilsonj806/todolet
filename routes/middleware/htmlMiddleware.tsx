import { RequestHandler } from 'express';

import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { renderToString } from 'react-dom/server'
import { ServerStyleSheets, StylesProvider, createGenerateClassName } from '@material-ui/styles'

import {
  uri, dbName, sessConfig, corsOptions, NodeENV
} from '../../config/config';
import { staticLocation } from '../../expressApp';

import App from '../../client/src/App'
import routes from './../routes.client';
import configureStore from '../../client/src/store/configureStore';
import { StoreShape } from '../../client/src/types';
import { INIT_APP_STATE } from '../../client/src/store/reducers/root.reducer';
// import User from '../../models/user';


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
      <script>
        window.__REDUX_DATA__ = ${ JSON.stringify( reduxState) }
      </script>
      <script src="/dist/app.bundle.js"></script>
    </body>
    </html>
`)

const returnHtml: RequestHandler = (req: any, res: any, next: any) => {
  // TODO check if there's a session and prepopulate
  // const prepopulatedState: StoreShape = {
  //   authorizedUser: {}
  // }
  // const { passport } = req.session;
  // const userId = passport && passport.user ? passport.user.userId.toString() : undefined;
  // try {
  //   const user = await User.findById(userId);
  //   console.log(user);
  //   prepopulatedState.authorizedUser = user
  // } catch (error) {
  //   res.redirect(500, '/500-err')
  // }

  const sheets = new ServerStyleSheets({
    serverGenerateClassName: createGenerateClassName({
      productionPrefix: 'jss',
    })
  });
  const store = configureStore(
    // prepopulatedState
  );

  const context = {};
  const jsx = (
    <Provider store={ store }>
      <StaticRouter context={ context } location={ req.url }>
        <App/>
      </StaticRouter>
    </Provider>
  );
  const reactDom = renderToString(sheets.collect(jsx));
  const css = sheets.toString();
  res
    .status(200)
    .set({ "Content-Type": "text/html" })
    // FIXME
    .send( htmlTemplate( reactDom, css ) );

  next();
};



export {
  returnHtml,
  htmlTemplate
}