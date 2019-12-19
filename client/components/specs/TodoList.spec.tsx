import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoList from '../TodoList/TodoList';

describe('A component that renders Todos', () => {
  const mockTodos = [
    {todo: 'test1', priority: 'High'},
    {todo: 'test2', priority: 'Medium'},
    {todo: 'test3', priority: 'Low'},
  ];

  test('it renders a list element', () => {
    const { container } = render(
      <TodoList todosList={ mockTodos }/>
    )

    act(() => {
      const assertUl = container.querySelector('ul');
      expect(assertUl).not.toBeNull()
    });
    expect.assertions(1)
  })
  test('it renders todos', () => {
    const { container } = render(
      <TodoList todosList={ mockTodos }/>
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