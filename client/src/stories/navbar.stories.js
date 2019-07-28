import React from 'react'
import { storiesOf } from '@storybook/react';

import Wrapper from './helper-components/Wrapper';

import Nav from '../containers/Nav/Nav';
import AppBar from '../containers/Nav/TodoAppBar';
import UserCard from '../containers/Nav/UserCard';
import FiltersCard from '../containers/Nav/FiltersCard';

storiesOf('Navbar|Navbar', module)
  .add('it renders a persistent nav bar', () => {
    return (
      <Wrapper>
        <Nav/>
      </Wrapper>
    )
  })
storiesOf('Navbar|UserCard', module)
  .add(
    'it renders a box/ card that shows user info',
    () => {
      return (
          <UserCard/>
      )
    },
    {
      notes: `
        The User Card presents the current user, and tasks completed/ other stuff like that
      `
    }
  )
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
        <FiltersCard>

        </FiltersCard>
      </Wrapper>
    )
  })

  storiesOf('Navbar|AppBar', module)
  .add('it renders an appbar that has links/ menus for the current user profile', () => {
    return (
      <AppBar/>
    )
  })