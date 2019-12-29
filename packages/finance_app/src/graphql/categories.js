/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_CATEGORIES = gql`
  query CategoryList {
    categories {
      _id
      title
    }
  }
`;
