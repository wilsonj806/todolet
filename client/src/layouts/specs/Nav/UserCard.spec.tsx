import React from 'react';
import thunk from 'redux-thunk';
import { DeepPartial } from 'redux';

// ----- Test libraries and mocks
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import configureMockStore from '@jedmao/redux-mock-store';

import UserCard from '../../Nav/UserCard';

import { StoreShape } from '../../../types';
import ReduxWrap from '../../helpers/ReduxWrap';



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const init : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const initWithUser : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '123',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}


describe('A UserCard component', () => {
  afterEach(() => cleanup())

  test('it renders the user\'s name', () => {
    const store = mockStore(initWithUser);

    const { getByText } = render(
      <ReduxWrap store={ store }>
        <UserCard/>
      </ReduxWrap>
    );
    expect(getByText('Hello ' + initWithUser.authorizedUser!.username)).toBeTruthy();
  })

  test('it renders a placeholder avatar if there is no avatar', () => {
    const store = mockStore(initWithUser)
    const { container } = render(
      <ReduxWrap store={ store }>
        <UserCard/>
      </ReduxWrap>
    );
    const img = container.querySelector('img');
    expect(img).toBeNull();
  })

  test('it renders an avatar if available', () => {
    const copyInit = { ...initWithUser }
    copyInit.authorizedUser!.avatar = 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png'

    const store = mockStore(copyInit)
    const { container } = render(
      <ReduxWrap store={ store }>
        <UserCard/>
      </ReduxWrap>
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
  })

  test.skip('it renders with a count of todos associated with the user', () => {
    const store = mockStore(initWithUser)
    const count = 3;
    const str = `# of Todos: ${count}`;
    const { getByText } = render(
      <ReduxWrap store={ store }>
        <UserCard/>
      </ReduxWrap>
    );
    expect(getByText(str)).toBeTruthy();
  })
})