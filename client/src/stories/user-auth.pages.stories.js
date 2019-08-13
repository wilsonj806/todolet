import React from 'react'
import { storiesOf } from '@storybook/react';
import { StaticRouter as Router } from 'react-router-dom';

import Login from '../pages/Login/Login';

storiesOf('User Auth Pages | Login', module)
  .add('it renders', () => (
    <Router>
      <Login/>
    </Router>
  ))