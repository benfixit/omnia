import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import themeGet from '../theme/utils';

const StyledButton = styled.button`
  padding: 12px 24px;
  color: ${themeGet('colors.white')};
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  font-size: ${themeGet('fontSizes.1')};
  cursor: pointer;
  outline: none;
  background-image: linear-gradient(
    to bottom,
    ${themeGet('colors.hoveredPrimary')},
    ${themeGet('colors.primary')}
  );
  &:hover {
    background-image: linear-gradient(
      to bottom,
      ${themeGet('colors.lightBlue')},
      ${themeGet('colors.primary')}
    );
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

const Button = props => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired
};

export default Button;
