import React from 'react'
import { storiesOf } from '@storybook/react';

import { Typography } from '@material-ui/core';
import StoryRouter from 'storybook-react-router';

import Nav from '../containers/Nav/Nav';
import Body from '../components/Body';
import Main from '../components/Main';


storiesOf('Layout|Body', module)
  .addDecorator(StoryRouter())
  .add('it can render a nav and main component side by side', () => {
    return (
      <Body>
        <Nav/>
        <Main>
          <h1>Hello World!</h1>
          <p>Hello world this is an example</p>
        </Main>
      </Body>
    )
  })
storiesOf('Layout|Main', module)
  .add('it can render children components', () => {
    return (
      <Main>
        <Typography variant='h1'>Hello World!</Typography>
        <Typography component='p'>Hello World, I am a test of various things right now.</Typography>
      </Main>
    )
  })


