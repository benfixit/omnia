import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { zIndex } from 'styled-system';

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
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${themeGet('colors.white')};
  border: thin solid ${themeGet('colors.gray')};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation: ${containerLanding} 0.5s;
`;

const Modal = props => {
  const { children, show, ...rest } = props;
  return (
    <Portal>
      <Stack>
        {zIndexValue => (
          <BackDrop zIndex={zIndexValue} show={show}>
            <Container {...rest}>{children}</Container>
          </BackDrop>
        )}
      </Stack>
    </Portal>
  );
};

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
