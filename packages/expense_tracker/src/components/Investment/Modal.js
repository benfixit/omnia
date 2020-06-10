import React from 'react';
import PropTypes from 'prop-types';
import Picasso from '@omnia/picasso';

import { FormButton, StyledButton, StyledForm, StyledPane } from '../../styles';

const { Button, DateField, Heading, InputField, Modal: PicassoModal } = Picasso;

const Modal = props => {
  const {
    data: { amount, date, description },
    handleChange,
    handleSubmit
  } = props;

  return (
    <PicassoModal
      render={({ toggle }) => (
        <>
          <PicassoModal.Header>
            <Heading as="h2">Investments</Heading>
          </PicassoModal.Header>
          <PicassoModal.Content>
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
          </PicassoModal.Content>
          <PicassoModal.Action>
            <StyledPane>
              <Button onClick={toggle}>Close</Button>
            </StyledPane>
          </PicassoModal.Action>
        </>
      )}
    >
      {({ toggle }) => (
        <StyledButton onClick={toggle}>Add Investments</StyledButton>
      )}
    </PicassoModal>
  );
};

Modal.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    amount: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default Modal;
