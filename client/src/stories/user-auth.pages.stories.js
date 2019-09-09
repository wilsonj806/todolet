import React from 'react'
import { Provider } from 'react-redux'
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import configureStore from '../store/configureStore'

import Login from '../layouts/Login/Login';

const store = configureStore({ authorizedUser: { userId: '111', username: 'guest'}});

storiesOf('User Auth Pages | Login', module)
  .addDecorator(StoryRouter())
  .add('it renders', () => (
    <Provider store={ store }>
      <Login/>
    </Provider>
  ))