import React from 'react';
import Button from './index';

export default {
  title: 'Button',
  component: Button
};

export const withText = () => <Button>Hello World</Button>;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

export const withVariant = () => (
  <>
    <Button>Primary Button</Button>
    <Button variant="success">Success Button</Button>
    <Button variant="secondary">Secondary Button</Button>
    <Button variant="danger">Danger Button</Button>
  </>
);
