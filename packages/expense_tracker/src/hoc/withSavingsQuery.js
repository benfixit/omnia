import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_SAVINGS } from '../graphql/savings';
import { getQueryYearAndMonth } from '../utils/date';
import { falseyCheck } from '../utils/number';

const { Loading } = Picasso;

const withSavingsQuery = (period = {}) => EnhancedComponent => {
  const WithSavingsQuery = props => {
    const queryDate = new Date();
    const defaultYear = queryDate.getFullYear();
    const {
      match: {
        params: { year: paramYear = defaultYear, month: paramMonth }
      }
    } = props;
    const { year: periodYear, month: periodMonth } = period;
    return (
      <Query
        query={GET_SAVINGS}
        variables={{
          year: falseyCheck(periodYear, getQueryYearAndMonth(paramYear)),
          month: falseyCheck(periodMonth, getQueryYearAndMonth(paramMonth))
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { savings } = data;
          return <EnhancedComponent {...props} savings={savings} />;
        }}
      </Query>
    );
  };

  WithSavingsQuery.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string,
        month: PropTypes.string
      })
    }).isRequired
  };

  return hoistNonReactStatics(WithSavingsQuery, EnhancedComponent);
};

export default withSavingsQuery;
