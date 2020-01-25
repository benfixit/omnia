import React from 'react';
import styled from 'styled-components';

import themeGet from '../theme/utils';
import withValue from '../hoc/withValue';
import withField from '../hoc/withField';

const StyledSelect = styled.select`
  padding: ${themeGet('space.5')} 0px;
  letter-spacing: 0.25px;
  box-sizing: border-box;
  border: thin solid ${themeGet('colors.gray')};
  width: 380px;
  &:focus {
    outline: none;
  }
  &:active {
    outline: none;
  }
`;

const Select = props => {
  return <StyledSelect {...props} />;
};

const SelectWithValue = withField(withValue('string', Select));

const SelectField = withField(Select);

export { SelectField, SelectWithValue };

export default Select;
