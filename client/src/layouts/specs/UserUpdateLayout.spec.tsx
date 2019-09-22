import React from 'react'
import { DeepPartial } from 'redux'
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import '@testing-library/jest-dom/extend-expect';
import ReduxWrap from '../test-helpers/ReduxWrap.helper.spec';
import renderWithRouter from '../test-helpers/router.helper.spec';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';


import configureStore from '../../store/configureStore'
import UserUpdateLayout from '../User-Update/UserUpdateLayout'

import { StoreShape } from '../../types';
import UserService from '../../services/UserService';
import axios from '../../axios'


const initUserState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '1111',
    email: 'guest@guest.com',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}

const finalState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

let globalStore = configureStore(initUserState)

describe('A layout for updating user info and settings', () => {
  afterEach(() => {
    globalStore = configureStore(initUserState)
    jest.restoreAllMocks()

    cleanup()
    // NOTE Reset current path to home
    render(
      <HashRouter>
        <Route path="/" render={ () => <Redirect to="/"/> }/>
      </HashRouter>
    )
  });

  test('it does not delete the current user when the delete user button is clicked', () => {
    const spy = jest.spyOn(axios, 'delete')

    const { container } = renderWithRouter(
      <ReduxWrap store={ globalStore }>
        <UserUpdateLayout/>
      </ReduxWrap>
    )

    const deleteBtn = container.querySelector('button#btn--user-delete')
    fireEvent.click(deleteBtn!)

    expect(spy).not.toHaveBeenCalled()
  })

  test('it renders an input element to verify that the user wants to delete their account', () => {
    const { container } = renderWithRouter(
      <ReduxWrap store={ globalStore }>
        <UserUpdateLayout/>
      </ReduxWrap>
    )

    const deleteBtn = container.querySelector('button#btn--user-delete')
    fireEvent.click(deleteBtn!)

    const assertInput = container.querySelector('input[name=confirm-username]')

    expect(assertInput).toBeTruthy()
  })

  test('it does not initially render an input element to verify that the user wants to delete their account', () => {
    const { container } = renderWithRouter(
      <ReduxWrap store={ globalStore }>
        <UserUpdateLayout/>
      </ReduxWrap>
    )

    const assertInput = container.querySelector('input[name=confirm-username]')

    expect(assertInput).toBeNull()
  })

  test('it makes the delete user request when the user verifies that they want to delete their account', () => {
    const spy = jest.spyOn(axios, 'delete')

    const { container } = renderWithRouter(
      <ReduxWrap store={ globalStore }>
        <UserUpdateLayout/>
      </ReduxWrap>
    )

    const deleteBtn = container.querySelector('button[name=user-delete]')
    fireEvent.click(deleteBtn!)

    const deleteUserInput = container.querySelector('input[name=confirm-username]')

    const confirmDeleteBtn = container.querySelector('button[name=confirm-delete')

    fireEvent.change(deleteUserInput!, { target: { value: initUserState.authorizedUser!.username }})

    fireEvent.click(confirmDeleteBtn!)

    expect(spy).toHaveBeenCalled()
  })

  test('it updates state when the user is deleted', () => {
    const spy = jest.spyOn(axios, 'delete')

    const { container } = renderWithRouter(
      <ReduxWrap store={ globalStore }>
        <UserUpdateLayout/>
      </ReduxWrap>
    )

    const deleteBtn = container.querySelector('button[name=user-delete]')
    fireEvent.click(deleteBtn!)

    const deleteUserInput = container.querySelector('input[name=confirm-username]')

    const confirmDeleteBtn = container.querySelector('button[name=confirm-delete')

    fireEvent.change(deleteUserInput!, { target: { value: initUserState.authorizedUser!.username }})

    fireEvent.click(confirmDeleteBtn!)
    expect(spy).toHaveBeenCalled()
  })
})