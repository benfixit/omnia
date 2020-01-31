import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Modal from '../Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalContent from '../Modal/ModalContent';
import DialogAction from './DialogAction';

const DialogContainer = styled(Modal)`
  width: 500px;
`;

const Dialog = props => {
  const { children, ...rest } = props;
  return <DialogContainer {...rest}>{children}</DialogContainer>;
};

Dialog.Header = ModalHeader;
Dialog.Content = ModalContent;
Dialog.Action = DialogAction;

DialogAction.propTypes = {
  children: PropTypes.node
};

DialogAction.defaultProps = {
  children: null
};

export default Dialog;
