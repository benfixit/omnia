import React, { useState } from 'react';
import CheckBox, { CheckBoxWithValue } from './index';

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
      onChange={event => handleChange(event, setChecked)}
    />
  );
};

export const BasicCheckBoxWithValue = () => (
  <CheckBoxWithValue name="checkboxWithValue" />
);
