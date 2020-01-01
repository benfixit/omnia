import React from 'react';

import Input from './index';

export default {
  title: 'Input',
  component: Input
};

export const withInput = () => (
  <Input name="test" placeholder="Enter text..." />
);
