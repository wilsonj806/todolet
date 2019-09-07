import React from 'react'
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import Login from '../layouts/Login/Login';

storiesOf('User Auth Pages | Login', module)
  .addDecorator(StoryRouter())
  .add('it renders', () => (
      <Login/>
  ))