import PropTypes from 'prop-types';

const ModalHeader = props => {
  const { children } = props;
  return children;
};

ModalHeader.propTypes = {
  children: PropTypes.node
};

ModalHeader.defaultProps = {
  children: null
};

export default ModalHeader;
