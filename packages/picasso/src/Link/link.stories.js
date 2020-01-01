import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Link from './index';

export default {
  title: 'Links',
  component: Link,
  decorators: [storyFn => <BrowserRouter>{storyFn()}</BrowserRouter>]
};

export const withInternalLink = () => <Link href="/">Internal Link</Link>;

export const withExternalLink = () => (
  <Link href="https://www.google.com" external>
    External Link
  </Link>
);

export const withVariant = () => {
  return (
    <div>
      <Link href="/">Primary Variant</Link>
      <br />
      <Link href="/" variant="danger">
        Danger Link
      </Link>
    </div>
  );
};
