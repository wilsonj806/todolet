import React from 'react'
import { DeepPartial } from 'redux'
import { HashRouter, Route, Redirect } from 'react-router-dom';

// ----- Test Helpers
import '@testing-library/jest-dom/extend-expect';
import renderWithRouter from '../test-helpers/router.helper.spec';
import { render, cleanup, fireEvent, waitForElement } from '@testing-library/react';


import configureStore from '../../store/configureStore'
import Login from '../Login/LoginLayout'

import { StoreShape } from '../../types';
import UserService from '../../services/UserService';
import ReduxWrap from '../test-helpers/ReduxWrap.helper.spec';


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

const successfulLogin = {
  username: 'guest',
  password: 'wasd'
}


const store = configureStore(init)


describe('A layout that renders the login page', () => {
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
    const { container } = renderWithRouter(
      <ReduxWrap store={ store }>
        <Login/>
      </ReduxWrap>
    )

    const form = container.querySelector('form');
    expect(form).toBeTruthy()
  })

  test('it renders with a submit button element inside of a form', () => {
    const { container } = renderWithRouter(
      <ReduxWrap store={ store }>
        <Login/>
      </ReduxWrap>
    )

    const submitBtn = container.querySelector('[type=submit]');
    const parent = submitBtn!.parentElement;
    expect(submitBtn).toBeTruthy()
    expect(parent).toBeTruthy()
  })

  test('it renders with an input element for the username', () => {
    const { container } = renderWithRouter(
      <ReduxWrap store={ store }>
        <Login/>
      </ReduxWrap>
    )

    const input = container.querySelector('input[name=username]');

    expect(input).toBeTruthy()
  })

  test('it renders with an input element with the password type', () => {
    const { container } = renderWithRouter(
      <ReduxWrap store={ store }>
        <Login/>
      </ReduxWrap>
    )

    const input = container.querySelector('input[type=password]');

    expect(input).toBeTruthy()
  })

  test('it handles change events to the password input element', () => {
    const testStr = 'test pwd'
    const { container } = renderWithRouter(
      <ReduxWrap store={ store }>
        <Login/>
      </ReduxWrap>
    )
    const input = container.querySelector('input[type=password]') as HTMLInputElement | null;
    fireEvent.change(input!, { target: { value: testStr }})

    expect(input!.value).toBe(testStr)
  })

  test('it handles change events to the username input element', () => {
    const testStr = 'guest'
    const { container } = renderWithRouter(
      <ReduxWrap store={ store }>
        <Login/>
      </ReduxWrap>
    )
    const input = container.querySelector('input[name=username]') as HTMLInputElement | null;
    fireEvent.change(input!, { target: { value: testStr }})

    expect(input!.value).toBe(testStr)
  })

  test('it submits the form on click of the submit button', () => {
    const formSbumitStore = configureStore(init)
    const { container } = renderWithRouter(
      <ReduxWrap store={ formSbumitStore }>
        <Login/>
      </ReduxWrap>
    )

    const submitBtn = container.querySelector('[type=submit]');
    /** NOTE jest.spyOn doesn't like it if you try spy on
     * ... a method AND you destructure it to use it like const { postTodo } = TodoService;
     * YOUR TEST WILL FAIL IF YOU DO SO
     **/
    const spy = jest.spyOn(UserService, 'postLogin')

    fireEvent.click(submitBtn!)
    expect(spy).toHaveBeenCalled()
  })

  test('it redirects to the registration page on click', () => {
    const targetPath = '/register'
    const { getByText } = renderWithRouter(
      <ReduxWrap store={ store }>
        <Login/>
      </ReduxWrap>
    , { targetPath })

    const link = getByText('Create an account!');
    fireEvent.click(link!);

    expect(getByText(targetPath)).toBeTruthy()
  })

  test('it does not reset the form if form submit fails', () => {
    const resetFormTestStore = configureStore(init)

    const failLoginForm = {
      username: 'guest',
      password: ''
    }

    const startingPath = '/login'
    const { container } = renderWithRouter(
      <ReduxWrap store={ resetFormTestStore }>
        <Login/>
      </ReduxWrap>
    , { startingPath, targetPath: startingPath })

    const submitBtn = container.querySelector('[type=submit]');
    const usernameInput = container.querySelector('input[name=username]') as HTMLInputElement;
    const pwdInput = container.querySelector('input[name=password]') as HTMLInputElement;


    fireEvent.change(usernameInput!, { target : { value : failLoginForm.username }});
    fireEvent.change(pwdInput!, { target : { value : failLoginForm.password }});

    fireEvent.click(submitBtn!)

    expect(usernameInput!.value).toBe(failLoginForm.username)
    expect(pwdInput!.value).toBe(failLoginForm.password)
  })

  test('it updates state on submitting a valid registration form', () => {
    const submitValidFormStore = configureStore(init)
    const spy = jest.spyOn(UserService, 'postLogin')

    const startingPath = '/login'
    const targetPath = '/'
    const { container } = renderWithRouter(
      <ReduxWrap store={ submitValidFormStore }>
        <Login/>
      </ReduxWrap>
    , { startingPath, targetPath })

    // ----- DOM selection
    const submitBtn = container.querySelector('[type=submit]');
    const usernameInput = container.querySelector('input[name=username]') as HTMLInputElement;
    const pwdInput = container.querySelector('input[name=password]') as HTMLInputElement;

    // ----- Inputting values into input elements
    fireEvent.change(usernameInput!, { target : { value : successfulLogin.username }});
    fireEvent.change(pwdInput!, { target : { value : successfulLogin.password }});
    fireEvent.click(submitBtn!)

    // ----- NOTE the expectation is that UserService.postLogin is called, AND isFetching is toggled to "true" in the Redux store
    const { isFetching } = submitValidFormStore.getState().clientServerConnect

    expect(spy).toHaveBeenCalledWith(successfulLogin)
    expect(isFetching).toBe(true)
  })

  test('it redirects on successful login', async (done) => {
    const redirectTestStore = configureStore(init)
    jest.spyOn(UserService, 'postLogin')
    .mockImplementation((req) => Promise.resolve({
      status: 'SUCCESS',
      payload: {
      userId: finalWUser.authorizedUser!.userId,
      username: finalWUser.authorizedUser!.username
    }}))

    const startingPath = '/login'
    const targetPath = '/'
    const { container, getByText } = renderWithRouter(
      <ReduxWrap store={ redirectTestStore }>
        <Login/>
      </ReduxWrap>
    , { startingPath, targetPath })

    // ----- DOM selection
    const submitBtn = container.querySelector('[type=submit]');
    const usernameInput = container.querySelector('input[name=username]') as HTMLInputElement;
    const pwdInput = container.querySelector('input[name=password]') as HTMLInputElement;

    // ----- Inputting values into input elements
    fireEvent.change(usernameInput!, { target : { value : successfulLogin.username }});
    fireEvent.change(pwdInput!, { target : { value : successfulLogin.password }});
    fireEvent.click(submitBtn!)

    const assertion = await waitForElement(() => getByText(targetPath))

    expect(assertion).toBeTruthy()
    done()
  })
})

export {}