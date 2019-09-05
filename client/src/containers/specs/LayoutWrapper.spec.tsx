import React from 'react';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';import MockAdapter from 'axios-mock-adapter';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import LayoutWrapper from '../LayoutWrapper';
import { AppContext } from '../../contexts/AppContext';
import { StoreShape } from '../../types';
import { DeepPartial } from 'redux';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const init : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const initWithUser : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '123',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}
describe('A component for building the app layout', () => {
  afterEach(() => cleanup())

  test('it should render with one NAV tag', () => {
    const store = mockStore(initWithUser)
    const { container } = render(
      <Router>
        <Provider store={ store }>
          <LayoutWrapper/>
        </Provider>
      </Router>
    )

    const assertOneNav = container.querySelectorAll('nav');
    expect(assertOneNav.length).toBe(1);
  })

  test('it should render with no NAV tag if no user is provided', () => {
    const store = mockStore(init)

    const { container } = render(
      <Router>
        <Provider store={ store }>
          <LayoutWrapper/>
        </Provider>
      </Router>
    )

    const assertNoNav = container.querySelectorAll('nav');
    expect(assertNoNav.length).toBe(0);
  })

  test('it should render with one MAIN tag', () => {
    const store = mockStore(init)

    const { container } = render(
      <Router>
        <Provider store={ store }>
          <LayoutWrapper/>
        </Provider>
      </Router>
    )

    const assertOneMain = container.querySelectorAll('main');
    expect(assertOneMain.length).toBe(1);
  })
})