import React from 'react'
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from '@material-ui/styles';

import Nav from '../hybrid/Nav';
import Body from '../components/Body';

const Wrapper = props => <ThemeProvider>{props.children}</ThemeProvider>

storiesOf('Layout/Body', module)
  .add('It can render children components', () => {
    return (
      <Body>
        <h1>Hello World!</h1>
      </Body>
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

