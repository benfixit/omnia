import React, { useState } from 'react';

import Input, { InputWithValue } from './index';

export default {
  title: 'Input',
  component: Input
};

const handleChange = (event, setInput) => {
  setInput(event.target.value);
};

export const withInput = () => {
  const [input, setInput] = useState('');
  return (
    <Input
      name="test"
      placeholder="Enter text..."
      value={input}
      onChange={event => handleChange(event, setInput)}
    />
  );
};

export const withInputValue = () => (
  <InputWithValue name="value" placeholder="with value placeholder..." />
);
