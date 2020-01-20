import React from 'react';
import { Query } from 'react-apollo';
import { v4 } from 'uuid';
import Picasso from '@omnia/picasso';
import { GET_OBJECTIVES } from '../graphql/objectives';

const { List } = Picasso;

const Objectives = () => {
  return (
    <Query query={GET_OBJECTIVES}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading...';
        if (error) return 'Error...';
        const { objectives } = data;
        return (
          <List>
            {objectives.map(objective => (
              <List.Item key={v4()}>{objective.title}</List.Item>
            ))}
          </List>
        );
      }}
    </Query>
  );
};

export default Objectives;
