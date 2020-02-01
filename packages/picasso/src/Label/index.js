import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { variant as styledSystemVariant } from 'styled-system';

import Text from '../Text';
import themeGet from '../theme/utils';

const labelVariant = {
  variants: {
    primary: {
      backgroundColor: 'primary'
    },
    success: {
      backgroundColor: 'success'
    },
    danger: {
      backgroundColor: 'danger'
    },
    default: {
      backgroundColor: 'white',
      color: 'black'
    },
    info: {
      backgroundColor: 'info'
    },
    warning: {
      backgroundColor: 'warning'
    }
  }
};

const StyledText = styled(Text)`
  padding: ${themeGet('space.2')};
  margin: ${themeGet('space.2')};
  border-radius: 3px;
  color: ${themeGet('colors.white')};
  ${styledSystemVariant(labelVariant)};
`;

const Label = props => {
  const { variant, children, ...rest } = props;
  return (
    <StyledText as="label" variant={variant} {...rest}>
      {children}
    </StyledText>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'danger',
    'warning',
    'info',
    'success'
  ])
};

Label.defaultProps = {
  variant: 'default'
};

export default Label;
