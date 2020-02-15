import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Query } from 'react-apollo';
import Picasso from '@omnia/picasso';

import { GET_NOTES } from '../graphql/notes';

const { Loading } = Picasso;

const withNoteQuery = EnhancedComponent => {
  const WithNoteQuery = props => {
    return (
      <Query query={GET_NOTES}>
        {({ data, loading, error }) => {
          if (loading) return <Loading />;
          if (error) return <h2>Error :(</h2>;
          const { notes } = data;
          return <EnhancedComponent {...props} notes={notes} />;
        }}
      </Query>
    );
  };

  return hoistNonReactStatics(WithNoteQuery, EnhancedComponent);
};

export default withNoteQuery;
