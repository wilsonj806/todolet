import React from 'react';
import { DeepPartial } from 'redux';

// ----- Test libs
import MockAdapter from 'axios-mock-adapter';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// ----- Redux stuff
import ReduxWrap from '../../test-helpers/ReduxWrap.helper.spec';
import configureStore from '../../store/configureStore';


import axios from '../../axios';
import TodoItem from '../TodoItem/TodoItem';

import { StoreShape } from '../../types';

const mock = new MockAdapter(axios);
describe('A component for rendering a Todo Item', () => {
  afterEach(() => {
    mock.reset();
    mock.resetHistory();
  })
  const endpoint = '/api/todo/';

  const mockTodo = {
    todo: 'Test',
    priority: 'Low' as 'Low',
    isCompleted: false,
    userIndex:0
  };

  const mockCompletedTodo = {
    todo: 'Test',
    priority: 'Low' as 'Low',
    isCompleted: true,
    userIndex:0
  };

  const authenticatedState : DeepPartial<StoreShape> = {
    authorizedUser : {
      userId : '1111',
      username : 'guest'
    },
    clientServerConnect : {
      isFetching : false
    },
    todosList: [mockTodo]
  }

  const authenticatedStore = configureStore(authenticatedState)

  it('renders the Todo Item', () => {
    const { getByText } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoItem todo={mockTodo} index={ 1 }/>
      </ReduxWrap>
    )

    const text = getByText(mockTodo.todo);

    expect(text).toBeTruthy();
  })

  it('renders with a Priority display', () => {
    const { getByText } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoItem todo={mockTodo} index={ 1 }/>
      </ReduxWrap>
    )

    const text = getByText(mockTodo.priority);

    expect(text).toBeTruthy();
  })

  it('calls the backend if you click the completed box', async (done) => {
    const { getByText } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoItem todo={mockTodo} index={ 1 }/>
      </ReduxWrap>
    )
    const todo = getByText(mockTodo.todo);
    const parent = todo.parentElement;
    const input = parent.querySelector('input[type=checkbox]');
    await fireEvent.click(input!);
    const assertApiCall = mock.history.put.length > 0;
    expect(assertApiCall).toBe(true);
    done();
  })

  // TODO add a quick smoke test that ensures that some actions include an EDIT_TODO_INIT action
  it('renders a crossed out todo box if the todo is completed', async (done) => {
    const { container } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoItem todo={mockCompletedTodo} index={ 1 }/>
      </ReduxWrap>
    )
    const todo = container.querySelector('li');
    const regex = /(listItemStrike)/gi;
    const assertStrikeThruClass = regex.test(todo.className);
    expect(assertStrikeThruClass).toBe(true);
    done();
  })

  it('renders a submit bar when you click the edit button', () => {
    const { container } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoItem todo={mockCompletedTodo} index={ 1 }/>
      </ReduxWrap>
    )
    act(() => {
      const editBtn = container.querySelector('button#btn-display-update-form');

      fireEvent.click(editBtn);
    })
    const assertForm = container.querySelector('form#todo-update')
    expect(assertForm).not.toBe(null)
    // expect.assertions(1);
    // expect(assertStrikeThruClass).toBe(true);
  })
})