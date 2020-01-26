import React, { useState } from 'react';

import TextArea, { TextAreaWithValue } from './index';

export default {
  title: 'TextArea',
  component: TextArea
};

const handleChange = (event, setInput) => {
  setInput(event.target.value);
};

export const withInput = () => {
  const [input, setInput] = useState('');
  return (
    <TextArea
      name="test"
      placeholder="Enter text..."
      value={input}
      onChange={event => handleChange(event, setInput)}
    />
  );
};

export const withTextAreaValue = () => (
  <TextAreaWithValue
    name="value"
    placeholder="with value placeholder..."
    label="Text Area Label"
  />
);
