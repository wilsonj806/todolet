import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import LayoutWrapper from '../../containers/LayoutWrapper';
import { AppContext } from '../../contexts/AppContext';

describe('A component for building the app layout', () => {
  afterEach(() => cleanup())

  test('it should render with one NAV tag', () => {
    const { container } = render(
      <Router>
        <AppContext.Provider value={{ state: { user: 'hello' }}}>
          <LayoutWrapper/>
        </AppContext.Provider>
      </Router>
    )

    const assertOneNav = container.querySelectorAll('nav');
    expect(assertOneNav.length).toBe(1);
  })

  test('it should render with no NAV tag if no user is provided', () => {
    const { container } = render(
      <AppContext.Provider value={{ state: { user: null }}}>
      <LayoutWrapper/>
    </AppContext.Provider>
    )

    const assertNoNav = container.querySelectorAll('nav');
    expect(assertNoNav.length).toBe(0);
  })

  test('it should render with one MAIN tag', () => {
    const { container } = render(
      <AppContext.Provider value={{ state: { user: null }}}>
      <LayoutWrapper/>
    </AppContext.Provider>
    )

    const assertOneMain = container.querySelectorAll('main');
    expect(assertOneMain.length).toBe(1);
  })
})