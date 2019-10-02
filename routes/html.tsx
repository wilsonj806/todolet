import path from 'path'
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'

import {
  uri, dbName, sessConfig, corsOptions, NodeENV
} from '../config/config';
import { staticLocation } from '../expressApp';

import App from '../client/src/App'


const router = express.Router();

router.get('/*', (req, res) => {
  const sheets = new ServerStyleSheets();
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
      <script src="/dist/app.js"></script>
    </body>
    </html>
  `)

  const jsx = (
    <App/>
  );
  const reactDom = renderToString(sheets.collect(jsx));
  const css = sheets.toString();
  res
    .status(200)
    .set({ "Content-Type": "text/html" })
    .send( htmlTemplate( reactDom, css ) );

});

export default router