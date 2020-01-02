import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import themeGet from '../theme/utils';
import withValue, { ValueContext } from '../hoc/withValue';

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const HiddenCheckBox = styled.input.attrs(() => ({
  type: 'checkbox'
}))`
  cursor: pointer;
  position: absolute;
  opacity: 0;
`;

const StyledCheckBox = styled.div`
  width: ${themeGet('space.4')};
  height: ${themeGet('space.4')};
  border: thin solid ${themeGet('colors.primary')};
  border-radius: ${themeGet('space.2')};
  background-color: ${props =>
    props.checked ? themeGet('colors.primary') : themeGet('colors.white')};
  position: relative;
`;

const CheckBox = props => {
  const { checked } = props;
  return (
    <>
      <StyledCheckBox checked={checked}>
        <HiddenCheckBox {...props} />
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckBox>
    </>
  );
};

const CheckBoxWithValue = withValue('boolean', props => (
  <ValueContext.Consumer>
    {({ value, toggle }) => {
      return <CheckBox {...props} checked={value} onChange={toggle} />;
    }}
  </ValueContext.Consumer>
));

export { CheckBoxWithValue };

CheckBox.propTypes = {
  checked: PropTypes.bool
};

CheckBox.defaultProps = {
  checked: false
};

export default CheckBox;
