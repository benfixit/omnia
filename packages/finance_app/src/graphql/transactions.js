import gql from 'graphql-tag';

export const GET_TRANSACTIONS = gql`
  query TransactionList($year: Int, $month: Int) {
    transactions(year: $year, month: $month) {
      _id
      amount
      description
      createdAt
      category {
        _id
        title
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation($amount: Int, $description: String, $category: ID!) {
    createTransaction(
      amount: $amount
      description: $description
      category: $category
    ) {
      _id
      amount
      description
      category {
        _id
        title
      }
    }
  }
`;
