import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import themeGet from '../theme/utils';

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

Input.propTypes = {
  valueProps: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    set: PropTypes.func
  })
};

Input.defaultProps = {
  valueProps: {
    value: '',
    set: () => {}
  }
};

export default Input;
