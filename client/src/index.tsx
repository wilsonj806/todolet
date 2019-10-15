import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// import 'typeface-roboto';

// import './index.css';
import App from './App';
// NOTE for some reason React needs to hydrate with the router before the app can render
const jsx = (
  <Router>
    <App/>
  </Router>
)
ReactDOM.hydrate(jsx, document.getElementById('app'));
