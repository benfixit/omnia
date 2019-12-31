/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_BUDGETS = gql`
  query BudgetList($year: Int, $month: Int) {
    budgets(year: $year, month: $month) {
      _id
      amount
      category {
        _id
        title
      }
    }
  }
`;

export const ADD_BUDGET = gql`
  mutation AddBudget($amount: Int, $category: ID!) {
    createBudget(amount: $amount, category: $category) {
      _id
      amount
      category {
        _id
        title
      }
    }
  }
`;
