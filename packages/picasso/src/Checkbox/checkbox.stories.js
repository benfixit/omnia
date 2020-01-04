import React, { useState } from 'react';
import CheckBox, { CheckBoxWithValue, CheckBoxArray } from './index';

export default {
  title: 'CheckBox',
  component: CheckBox
};

const handleChange = (event, setChecked) => {
  setChecked(event.target.checked);
};

export const BasicCheckBox = () => {
  const [checked, setChecked] = useState(false);
  return (
    <CheckBox
      name="checkbox"
      checked={checked}
      description="Checkbox"
      onChange={event => handleChange(event, setChecked)}
    />
  );
};

export const BasicCheckBoxWithValue = () => (
  <CheckBoxWithValue
    name="checkboxWithValue"
    description="Checkbox with value"
  />
);

export const BasicCheckBoxArray = () => (
  <CheckBoxArray defaultValue={['food', 'sport']}>
    <CheckBoxArray.Item name="food" description="Food" />
    <CheckBoxArray.Item name="sport" description="Sport" />
  </CheckBoxArray>
);
