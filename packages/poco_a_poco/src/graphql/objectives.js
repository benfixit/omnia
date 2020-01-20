/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_OBJECTIVES = gql`
  query ObjectiveList {
    objectives {
      _id
      title
      status {
        _id
        title
      }
    }
  }
`;
