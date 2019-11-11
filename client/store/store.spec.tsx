import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import configureStore from './configureStore';
import { INIT_APP_STATE, INIT_CLIENTSERVER_STATE, INIT_USER_STATE } from './reducers/root.reducer';
import { StoreShape } from '../types';


describe('A store for global state', () => {
  // easy smoke test
  test('it should render initial app state', () => {
    const store = configureStore();

    const state = store.getState();

    expect(state).toStrictEqual(INIT_APP_STATE)
  })

  test('it should pass the store around', () => {
    const store = configureStore();

    const { getByText } = render(
      <Provider store={ store }>
        <p>{ store.getState().toString() }</p>
      </Provider>
    )
    expect(getByText(store.getState().toString())).toBeTruthy()
  })
})