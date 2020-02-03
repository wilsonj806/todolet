import React from 'react';

// ----- Test Libraries and mocks
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../axios';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent, waitForElement, act } from '@testing-library/react';

import ReduxWrap from '../../../test-helpers/ReduxWrap.helper.spec';
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

  it('renders both variations with a form element', () => {
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar isUpdateBar={false}/>
        <SubmitBar isUpdateBar={true} todo={{ todo: 'test', priority:'High', isCompleted:false, userIndex: 0}} reduxUpdateTodo={() => true as any}/>
      </ReduxWrap>
    )

    const assertUpdateForm = container.querySelector('form#todo-update');
    const assertSubmitForm = container.querySelector('form#todo-submit');
    expect(assertUpdateForm).not.toBeNull()
    expect(assertSubmitForm).not.toBeNull()
  })

  it('renders with a submit button element inside of a form', () => {
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar isUpdateBar={false}/>
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
        <SubmitBar isUpdateBar={false}/>
      </ReduxWrap>
    )

    const input = container.querySelector('input[name=todo]');

    expect(input).toBeTruthy()
  })

  it('renders with a select element for the Todo priority', () => {
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar isUpdateBar={false}/>
      </ReduxWrap>
    )

    const input = container.querySelector('input[name=priority]');

    expect(input).toBeTruthy()
  })

  // Submit is async, but we need to stay on the page for it to do anything
  // We can make our async thunk return true when it finishes, so on finishing up, if response === true, rest form
  it('submits the add todo form on click of the submit button', async (done) => {
    const testStr = 'test todo';
    // const formSbumitStore = configureStore(init)
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar isUpdateBar={false}/>
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
      fireEvent.change(input!, { target: { value: testStr }})

      // ----- NOTE Need to await this as clicking it renders something from a React Portal and thus doesn't appear in the container DOM
      await fireEvent.click(select!);

      // Selecting the select menu element after click
      const menuRoot = document.querySelector('ul[role=listbox]');
      const selectLow = menuRoot.querySelector('li[data-value=Low]');
      fireEvent.click(selectLow!);

      fireEvent.click(submitBtn!)
    })

    // Asserting that the API was called via Axios Mock
    const assertApiCall = mock.history.post.length > 0;
    expect(assertApiCall).toBe(true)
    done()
  })

  /**
   * Unlike the prior test, it's not really efficient to go mocking an entire Redux Thunk
   * ... so we just replace it with a Jest spy that returns an EZ action
   */
  it('submits the update todo form on click of the submit button', async (done) => {
    const testStr = 'test todo';
    // const formSbumitStore = configureStore(init)
    const spy = jest.fn().mockImplementation(() => ({ type: 'TEST' }));
    const { container } = render(
      <ReduxWrap store={store}>
        <SubmitBar isUpdateBar={true} todo={{ todo: 'test', priority:'High', isCompleted:false, userIndex: 0}} reduxUpdateTodo={spy}/>
        </ReduxWrap>
    )


    /** NOTE jest.spyOn doesn't like it if you try spy on
     * ... a method AND you destructure it to use it like const { postTodo } = TodoService;
     * YOUR TEST WILL FAIL IF YOU DO SO
     **/
    const submitBtn = container.querySelector('[type=submit]');
    const input = container.querySelector('input[name=todo]');
    // Selecting the select element
    const select = container.querySelector('#select--priority');

    await act(async () => {
      fireEvent.change(input!, { target: { value: testStr }})

      // ----- NOTE Need to await this as clicking it renders something from a React Portal and thus doesn't appear in the container DOM
      await fireEvent.click(select!);

      // Selecting the select menu element after click
      const menuRoot = document.querySelector('ul[role=listbox]');
      const selectLow = menuRoot.querySelector('li[data-value=Low]');
      fireEvent.click(selectLow!);

      fireEvent.click(submitBtn!)
    })

    expect(spy).toHaveBeenCalled();
    done()
  })
})

export {}