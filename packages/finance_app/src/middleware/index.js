const saver = store => next => action => {
  const result = next(action);
  localStorage.setItem('redux-store', JSON.stringify(store.getState()));
  return result;
};

export { saver }; // eslint-disable-line import/prefer-default-export
