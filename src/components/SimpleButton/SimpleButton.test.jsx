import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { SimpleButton } from '.';

describe('SimpleButton', () => {
  test('should have the correct text label', async () => {
    const { container } = render(<SimpleButton id="button">Text</SimpleButton>);

    const simpleButton = container.querySelector('#button');

    expect(simpleButton.textContent).toBe('Text');
  });

  test('should have the correct aria role', async () => {
    const { getByRole } = render(<SimpleButton id="button">Text</SimpleButton>);

    const simpleButton = getByRole('button');

    expect(simpleButton).toBeInTheDocument();
  });

  test('should emit click event', async () => {
    let hasClickEventBeenEmitted = false;
    const handleClickEvent = () => (hasClickEventBeenEmitted = true);

    const { container } = render(
      <SimpleButton id="button" onClick={handleClickEvent}>
        Text
      </SimpleButton>,
    );

    const simpleButton = container.querySelector('#button');

    act(() => {
      events.click(simpleButton);
    });

    expect(hasClickEventBeenEmitted).toBeTruthy();
  });

  test('should not emit click event, if disabled', async () => {
    let hasClickEventBeenEmitted = false;
    const handleClickEvent = () => (hasClickEventBeenEmitted = true);

    const { container } = render(
      <SimpleButton id="button" disabled onClick={handleClickEvent}>
        Text
      </SimpleButton>,
    );

    const simpleButton = container.querySelector('#button');

    act(() => {
      events.click(simpleButton);
    });

    expect(hasClickEventBeenEmitted).toBeFalsy();
  });
});
