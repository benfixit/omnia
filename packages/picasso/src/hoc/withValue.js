import React from 'react';
import PropTypes from 'prop-types';
import { BooleanValue, StringValue, Value } from 'react-values';
import hoistNonReactStatics from 'hoist-non-react-statics';

const valueMap = {
  string: StringValue,
  boolean: BooleanValue,
  any: Value
};

const withValue = (valueType, EnhancedComponent) => {
  const ValueWrapper = valueMap[valueType] || valueMap.any;
  const WithValue = props => {
    const {
      value,
      defaultValue,
      disabled,
      onChange,
      ...componentProps
    } = props;
    return (
      <ValueWrapper
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
      >
        {({ value: inputValue, set }) => {
          return (
            <EnhancedComponent
              {...componentProps}
              value={inputValue}
              onChange={event => set(event.target.value)}
            />
          );
        }}
      </ValueWrapper>
    );
  };

  WithValue.defaultProps = {
    value: '',
    defaultValue: '',
    onChange: () => {},
    disabled: false
  };

  WithValue.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  };

  return hoistNonReactStatics(WithValue, EnhancedComponent);
};

export default withValue;
