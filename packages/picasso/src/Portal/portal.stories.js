import React from 'react';

import Portal from './index';
import Heading from '../Heading';

export default {
  title: 'Components|Portal',
  component: Portal
};

export const BasicPortal = () => {
  return (
    <Portal>
      <Heading>I am inside a portal, amigo!</Heading>
    </Portal>
  );
};
