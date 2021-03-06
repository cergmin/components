import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import events from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { Button } from '.';

describe('Button', () => {
  test('should have correct text label', async () => {
    const { container } = render(<Button id="button">Text</Button>);

    const button = container.querySelector('#button');

    expect(button.textContent).toBe('Text');
  });

  test('should have "button" aria role', async () => {
    const { getByRole } = render(<Button id="button">Text</Button>);

    const button = getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('should emit click event', async () => {
    let hasClickEventBeenEmitted = false;
    const handleClickEvent = () => (hasClickEventBeenEmitted = true);

    const { container } = render(
      <Button id="button" onClick={handleClickEvent}>
        Text
      </Button>,
    );

    const button = container.querySelector('#button');

    act(() => {
      events.click(button);
    });

    expect(hasClickEventBeenEmitted).toBeTruthy();
  });

  test('should not emit click event, if loading', async () => {
    let hasClickEventBeenEmitted = false;
    const handleClickEvent = () => (hasClickEventBeenEmitted = true);

    const { container } = render(
      <Button id="button" loading onClick={handleClickEvent}>
        Text
      </Button>,
    );

    const button = container.querySelector('#button');

    act(() => {
      events.click(button);
    });

    expect(hasClickEventBeenEmitted).toBeFalsy();
  });

  test('should not emit click event, if disabled', async () => {
    let hasClickEventBeenEmitted = false;
    const handleClickEvent = () => (hasClickEventBeenEmitted = true);

    const { container } = render(
      <Button id="button" disabled onClick={handleClickEvent}>
        Text
      </Button>,
    );

    const button = container.querySelector('#button');

    act(() => {
      events.click(button);
    });

    expect(hasClickEventBeenEmitted).toBeFalsy();
  });
});

describe('Button (with "href" param)', () => {
  test('should have correct text label', async () => {
    const { container } = render(
      <Button id="button" href="http://yandex.ru">
        Text
      </Button>,
    );

    const button = container.querySelector('#button');

    expect(button.textContent).toBe('Text');
  });

  test('should have "link" aria role', async () => {
    const { getByRole } = render(
      <Button id="button" href="http://yandex.ru">
        Text
      </Button>,
    );

    const button = getByRole('link');

    expect(button).toBeInTheDocument();
  });

  test('should emit click event', async () => {
    let hasClickEventBeenEmitted = false;
    const handleClickEvent = () => (hasClickEventBeenEmitted = true);

    const { container } = render(
      <Button id="button" href="http://yandex.ru" onClick={handleClickEvent}>
        Text
      </Button>,
    );

    const button = container.querySelector('#button');

    act(() => {
      events.click(button);
    });

    expect(hasClickEventBeenEmitted).toBeTruthy();
  });

  test('should not emit click event, if loading', async () => {
    let hasClickEventBeenEmitted = false;
    const handleClickEvent = () => (hasClickEventBeenEmitted = true);

    const { container } = render(
      <Button
        id="button"
        href="http://yandex.ru"
        loading
        onClick={handleClickEvent}>
        Text
      </Button>,
    );

    const button = container.querySelector('#button');

    act(() => {
      events.click(button);
    });

    expect(hasClickEventBeenEmitted).toBeFalsy();
  });

  test('should not emit click event, if disabled', async () => {
    let hasClickEventBeenEmitted = false;
    const handleClickEvent = () => (hasClickEventBeenEmitted = true);

    const { container } = render(
      <Button
        id="button"
        href="http://yandex.ru"
        disabled
        onClick={handleClickEvent}>
        Text
      </Button>,
    );

    const button = container.querySelector('#button');

    act(() => {
      events.click(button);
    });

    expect(hasClickEventBeenEmitted).toBeFalsy();
  });
});
