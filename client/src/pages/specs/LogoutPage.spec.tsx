import React, { FC } from 'react'
import { DeepPartial } from 'redux'
import { Provider } from 'react-redux';
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../layouts/helpers/router.helper';
import { render, cleanup } from '@testing-library/react';


import configureStore from '../../store/configureStore'
import LogoutPage from '../LogoutPage'

import { StoreShape } from '../../types';


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

const Wrapper: FC<any> = ({ children, store }) => <Provider store={ store }>{ children }</Provider>

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
  test('it renders without a NAV component', () => {
    const { container } = render(
      <Wrapper store={ unauthenticatedStore }>
        <HashRouter>
          <LogoutPage/>
        </HashRouter>
      </Wrapper>
    )

    const assertNoNav = container.querySelector('nav')
    expect(assertNoNav).toBeFalsy()
  })
})