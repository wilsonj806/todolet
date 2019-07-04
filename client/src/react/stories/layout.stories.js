import React from 'react'
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from '@material-ui/styles';

import Nav from '../hybrid/Nav';

const Wrapper = props => <ThemeProvider>{props.children}</ThemeProvider>

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

