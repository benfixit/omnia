import React from 'react';
import styled from 'styled-components';

import themeGet from '../theme/utils';
import withValue from '../hoc/withValue';

const StyledInput = styled.input`
  padding: ${themeGet('space.2')};
  border: none;
  border-bottom: thin solid ${themeGet('colors.gray')};
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

const Input = props => {
  return <StyledInput {...props} />;
};

const InputWithValue = withValue('string', Input);

export { InputWithValue };

export default Input;
