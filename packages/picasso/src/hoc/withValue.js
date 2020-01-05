import React from 'react';
import PropTypes from 'prop-types';
import { BooleanValue, StringValue, Value } from 'react-values';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getDisplayName from '../utils/displayName';

const valueMap = {
  string: StringValue,
  boolean: BooleanValue,
  any: Value
};

export const ValueContext = React.createContext({});

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
        {valueProps => {
          return (
            <ValueContext.Provider value={valueProps}>
              <EnhancedComponent
                {...componentProps}
                value={valueProps.value}
                onChange={event => valueProps.set(event.target.value)}
              />
            </ValueContext.Provider>
          );
        }}
      </ValueWrapper>
    );
  };

  WithValue.defaultProps = {
    value: undefined,
    defaultValue: undefined,
    onChange: () => {},
    disabled: false
  };

  WithValue.propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool
    ]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool
  };

  WithValue.displayName = `WithValue(${getDisplayName(EnhancedComponent)})`;

  return hoistNonReactStatics(WithValue, EnhancedComponent);
};

export default withValue;
