import path from 'path'
import express from 'express';
import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';

import { renderToString } from 'react-dom/server'
import { ServerStyleSheets, StylesProvider, createGenerateClassName } from '@material-ui/styles'

import {
  uri, dbName, sessConfig, corsOptions, NodeENV
} from '../config/config';
import { staticLocation } from '../expressApp';

import App from '../client/src/App'
import routes from './routes.client';
import configureStore from '../client/src/store/configureStore';

const router = express.Router();

router.get('/*', (req: any, res: any, next: any) => {
  console.log('this is req url: ', req.url);
  const sheets = new ServerStyleSheets({
    serverGenerateClassName: createGenerateClassName({
      productionPrefix: 'prd',
    })
  });
  const store = configureStore(

  );
  const htmlTemplate = (reactDom: any, css: any): string =>
  (`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Todolet</title>
      <link rel="icon" href="/static/favicon.ico" type="image/x-icon"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <style id="jss-server-side">${ css }</style>
    </head>

    <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>

      <div id="app">${ reactDom }</div>
      <script src="/dist/app.bundle.js"></script>
    </body>
    </html>
  `)
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
    .send( htmlTemplate( reactDom, css ) );

  next();
});

export default router