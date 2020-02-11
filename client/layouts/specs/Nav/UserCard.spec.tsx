import React from 'react';
import { DeepPartial } from 'redux';

// ----- Test libraries and mocks
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import ReduxWrap from '../../../test-helpers/ReduxWrap.helper.spec';
import configureStore from '../../../store/configureStore';

import UserCard from '../../Nav/UserCard';

import { StoreShape } from '../../../types';



const authenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '1111',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}

const unauthenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const unauthenticatedStore = configureStore(unauthenticatedState)
const authenticatedStore = configureStore(authenticatedState)


describe('A UserCard component', () => {
  afterEach(() => cleanup())

  it('renders the user\'s name', () => {
    const { getByText } = render(
      <ReduxWrap store={ authenticatedStore }>
        <UserCard/>
      </ReduxWrap>
    );
    expect(getByText('Hello ' + authenticatedState.authorizedUser!.username)).toBeTruthy();
  })

  it('renders a placeholder avatar if there is no avatar', () => {    const { container } = render(
      <ReduxWrap store={ authenticatedStore }>
        <UserCard/>
      </ReduxWrap>
    );
    const img = container.querySelector('img');
    expect(img).toBeNull();
  })

  it('renders an avatar if available', () => {
    const copyInit = { ...authenticatedState }
    copyInit.authorizedUser!.avatar = 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png'
    const testAvatarStateStore = configureStore(copyInit)

    const { container } = render(
      <ReduxWrap store={ testAvatarStateStore }>
        <UserCard/>
      </ReduxWrap>
    );
    const img = container.querySelector('img');
    expect(img).not.toBeNull();
  })

  test.skip('it renders with a count of todos associated with the user', () => {
    const count = 3;
    const str = `# of Todos: ${count}`;
    const { getByText } = render(
      <ReduxWrap store={ authenticatedStore }>
        <UserCard/>
      </ReduxWrap>
    );
    expect(getByText(str)).toBeTruthy();
  })
})