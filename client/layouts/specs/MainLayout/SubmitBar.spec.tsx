/**
 * Submit bar
 * - needs a Select Element
 * - needs a Submit Button Element
 * - needs to be wrapped with a Form Element
 * - needs to make a POST request on submit
 * - needs to reset on successful POST
 *
 */
import React from 'react';
import { DeepPartial } from 'redux';

// ----- Test Libraries and mocks
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../axios';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';

import ReduxWrap from '../../test-helpers/ReduxWrap.helper.spec';
import configureStore from '../../../store/configureStore';

import { StoreShape } from '../../../types';

import SubmitBar from  '../../MainLayout/SubmitBar';

describe('A layout that renders the login page', () => {
  const mock = new MockAdapter(axios);

  const user = {
    userId: '111',
    username: 'guest',
    password: 'wasd',
  };

  const endpoint = '/api/todo/' + user.userId;

  afterEach(() => {
    jest.restoreAllMocks()

    cleanup()
  });

  test('it renders with a form element', () => {
    const { container } = render(
        <SubmitBar/>
    )

    const form = container.querySelector('form');
    expect(form).toBeTruthy()
  })

  test('it renders with a submit button element inside of a form', () => {
    const { container } = render(
        <SubmitBar/>
    )

    const submitBtn = container.querySelector('[type=submit]');
    const parent = submitBtn!.parentElement;
    expect(submitBtn).toBeTruthy()
    expect(parent).toBeTruthy()
  })

  test('it renders with an input element for the Todo', () => {
    const { container } = render(
        <SubmitBar/>
    )

    const input = container.querySelector('input[name=todo]');

    expect(input).toBeTruthy()
  })

  // Submit is async, but we need to stay on the page for it to do anything
  // We can make our async thunk return true when it finishes, so on finishing up, if response === true, rest form
  test('it submits the form on click of the submit button', async (done) => {
    // const formSbumitStore = configureStore(init)
    const { container } = render(
        <SubmitBar/>
    )

    const submitBtn = container.querySelector('[type=submit]');
    const spy = mock.onPost(endpoint).reply(200, 'hi');

    fireEvent.click(submitBtn!)
    expect(spy).toHaveBeenCalled()
    done()
  })
})

export {}