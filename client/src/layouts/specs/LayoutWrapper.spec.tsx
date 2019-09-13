import React from 'react';
import { DeepPartial } from 'redux';
import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';


// ----- Test Libraries and mocks
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import LayoutWrapper from '../LayoutWrapper';
import { StoreShape } from '../../types';
import configureStore from '../../store/configureStore';



const initWOutUser : DeepPartial<StoreShape> = {
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

const unauthenticatedStore = configureStore(initWOutUser)
const authenticatedStore = configureStore(initWithUser)

describe('A component for building the app layout', () => {
  afterEach(() => cleanup())

  test('it should render with one NAV tag', () => {
    const { container } = render(
      <Router>
        <Provider store={ authenticatedStore }>
          <LayoutWrapper/>
        </Provider>
      </Router>
    )

    const assertOneNav = container.querySelectorAll('nav');
    expect(assertOneNav.length).toBe(1);
  })

  test('it should render with no NAV tag if no user is provided', () => {
    const { container } = render(
      <Router>
        <Provider store={ unauthenticatedStore }>
          <LayoutWrapper/>
        </Provider>
      </Router>
    )

    const assertNoNav = container.querySelectorAll('nav');
    expect(assertNoNav.length).toBe(0);
  })

  test('it should render with one MAIN tag', () => {
    const { container } = render(
      <Router>
        <Provider store={ unauthenticatedStore }>
          <LayoutWrapper/>
        </Provider>
      </Router>
    )

    const assertOneMain = container.querySelectorAll('main');
    expect(assertOneMain.length).toBe(1);
  })
})