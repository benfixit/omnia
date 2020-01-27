import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_BUDGETS } from '../graphql/budgets';
import { getQueryYearAndMonth } from '../utils/date';

const { Loading } = Picasso;

const withBudgetQuery = EnhancedComponent => {
  const WithBudgetQuery = props => {
    const {
      match: {
        params: { year, month }
      }
    } = props;
    return (
      <Query query={GET_BUDGETS} variables={getQueryYearAndMonth(year, month)}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { budgets } = data;
          return <EnhancedComponent {...props} budgets={budgets} />;
        }}
      </Query>
    );
  };

  WithBudgetQuery.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string,
        month: PropTypes.string
      })
    }).isRequired
  };

  return hoistNonReactStatics(WithBudgetQuery, EnhancedComponent);
};

export default withBudgetQuery;
