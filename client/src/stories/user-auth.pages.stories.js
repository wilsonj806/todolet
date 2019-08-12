import React from 'react'
import { storiesOf } from '@storybook/react';
import Login from '../pages/Login';

storiesOf('User Auth Pages | Login', module)
  .add('it renders', () => <Login/>)