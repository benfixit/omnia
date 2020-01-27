import gql from 'graphql-tag';

export const GET_BUDGETS = gql`
  query BudgetList($year: Int, $month: Int) {
    budgets(year: $year, month: $month) {
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

export const GET_BUDGET = gql`
  query SingleBudget($_id: ID!) {
    budget(_id: $_id) {
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

export const ADD_BUDGET = gql`
  mutation AddBudget(
    $budget: Int
    $actual: Int
    $description: String
    $category: ID!
    $year: Int
    $month: Int
    $day: Int
  ) {
    createBudget(
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

export const EDIT_BUDGET = gql`
  mutation EditBudget(
    $_id: ID!
    $budget: Int
    $actual: Int
    $description: String
    $category: ID!
    $year: Int
    $month: Int
    $day: Int
  ) {
    editBudget(
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
