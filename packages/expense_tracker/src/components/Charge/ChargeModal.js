import React from 'react';
import PropTypes from 'prop-types';
import Picasso from '@omnia/picasso';

import { FormButton, StyledButton, StyledForm, StyledPane } from '../../styles';

const { Button, DateField, Heading, InputField, Modal, SelectField } = Picasso;

const ChargeModal = props => {
  const {
    data: { amount, date, description, type },
    chargeTypes: types,
    handleChange,
    handleSubmit
  } = props;

  return (
    <Modal
      render={({ toggle }) => (
        <>
          <Modal.Header>
            <Heading as="h2">Charge</Heading>
          </Modal.Header>
          <Modal.Content>
            <StyledForm onSubmit={event => handleSubmit(event, toggle)}>
              <SelectField
                name="type"
                onChange={handleChange}
                value={type}
                label="Type"
              >
                <option value="">Select a type</option>
                {types.map(item => {
                  const { _id: id, title } = item;
                  return (
                    <option value={id} key={id}>
                      {title}
                    </option>
                  );
                })}
              </SelectField>
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
      {({ toggle }) => <StyledButton onClick={toggle}>Add Charge</StyledButton>}
    </Modal>
  );
};

ChargeModal.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    amount: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  chargeTypes: PropTypes.instanceOf(Array).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ChargeModal;
