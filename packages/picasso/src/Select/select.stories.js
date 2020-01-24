import React, { useState } from 'react';

import Select, { SelectField } from './index';

export default {
  title: 'Select',
  component: Select
};

const handleChange = (event, setInput) => {
  setInput(event.target.value);
};

export const withSelect = () => {
  const [input, setInput] = useState('range');
  return (
    <Select
      name="test"
      value={input}
      onChange={event => handleChange(event, setInput)}
    >
      <option value="benz">Benz</option>
      <option value="volvo">Volvo</option>
      <option value="range">Range Rover</option>
      <option value="camry">Camry</option>
    </Select>
  );
};

export const withSelectField = () => (
  <SelectField name="test" label="Select Label">
    <option value="benz">Benz</option>
    <option value="volvo">Volvo</option>
    <option value="range">Range Rover</option>
    <option value="camry">Camry</option>
  </SelectField>
);
