import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';

// import './index.css';
import App from './App';
console.log('hydrating');

ReactDOM.hydrate(<App />, document.getElementById('root'));
