import gql from 'graphql-tag';

export const GET_INCOMES = gql`
  query IncomeList($year: Int, $month: Int) {
    incomes(year: $year, month: $month) {
      _id
      amount
      description
      createdAt
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
