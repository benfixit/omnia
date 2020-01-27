import gql from 'graphql-tag';

export const GET_SAVINGS = gql`
  query SavingsList($year: Int, $month: Int) {
    savings(year: $year, month: $month) {
      _id
      amount
      description
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
      year
      month
      day
    }
  }
`;

export const ADD_SAVING = gql`
  mutation(
    $amount: Int
    $description: String
    $year: Int
    $month: Int
    $day: Int
  ) {
    createSaving(
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

export const EDIT_SAVING = gql`
  mutation EditSaving(
    $_id: ID!
    $amount: Int
    $description: String
    $year: Int
    $month: Int
    $day: Int
  ) {
    editSaving(
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
