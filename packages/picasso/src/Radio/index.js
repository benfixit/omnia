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

const Radio = props => {
  const { checked, description } = props;
  return (
    <Container>
      <StyledElement checked={checked} type="radio">
        <HiddenElement {...props} type="radio" />
        <Icon />
      </StyledElement>
      <Text as="span">{description}</Text>
    </Container>
  );
};

const RadioWithValue = withValue('boolean', props => (
  <ValueContext.Consumer>
    {({ value, set }) => {
      return (
        <Radio
          {...props}
          checked={value}
          onChange={event => set(event.target.checked)}
        />
      );
    }}
  </ValueContext.Consumer>
));

const RadioArray = withSetOf(props => (
  <ArrayContext.Consumer>
    {({ value: setValue, set }) => {
      const { name } = props;
      return (
        <RadioWithValue
          {...props}
          value={setValue.has(name)}
          onChange={value => (value ? set(new Set([name])) : null)}
        />
      );
    }}
  </ArrayContext.Consumer>
));

export { RadioWithValue, RadioArray };

Radio.propTypes = {
  checked: PropTypes.bool.isRequired,
  description: PropTypes.string
};

Radio.defaultProps = {
  description: ''
};

export default Radio;
