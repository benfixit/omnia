import React from 'react';
import Text from './index';

export default {
  title: 'Components|Text',
  component: Text
};

export const Span = () => <Text as="span">This is a span</Text>;

export const Paragraph = () => <Text>This is a paragraph</Text>;

export const Blockquote = () => (
  <Text as="blockquote">This is a blockquote</Text>
);
