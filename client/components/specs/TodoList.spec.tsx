import React from 'react';
import { DeepPartial } from 'redux';

// ----- Testing libs
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// ----- Redux stuff
import ReduxWrap from '../../test-helpers/ReduxWrap.helper.spec';
import configureStore from '../../store/configureStore';


import TodoList from '../TodoList/TodoList';
import { StoreShape, TodoShape } from '../../types';


describe('A component that renders Todos', () => {
  const mockTodos = [
    {todo: 'test1', priority: 'High', isCompleted: false, _id: '11', userIndex: 0},
    {todo: 'test2', priority: 'Medium', isCompleted: false, _id: '12', userIndex: 1},
    {todo: 'test3', priority: 'Low', isCompleted: false, _id: '13', userIndex: 2},
  ] as TodoShape[];

  const authenticatedState : DeepPartial<StoreShape> = {
    authorizedUser : {
      userId : '1111',
      username : 'guest'
    },
    clientServerConnect : {
      isFetching : false
    },
    todosList: mockTodos
  }



  const authenticatedStore = configureStore(authenticatedState)

  it('renders a list element', () => {
    const { container } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoList todosList={ mockTodos }/>
      </ReduxWrap>
    )

    act(() => {
      const assertUl = container.querySelector('ul');
      expect(assertUl).not.toBeNull()
    });
    expect.assertions(1)
  })
  it('renders todos', () => {
    const { container } = render(
      <ReduxWrap store={ authenticatedStore }>
        <TodoList todosList={ mockTodos }/>
      </ReduxWrap>
    )
    act(() => {
      const ul = container.querySelector('ul');
      const length = ul.children.length;
      const mockLength = mockTodos.length;

      expect(length).toBe(mockLength)
    })
    expect.assertions(1);
  })
})