/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_CHARGE_TYPES = gql`
  query ChargeTypeList {
    chargeTypes {
      _id
      title
    }
  }
`;
