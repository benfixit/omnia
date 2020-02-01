import styled from 'styled-components';

import Modal from '../Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalContent from '../Modal/ModalContent';
import ModalAction from '../Modal/ModalAction';

const Dialog = styled(Modal)`
  width: 450px;
  border-radius: 5px;
`;

Dialog.Header = ModalHeader;
Dialog.Content = ModalContent;
Dialog.Action = ModalAction;

export default Dialog;
