import React from 'react';
import styled from 'styled-components';

import themeGet from '../theme/utils';

export const Container = styled.label`
  display: flex;
  cursor: pointer;
  user-select: none;
  color: ${themeGet('colors.primary')};
  margin: ${themeGet('space.3')} ${themeGet('space.0 ')};
`;

const IconStyles = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

export const Icon = () => {
  return (
    <IconStyles viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </IconStyles>
  );
};

export const HiddenElement = styled.input.attrs(props => ({
  type: props.type
}))`
  cursor: pointer;
  position: absolute;
  opacity: 0;
`;

export const StyledElement = styled.div`
  width: ${themeGet('space.4')};
  height: ${themeGet('space.4')};
  border: thin solid ${themeGet('colors.primary')};
  border-radius: ${props =>
    props.type === 'radio' ? themeGet('space.4') : themeGet('space.2')};
  background-color: ${props =>
    props.checked ? themeGet('colors.primary') : themeGet('colors.white')};
  position: relative;
  margin-right: ${themeGet('space.3')};
`;
