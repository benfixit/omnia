import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const modalRoot = document.getElementById('docs-root');

const BackDrop = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
  z-index: 900;
`;

const Container = styled.div`
  width: 80%;
  height: 80%;
  background: white;
  border: thin solid red;
`;

const ModalFrame = props => {
  const { children, show } = props;
  return (
    <BackDrop show={show}>
      <Container>{children}</Container>
    </BackDrop>
  );
};

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.wrapper = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.wrapper);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.wrapper);
  }

  handleClose = () => {
    const { onClose } = this.props;
    onClose();
  };

  render() {
    const { children, show } = this.props;
    const { wrapper, handleClose } = this;
    return ReactDOM.createPortal(
      <ModalFrame show={show} onClose={handleClose}>
        {children}
      </ModalFrame>,
      wrapper
    );
  }
}

ModalFrame.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool
};

ModalFrame.defaultProps = {
  show: false
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  onClose: () => {},
  show: false
};

export default Modal;
