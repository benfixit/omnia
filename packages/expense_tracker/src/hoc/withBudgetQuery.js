import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_BUDGETS } from '../graphql/budgets';
import { monthsOfYear } from '../utils/date';

const { Loading } = Picasso;

const withBudgetQuery = EnhancedComponent => {
  const WithBudgetQuery = props => {
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
        query={GET_BUDGETS}
        variables={{
          year: Number(year),
          month: Number(monthIndex)
        }}
      >
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
