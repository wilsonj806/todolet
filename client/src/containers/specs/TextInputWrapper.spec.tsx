import React, { useState } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInputWrapper from '../TextInputWrapper';

describe('A component that renders an input', () => {
  afterEach(() => cleanup())

  test('it should render a label element', () => {
    const labelText = 'Test Label';
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <TextInputWrapper
          id="test"
          value={ value }
          label={ labelText }
          reactHookFn={ setValue }
        />
      )
    }
    const { getByLabelText } = render(
      <Wrapper/>
    )
    expect(getByLabelText(labelText)).toBeTruthy();
  })
  test('it should render an input element with a password type', () => {
    const labelText = 'Test Label';
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <TextInputWrapper
          id="test"
          value={ value }
          label={ labelText }
          type="password"
          reactHookFn={ setValue }
        />
      )
    }
    const { container } = render(
      <Wrapper/>
    )

    const assertPwdInput = container.querySelector('[type=password]');

    expect(assertPwdInput).toBeTruthy();
  })

  test('it should update the text input\'s value on change', () => {
    const testStr = 'testing ';
    const labelText = 'Test Label';
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <TextInputWrapper
          id="test"
          value={ value }
          label={ labelText }
          type="text"
          reactHookFn={ setValue }
        />
      )
    }
    const { container } = render(
      <Wrapper/>
    )

    const assertInput = container.querySelector('input');

    fireEvent.change(assertInput!, { target: { value: testStr }})

    expect(assertInput!.value).toBe(testStr);
  })
})