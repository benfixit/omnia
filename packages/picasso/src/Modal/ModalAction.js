import PropTypes from 'prop-types';

const ModalAction = props => {
  const { children } = props;
  return children;
};

ModalAction.propTypes = {
  children: PropTypes.node
};

ModalAction.defaultProps = {
  children: null
};

export default ModalAction;
