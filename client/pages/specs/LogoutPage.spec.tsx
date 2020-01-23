import React from 'react'
import { DeepPartial } from 'redux'
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../layouts/test-helpers/router.helper.spec';
import { render, cleanup } from '@testing-library/react';


import configureStore from '../../store/configureStore'
import LogoutPage from '../LogoutPage'

import { StoreShape } from '../../types';
import ReduxWrap from '../../layouts/test-helpers/ReduxWrap.helper.spec';


const unauthenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const authenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '1111',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}

const unauthenticatedStore = configureStore(unauthenticatedState)
const authenticatedStore = configureStore(authenticatedState)

describe('A page that lets the user log in', () => {
  afterEach(() => {
    jest.restoreAllMocks()

    cleanup()
    // NOTE Reset current path to home
    render(
      <HashRouter>
        <Route path="/" render={ () => <Redirect to="/"/> }/>
      </HashRouter>
    )
  })
  it('renders without a NAV component', () => {
    const { container } = render(
      <ReduxWrap store={ unauthenticatedStore }>
        <HashRouter>
          <LogoutPage/>
        </HashRouter>
      </ReduxWrap>
    )

    const assertNoNav = container.querySelector('nav')
    expect(assertNoNav).toBeFalsy()
  })
})