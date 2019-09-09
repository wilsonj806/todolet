import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import configureStore from '../../store/configureStore'

import Nav from '../Nav/Nav';


describe('A component that renders a navbar', () => {
  // NOTE Global state init for passing around
  const globalStore = configureStore();
  // NOTE Global wrapper for the Router and Redux Provider
  const Wrapper: FunctionComponent = (props) => (
    <Router>
      <Provider store={ globalStore }>
        { props.children }
      </Provider>
      </Router>
  )
  afterEach(() => cleanup())

  test('it should render with one NAV tag', () => {
    const { container } = render(
      <Wrapper>
        <Nav/>
      </Wrapper>
    )

    const assertOneNav = container.querySelectorAll('nav');
    expect(assertOneNav.length).toBe(1);
  })

  test('it should render with a heading that has the app name in it', () => {
    const APP_NAME = 'TodoLet';
    const { getByText, container } = render(
      <Wrapper>
        <Nav/>
      </Wrapper>
    )
    const assertHeading = container.querySelector('h1');
    expect(assertHeading).toBeTruthy();
    expect(getByText(APP_NAME)).toBeTruthy();
  })

  test('it should render at least one menu', () => {
    const { container } = render(
      <Wrapper>
        <Nav/>
      </Wrapper>
    )

    const assertMenus = container.querySelectorAll('[role=menu]');

    expect(assertMenus).toBeTruthy();
  })
})