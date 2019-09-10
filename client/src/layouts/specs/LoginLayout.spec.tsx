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
import { render, cleanup, fireEvent } from '@testing-library/react';

import axios from '../../axios'
import Login from '../Login/LoginLayout'

import { StoreShape } from '../../types';
import UserService from '../../services/UserService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const init : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const Wrapper: FC<any> = ({ children, store }) => <Provider store={ store }>{ children }</Provider>


describe('A layout that renders the login page', () => {
  afterEach(() => {
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
        <Login/>
      </Wrapper>
    )

    const form = container.querySelector('form');
    expect(form).toBeTruthy()
  })

  test('it renders with a submit button element inside of a form', () => {
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Login/>
      </Wrapper>
    )

    const submitBtn = container.querySelector('[type=submit]');
    const parent = submitBtn!.parentElement;
    expect(submitBtn).toBeTruthy()
    expect(parent).toBeTruthy()
  })

  test('it renders with an input element for the username', () => {
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Login/>
      </Wrapper>
    )

    const input = container.querySelector('input[name=username]');

    expect(input).toBeTruthy()
  })

  test('it renders with an input element with the password type', () => {
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Login/>
      </Wrapper>
    )

    const input = container.querySelector('input[type=password]');

    expect(input).toBeTruthy()
  })

  test('it handles change events to the password input element', () => {
    const testStr = 'test pwd'
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Login/>
      </Wrapper>
    )
    const input = container.querySelector('input[type=password]') as HTMLInputElement | null;
    fireEvent.change(input!, { target: { value: testStr }})

    expect(input!.value).toBe(testStr)
  })

  test('it handles change events to the username input element', () => {
    const testStr = 'guest'
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Login/>
      </Wrapper>
    )
    const input = container.querySelector('input[name=username]') as HTMLInputElement | null;
    fireEvent.change(input!, { target: { value: testStr }})

    expect(input!.value).toBe(testStr)
  })

  test('it submits the form on click of the submit button', () => {
    const store = mockStore(init)
    const { container } = renderWithRouter(
      <Wrapper store={ store }>
        <Login/>
      </Wrapper>
    )

    const submitBtn = container.querySelector('[type=submit]');
    const spy = jest.spyOn(UserService, 'postLogin')
      // .mockImplementation((req: any) => Promise.resolve({ status: 'SUCCESS', payload: { username: '', userId: ''} }))
    fireEvent.click(submitBtn!)
    expect(spy).toHaveBeenCalled()
  })

  test('it redirects to the registration page on click', () => {
    const store = mockStore(init)
    const targetPath = '/register'
    const { container, getByText } = renderWithRouter(
      <Wrapper store={ store }>
        <Login/>
      </Wrapper>
    , targetPath)

    const link = getByText('Create an account!');
    fireEvent.click(link!);

    expect(getByText(targetPath)).toBeTruthy()
  })
})

export {}