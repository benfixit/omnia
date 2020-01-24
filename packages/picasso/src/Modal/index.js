import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalAction from './ModalAction';
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
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${themeGet('colors.white')};
  border: thin solid ${themeGet('colors.gray')};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${containerLanding} 0.5s;
`;

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
    const { children, show } = this.props;
    const { wrapper } = this;
    return ReactDOM.createPortal(
      <BackDrop show={show}>
        <Container>{children}</Container>
      </BackDrop>,
      wrapper
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  show: PropTypes.bool
};

Modal.defaultProps = {
  show: false
};

Modal.Header = ModalHeader;
Modal.Action = ModalAction;
Modal.Content = ModalContent;

export default Modal;
