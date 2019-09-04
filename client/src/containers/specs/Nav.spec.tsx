import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';



import { AppContext } from '../../contexts/AppContext';
import Nav from '../Nav/Nav';

describe('A component that renders a navbar', () => {
  afterEach(() => cleanup())

  test('it should render with one NAV tag', () => {
    const { container } = render(
      <Router>
        <Nav/>
      </Router>
    )

    const assertOneNav = container.querySelectorAll('nav');
    expect(assertOneNav.length).toBe(1);
  })

  test('it should render with a heading that has the app name in it', () => {
    const APP_NAME = 'TodoLet';
    const { getByText, container } = render(
      <Router>
        <Nav/>
      </Router>
    )
    const assertHeading = container.querySelector('h1');
    expect(assertHeading).toBeTruthy();
    expect(getByText(APP_NAME)).toBeTruthy();
  })

  test('it should render at least one menu', () => {
    const { container } = render(
      <Router>
        <Nav/>
      </Router>
    )

    const assertMenus = container.querySelectorAll('[role=menu]');

    expect(assertMenus).toBeTruthy();
  })
})