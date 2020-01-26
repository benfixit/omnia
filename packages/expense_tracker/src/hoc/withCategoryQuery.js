import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_CATEGORIES } from '../graphql/categories';

const { Loading } = Picasso;

const withCategoryQuery = EnhancedComponent => {
  const WithCategoryQuery = props => {
    return (
      <Query query={GET_CATEGORIES}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { categories } = data;
          return <EnhancedComponent {...props} categories={categories} />;
        }}
      </Query>
    );
  };
  return hoistNonReactStatics(WithCategoryQuery, EnhancedComponent);
};

export default withCategoryQuery;
