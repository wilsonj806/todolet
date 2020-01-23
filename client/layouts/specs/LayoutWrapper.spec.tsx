import React from 'react';
import { DeepPartial } from 'redux';


// ----- Test Libraries and mocks
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../test-helpers/router.helper.spec';

import ReduxWrap from '../test-helpers/ReduxWrap.helper.spec';
import configureStore from '../../store/configureStore';

import LayoutWrapper from '../LayoutWrapper';

import { StoreShape } from '../../types';


const authenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '1111',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}

const unauthenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const authenticatedStore = configureStore(authenticatedState)
const unauthenticatedStore = configureStore(unauthenticatedState)

describe('A component for building the app layout', () => {
  afterEach(() => cleanup())

  it('should render with one NAV tag', () => {
    const { container } = renderWithRouter(
        <ReduxWrap store={ authenticatedStore }>
          <LayoutWrapper/>
        </ReduxWrap>
    )

    const assertOneNav = container.querySelectorAll('nav');
    expect(assertOneNav.length).toBe(1);
  })

  it('should render with no NAV tag if no user is provided', () => {
    const { container } = renderWithRouter(
        <ReduxWrap store={ unauthenticatedStore }>
          <LayoutWrapper/>
        </ReduxWrap>
    )

    const assertNoNav = container.querySelectorAll('nav');
    expect(assertNoNav.length).toBe(0);
  })

  it('should render with one MAIN tag', () => {
    const { container } = renderWithRouter(
        <ReduxWrap store={ unauthenticatedStore }>
          <LayoutWrapper/>
        </ReduxWrap>
    )

    const assertOneMain = container.querySelectorAll('main');
    expect(assertOneMain.length).toBe(1);
  })
})