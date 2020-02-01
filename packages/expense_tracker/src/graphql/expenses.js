import gql from 'graphql-tag';

export const GET_EXPENSES = gql`
  query ExpenseList($year: Int, $month: Int) {
    expenses(year: $year, month: $month) {
      _id
      description
      budget
      actual
      year
      month
      day
      category {
        _id
        title
      }
    }
  }
`;

export const GET_EXPENSE = gql`
  query SingleExpense($_id: ID!) {
    expense(_id: $_id) {
      _id
      description
      budget
      actual
      year
      month
      day
      category {
        _id
        title
      }
    }
  }
`;

export const ADD_EXPENSE = gql`
  mutation AddExpense(
    $budget: Int
    $actual: Int
    $description: String
    $category: ID!
    $year: Int
    $month: Int
    $day: Int
  ) {
    createExpense(
      budget: $budget
      actual: $actual
      description: $description
      category: $category
      year: $year
      month: $month
      day: $day
    ) {
      _id
      budget
      actual
      description
      year
      month
      day
      category {
        _id
        title
      }
    }
  }
`;

export const EDIT_EXPENSE = gql`
  mutation EditExpense(
    $_id: ID!
    $budget: Int
    $actual: Int
    $description: String
    $category: ID!
    $year: Int
    $month: Int
    $day: Int
  ) {
    editExpense(
      _id: $_id
      budget: $budget
      actual: $actual
      description: $description
      category: $category
      year: $year
      month: $month
      day: $day
    ) {
      _id
      budget
      actual
      description
      year
      month
      day
      category {
        _id
        title
      }
    }
  }
`;

export const DELETE_EXPENSE = gql`
  mutation DropExpense($_id: ID!) {
    deleteExpense(_id: $_id) {
      _id
      budget
      actual
      description
      year
      month
      day
      category {
        _id
        title
      }
    }
  }
`;
