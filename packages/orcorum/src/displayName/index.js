/**
 * Gets the display name of a React Component
 * @param WrappedComponent
 * @returns {*|string}
 * @private
 */
const _displayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

export default _displayName;
