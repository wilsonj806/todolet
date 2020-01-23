import React from 'react'
import { DeepPartial } from 'redux'
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../test-helpers/router.helper.spec';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';

import configureStore from '../../store/configureStore'

import LogoutLayout from '../Logout/LogoutLayout'
import ReduxWrap from '../test-helpers/ReduxWrap.helper.spec';

import { StoreShape } from '../../types';


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

  it('renders with text indicating that they\'ve logged out', () => {
    const { getByText } = renderWithRouter(
      <ReduxWrap store={ unauthenticatedStore }>
        <LogoutLayout/>
      </ReduxWrap>
    )

    const assertHeading = getByText('logged out', { exact: false })

    expect(assertHeading).toBeTruthy()
  })

  it('renders with a link to direct the user to the login page', () => {
    const startingPath = '/logout'
    const targetPath = '/'
    const { container } = renderWithRouter(
      <ReduxWrap store={ unauthenticatedStore }>
        <LogoutLayout/>
      </ReduxWrap>
    , { startingPath, targetPath })

    const assertLink = container.querySelector('a')
    // console.log(assertLink.innerText)

    expect(assertLink).toBeTruthy()
  })

  it('redirects the user if they click on the link prompting them to login', async (done) => {
    const startingPath = '/logout';
    const targetPath = '/'
    const { getByText, container } = renderWithRouter(
      <ReduxWrap store={ unauthenticatedStore }>
        <LogoutLayout/>
      </ReduxWrap>
    , { startingPath, targetPath })

    const assertLink = container.querySelector('a')
    fireEvent.click(assertLink!)

    const assertRedirect = await waitForElement(() => getByText(targetPath))

    expect(assertRedirect).toBeTruthy()
    done()
  })
})