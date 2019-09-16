import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../test-helpers/router.helper.spec';
import { render, cleanup, fireEvent } from '@testing-library/react';



import ReduxWrap from '../../test-helpers/ReduxWrap.helper.spec';
import configureStore from '../../../store/configureStore';

import UserService from '../../../services/UserService'

import UserProfileMenu from '../../Nav/UserProfileMenu';

const store = configureStore();


describe('A component that renders a profile icon that expands to a menu', () => {
  afterEach(() => {
    cleanup()
    // NOTE Reset current path to home
    render(
      <HashRouter>
        <Route path="/" render={ () => <Redirect to="/"/> }/>
      </HashRouter>
    )
  });
  test('it goes to a profile page when the appropriate menu link is clicked', () => {
    const targetPath = '/profile';
    const { container, getByText } = renderWithRouter(
        <ReduxWrap store={ store }>
          <UserProfileMenu/>
        </ReduxWrap>
    , { targetPath })

    const button = container.querySelector('button');

    fireEvent.click(button!);

    const link = getByText('Profile');
    fireEvent.click(link!);

    expect(getByText(targetPath)).toBeTruthy();
  })

  test('it goes to an account page when the appropriate menu link is clicked', () => {
    const targetPath = '/account';
    const { container, getByText } = renderWithRouter(
      <ReduxWrap  store={ store }>
        <UserProfileMenu/>
      </ReduxWrap>
    , { targetPath })

    const button = container.querySelector('button');

    fireEvent.click(button!);

    const link = getByText('My Account');
    fireEvent.click(link!);

    expect(getByText(targetPath)).toBeTruthy();
  })

  test('it goes to a Logout page when the appropriate menu link is clicked', () => {
    const targetPath = '/logout';
    const { container, getByText } = renderWithRouter(
      <ReduxWrap  store={ store }>
       <UserProfileMenu/>
      </ReduxWrap>
    ,  { targetPath })

    const button = container.querySelector('button');

    fireEvent.click(button!);

    const link = getByText('Logout');
    fireEvent.click(link!);

    expect(getByText(targetPath)).toBeTruthy();
  })

  test('it logs the user out when you click the logout link in the menu', () => {
    const spy = jest.spyOn(UserService, "postLogout");
    const targetPath = '/logout';
    const { container, getByText } = renderWithRouter(
      <ReduxWrap  store={ store }>
        <UserProfileMenu/>
      </ReduxWrap>
    ,  { targetPath })

    const button = container.querySelector('button');

    fireEvent.click(button!);

    const link = getByText('Logout');
    fireEvent.click(link!);

    expect(spy).toHaveBeenCalled();
  })
})