import React from 'react';
import PropTypes from 'prop-types';
import Picasso from '@omnia/picasso';

import { FormButton, StyledButton, StyledForm, StyledPane } from '../../styles';

const { Button, DateField, Heading, InputField, Modal } = Picasso;

const IncomeModal = props => {
  const {
    incomeObject: { amount, date, description },
    handleChange,
    handleSubmit
  } = props;

  return (
    <Modal
      render={({ toggle }) => (
        <>
          <Modal.Header>
            <Heading as="h2">Income</Heading>
          </Modal.Header>
          <Modal.Content>
            <StyledForm onSubmit={event => handleSubmit(event, toggle)}>
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
          <Modal.Action>
            <StyledPane>
              <Button onClick={toggle}>Close</Button>
            </StyledPane>
          </Modal.Action>
        </>
      )}
    >
      {({ toggle }) => <StyledButton onClick={toggle}>Add Income</StyledButton>}
    </Modal>
  );
};

IncomeModal.propTypes = {
  incomeObject: PropTypes.shape({
    date: PropTypes.string,
    amount: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default IncomeModal;
