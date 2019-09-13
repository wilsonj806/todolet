import thunk from 'redux-thunk';
import React, { FC } from 'react'
import { DeepPartial } from 'redux'
import { Provider } from 'react-redux';
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import MockAdapter from 'axios-mock-adapter';
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../helpers/router.helper';
import configureMockStore from '@jedmao/redux-mock-store';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';

import axios from '../../axios'
import configureStore from '../../store/configureStore'
import Register from '../Register/RegisterLayout'

import { StoreShape } from '../../types';
import UserService from '../../services/UserService';


const middlewares = [thunk];
const mock = new MockAdapter(axios);
const mockStore = configureMockStore(middlewares);

// ----- Data fixture setup
const init : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}
const finalWUser : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '1111',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}

const successNewUserForm = {
  username: 'guest',
  password: 'wasd',
  password2: 'wasd',
  email: 'guest@guest.com'
}

const Wrapper: FC<any> = ({ children, store }) => <Provider store={ store }>{ children }</Provider>


describe('A layout that renders the registration page', () => {
  afterEach(() => {
    jest.restoreAllMocks()
    cleanup()
    // NOTE Reset current path to home
    render(
      <HashRouter>
        <Route path="/" render={ () => <Redirect to="/"/> }/>
      </HashRouter>
    )
  });

  test('it renders with a form element', () => {
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Register/>
      </Wrapper>
    )

    const form = container.querySelector('form');
    expect(form).toBeTruthy()
  })

  test('it renders with a submit button element inside of a form', () => {
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Register/>
      </Wrapper>
    )

    const submitBtn = container.querySelector('[type=submit]');
    const parent = submitBtn!.parentElement;
    expect(submitBtn).toBeTruthy()
    expect(parent).toBeTruthy()
  })


  test('it submits the form on click of the submit button', () => {
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Register/>
      </Wrapper>
    )

    const submitBtn = container.querySelector('[type=submit]');
    const spy = jest.spyOn(UserService, 'postNewUser')

    fireEvent.click(submitBtn!)
    expect(spy).toHaveBeenCalled()
  })

  test('it updates state on submitting a valid login form', () => {
    const reduxStore = configureStore(init)
    const spy = jest.spyOn(UserService, 'postNewUser')


    const startingPath = '/register'
    const targetPath = '/'
    const { container } = renderWithRouter(
      <Wrapper store={ reduxStore }>
        <Register/>
      </Wrapper>
    , { startingPath, targetPath })

    // ----- DOM selection
    const submitBtn = container.querySelector('[type=submit]');
    const usernameInput = container.querySelector('input[name=username]') as HTMLInputElement;
    const emailInput = container.querySelector('input[name=email]') as HTMLInputElement;
    const pwdInput = container.querySelector('input[name=password]') as HTMLInputElement;
    const pwdInput2 = container.querySelector('input[name=password2]') as HTMLInputElement;

    // ----- Inputting values into input elements
    fireEvent.change(usernameInput!, { target : { value : successNewUserForm.username }});
    fireEvent.change(emailInput!, { target : { value : successNewUserForm.email }});
    fireEvent.change(pwdInput!, { target : { value : successNewUserForm.password }});
    fireEvent.change(pwdInput2!, { target : { value : successNewUserForm.password2 }});
    fireEvent.click(submitBtn!)

    const { isFetching } = reduxStore.getState().clientServerConnect
    expect(spy).toHaveBeenCalledWith(successNewUserForm)
    expect(isFetching).toBe(true)
  })

  test('it redirects on successful registration', async (done) => {
    const reduxStore = configureStore(init)
    jest.spyOn(UserService, 'postNewUser')
      .mockImplementation((req) => Promise.resolve({
        status: 'SUCCESS',
        payload: {
        userId: finalWUser.authorizedUser!.userId,
        username: finalWUser.authorizedUser!.username
      }}))


    const startingPath = '/register'
    const targetPath = '/'
    const { container, getByText, history } = renderWithRouter(
      <Wrapper store={ reduxStore }>
        <Register/>
      </Wrapper>
    , { startingPath, targetPath })

    // ----- DOM selection
    const submitBtn = container.querySelector('[type=submit]');
    const usernameInput = container.querySelector('input[name=username]') as HTMLInputElement;
    const emailInput = container.querySelector('input[name=email]') as HTMLInputElement;
    const pwdInput = container.querySelector('input[name=password]') as HTMLInputElement;
    const pwdInput2 = container.querySelector('input[name=password2]') as HTMLInputElement;

    // ----- Inputting values into input elements
    fireEvent.change(usernameInput!, { target : { value : successNewUserForm.username }});
    fireEvent.change(emailInput!, { target : { value : successNewUserForm.email }});
    fireEvent.change(pwdInput!, { target : { value : successNewUserForm.password }});
    fireEvent.change(pwdInput2!, { target : { value : successNewUserForm.password2 }});
    fireEvent.click(submitBtn!)

    const assertion = await waitForElement(() => getByText(targetPath))

    expect(assertion).toBeTruthy()
    done()
  })
})

export {}