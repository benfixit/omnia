import React, { useState } from 'react';
import Radio, { RadioWithValue, RadioArray } from './index';

export default {
  title: 'Radio',
  component: Radio
};

const handleChange = (event, setChecked) => {
  setChecked(event.target.checked);
};

export const BasicRadio = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Radio
      name="food"
      description="Food"
      checked={checked}
      onChange={event => handleChange(event, setChecked)}
    />
  );
};

export const BasicRadioWithValue = () => (
  <RadioWithValue name="radioWithValue" description="Radio with value" />
);

export const BasicCheckBoxArray = () => (
  <RadioArray defaultValue={new Set(['food'])}>
    <RadioArray.Item name="food" description="Food" />
    <RadioArray.Item name="sport" description="Sport" />
    <RadioArray.Item name="work" description="Work" />
  </RadioArray>
);
