import React, { useState } from 'react';

import TextArea, { TextAreaField } from './index';

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

export const withTextAreaField = () => (
  <TextAreaField
    name="value"
    placeholder="with field placeholder..."
    label="Text Area Label"
  />
);
