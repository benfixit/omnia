import React from 'react';
import Modal from './index';

export default {
  title: 'Modal',
  component: Modal
};

export const BasicModal = () => (
  <Modal>
    <h1>Welcome Here</h1>
    <p>Some random content!!!</p>
  </Modal>
);
