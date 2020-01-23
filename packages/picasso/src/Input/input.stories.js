import React, { useState } from 'react';

import Input, { InputField } from './index';

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

export const withInputField = () => (
  <InputField
    name="value"
    placeholder="with field placeholder..."
    label="Input Label"
  />
);
