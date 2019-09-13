import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';

import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import configureStore from '../../../store/configureStore';


import TodoAppBar from '../../Nav/TodoAppBar';

const store = configureStore();

const Wrapper: FC<any> = ({ children }) => <Provider store={ store }>{ children }</Provider>

describe('A component that renders an AppBar', () => {
  afterEach(() => cleanup())

  test('it should render with a heading that has the app name in it', () => {
    const APP_NAME = 'TodoLet';
    const { getByText, container } = render(
      <Router>
        <Wrapper>
          <TodoAppBar/>
        </Wrapper>
      </Router>
    )
    const assertHeading = container.querySelector('h1');
    expect(assertHeading).toBeTruthy();
    expect(getByText(APP_NAME)).toBeTruthy();
  })

  test('it should render at least one menu', () => {
    const { container } = render(
      <Router>
        <Wrapper>
          <TodoAppBar/>
        </Wrapper>
      </Router>
    )

    const assertMenus = container.querySelectorAll('[role=menu]');

    expect(assertMenus).toBeTruthy();
  })
})