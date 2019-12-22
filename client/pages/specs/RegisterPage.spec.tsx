import React from 'react'
import { DeepPartial } from 'redux'
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../layouts/test-helpers/router.helper.spec';
import { render, cleanup, waitForElement } from '@testing-library/react';

import axios from '../../axios'
import configureStore from '../../store/configureStore'
import RegisterPage from '../RegisterPage'

import { StoreShape } from '../../types';
import ReduxWrap from '../../layouts/test-helpers/ReduxWrap.helper.spec';



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
      <ReduxWrap store={ unauthenticatedStore }>
        <HashRouter>
          <RegisterPage/>
        </HashRouter>
      </ReduxWrap>
    )

    const assertNoNav = container.querySelector('nav')
    expect(assertNoNav).toBeFalsy()
  })

  test('it redirects if there\'s a user logged in', async (done) => {
    const startingPath = '/register'
    const targetPath ='/'
    const {  getByText } = renderWithRouter(
      <ReduxWrap store={ authenticatedStore }>
        <RegisterPage/>
      </ReduxWrap>
    , { startingPath, targetPath })

    const assertion = await waitForElement(() => getByText(targetPath))

    expect(assertion).toBeTruthy()
    done()
  })
})