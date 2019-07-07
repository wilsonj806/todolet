import React from 'react'
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from '@material-ui/styles';

import Nav from '../containers/Nav';
import Body from '../components/Body';
import Main from '../containers/Main';
import { Typography } from '@material-ui/core';

const Wrapper = props => <ThemeProvider>{props.children}</ThemeProvider>

storiesOf('Layout/Body', module)
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
storiesOf('Layout/Main', module)
  .add('it can render children components', () => {
    return (
      <Main>
        <Typography variant='h1'>Hello World!</Typography>
        <Typography component='p'>Hello World, I am a test of various things right now.</Typography>
      </Main>
    )
  })


storiesOf('Layout/Navbar', module)
  .add('it renders a persistent nav bar', () => {
    return (
      <Wrapper>
        <Nav/>
      </Wrapper>
    )
  })

