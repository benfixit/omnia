import React from 'react';
import styled from 'styled-components';

import themeGet from '../theme/utils';
import withValue from '../hoc/withValue';
import withField from '../hoc/withField';

const StyledInput = styled.input`
  padding: ${themeGet('space.2')} 0px;
  letter-spacing: 0.25px;
  box-sizing: border-box;
  border: none;
  border-bottom: thin solid ${themeGet('colors.gray')};
  width: 380px;
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

const InputWithValue = withField(withValue('string', Input));

const InputField = withField(Input);

export { InputField, InputWithValue };

export default Input;
