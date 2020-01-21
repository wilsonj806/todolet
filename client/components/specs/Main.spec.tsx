import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Main from '../Main';

describe('A Main component', () => {
  it('should render with a main tag at the root', () => {
    const { container } = render(
      <Main>
        <p>Hello There</p>
        <p>I am here</p>
      </Main>
    );

    expect(container.firstElementChild!.tagName).toBe('MAIN');
  })

  it('should render children', () => {
    const { container } = render(
      <Main>
        <p>Hello There</p>
        <p>I am here</p>
      </Main>
    );
    const main = container.querySelector('main');

    expect(main).not.toBeNull();
    expect(main!.childNodes.length).toBe(2);
  })

  it('should render with padding by default', () => {
    const { container } = render(
      <Main>
        <p>Hello There</p>
        <p>I am here</p>
      </Main>
    );
    const main = container.querySelector('main');
    expect(main).not.toBeNull();
    expect(main!.style.paddingTop).not.toBe("0px");
  })

  it('should render without padding when passed the relevant prop', () => {
    const { container } = render(
      <Main noPadding={ true }>
        <p>Hello There</p>
        <p>I am here</p>
      </Main>
    );
    const main = container.querySelector('main');

    expect(main).not.toBeNull();
    expect(main!.style.paddingTop).toBe("0px");
  })
})