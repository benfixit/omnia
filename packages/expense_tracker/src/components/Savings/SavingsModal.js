import React from 'react';
import PropTypes from 'prop-types';
import Picasso from '@omnia/picasso';

import { FormButton, StyledForm } from '../../styles';

const { DateField, InputField, Modal } = Picasso;

const SavingsModal = props => {
  const {
    showModal,
    data: { amount, date, description },
    handleChange,
    handleCloseModal,
    handleSubmit
  } = props;

  return (
    <Modal show={showModal}>
      <Modal.Header title="Savings" />
      <Modal.Content>
        <StyledForm onSubmit={handleSubmit}>
          <InputField
            name="amount"
            value={amount}
            onChange={handleChange}
            label="Amount"
          />
          <InputField
            name="description"
            value={description}
            onChange={handleChange}
            label="Description"
          />
          <DateField
            name="date"
            value={date}
            onChange={handleChange}
            label="period"
          />
          <FormButton type="submit">Submit</FormButton>
        </StyledForm>
      </Modal.Content>
      <Modal.Action onClose={handleCloseModal} />
    </Modal>
  );
};

SavingsModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    date: PropTypes.string,
    amount: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SavingsModal;
