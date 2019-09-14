import React, { FC } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import configureStore from '../../../store/configureStore';

import TodoAppBar from '../../Nav/TodoAppBar';
import ReduxWrap from '../../helpers/ReduxWrap';


const store = configureStore();


describe('A component that renders an AppBar', () => {
  afterEach(() => cleanup())

  test('it should render with a heading that has the app name in it', () => {
    const APP_NAME = 'TodoLet';
    const { getByText, container } = render(
      <Router>
        <ReduxWrap store={ store }>
          <TodoAppBar/>
        </ReduxWrap>
      </Router>
    )
    const assertHeading = container.querySelector('h1');
    expect(assertHeading).toBeTruthy();
    expect(getByText(APP_NAME)).toBeTruthy();
  })

  test('it should render at least one menu', () => {
    const { container } = render(
      <Router>
        <ReduxWrap  store={ store }>
          <TodoAppBar/>
        </ReduxWrap>
      </Router>
    )

    const assertMenus = container.querySelectorAll('[role=menu]');

    expect(assertMenus).toBeTruthy();
  })
})