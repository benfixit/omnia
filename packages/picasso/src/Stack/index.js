import React, { createContext, memo } from 'react';
import PropTypes from 'prop-types';

const { Provider, Consumer } = createContext(10);

const StackComponent = props => {
  const { children, value } = props;
  return (
    <Consumer>
      {prevValue => {
        const currentValue = Math.max(prevValue, value);
        const nextValue = currentValue + 1;
        return <Provider value={nextValue}>{children(currentValue)}</Provider>;
      }}
    </Consumer>
  );
};

const Stack = memo(StackComponent);

Stack.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number
};

Stack.defaultProps = {
  value: 0
};

export default Stack;
