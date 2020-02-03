import React from 'react';
import Heading from './index';

export default {
  title: 'Components|Heading',
  component: Heading
};

export const BasicHeading = () => (
  <>
    <Heading>This is a H1 heading</Heading>
    <Heading as="h2">This is a H2 heading</Heading>
    <Heading as="h3">This is a H3 heading</Heading>
    <Heading as="h4">This is a H4 heading</Heading>
    <Heading as="h5">This is a H5 heading</Heading>
    <Heading as="h6">This is a H6 heading</Heading>
  </>
);
