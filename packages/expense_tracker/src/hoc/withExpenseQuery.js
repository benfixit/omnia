import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_EXPENSES } from '../graphql/expenses';
import { getQueryYearAndMonth } from '../utils/date';

const { Loading } = Picasso;

const withExpenseQuery = EnhancedComponent => {
  const WithExpenseQuery = props => {
    const {
      match: {
        params: { year, month }
      }
    } = props;
    return (
      <Query query={GET_EXPENSES} variables={getQueryYearAndMonth(year, month)}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { expenses } = data;
          return <EnhancedComponent {...props} expenses={expenses} />;
        }}
      </Query>
    );
  };

  WithExpenseQuery.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string,
        month: PropTypes.string
      })
    }).isRequired
  };

  return hoistNonReactStatics(WithExpenseQuery, EnhancedComponent);
};

export default withExpenseQuery;
