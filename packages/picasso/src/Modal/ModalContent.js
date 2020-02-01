import PropTypes from 'prop-types';

const ModalContent = props => {
  const { children } = props;
  return children;
};

ModalContent.propTypes = {
  children: PropTypes.node.isRequired
};

export default ModalContent;
