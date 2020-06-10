import gql from 'graphql-tag';

export const GET_INVESTMENTS = gql`
  query InvestmentsList($year: Int, $month: Int) {
    investments(year: $year, month: $month) {
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

export const GET_INVESTMENT = gql`
  query SingleInvestment($_id: ID!) {
    investment(_id: $_id) {
      _id
      description
      amount
      year
      month
      day
    }
  }
`;

export const ADD_INVESTMENT = gql`
  mutation(
    $amount: Int
    $description: String
    $year: Int
    $month: Int
    $day: Int
  ) {
    createInvestment(
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

export const EDIT_INVESTMENT = gql`
  mutation EditInvestment(
    $_id: ID!
    $amount: Int
    $description: String
    $year: Int
    $month: Int
    $day: Int
  ) {
    editInvestment(
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
