import React from 'react';
import styled from 'styled-components';

import themeGet from '../theme/utils';
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

const Date = props => {
  return <StyledInput type="date" {...props} />;
};

const DateField = withField(Date);

export { DateField };

export default Date;
