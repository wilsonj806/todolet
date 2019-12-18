import React from 'react';
import { render, cleanup, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import PriorityDisplay from '../PriorityDisplay/PriorityDisplay';


describe('A component that renders a simple Priority display', () => {
  test('it renders the priority text', () => {
    const high = 'High'
    const { getByText } = render(
      <PriorityDisplay priority={ high }/>
    )
    let assertPriorityDisplay
    act(() => {
      assertPriorityDisplay = getByText(high);
    })

    expect(assertPriorityDisplay).not.toBeNull();
  })

  test('it renders a colored box with different classes based on the priority', () => {
    const high = 'High'
    const low = 'Low';
    const medium = 'Medium'
    const { container } = render(
      <div>
        <PriorityDisplay priority={ high }/>
        <PriorityDisplay priority={ medium }/>
        <PriorityDisplay priority={ low }/>
      </div>
    )

    // act(() => {
      const displays = container.querySelectorAll('.MuiBox-root');
      const regexHigh = /priorityHigh/gi;
      const regexMed = /priorityMed/gi;
      const regexLow = /priorityLow/gi;
      displays.forEach((display: any) => {
        // expect(true).toBe(true);
        let res = undefined;
        const { classList } = display;
        classList.forEach((className: string) => {
          if (regexHigh.test(className) || regexMed.test(className) || regexLow.test(className)) {
            res = className
          }
        });
        expect(res).toBeTruthy();
      })
    // })

    expect.assertions(3);
  })
})