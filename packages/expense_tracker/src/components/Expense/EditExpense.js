import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import compose from 'lodash/fp/compose';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import Picasso from '@omnia/picasso';

import client from '../../apollo/client';
import { FormButton, StyledForm } from '../../styles';
import {
  EDIT_EXPENSE,
  GET_EXPENSE,
  GET_EXPENSES
} from '../../graphql/expenses';
import withCategoryQuery from '../../hoc/withCategoryQuery';
import { getDate, getYearAndMonthText } from '../../utils/date';
import { setDecimalNumber, getDecimalNumber } from '../../utils/money';

const { DateField, InputField, SelectField, Pane } = Picasso;

const Container = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

class EditExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        budget: '0',
        actual: '0',
        description: '',
        date: getDate(),
        category: ''
      }
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    client
      .query({
        query: GET_EXPENSE,
        variables: { _id: id }
      })
      .then(response => {
        const { data } = this.state;
        const { expense } = response.data;
        const {
          category: { _id: categoryId }
        } = expense;
        this.setState({
          data: {
            ...data,
            budget: getDecimalNumber(expense.budget),
            actual: getDecimalNumber(expense.actual),
            description: expense.description,
            category: categoryId,
            date: getDate(expense.year, expense.month, expense.day)
          }
        });
      });
  }

  handleChange = event => {
    const { data } = this.state;
    const {
      target: { name, value }
    } = event;
    this.setState({
      data: { ...data, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      data: { budget, actual, description, category, date }
    } = this.state;
    const expenseDate = new Date(date);
    const {
      mutate,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    const period = getYearAndMonthText();
    mutate({
      variables: {
        _id: id,
        budget: setDecimalNumber(budget),
        actual: setDecimalNumber(actual),
        description,
        category,
        year: Number(expenseDate.getFullYear()),
        month: Number(expenseDate.getMonth()),
        day: Number(expenseDate.getDate())
      },
      refetchQueries: [
        {
          query: GET_EXPENSES
        }
      ]
    }).then(() => history.push(`/expenses/${period.year}/${period.month}`));
  };

  render() {
    const {
      data: { budget, actual, description, category, date }
    } = this.state;
    const { categories } = this.props;
    const { handleChange, handleSubmit } = this;
    return (
      <Container>
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
      </Container>
    );
  }
}

EditExpense.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  mutate: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

EditExpense.defaultProps = {
  mutate: () => {}
};

export default compose(
  withRouter,
  graphql(EDIT_EXPENSE),
  withCategoryQuery
)(EditExpense);
