import React from 'react';

import Label from './index';

export default {
  title: 'Components|Label',
  component: Label
};

export const BasicLabel = () => {
  return <Label>Test Label</Label>;
};

export const withVariant = () => {
  return (
    <>
      <Label>Default</Label>
      <Label variant="primary">Primary</Label>
      <Label variant="success">Success</Label>
      <Label variant="danger">Danger</Label>
      <Label variant="warning">Warning</Label>
      <Label variant="info">Info</Label>
    </>
  );
};
