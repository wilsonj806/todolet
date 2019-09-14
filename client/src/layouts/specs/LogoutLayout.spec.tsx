import React, { FC } from 'react'
import { DeepPartial } from 'redux'
import { Provider } from 'react-redux';
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../helpers/router.helper';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';

import axios from '../../axios'
import configureStore from '../../store/configureStore'
import LogoutLayout from '../Logout/LogoutLayout'

import { StoreShape } from '../../types';
import UserService from '../../services/UserService';


const unauthenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '1111',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}

const authenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const unauthenticatedStore = configureStore(unauthenticatedState)
const authenticatedStore = configureStore(authenticatedState)

const Wrapper: FC<any> = ({ children, store }) => <Provider store={ store }>{ children }</Provider>


describe('A layout that renders when a user logs out', () => {
  afterEach(() => {
    jest.restoreAllMocks()

    cleanup()
    // NOTE Reset current path to home
    render(
      <HashRouter>
        <Route path="/" render={ () => <Redirect to="/"/> }/>
      </HashRouter>
    )
  });

  test('it renders with a heading indicating that they\'ve logged out', () => {
    const { getByText } = render(
      <Wrapper store={ unauthenticatedStore }>
        <LogoutLayout/>
      </Wrapper>
    )

    const assertHeading = getByText('Logged out', { exact: false })

    expect(assertHeading).toBeTruthy()
    // TODO also check if the parent is a heading element
  })

  test('it renders with a link to direct the user to the login page', () => {
    const { container } = render(
      <Wrapper store={ unauthenticatedStore }>
        <LogoutLayout/>
      </Wrapper>
    )

    const assertLink = container.querySelector('a')
    // console.log(assertLink.innerText)

    expect(assertLink).toBeTruthy()
  })

  test('it redirects the user if they click on the link prompting them to login', async (done) => {
    const startingPath = '/logout';
    const targetPath = '/'
    const { getByText, container } = renderWithRouter(
      <Wrapper store={ unauthenticatedStore }>
        <LogoutLayout/>
      </Wrapper>
    , { startingPath, targetPath })

    const assertLink = container.querySelector('a')
    fireEvent.click(assertLink!)

    const assertRedirect = await waitForElement(() => getByText(targetPath))

    expect(assertRedirect).toBeTruthy
  })
})