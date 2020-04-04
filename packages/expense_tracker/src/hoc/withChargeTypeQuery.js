import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_CHARGE_TYPES } from '../graphql/chargetypes';

const { Loading } = Picasso;

const withChargeTypeQuery = EnhancedComponent => {
  const WithChargeTypeQuery = props => {
    return (
      <Query query={GET_CHARGE_TYPES}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { chargeTypes } = data;
          return <EnhancedComponent {...props} chargeTypes={chargeTypes} />;
        }}
      </Query>
    );
  };
  return hoistNonReactStatics(WithChargeTypeQuery, EnhancedComponent);
};

export default withChargeTypeQuery;
