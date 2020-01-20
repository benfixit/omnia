import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Button from '../Button';
import themeGet from '../theme/utils';

const modalRoot = document.getElementById('docs-root');

const containerLanding = keyframes`
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0px;
    opacity: 1;
  }
`;

const BackDrop = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: fixed;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 900;
`;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  background: ${themeGet('colors.white')};
  border: thin solid ${themeGet('colors.gray')};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${containerLanding} 0.5s;
`;

const ModalFrame = props => {
  const { children, show, onClose } = props;
  return (
    <BackDrop show={show}>
      <Container>
        {children}
        <Button onClick={onClose}>Close</Button>
      </Container>
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

  render() {
    const { children, show, onClose } = this.props;
    const { wrapper } = this;
    return ReactDOM.createPortal(
      <ModalFrame show={show} onClose={onClose}>
        {children}
      </ModalFrame>,
      wrapper
    );
  }
}

ModalFrame.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func
};

ModalFrame.defaultProps = {
  show: false,
  onClose: () => {}
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
