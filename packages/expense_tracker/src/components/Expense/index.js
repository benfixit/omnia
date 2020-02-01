import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { graphql } from 'react-apollo';
import { v4 } from 'uuid';
import compose from 'lodash/fp/compose';
import Picasso from '@omnia/picasso';

import ExpenseModal from './ExpenseModal';
import ExpenseTable from './ExpenseTable';

import withCategoryQuery from '../../hoc/withCategoryQuery';
import withExpenseQuery from '../../hoc/withExpenseQuery';
import { ADD_EXPENSE, GET_EXPENSES } from '../../graphql/expenses';
import Layout from '../Layout';
import {
  Layout as LayoutStyle,
  StyledButton,
  StyledHeading
} from '../../styles';
import { setDecimalNumber } from '../../utils/money';
import { monthsOfYear, getDate } from '../../utils/date';

const { Link, Pane } = Picasso;

const ExpensesRow = styled(Pane)`
  justify-content: space-between;
  padding: 14px 30px;
`;

const LowerNavRow = styled(LayoutStyle.Row)`
  padding: 14px 30px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const NavLink = styled(Link)`
  padding: 0 5px;
  margin: 0 10px;
  text-decoration: none;
  color: white;
`;

const LowerNavLink = styled(NavLink)`
  color: #a09280;
`;

const NavUl = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
`;

class Expense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expenseObject: {
        budget: '0',
        actual: '0',
        description: '',
        date: getDate(),
        category: ''
      },
      showModal: false
    };
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    });
  };

  handleCloseModal = () => {
    this.setState({
      showModal: false
    });
  };

  handleChange = event => {
    const { expenseObject } = this.state;
    const {
      target: { name, value }
    } = event;
    this.setState({
      expenseObject: { ...expenseObject, [name]: value }
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      expenseObject: { date, budget, actual, description, category }
    } = this.state;
    const expenseDate = new Date(date);
    const { mutate, history } = this.props;
    mutate({
      variables: {
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
    }).then(() => history.push('/expenses'));
  };

  render() {
    const { expenseObject, showModal } = this.state;
    const {
      handleChange,
      handleSubmit,
      handleOpenModal,
      handleCloseModal
    } = this;
    const {
      categories,
      expenses,
      match: { url }
    } = this.props;

    const root = url.slice(1).split('/')[0];
    return (
      <Layout>
        <LowerNavRow>
          <NavUl>
            {Object.keys(monthsOfYear).map(month => {
              const paramDate = new Date();
              return (
                <LowerNavLink
                  key={v4()}
                  href={`/${root}/${paramDate.getFullYear()}/${month.toLowerCase()}`}
                >
                  {month}
                </LowerNavLink>
              );
            })}
          </NavUl>
        </LowerNavRow>
        <ExpensesRow>
          <StyledHeading>Expenses</StyledHeading>
          <StyledButton onClick={handleOpenModal}>Add Expense</StyledButton>
        </ExpensesRow>
        <ExpenseTable expenses={expenses} />
        <ExpenseModal
          showModal={showModal}
          expenseObject={expenseObject}
          categories={categories}
          handleChange={handleChange}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      </Layout>
    );
  }
}

Expense.propTypes = {
  categories: PropTypes.instanceOf(Array).isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string
  }).isRequired,
  mutate: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default compose(
  withRouter,
  graphql(ADD_EXPENSE),
  withCategoryQuery,
  withExpenseQuery
)(Expense);
