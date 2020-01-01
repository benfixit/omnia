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
