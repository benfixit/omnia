/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { SetValue } from 'react-values';
import { displayName } from '@omnia/orcorum';

export const ArrayContext = React.createContext({});

const withSetOf = EnhancedComponent => {
  const WithSetOf = props => {
    const { children, value, defaultValue, onChange, disabled } = props;
    return (
      <SetValue
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
      >
        {valueProps => {
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
      </SetValue>
    );
  };

  WithSetOf.Item = EnhancedComponent;

  WithSetOf.displayName = `WithSetOf(${displayName(EnhancedComponent)})`;

  WithSetOf.defaultProps = {
    value: undefined,
    defaultValue: undefined,
    onChange: () => {},
    disabled: false,
    children: []
  };

  WithSetOf.propTypes = {
    value: PropTypes.shape(new Set()),
    defaultValue: PropTypes.shape(new Set()),
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.shape({}))
  };

  return hoistNonReactStatics(WithSetOf, EnhancedComponent);
};

export default withSetOf;
