import React from 'react'
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from '@material-ui/styles';

import Nav from '../hybrid/Nav';
import Body from '../components/Body';
import Main from '../containers/Main';

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
        <h1>Hello World!</h1>
      </Main>
    )
  })


storiesOf('Layout/Navbar', module)
  .add('it has a login/ current user thing', () => {
    return (
      <Wrapper>
        <Nav/>
      </Wrapper>
    )
  })
  .add('it has projects and tags', () => {
    return (
      <div>
      </div>
    )
  })

