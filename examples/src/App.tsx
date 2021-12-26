import React from 'react';
import { SimpleButton } from 'components';
import '@/styles/main.css';

export default () => {
  const buttonClickHandler = () => alert('Hello, world!');

  return (
    <>
      <SimpleButton onClick={buttonClickHandler}>Button</SimpleButton>
      <SimpleButton onClick={buttonClickHandler} disabled>
        Button
      </SimpleButton>
    </>
  );
};
