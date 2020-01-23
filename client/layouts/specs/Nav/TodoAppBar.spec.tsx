import React from 'react';

import '@testing-library/jest-dom/extend-expect';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../../test-helpers/router.helper.spec';

import configureStore from '../../../store/configureStore';

import TodoAppBar from '../../Nav/TodoAppBar';
import ReduxWrap from '../../test-helpers/ReduxWrap.helper.spec';


const store = configureStore();


describe('A component that renders an AppBar', () => {
  afterEach(() => cleanup())

  it('should render with a heading that has the app name in it', () => {
    const APP_NAME = 'TodoLet';
    const { getByText, container } = renderWithRouter(
        <ReduxWrap store={ store }>
          <TodoAppBar/>
        </ReduxWrap>
    )
    const assertHeading = container.querySelector('h1');
    expect(assertHeading).toBeTruthy();
    expect(getByText(APP_NAME)).toBeTruthy();
  })

  it('should render at least one menu', () => {
    const { container } = renderWithRouter(
        <ReduxWrap  store={ store }>
          <TodoAppBar/>
        </ReduxWrap>
    )

    const assertMenus = container.querySelectorAll('[role=menu]');

    expect(assertMenus).toBeTruthy();
  })
})