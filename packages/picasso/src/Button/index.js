import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { variant } from 'styled-system';

import themeGet from '../theme/utils';

const buttonVariants = {
  variants: {
    primary: {
      backgroundImage: `linear-gradient(to bottom, #2980b9, #3498db);`,
      '&:hover': {
        backgroundImage: `linear-gradient(to bottom, #5bc0de, #3498db);`
      }
    },
    success: {
      backgroundImage: `linear-gradient(to bottom, #4ba74b, #5cb85c);`,
      '&:hover': {
        backgroundImage: `linear-gradient(to bottom, #6dc96d, #5cb85c);`
      }
    },
    danger: {
      backgroundImage: `linear-gradient(to bottom, #b7312d, #d9534f);`,
      '&:hover': {
        backgroundImage: `linear-gradient(to bottom, #e06450, #d9534f);`
      }
    },
    secondary: {
      color: 'black',
      backgroundImage: `linear-gradient(to bottom, #ececec, #eeeeee);`,
      '&:hover': {
        backgroundImage: `linear-gradient(to bottom, #ffffff, #eeeeee);`
      }
    }
  }
};

const StyledButton = styled.button`
  padding: 12px 24px;
  color: ${themeGet('colors.white')};
  border: none;
  box-sizing: border-box;
  border-radius: 3px;
  font-size: ${themeGet('fontSizes.1')};
  cursor: pointer;
  outline: none;
  ${variant(buttonVariants)};
`;

const Button = props => {
  const { children, ...rest } = props;
  return <StyledButton {...rest}>{children}</StyledButton>;
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'danger', 'success', 'secondary'])
};

Button.defaultProps = {
  variant: 'primary'
};

export default Button;
