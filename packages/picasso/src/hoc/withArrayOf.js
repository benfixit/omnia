/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ArrayValue } from 'react-values';

import getDisplayName from '../utils/displayName';

export const ArrayContext = React.createContext({});

const withArrayOf = EnhancedComponent => {
  const WithArrayOf = props => {
    const { children, value, defaultValue, onChange, disabled } = props;
    return (
      <ArrayValue
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
      >
        {valueProps => {
          // console.log('Inputed Values === ', valueProps.value);
          return (
            <ArrayContext.Provider value={valueProps}>
              {React.Children.map(children, (child, index) => {
                return React.cloneElement(child, {
                  key: index
                });
              })}
            </ArrayContext.Provider>
          );
        }}
      </ArrayValue>
    );
  };

  WithArrayOf.Item = EnhancedComponent;

  WithArrayOf.displayName = `WithValue(${getDisplayName(EnhancedComponent)})`;

  WithArrayOf.defaultProps = {
    value: undefined,
    defaultValue: undefined,
    onChange: () => {},
    disabled: false,
    children: []
  };

  WithArrayOf.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.shape({})
  };

  return hoistNonReactStatics(WithArrayOf, EnhancedComponent);
};

export default withArrayOf;
