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
import { render, cleanup, fireEvent, waitForElement, act } from '@testing-library/react';

import ReduxWrap from '../../test-helpers/ReduxWrap.helper.spec';
import configureStore from '../../../store/configureStore';

import { StoreShape } from '../../../types';

import SubmitBar from  '../../MainLayout/SubmitBar';

import TodoService from '../../../services/TodoService'

describe('A layout that renders the login page', () => {
  const mock = new MockAdapter(axios);

  const user = {
    userId: '111',
    username: 'guest',
    password: 'wasd',
  };
  const init = {
    authorizedUser: {
      userId: user.userId,
      username: user.username,
      todos: []
    },
    clientServerConnect: {},
    todosList: []
  }
  const store = configureStore(init)

  const endpoint = '/api/todo/';

  afterEach(() => {
    jest.restoreAllMocks()
    mock.resetHistory();
    cleanup()
  });

  it('renders with a form element', () => {
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar/>
      </ReduxWrap>
    )

    const form = container.querySelector('form');
    expect(form).toBeTruthy()
  })

  it('renders with a submit button element inside of a form', () => {
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar/>
      </ReduxWrap>
    )

    const submitBtn = container.querySelector('[type=submit]');
    const parent = submitBtn!.parentElement;
    expect(submitBtn).toBeTruthy()
    expect(parent).toBeTruthy()
  })

  it('renders with an input element for the Todo', () => {
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar/>
      </ReduxWrap>
    )

    const input = container.querySelector('input[name=todo]');

    expect(input).toBeTruthy()
  })

  it('renders with a select element for the Todo priority', () => {
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar/>
      </ReduxWrap>
    )

    const input = container.querySelector('input[name=priority]');

    expect(input).toBeTruthy()
  })

  // Submit is async, but we need to stay on the page for it to do anything
  // We can make our async thunk return true when it finishes, so on finishing up, if response === true, rest form
  it('submits the form on click of the submit button', async (done) => {
    const testStr = 'test todo';
    // const formSbumitStore = configureStore(init)
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar/>
      </ReduxWrap>
    )


    /** NOTE jest.spyOn doesn't like it if you try spy on
     * ... a method AND you destructure it to use it like const { postTodo } = TodoService;
     * YOUR TEST WILL FAIL IF YOU DO SO
     **/
    const spy = jest.spyOn(TodoService, 'postTodo')

    expect(spy).not.toHaveBeenCalled();

    const submitBtn = container.querySelector('[type=submit]');
    const input = container.querySelector('input[name=todo]');
    // Selecting the select element
    const select = container.querySelector('#select--priority');

    await act(async () => {
      await fireEvent.change(input!, { target: { value: testStr }})

      await fireEvent.click(select!);

      // Selecting the #menu-priority element after click
      const menuRoot = document.querySelector('#menu-priority');
      const selectLow = menuRoot.querySelector('li[data-value=Low]');
      await fireEvent.click(selectLow!);

      await fireEvent.click(submitBtn!)
    })

    // Asserting that the API was called via Axios Mock
    const assertApiCall = mock.history.post.length > 0;
    expect(assertApiCall).toBe(true)
    done()
  })
})

export {}