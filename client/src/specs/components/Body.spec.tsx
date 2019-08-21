import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Body from '../../components/Body';

describe('A Body component', () => {
  afterEach(() => cleanup())

  test('it should have an id value of "app-root"', () => {
    const { container } = render(
      <Body>
        <p>I am here</p>
      </Body>
    );
    const body = container.querySelector('#app-root');
    expect(body).toBeTruthy();
  })

  test('it should render children', () => {
    const { container } = render(
      <Body>
        <p>Hello There</p>
        <p>I am here</p>
      </Body>
    );
    const body = container.querySelector('#app-root');
    expect(body).not.toBeNull();
    expect(body!.childNodes.length).toBe(2);
  })
})