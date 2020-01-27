import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import compose from 'lodash/fp/compose';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import Picasso from '@omnia/picasso';

import client from '../../apollo/client';
import { FormButton, StyledForm } from '../../styles';
import { EDIT_BUDGET, GET_BUDGET } from '../../graphql/budgets';
import withCategoryQuery from '../../hoc/withCategoryQuery';
import { getDate } from '../../utils/date';

const { DateField, InputField, SelectField, Pane } = Picasso;

const Container = styled(Pane)`
  justify-content: center;
  padding: 15px 10px;
`;

class BudgetEdit extends React.Component {
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
        query: GET_BUDGET,
        variables: { _id: id }
      })
      .then(response => {
        const { data } = this.state;
        const { budget } = response.data;
        const {
          category: { _id: categoryId }
        } = budget;
        this.setState({
          data: {
            ...data,
            budget: budget.budget,
            actual: budget.actual,
            description: budget.description,
            category: categoryId,
            date: getDate(budget.year, budget.month, budget.day)
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
    const budgetDate = new Date(date);
    const {
      mutate,
      history,
      match: {
        params: { id }
      }
    } = this.props;
    mutate({
      variables: {
        _id: id,
        budget: Number(budget),
        actual: Number(actual),
        description,
        category,
        year: Number(budgetDate.getFullYear()),
        month: Number(budgetDate.getMonth()),
        day: Number(budgetDate.getDate())
      }
    }).then(() => history.push('/budgets'));
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

BudgetEdit.propTypes = {
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

BudgetEdit.defaultProps = {
  mutate: () => {}
};

export default compose(
  withRouter,
  graphql(EDIT_BUDGET),
  withCategoryQuery
)(BudgetEdit);
