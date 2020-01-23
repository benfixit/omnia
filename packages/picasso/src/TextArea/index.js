import React from 'react';
import styled from 'styled-components';

import themeGet from '../theme/utils';
import withValue from '../hoc/withValue';
import withField from '../hoc/withField';

const StyledTextArea = styled.textarea`
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

const TextArea = props => {
  return <StyledTextArea {...props} />;
};

const TextAreaField = withField(withValue('string', TextArea));

export { TextAreaField };

TextArea.defaultProps = {
  rows: 5
};

export default TextArea;
