import React, { useState } from 'react';
import Modal from './index';
import Button from '../Button';

export default {
  title: 'Modal',
  component: Modal
};

export const BasicModal = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Modal show={show}>
        <h1>Welcome Here</h1>
        <p>Some random content!!!</p>
      </Modal>
      <Button onClick={() => setShow(true)}>Show Modal</Button>
    </>
  );
};
