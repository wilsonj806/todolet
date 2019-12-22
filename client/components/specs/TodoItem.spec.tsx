import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import TodoItem from '../TodoItem/TodoItem';

describe('A component for rendering a Todo Item', () => {
  const mockTodo = {
    todo: 'Test',
    priority: 'Low' as 'Low',
    isCompleted: false
  };

  test('it renders the Todo Item', () => {
    const { getByText } = render(
      <TodoItem todo={mockTodo} index={ 1 }/>
    )

    const text = getByText(mockTodo.todo);

    expect(text).toBeTruthy();
  })

  test('it renders with a Priority display', () => {
    const { getByText } = render(
      <TodoItem todo={mockTodo} index={ 1 }/>
    )

    const text = getByText(mockTodo.priority);

    expect(text).toBeTruthy();
  })
})