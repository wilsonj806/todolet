import React from 'react'
import axios from '../../axios'
import { DeepPartial } from 'redux'
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import '@testing-library/jest-dom/extend-expect';
import ReduxWrap from '../test-helpers/ReduxWrap.helper.spec';
import renderWithRouter from '../test-helpers/router.helper.spec';
import { act, render, cleanup, fireEvent, waitForElement } from '@testing-library/react';


import configureStore from '../../store/configureStore'
import UserUpdateLayout from '../User-Update/UserUpdateLayout'
import UserService from '../../services/UserService';

import { StoreShape } from '../../types';


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

  describe('a portion of the layout that lets you update a user', () => {

    it('renders with a form to update the user', () => {
      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )
      const assertForm = container.querySelector('form[name=user-update]')

      expect(assertForm).not.toBeNull()
    })

    it('renders with a submit button for the update form', () => {
      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )

      const form = container.querySelector('form[name=user-update]')
      const assertBtn = form!.querySelector('button[type=submit]')

      expect(assertBtn).not.toBeNull()
    })

    it('calls the backend to update the user', () => {
      const spy = jest.spyOn(axios, 'put')
      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )
      const form = container.querySelector('form[name=user-update]')
      const formBtn = form!.querySelector('button[type=submit]') as Element
      const input = form!.querySelector('input[name=username]') as Element

      fireEvent.change(input, { target: { value: 'test' }})

      fireEvent.click(formBtn)
      expect(spy).toHaveBeenCalled()
    })

    test.skip('it updates app state', () => {
      const spy = jest.spyOn(axios, 'put')
      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )
      const form = container.querySelector('form[name=user-update]')
      const formBtn = form!.querySelector('button[type=submit]') as Element
      const input = form!.querySelector('input[name=username]') as Element

      fireEvent.change(input, { target: { value: 'test' }})

      fireEvent.click(formBtn)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('a portion of the layout that lets you delete the user', () => {
    it('does not delete the current user when the delete user button is clicked', () => {
      const spy = jest.spyOn(axios, 'delete')

      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )

      const deleteBtn = container.querySelector('button[name=user-delete]')
      fireEvent.click(deleteBtn!)

      expect(spy).not.toHaveBeenCalled()
    })

    it('renders an input element to verify that the user wants to delete their account', () => {
      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )

      const deleteBtn = container.querySelector('button[name=user-delete]')
      fireEvent.click(deleteBtn!)

      const assertInput = container.querySelector('input[name=confirm-username]')

      expect(assertInput).toBeTruthy()
    })

    it('does not initially render an input element to verify that the user wants to delete their account', () => {
      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )

      const assertInput = container.querySelector('input[name=confirm-username]')

      expect(assertInput).toBeNull()
    })

    it('makes the delete user request when the user verifies that they want to delete their account', async (done) => {
      const spy = jest.spyOn(axios, 'delete')

      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )

      const deleteBtn = container.querySelector('button[name=user-delete]')
      fireEvent.click(deleteBtn!)
      const form = await waitForElement(() =>
        container.querySelector('form[name=user-delete]')
      )

      const deleteUserInput = form!.querySelector('input[name=confirm-username]')

      const confirmDeleteBtn = form!.querySelector('button[name=confirm-delete')


      fireEvent.change(deleteUserInput!, { target: { value: initUserState.authorizedUser!.username }})

      fireEvent.click(confirmDeleteBtn!)

      expect(spy).toHaveBeenCalled()
      done()
    })

    test.skip('it updates state when the user is deleted', async (done) => {
      const spy = jest.spyOn(axios, 'delete')

      const { container } = renderWithRouter(
        <ReduxWrap store={ globalStore }>
          <UserUpdateLayout/>
        </ReduxWrap>
      )

      const deleteBtn = container.querySelector('button[name=user-delete]')
      fireEvent.click(deleteBtn!)
      const form = await waitForElement(() =>
        container.querySelector('form[name=user-delete]')
      )

      const deleteUserInput = form!.querySelector('input[name=confirm-username]')

      const confirmDeleteBtn = form!.querySelector('button[name=confirm-delete')


      fireEvent.change(deleteUserInput!, { target: { value: initUserState.authorizedUser!.username }})

      fireEvent.click(confirmDeleteBtn!)

      expect(spy).toHaveBeenCalled()
      done()
    })
  })
})