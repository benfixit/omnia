import React, { createContext, createRef } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { zIndex } from 'styled-system';
import { assigned } from '@omnia/orcorum';

import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalAction from './ModalAction';
import Stack from '../Stack';
import themeGet from '../theme/utils';
import Portal from '../Portal';

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
  ${zIndex};
`;

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  max-height: 60%;
  overflow: auto;
  padding: ${themeGet('space.5')};
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${themeGet('colors.white')};
  border: thin solid ${themeGet('colors.gray')};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${containerLanding} 0.5s;
`;

const ModalContext = createContext({});

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.backgroundRef = createRef();

    const { show } = this.props;

    this.isControlled = assigned(show);

    this.state = {
      isOpen: false
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscapeKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKeyDown);
  }

  handleEscapeKeyDown = event => {
    const { toggle } = this;
    if (event.key === 'Escape') {
      toggle();
    }
  };

  handleBackgroundClick = event => {
    const { toggle, backgroundRef } = this;
    if (event.target === backgroundRef.current) {
      toggle();
    }
  };

  toggle = () => {
    const { isControlled } = this;
    if (isControlled) {
      const { onClose } = this.props;
      onClose();
    } else {
      const { isOpen } = this.state;
      this.setState({
        isOpen: !isOpen
      });
    }
  };

  render() {
    let { isOpen } = this.state;
    const { children, render, show, ...rest } = this.props;
    const { toggle, backgroundRef, handleBackgroundClick, isControlled } = this;

    if (isControlled) {
      isOpen = show;
    }

    return (
      <ModalContext.Provider value={{ toggle, isOpen }}>
        <Portal>
          <Stack>
            {zIndexValue => (
              <BackDrop
                zIndex={zIndexValue}
                show={isOpen}
                ref={backgroundRef}
                onClick={handleBackgroundClick}
              >
                <Container onClick={event => event.stopPropagation()} {...rest}>
                  {render({ toggle })}
                </Container>
              </BackDrop>
            )}
          </Stack>
        </Portal>
        {typeof children === 'function' && children({ toggle })}
      </ModalContext.Provider>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
  show: PropTypes.oneOfType([PropTypes.bool, PropTypes.shape({})]),
  onClose: PropTypes.func
};

Modal.defaultProps = {
  children: () => {},
  render: () => {},
  show: undefined,
  onClose: () => {}
};

Modal.Header = ModalHeader;
Modal.Action = ModalAction;
Modal.Content = ModalContent;

export default Modal;
