import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../helpers/router.helper';
import { render, cleanup, fireEvent } from '@testing-library/react';


import UserProfileMenu from '../../Nav/UserProfileMenu';

import configureStore from '../../../store/configureStore';
import UserService from '../../../services/UserService'
;

const store = configureStore();

const Wrapper: FC<any> = ({ children }) => <Provider store={ store }>{ children }</Provider>

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
        <Wrapper>
          <UserProfileMenu/>
        </Wrapper>
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
      <Wrapper>
        <UserProfileMenu/>
      </Wrapper>
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
      <Wrapper>
       <UserProfileMenu/>
      </Wrapper>
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
      <Wrapper>
        <UserProfileMenu/>
      </Wrapper>
    ,  { targetPath })

    const button = container.querySelector('button');

    fireEvent.click(button!);

    const link = getByText('Logout');
    fireEvent.click(link!);

    expect(spy).toHaveBeenCalled();
  })
})