import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_TRANSACTIONS } from '../graphql/transactions';
import { monthsOfYear } from '../utils/date';

const { Loading } = Picasso;

const withTransactionQuery = EnhancedComponent => {
  const WithTransactionQuery = props => {
    const queryDate = new Date();
    const defaultYear = queryDate.getFullYear();
    const {
      match: {
        params: { year = defaultYear, month }
      }
    } = props;
    const monthIndex = monthsOfYear[month] || queryDate.getMonth();
    return (
      <Query
        query={GET_TRANSACTIONS}
        variables={{
          year: Number(year),
          month: Number(monthIndex)
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { transactions } = data;
          return <EnhancedComponent {...props} transactions={transactions} />;
        }}
      </Query>
    );
  };

  WithTransactionQuery.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string,
        month: PropTypes.string
      })
    }).isRequired
  };

  return hoistNonReactStatics(WithTransactionQuery, EnhancedComponent);
};

export default withTransactionQuery;
