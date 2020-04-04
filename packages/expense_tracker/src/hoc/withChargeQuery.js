import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_CHARGES } from '../graphql/charges';
import { getQueryYearAndMonth } from '../utils/date';

const { Loading } = Picasso;

const withChargeQuery = EnhancedComponent => {
  const WithChargeQuery = props => {
    const {
      match: {
        params: { year, month }
      }
    } = props;
    return (
      <Query query={GET_CHARGES} variables={getQueryYearAndMonth(year, month)}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { charges } = data;
          return <EnhancedComponent {...props} charges={charges} />;
        }}
      </Query>
    );
  };

  WithChargeQuery.propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        year: PropTypes.string,
        month: PropTypes.string
      })
    }).isRequired
  };

  return hoistNonReactStatics(WithChargeQuery, EnhancedComponent);
};

export default withChargeQuery;
