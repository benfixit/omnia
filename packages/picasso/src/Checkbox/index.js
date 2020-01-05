import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import themeGet from '../theme/utils';
import withValue, { ValueContext } from '../hoc/withValue';
import withSetOf, { ArrayContext } from '../hoc/withSetOf';

const CheckBoxContainer = styled.label`
  display: flex;
  cursor: pointer;
  user-select: none;
  color: ${themeGet('colors.primary')};
  margin: ${themeGet('space.3')} ${themeGet('space.0 ')};
`;

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
  margin-right: ${themeGet('space.3')};
`;

const CheckBox = props => {
  const { checked, description } = props;
  return (
    <CheckBoxContainer>
      <StyledCheckBox checked={checked}>
        <HiddenCheckBox {...props} />
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckBox>
      <span>{description}</span>
    </CheckBoxContainer>
  );
};

const CheckBoxWithValue = withValue('boolean', props => (
  <ValueContext.Consumer>
    {({ value, toggle }) => {
      return <CheckBox {...props} checked={value} onChange={toggle} />;
    }}
  </ValueContext.Consumer>
));

const CheckBoxArray = withSetOf(props => (
  <ArrayContext.Consumer>
    {({ value: setValue, add, remove }) => {
      const { name, description } = props;
      return (
        <CheckBoxWithValue
          value={setValue.has(name)}
          description={description}
          onChange={value => (value ? add(name) : remove(name))}
        />
      );
    }}
  </ArrayContext.Consumer>
));

export { CheckBoxWithValue, CheckBoxArray };

CheckBox.propTypes = {
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string
};

CheckBox.defaultProps = {
  description: ''
};

export default CheckBox;
