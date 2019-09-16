import React from 'react'
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';


import Wrapper from './helper-components/Wrapper';

import Nav from '../layouts/Nav/Nav';
import AppBar from '../layouts/Nav/TodoAppBar';
import UserCard from '../layouts/Nav/UserCard';
import FiltersCard from '../layouts/Nav/FiltersCard';
import TodoAppBar from '../layouts/Nav/TodoAppBar';
import UserProfileMenu from '../layouts/Nav/UserProfileMenu'

storiesOf('Navbar|Navbar', module)
  .addDecorator(StoryRouter())
  .add('it renders a persistent nav bar', () => {
    return (
        <Wrapper>
          <Nav/>
        </Wrapper>
    )
  })
storiesOf('Navbar|UserCard', module)
  .addDecorator(StoryRouter())
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
  .addDecorator(StoryRouter())
  .add('it renders a card/ box that lets you toggle between filters', () => {
    return (
        <Wrapper>
          <FiltersCard>

          </FiltersCard>
        </Wrapper>
    )
  })

storiesOf('Navbar|TodoAppBar', module)
  .addDecorator(StoryRouter())
  .add('it renders an appbar that has links/ menus for the current user profile', () => {
    return (
        <TodoAppBar/>
    )
  })

storiesOf('Navbar|UserProfileMenu', module)
  .addDecorator(StoryRouter())
  .add('it renders a menu that\'s display by clicking an icon button', () => {
    return (
        <UserProfileMenu/>
    )
  })