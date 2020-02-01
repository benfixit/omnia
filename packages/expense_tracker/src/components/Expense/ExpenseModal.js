import React from 'react';
import PropTypes from 'prop-types';
import Picasso from '@omnia/picasso';

import { FormButton, StyledForm, StyledButton, StyledPane } from '../../styles';

const { Button, DateField, InputField, Heading, Modal, SelectField } = Picasso;

const ExpenseModal = props => {
  const {
    expenseObject: { date, budget, actual, description, category },
    categories,
    handleChange,
    handleSubmit
  } = props;

  return (
    <Modal
      render={({ toggle }) => (
        <>
          <Modal.Header>
            <Heading as="h2">Expense</Heading>
          </Modal.Header>
          <Modal.Content>
            <StyledForm onSubmit={event => handleSubmit(event, toggle)}>
              <SelectField
                name="category"
                onChange={handleChange}
                value={category}
                label="Category"
              >
                <option value="">Select a category</option>
                {categories.map(item => {
                  const { _id: id, title } = item;
                  return (
                    <option value={id} key={id}>
                      {title}
                    </option>
                  );
                })}
              </SelectField>
              <DateField
                name="date"
                value={date}
                onChange={handleChange}
                label="period"
              />
              <InputField
                name="description"
                value={description}
                onChange={handleChange}
                label="Description"
              />
              <InputField
                name="budget"
                value={budget}
                onChange={handleChange}
                label="Budget"
              />
              <InputField
                name="actual"
                value={actual}
                onChange={handleChange}
                label="Actual"
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
      {({ toggle }) => (
        <StyledButton onClick={toggle}>Add Expense</StyledButton>
      )}
    </Modal>
  );
};

ExpenseModal.propTypes = {
  expenseObject: PropTypes.shape({
    date: PropTypes.string,
    budget: PropTypes.string,
    actual: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
  categories: PropTypes.instanceOf(Array).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ExpenseModal;
