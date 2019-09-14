import React, { FunctionComponent } from 'react';
import { HashRouter as Router } from 'react-router-dom';

import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../../helpers/router.helper';

import configureStore from '../../../store/configureStore'

import Nav from '../../Nav/Nav';
import ReduxWrap from '../../helpers/ReduxWrap';



describe('A component that renders a navbar', () => {
  // NOTE Global state init for passing around
  const globalStore = configureStore();

  afterEach(() => cleanup())

  test('it should render with one NAV tag', () => {
    const { container } = renderWithRouter(
      <ReduxWrap store={ globalStore }>
        <Nav/>
      </ReduxWrap>
    )

    const assertOneNav = container.querySelectorAll('nav');
    expect(assertOneNav.length).toBe(1);
  })

  test('it should render with a heading that has the app name in it', () => {
    const APP_NAME = 'TodoLet';
    const { getByText, container } = renderWithRouter(
      <ReduxWrap  store={ globalStore }>
        <Nav/>
      </ReduxWrap>
    )
    const assertHeading = container.querySelector('h1');
    expect(assertHeading).toBeTruthy();
    expect(getByText(APP_NAME)).toBeTruthy();
  })

  test('it should render at least one menu', () => {
    const { container } = renderWithRouter(
      <ReduxWrap  store={ globalStore }>
        <Nav/>
      </ReduxWrap>
    )

    const assertMenus = container.querySelectorAll('[role=menu]');

    expect(assertMenus).toBeTruthy();
  })
})