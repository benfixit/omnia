import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_INCOMES } from '../graphql/incomes';
import { getQueryYearAndMonth } from '../utils/date';

const { Loading } = Picasso;

const withIncomeQuery = EnhancedComponent => {
  const WithIncomeQuery = props => {
    const queryDate = new Date();
    const defaultYear = queryDate.getFullYear();
    const {
      match: {
        params: { year = defaultYear, month }
      }
    } = props;
    return (
      <Query query={GET_INCOMES} variables={getQueryYearAndMonth(year, month)}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { incomes } = data;
          return <EnhancedComponent {...props} incomes={incomes} />;
        }}
      </Query>
    );
  };

  WithIncomeQuery.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string,
        month: PropTypes.string
      })
    }).isRequired
  };

  return hoistNonReactStatics(WithIncomeQuery, EnhancedComponent);
};

export default withIncomeQuery;
