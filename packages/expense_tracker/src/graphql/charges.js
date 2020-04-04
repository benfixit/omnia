import gql from 'graphql-tag';

export const GET_CHARGES = gql`
  query ChargeList($year: Int, $month: Int) {
    charges(year: $year, month: $month) {
      _id
      description
      amount
      year
      month
      day
      type {
        _id
        title
      }
      createdAt
    }
  }
`;

export const GET_CHARGE = gql`
  query SingleCharge($_id: ID!) {
    charge(_id: $_id) {
      _id
      description
      amount
      year
      month
      day
      type {
        _id
        title
      }
    }
  }
`;

export const ADD_CHARGE = gql`
  mutation AddCharge(
    $amount: Int
    $description: String
    $type: ID!
    $year: Int
    $month: Int
    $day: Int
  ) {
    createCharge(
      amount: $amount
      description: $description
      type: $type
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
      type {
        _id
        title
      }
    }
  }
`;

export const EDIT_CHARGE = gql`
  mutation EditCharge(
    $_id: ID!
    $amount: Int
    $description: String
    $type: ID!
    $year: Int
    $month: Int
    $day: Int
  ) {
    editCharge(
      _id: $_id
      amount: $amount
      type: $type
      year: $year
      month: $month
      day: $day
    ) {
      _id
      amount
      year
      month
      day
      type {
        _id
        title
      }
    }
  }
`;

export const DELETE_CHARGE = gql`
  mutation DropCharge($_id: ID!) {
    deleteCharge(_id: $_id) {
      _id
      amount
      type {
        _id
        title
      }
    }
  }
`;
