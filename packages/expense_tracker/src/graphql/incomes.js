import gql from 'graphql-tag';

export const GET_INCOMES = gql`
  query IncomeList($year: Int, $month: Int) {
    incomes(year: $year, month: $month) {
      _id
      amount
      description
      year
      month
      day
      createdAt
    }
  }
`;

export const GET_INCOME = gql`
  query SingleIncome($_id: ID!) {
    income(_id: $_id) {
      _id
      description
      amount
      year
      month
      day
    }
  }
`;

export const ADD_INCOME = gql`
  mutation(
    $amount: Int
    $description: String
    $year: Int
    $month: Int
    $day: Int
  ) {
    createIncome(
      amount: $amount
      description: $description
      year: $year
      month: $month
      day: $day
    ) {
      _id
      amount
      description
      year
      month
      day
    }
  }
`;

export const EDIT_INCOME = gql`
  mutation EditIncome(
    $_id: ID!
    $amount: Int
    $description: String
    $year: Int
    $month: Int
    $day: Int
  ) {
    editIncome(
      _id: $_id
      amount: $amount
      description: $description
      year: $year
      month: $month
      day: $day
    ) {
      _id
      amount
      description
      year
      month
      day
    }
  }
`;
