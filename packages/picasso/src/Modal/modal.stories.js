import React, { useState } from 'react';
import Modal from './index';
import Button from '../Button';
import ModalAction from './ModalAction';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';

export default {
  title: 'Modal',
  component: Modal
};

export const BasicModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Modal show={show}>
        <ModalHeader title="Welcome Here" />
        <ModalContent>
          <p>Some random content!!!</p>
        </ModalContent>
        <ModalAction onClose={() => setShow(false)} />
      </Modal>
      <Button onClick={() => setShow(true)}>Show Modal</Button>
    </>
  );
};
