import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from '@jedmao/redux-mock-store';

import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import configureStore from '../../store/configStore';

import FiltersCard from '../Nav/FiltersCard';
import { DeepPartial } from 'redux';
import { StoreShape } from '../../types';

describe('A FiltersCard component', () => {
  // NOTE Global state init for passing around
  const globalStore = configureStore();
  afterEach(() => cleanup())

  test('it should render tags when the tag tab is clicked', () => {
    const { getAllByRole, container } = render(
      <Provider store={ globalStore }>
        <FiltersCard/>
      </Provider>
    )
    const buttons : Array<HTMLElement> = getAllByRole('tab');

    const arr = buttons.filter((button : HTMLElement) => button!.firstChild!.textContent === 'Tags');
    const [ target ] = arr;
    fireEvent.click(target);

    const assert = container.querySelector('#tab--tags');

    expect(assert).toBeTruthy();
  });

  test('it should render projects when the tabs are toggled back and forth', () => {
    const { getAllByRole, container } = render(
      <Provider store={ globalStore }>
        <FiltersCard/>
      </Provider>
    )

    const buttons : Array<HTMLElement> = getAllByRole('tab');

    const arr = buttons.filter((button : HTMLElement) => button!.firstChild!.textContent === 'Projects');
    const [ projectBtn ] = arr;

    const arr2 = buttons.filter((button : HTMLElement) => button!.firstChild!.textContent === 'Tags');
    const [ tagBtn ] = arr;
    fireEvent.click(tagBtn);
    fireEvent.click(projectBtn);

    const assert = container.querySelector('#tab--projects');

    expect(assert).toBeTruthy();
  });

  test('it should only toggle one button\'s aria attribute on click', () => {
    const { getAllByRole, container } = render(
      <Provider store={ globalStore }>
        <FiltersCard/>
      </Provider>
    )

    const assertion = container.querySelectorAll('[aria-selected=true]');

    expect(assertion.length).toBe(1);
  });


  test('it should prepopulate the Projects tab', () => {
    const exampleState : Array<any> = [
      { color: 'pink', name: 'Showroom'},
      { color: 'black', name: 'TodoLet'},
      { color: 'orange', name: 'Kotlin Android App'},
      { color: 'pink', name: 'Picture Analyzer'}
    ]
    const state : DeepPartial<StoreShape> = { ...globalStore.getState() }
    state.authorizedUser!.projectFilters = exampleState;

    const mockStore = configureMockStore()
    const store = mockStore({...state })
    const { getByText, container } = render(
      <Provider store={ store }>
        <FiltersCard/>
      </Provider>
    )

    const arr = exampleState.map((obj: any) => obj.name);
    const matchedEle = arr.map((str: string) => getByText(str));

    const assert = matchedEle.length === exampleState.length;

    expect(assert).toBe(true);
  })

  test('it should prepopulate the Tags tab', () => {
    const exampleState = [
      { color: 'pink', name: 'Finances'},
      { color: 'black', name: 'Career'},
      { color: 'orange', name: 'Dance'},
      { color: 'pink', name: 'Photography'}
    ]
    const state = { ...globalStore.getState() }
    state.authorizedUser!.projectFilters = exampleState;

    const mockStore = configureMockStore()
    const store = mockStore({...state } as DeepPartial<StoreShape>)

    const { getByText, container } = render(
      <Provider store= { store }>
        <FiltersCard/>
      </Provider>
    )

    const arr = exampleState.map((obj: any) => obj.name);
    const matchedEle = arr.map((str: string) => getByText(str));

    const assert = matchedEle.length === exampleState.length;

    expect(assert).toBe(true);
  })

  // FIXME implement this in full when you get there
  test.skip('it should make a request to filter todos out by the clicked tag', () => {
    const exampleState = [
      { color: 'pink', name: 'Finances'},
      { color: 'black', name: 'Career'},
      { color: 'orange', name: 'Dance'},
      { color: 'pink', name: 'Photography'}
    ]
    const state = { ...globalStore.getState() }
    state.authorizedUser!.projectFilters = exampleState;

    const mockStore = configureMockStore()
    const store = mockStore({...state } as DeepPartial<StoreShape>)

    const { getByText, container } = render(
      <Provider store= { store }>
        <FiltersCard/>
      </Provider>
    )

    const arr = exampleState.map((obj: any) => obj.name);
    const matchedEle = arr.map((str: string) => getByText(str));

    const assert = matchedEle.length === exampleState.length;

    expect(false).toBe(true);
  })
})