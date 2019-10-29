import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const jsx = (
  <Router>
    <App/>
  </Router>
)
ReactDOM.hydrate(jsx, document.getElementById('app'));
