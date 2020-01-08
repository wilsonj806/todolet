import React from 'react';
import { DeepPartial } from 'redux';

// ----- Test libs
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// ----- Redux stuff
import ReduxWrap from '../../layouts/test-helpers/ReduxWrap.helper.spec';
import configureStore from '../../store/configureStore';


import TodoItem from '../TodoItem/TodoItem';

import { StoreShape } from '../../types';


describe('A component for rendering a Todo Item', () => {
  const authenticatedState : DeepPartial<StoreShape> = {
    authorizedUser : {
      userId : '1111',
      username : 'guest'
    },
    clientServerConnect : {
      isFetching : false
    },
    todosList: []
  }

  const mockTodo = {
    todo: 'Test',
    priority: 'Low' as 'Low',
    isCompleted: false,
    userIndex:0
  };

  const authenticatedStore = configureStore(authenticatedState)

  test('it renders the Todo Item', () => {
    const { getByText } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoItem todo={mockTodo} index={ 1 }/>
      </ReduxWrap>
    )

    const text = getByText(mockTodo.todo);

    expect(text).toBeTruthy();
  })

  test('it renders with a Priority display', () => {
    const { getByText } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoItem todo={mockTodo} index={ 1 }/>
      </ReduxWrap>
    )

    const text = getByText(mockTodo.priority);

    expect(text).toBeTruthy();
  })
})