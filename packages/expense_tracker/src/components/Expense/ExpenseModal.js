import React from 'react';
import PropTypes from 'prop-types';
import Picasso from '@omnia/picasso';

import { FormButton, StyledForm } from '../../styles';

const { DateField, InputField, Modal, SelectField } = Picasso;

const ExpenseModal = props => {
  const {
    showModal,
    expenseObject: { date, budget, actual, description, category },
    categories,
    handleChange,
    handleCloseModal,
    handleSubmit
  } = props;

  return (
    <Modal show={showModal}>
      <Modal.Header title="Expense" />
      <Modal.Content>
        <StyledForm onSubmit={handleSubmit}>
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
      <Modal.Action onClose={handleCloseModal} />
    </Modal>
  );
};

ExpenseModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  expenseObject: PropTypes.shape({
    date: PropTypes.string,
    budget: PropTypes.string,
    actual: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
  categories: PropTypes.instanceOf(Array).isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default ExpenseModal;