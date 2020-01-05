import React from 'react';
import PropTypes from 'prop-types';

import Text from '../Text';
import {
  Container,
  Icon,
  HiddenElement,
  StyledElement
} from '../commonStyles/radioAndCheckBox';
import withValue, { ValueContext } from '../hoc/withValue';
import withSetOf, { ArrayContext } from '../hoc/withSetOf';

const CheckBox = props => {
  const { checked, description } = props;
  return (
    <Container>
      <StyledElement checked={checked} type="checkbox">
        <HiddenElement {...props} type="checkbox" />
        <Icon />
      </StyledElement>
      <Text as="span">{description}</Text>
    </Container>
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
      const { name } = props;
      return (
        <CheckBoxWithValue
          value={setValue.has(name)}
          name={name}
          {...props}
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
