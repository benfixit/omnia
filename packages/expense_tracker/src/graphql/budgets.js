import gql from 'graphql-tag';

export const GET_BUDGETS = gql`
  query BudgetList($year: Int, $month: Int) {
    budgets(year: $year, month: $month) {
      _id
      amount
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

export const ADD_BUDGET = gql`
  mutation AddBudget(
    $amount: Int
    $category: ID!
    $year: Int
    $month: Int
    $day: Int
  ) {
    createBudget(
      amount: $amount
      category: $category
      year: $year
      month: $month
      day: $day
    ) {
      _id
      amount
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
