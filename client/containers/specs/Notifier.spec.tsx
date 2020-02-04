import React, { FC } from 'react'
import { DeepPartial } from 'redux'
import { useDispatch } from 'react-redux';
import { SnackbarProvider } from 'notistack'

import { render, cleanup, fireEvent, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ReduxWrap from '../../test-helpers/ReduxWrap.helper.spec';

import { StoreShape } from '../../types';
import configureStore from '../../store/configureStore'

import Notifier from '../Notifier'
import { enqueueSnackActionCreator, closeSnackActionCreator } from '../../actions/notifications.action';

describe('A notification handler', () => {
  afterEach(() => {
    cleanup();
  })

  const init : DeepPartial<StoreShape> = {
    authorizedUser : {
      userId : undefined,
      username : undefined
    },
    clientServerConnect : {
      isFetching : false
    },
    notifications: []
  }
  it('doesn\'t render anything', () => {
    const store = configureStore(init);
    const { container } = render(
      <ReduxWrap store={store}>
        <SnackbarProvider>
          <Notifier/>
        </SnackbarProvider>
      </ReduxWrap>
    )
    expect(container.children.length).toBe(0);
  })

  it('tells the snackbar provider to render notifications if told to do so', () => {
    const store = configureStore(init);
    const { container, getByText, debug } = render(
      <ReduxWrap store={store}>
        <SnackbarProvider>
          <Notifier/>
          <TestBtn/>
        </SnackbarProvider>
      </ReduxWrap>
    )
    const btn = getByText('test btn');
    fireEvent.click(btn);
    const assertNotif = getByText('test msg')
    expect(assertNotif).toBeInTheDocument()
  })

  it('tells the snackbar provider to dismiss a rendered notification', async (done) => {
    const store = configureStore(init);
    const { container, getByText, queryByText, debug } = render(
      <ReduxWrap store={store}>
        <SnackbarProvider>
          <Notifier/>
          <TestBtn/>
        </SnackbarProvider>
      </ReduxWrap>
    )
    const btn = getByText('test btn');
    fireEvent.click(btn);
    expect(getByText('test msg')).toBeInTheDocument()
    const dismissBtn = container.querySelector('#test-dismiss')
    fireEvent.click(dismissBtn);
    await wait(() => {
      expect(queryByText('test msg')).not.toBeInTheDocument()
    })
    done();
  })
})

function TestBtn() {
  const dispatch = useDispatch();
  const handleClickWarn = () => {

    dispatch(
      enqueueSnackActionCreator({
        message: "test msg",
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
          action: key => (
            <button id='test-dismiss' onClick={() => dispatch(closeSnackActionCreator(key))}>
              dismiss me
            </button>
          )
        }
      })
    );
  }
  return (
    <button onClick={handleClickWarn} id='test-btn'>
        test btn
    </button>
  )
}