import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import hoistNonReactStatics from 'hoist-non-react-statics';

import Text from '../Text';
import Pane from '../Pane';
import themeGet from '../theme/utils';

const StyledPane = styled(Pane)`
  flex-direction: column;
  margin-bottom: ${themeGet('space.5')};
`;

const StyledLabel = styled(Text)`
  margin-bottom: 12px;
  color: ${themeGet('colors.textLabel')};
  text-transform: uppercase;
  font-size: ${themeGet('fontSizes.0')};
`;

const withField = EnhancedComponent => {
  const WithField = props => {
    const { label, ...rest } = props;
    return (
      <StyledPane>
        <StyledLabel as="label">{label}</StyledLabel>
        <EnhancedComponent {...rest} />
      </StyledPane>
    );
  };

  WithField.propTypes = {
    label: PropTypes.string
  };

  WithField.defaultProps = {
    label: ''
  };

  return hoistNonReactStatics(WithField, EnhancedComponent);
};

export default withField;
