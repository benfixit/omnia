import gql from 'graphql-tag';

export const GET_SAVINGS = gql`
  query SavingsList($year: Int, $month: Int) {
    savings(year: $year, month: $month) {
      _id
      amount
      actual
      description
      year
      month
      day
      createdAt
    }
  }
`;

export const GET_SAVING = gql`
  query SingleSaving($_id: ID!) {
    saving(_id: $_id) {
      _id
      description
      amount
      actual
      year
      month
      day
    }
  }
`;

export const ADD_SAVING = gql`
  mutation(
    $amount: Int
    $actual: Int
    $description: String
    $year: Int
    $month: Int
    $day: Int
  ) {
    createSaving(
      amount: $amount
      actual: $actual
      description: $description
      year: $year
      month: $month
      day: $day
    ) {
      _id
      amount
      actual
      description
      year
      month
      day
    }
  }
`;

export const EDIT_SAVING = gql`
  mutation EditSaving(
    $_id: ID!
    $amount: Int
    $actual: Int
    $description: String
    $year: Int
    $month: Int
    $day: Int
  ) {
    editSaving(
      _id: $_id
      amount: $amount
      actual: $actual
      description: $description
      year: $year
      month: $month
      day: $day
    ) {
      _id
      amount
      actual
      description
      year
      month
      day
    }
  }
`;
