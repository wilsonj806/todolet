import React from 'react'
import { storiesOf } from '@storybook/react';

import Wrapper from './helper-components/Wrapper';

import Nav from '../containers/Nav';


storiesOf('Navbar|Navbar', module)
  .add('it renders a persistent nav bar', () => {
    return (
      <Wrapper>
        <Nav/>
      </Wrapper>
    )
  })
storiesOf('Navbar|UserCard', module)
  .add('it renders a box/ card that shows user info', () => {
    return (
      <Wrapper>
      </Wrapper>
    )
  })
  .add('it prompts the user to log in if they aren\'t logged in', () => {
    return (
      <Wrapper>
      </Wrapper>
    )
  })

storiesOf('Navbar|FiltersCard', module)
  .add('it renders a card/ box that lets you toggle between filters', () => {
    return (
      <Wrapper>
      </Wrapper>
    )
  })