import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';



import { AppContext } from '../../contexts/AppContext';
import TodoAppBar from '../Nav/TodoAppBar';

describe('A component that renders an AppBar', () => {
  afterEach(() => cleanup())

  test('it should render with a heading that has the app name in it', () => {
    const APP_NAME = 'TodoLet';
    const { getByText, container } = render(
      <Router>
        <TodoAppBar/>
      </Router>
    )
    const assertHeading = container.querySelector('h1');
    expect(assertHeading).toBeTruthy();
    expect(getByText(APP_NAME)).toBeTruthy();
  })

  test('it should render at least one menu', () => {
    const { container } = render(
      <Router>
        <TodoAppBar/>
      </Router>
    )

    const assertMenus = container.querySelectorAll('[role=menu]');

    expect(assertMenus).toBeTruthy();
  })
})