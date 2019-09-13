import React, { FC } from 'react'
import { DeepPartial } from 'redux'
import { Provider } from 'react-redux';
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../layouts/helpers/router.helper';
import { render, cleanup, waitForElement } from '@testing-library/react';

import axios from '../../axios'
import configureStore from '../../store/configureStore'
import LoginPage from '../LoginPage'

import { StoreShape } from '../../types';


const mock = new MockAdapter(axios);

const init : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const finalWUser : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '1111',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}

const unauthenticatedStore = configureStore(init)
const authenticatedStore = configureStore(finalWUser)

const Wrapper: FC<any> = ({ children, store }) => <Provider store={ store }>{ children }</Provider>

describe('A page that lets the user log in', () => {
  afterEach(() => {
    mock.reset()
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
          <LoginPage/>
        </HashRouter>
      </Wrapper>
    )

    const assertNoNav = container.querySelector('nav')
    expect(assertNoNav).toBeFalsy()
  })

  test('it redirects if there\'s a user logged in', async (done) => {
    const startingPath = '/login'
    const targetPath ='/'
    const {  getByText } = renderWithRouter(
      <Wrapper store={ authenticatedStore }>
        <LoginPage/>
      </Wrapper>
    , { startingPath, targetPath })

    const assertion = await waitForElement(() => getByText(targetPath))

    expect(assertion).toBeTruthy()
    done()
  })
})