import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { AppContext } from '../../contexts/AppContext';
import UserCard from '../../containers/Nav/UserCard';

// TODO Add AppContext in with placeholder values
describe('A UserCard component', () => {
  afterEach(() => cleanup())

  test('it renders the user\'s name', () => {
    const name = 'Jane Smith';
    const str = 'Hello ' + name;

    const { getByText } = render(
      <AppContext.Provider value={{ state: { username: name }}}>
        <UserCard/>
      </AppContext.Provider>
    );
    expect(getByText(str)).toBeTruthy();
  })

  test('it renders a placeholder avatar if there is no avatar', () => {
    const { container } = render(
      <AppContext.Provider value={{ state: { avatar: '' }}}>
        <UserCard/>
      </AppContext.Provider>
    );
    const img = container.querySelector('img');
    expect(img).toBeNull();
  })

  test('it renders an avatar if available', () => {
    const { container } = render(
      <AppContext.Provider value={{ state: { avatar: '' }}}>
        <UserCard/>
      </AppContext.Provider>
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
  })

  test('it renders with a count of todos associated with the user', () => {
    const count = 3;
    const str = `# of Todos: ${count}`;
    const { getByText } = render(
      <AppContext.Provider value={{ state: { username: name }}}>
        <UserCard/>
      </AppContext.Provider>
    );
    expect(getByText(str)).toBeTruthy();
  })
})