import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_INVESTMENTS } from '../graphql/investments';
import { getQueryYearAndMonth } from '../utils/date';

const { Loading } = Picasso;

const withInvestmentsQuery = EnhancedComponent => {
  const WithInvestmentsQuery = props => {
    const {
      match: {
        params: { year, month }
      }
    } = props;
    return (
      <Query
        query={GET_INVESTMENTS}
        variables={getQueryYearAndMonth(year, month)}
      >
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { investments } = data;
          return <EnhancedComponent {...props} investments={investments} />;
        }}
      </Query>
    );
  };

  WithInvestmentsQuery.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string,
        month: PropTypes.string
      })
    }).isRequired
  };

  return hoistNonReactStatics(WithInvestmentsQuery, EnhancedComponent);
};

export default withInvestmentsQuery;
